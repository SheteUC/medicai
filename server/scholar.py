import requests
from dotenv import load_dotenv
from serpapi import GoogleSearch
import PyPDF2
import os

load_dotenv()

class Scholar():
    def get_search_results(query):
        
        params = {
            "engine": "google_scholar",
            "q": query,
            "api_key": os.environ.get("SERP_API_KEY"),
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        organic_results = results["organic_results"]

        return organic_results

    def get_paper_contents(search_results):
        text = ""

        for search_result in search_results:
            if 'resources' in search_result:
                if 'link' in search_result['resources'][0]:
                    url = search_result['resources'][0]['link']

                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'}
                    page = requests.get(url, headers=headers)

                    with open("search_result.pdf", 'wb') as my_data:
                        my_data.write(page.content)

                    try:
                        reader = PyPDF2.PdfReader('search_result.pdf') 
                        text = ""
                        for page in reader.pages:
                            text+= page.extract_text()
                    except:
                        continue
                    break

        if not text:
            return

        os.remove("search_result.pdf")

        try:
            if 'publication_info' in search_result:
                if 'authors' in search_result['publication_info']:
                    authors = [author['name'] for author in search_result['publication_info']['authors']]
                else:
                    authors = [search_result['publication_info']['summary'].split(',')[0]]
            else:
                authors = []
        except:
            authors = []

        return {"title": search_result['title'], "authors": authors, "text": text, "link": search_result['link']}

    def get_all_papers(keyword, demographics):
        all_papers = []
        for demographic in demographics: #demographics should be in the form [race, gender, age, conditions]
            result = Scholar.get_search_results(f"{keyword} and {demographic}")
            paper_content = Scholar.get_paper_contents(result)
            if paper_content:
                all_papers.append(paper_content)
        return all_papers

        
if __name__ == "__main__":
    papers = Scholar.get_all_papers("Polycystic Ovary Syndrome", ["african american", "teen", "depression"])
    print(papers)

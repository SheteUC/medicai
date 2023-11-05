from flask_restful import Resource
import requests
from serpapi import GoogleSearch
from selenium import webdriver
import PyPDF2
import os

class Scholar(Resource):
    def get_search_results(query):
        
        params = {
        "engine": "google_scholar",
        "q": query,
        "api_key": "608dabdc6809e1a0b906fa40ee567e7f004f001ee12096282deb62fce126b28f"
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        organic_results = results["organic_results"]

        return organic_results

    def get_paper_contents(search_result):
        url = search_result['resources'][0]['link']

        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'}
        page = requests.get(url, headers=headers)

        with open("search_result.pdf", 'wb') as my_data:
            my_data.write(page.content)


        reader = PyPDF2.PdfReader('search_result.pdf') 
        text = ""
        for page in reader.pages:
            text+= page.extract_text()

        os.remove("search_result.pdf")
        return text

        

results = Scholar.get_search_results("Covid-19 vaccine efficacy in African American females with asthma")
paper = Scholar.get_paper_contents(results[0])
print(results)
print(paper)

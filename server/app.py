from flask import Flask, request, Response
from llm import init_all_chain, summarize_and_relevancy, get_abstract_text_chunk
from scholar import Scholar
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

@app.route('/')
def hello_world():
    return 'Welcome to Medicai!'

@app.route('/submit', methods=['POST'])
def submit():
      """
      The patient's demographics from the form is posted here as a JSON object.
      parse it and pass it to the LLM chain.
      Return the result from the LLM chain.
      """
      if request.method == "POST":
            data = request.get_json()["body"]
            llm_dict = init_all_chain(verbose=False)
            papers = Scholar.get_all_papers(data["query"], demographics=data["demographics"])
            paper_summaries = []
            for paper in papers:
                  text_chunked = get_abstract_text_chunk(text=paper["text"], chunk_size=500)
                  summary, similarity = summarize_and_relevancy(llm_dict=llm_dict, bio_information=data["demographics"], text=text_chunked)
                  paper_summaries.append({"summary": summary, "similarity": similarity, "link": paper["link"], "title": paper["title"], "authors": paper["authors"]})

            return paper_summaries




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
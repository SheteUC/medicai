from flask import Flask, request
from flask_restful import Api
from llm import init_all_chain, get_abstract, summarize_and_similarity
from scholar import Scholar

app = Flask(__name__)
api = Api(app)

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
            data = request.get_json()
            llm_dict = init_all_chain(verbose=False)
            papers = Scholar.get_all_papers(data["query"], demographics=data["demographics"])
            paper = papers[0]
            abstract = get_abstract(llm_chain=llm_dict["get_abstract"], section=paper["abstract"])
            summary, similarity = summarize_and_similarity(llm_dict=llm_dict, bio_information=data["demographics"], text=abstract)
            return {
                  "summary": summary,
                  "similarity": similarity
            }




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
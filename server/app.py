from flask import Flask, request
from llm import init_all_chain, summarize_and_relevancy, get_abstract_text_chunk
from scholar import Scholar

app = Flask(__name__)

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
      print(request.method)
      if request.method == "POST":
            print(request.get_json())
            data = request.get_json()
            llm_dict = init_all_chain(verbose=False)
            papers = Scholar.get_all_papers(data["query"], demographics=data["demographics"])
            paper = papers[0]
            text_chunked = get_abstract_text_chunk(text=paper["text"], chunk_size=500)
            summary, similarity = summarize_and_relevancy(llm_dict=llm_dict, bio_information=data["demographics"], text=text_chunked)
            print(summary)
            print(similarity)
            return {
                  "summary": summary,
                  "similarity": similarity
            }




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
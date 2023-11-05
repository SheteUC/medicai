import os
import re
from dotenv import load_dotenv
from langchain.llms.cohere import Cohere
from langchain.prompts import PromptTemplate
from langchain.text_splitter import TokenTextSplitter
from langchain.chains import LLMChain

from ibm_watson_machine_learning.foundation_models.extensions.langchain import WatsonxLLM
from ibm_watson_machine_learning.foundation_models.utils.enums import DecodingMethods
from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams
from ibm_watson_machine_learning.foundation_models import Model


from scholar import Scholar

load_dotenv()

COHERE_API_KEY = os.environ.get("COHERE_API_KEY")

def init_get_abstract_chain(llm, verbose=False):
    template = """
    You are a superintelligent AI trained for medical situations specifically.
    You task is to receive the 2000 tokens of a medical research PDF in plaintext 
    and summarize it the whole thing based on the abstract of the paper.
    Your summary should only be at most two sentences long.
    Here is the text:
    {section}
    Your summary is:
    """

    prompt = PromptTemplate(
        template=template,
        input_variables=["section"]
    )

    return LLMChain(prompt=prompt, llm=llm, verbose=verbose)

def init_relevancy_chain(llm, verbose=False):
    template = """
    You are a superintelligent AI trained for medical situations specifically.
    You task is to receive a summary of a medical research paper and a specific
    patient's demographics information, and determine whether the research paper
    is relevant to the patient's situation in percentage based solely on
    how the keywords in there match with the patients' demographic information.
    If you cannot determine the relevance, return ?%.
    Here is the patient's information:
    {bioinfo}
    The paper's summary:
    {summary}
    Remember, you should only return a number between 0%. and 100%., or ?%. if you cannot.
    The paper relevance to the patient's situation is:
    """

    prompt = PromptTemplate(
        template=template,
        input_variables=["bioinfo", "summary"]
    )

    return LLMChain(prompt=prompt, llm=llm, verbose=verbose)

def init_all_chain(verbose=False):
    params = {
        GenParams.MAX_NEW_TOKENS: 50,
        GenParams.MIN_NEW_TOKENS: 1,
        GenParams.DECODING_METHOD: DecodingMethods.SAMPLE,
        GenParams.TEMPERATURE: 0.5,
        GenParams.TOP_K: 50,
        GenParams.TOP_P: 1
    }

    model = Model(
        model_id="google/flan-ul2",
        credentials={
            "apikey": "bGSfVEYB5i38neXBnEX7SiOela5wA59C06jFmfAxemxt",
            "url": "https://us-south.ml.cloud.ibm.com"
        },
        params=params,
        project_id="ba796275-8f1d-49a9-8a1c-b8650fa2bf39"
    )

    llm_dict = {
        "get_abstract": Cohere(cohere_api_key=COHERE_API_KEY),
        "relevancy": Cohere(cohere_api_key=COHERE_API_KEY)
    }
    
    get_abstract_chain = init_get_abstract_chain(llm=llm_dict["get_abstract"], verbose=verbose)
    similarity_chain = init_relevancy_chain(llm=llm_dict["relevancy"], verbose=verbose)

    return {
        "get_abstract": get_abstract_chain,
        "relevancy": similarity_chain
    }

def get_abstract(llm_chain, section):
    if llm_chain:
        return llm_chain.run({
            "section": section
        })
    raise ValueError()

def get_relevancy(llm_chain, bio_information, summary):
    if llm_chain:
        return llm_chain.run({
            "bioinfo": bio_information,
            "summary": summary
        })
    raise ValueError()

def summarize_and_relevancy(llm_dict, bio_information, text):
    bio_information = ", ".join(bio_information)
    summary = get_abstract(llm_chain=llm_dict["get_abstract"], section=text)
    similarity = get_relevancy(llm_chain=llm_dict["relevancy"], bio_information=bio_information, summary=summary)
    return summary, similarity

def text_chunker(text, chunk_size=2000):
    text_splitter = TokenTextSplitter(
        # Set a really small chunk size, just to show.
        chunk_size=chunk_size,
        chunk_overlap=0,
    )
    return text_splitter.split_text(text)

def get_abstract_text_chunk(text, chunk_size=2000):
    abstract = re.search(r"abstract", text, re.IGNORECASE)
    text = text[abstract.start():]
    text_chunked = text_chunker(text=text, chunk_size=chunk_size)[0]
    return text_chunked


if __name__ == "__main__":
    demographics = ["african american", "teen", "depression"]
    chain_dict = init_all_chain(verbose=True)
    papers = Scholar.get_all_papers("Polycystic Ovary Syndrome", demographics=demographics)
    paper = papers[0]
    # get the fist 2000 tokens after the first occurence of "abstract"
    text_chunked = get_abstract_text_chunk(text=paper["text"], chunk_size=1000)
    abstract, relevancy = summarize_and_relevancy(llm_dict=chain_dict, bio_information=demographics, text=text_chunked)
    print(abstract)
    print(relevancy)
              
    
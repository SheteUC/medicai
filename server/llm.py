import os
import re
from dotenv import load_dotenv
from langchain.llms.cohere import Cohere
from langchain.prompts import PromptTemplate
from langchain.text_splitter import TokenTextSplitter
from langchain.chains import LLMChain
from scholar import Scholar

load_dotenv()

COHERE_API_KEY = os.environ.get("COHERE_API_KEY")

def init_get_abstract_chain(llm, verbose=False):
    template = """
    You are a superintelligent AI trained for medical situations specifically.
    You task is to receive the first 2000 tokens of a medical research paper 
    and summarize the abstract of the paper in a maximum of 3 sentences.
    Here is the query:
    {section}
    Remember, you can only use the first 2000 tokens of the paper.
    Your summary in a maximum of 3 sentences:
    """

    prompt = PromptTemplate(
        template=template,
        input_variables=["section"]
    )

    return LLMChain(prompt=prompt, llm=llm, verbose=verbose)

def init_summarize_chain(llm, verbose=False):
    template = """
    You are a superintelligent AI trained for medical situations specifically.
    You task is to receive a piece of medical research PDF in plaintext and summarize it.
    There is no limit on the length of the summary, but it should be concise and
    contain the main points of the research, especially any insights on potential
    pitfalls that a doctor should be aware of.
    Here is the text:
    {text}
    Your summary:
    """

    prompt = PromptTemplate(
        template=template,
        input_variables=["text"]
    )

    return LLMChain(prompt=prompt, llm=llm, verbose=verbose)

def init_similarity_chain(llm, verbose=False):
    template = """
    You are a superintelligent AI trained for medical situations specifically.
    You task is to receive a summary of a medical research paper and a specific
    patient's demographics information, and determine whether the research paper
    is relevant to the patient's situation in percentage. If you cannot determine
    the relevance, return ?%.
    Here is the patient's information:
    {bioinfo}
    The paper's summary:
    {summary}
    The paper relevance to the patient's situation is:
    """

    prompt = PromptTemplate(
        template=template,
        input_variables=["bioinfo", "summary"]
    )

    return LLMChain(prompt=prompt, llm=llm, verbose=verbose)

def init_all_chain(verbose=False):
    llm_dict = {
        "get_abstract": Cohere(cohere_api_key=COHERE_API_KEY),
        "summarize": Cohere(cohere_api_key=COHERE_API_KEY),
        "similarity": Cohere(cohere_api_key=COHERE_API_KEY)
    }
    
    get_abstract_chain = init_get_abstract_chain(llm=llm_dict["get_abstract"], verbose=verbose)
    summarize_chain = init_summarize_chain(llm=llm_dict["summarize"], verbose=verbose)
    similarity_chain = init_similarity_chain(llm=llm_dict["similarity"], verbose=verbose)

    return {
        "get_abstract": get_abstract_chain,
        "summarize": summarize_chain,
        "similarity": similarity_chain
    }

def get_abstract(llm_chain, section):
    if llm_chain:
        return llm_chain.run({
            "section": section
        })
    raise ValueError()

def summarize_text(llm_chain, text):
    if llm_chain:
        return llm_chain.run({
            "text": text
        })
    raise ValueError()

def get_similarity(llm_chain, bio_information, summary):
    if llm_chain:
        return llm_chain.run({
            "bioinfo": bio_information,
            "summary": summary
        })
    raise ValueError()

def summarize_and_similarity(llm_dict, bio_information, text):
    bio_information = ", ".join(bio_information)
    summary = summarize_text(llm_chain=llm_dict["summarize"], text=text)
    similarity = get_similarity(llm_chain=llm_dict["similarity"], bio_information=bio_information, summary=summary)
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
    abstract = get_abstract(llm_chain=chain_dict["get_abstract"], section=text_chunked)
    print(f"Abstract: {abstract}")
    # summarize, similarity = summarize_and_similarity(llm_dict=chain_dict, bio_information=demographics, text=text_chunked)
    # print(f"Summary: {summarize}")
    # print(f"Similarity: {similarity}")
              
    
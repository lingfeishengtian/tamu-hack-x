import os
import constants
from langchain.schema import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationSummaryMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.chains import LLMChain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import JSONLoader
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)

class Chatbot:
    def __init__(self):
        os.environ["OPENAI_API_KEY"] = constants.OPENAI_KEY

        self.llm = ChatOpenAI()

        self.prompt = ChatPromptTemplate(
            messages=[
                SystemMessagePromptTemplate.from_template(
                    "You are an assistant chatbot that is helping a human pick a restaurant to eat. When responding with a suggestion, return the id of the restaurant you just recommended"
                ),
                MessagesPlaceholder(variable_name="chat_history"),
                HumanMessagePromptTemplate.from_template("{question}"),
            ]
        )

        # load and split data for the retriever
        loader = JSONLoader("model_embeddings/restaurants.json", jq_schema=".", text_content=False)
        data = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
        all_splits = text_splitter.split_documents(data)

        self.vectorstore = Chroma.from_documents(documents=all_splits, embedding=OpenAIEmbeddings())

        self.memory = ConversationSummaryMemory(
            llm=self.llm, memory_key="chat_history", return_messages=True
        )

        # language chain to use retriever
        self.conversation = ConversationalRetrievalChain.from_llm(
            llm=self.llm, retriever=self.vectorstore.as_retriever(), memory=self.memory
        )

    def ask(self, question):
        response = self.conversation({"question": question + " -- Please return a link to the source you referenced"})
        return response
    
    def reload_vectorstore(self):
        loader = JSONLoader("model_embeddings/restaurants.json", jq_schema=".", text_content=False)
        data = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
        all_splits = text_splitter.split_documents(data)

        self.vectorstore = Chroma.from_documents(documents=all_splits, embedding=OpenAIEmbeddings())

    def get_memory(self):
        return self.memory.load_memory_variables({})


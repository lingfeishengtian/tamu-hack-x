import os

import constants as constants

from langchain.document_loaders import TextLoader
from langchain.document_loaders import JSONLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

os.environ["OPENAI_API_KEY"] = constants.OPENAI_KEY

query = """I am looking for a good restaurant, not too expensive and preferably with mexican food, 
what is something you would recommend. 
if not, give me something that you think will be good regardless.
Respond with your recommendation in plain text and give an opinion. 
In the sources, return a comma separated list of restaurant_id"""

loader = JSONLoader("test.json", jq_schema='.', text_content=False)
index = VectorstoreIndexCreator().from_loaders([loader])

result = index.query_with_sources(query, llm=ChatOpenAI())

print(f"\n\n{result}\n\n")

class QueryModel:
    def __init__(self):
        self.llm = ChatOpenAI()
        self.loader = JSONLoader("test.json", jq_schema='.', text_content=False)
        self.index = VectorstoreIndexCreator().from_loaders([loader]) 
        self.messages = []

    async def get_response(query):
        await self.index.query_with_sources(query, llm )

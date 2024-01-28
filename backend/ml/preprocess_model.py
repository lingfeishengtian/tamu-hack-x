import os

import constants as constants
import asyncio

from data_structures import Item

from langchain.document_loaders import TextLoader
from langchain.document_loaders import JSONLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

os.environ["OPENAI_API_KEY"] = constants.OPENAI_KEY

PROMPT_STRING = """You are an intelligent parser that specializes in analyzing HTML content and extracting structured data. 
Your task is to take the HTML input provided below, parse it, and extract key information based on the given format instructions.

HTML input: ```{html_content}```

{format_instructions}
"""

class PreprocessModel:
    def __init__(self):
        self.llm = ChatOpenAI()
        self.parser = PydanticOutputParser(pydantic_object=Item)
        self.prompt = ChatPromptTemplate.from_template(template=PROMPT_STRING)
        self.format_instructions = self.parser.get_format_instructions()
    
    async def parse_html(self, html):
        print("ur mom")
        messages = self.prompt.format_messages(html_content=html, format_instructions=self.format_instructions)
        output = await self.llm.ainvoke(messages)
        object = self.parser.parse(output.content)
        return object.model_dump(mode='json')
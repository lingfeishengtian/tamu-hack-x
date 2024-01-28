import os

import constants as constants

from data_structures import Restaurant

from langchain.document_loaders import TextLoader
from langchain.document_loaders import JSONLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

os.environ["OPENAI_API_KEY"] = constants.OPENAI_KEY

llm = ChatOpenAI()
pydantic_parser = PydanticOutputParser(pydantic_object=Restaurant)
format_instructions = pydantic_parser.get_format_instructions()

prompt_string = """You are an intelligent parser that specializes in analyzing HTML content and extracting structured data. 
Your task is to take the HTML input provided below, parse it, and extract key information based on the given format instructions.

HTML input: ```{html_content}```

{format_instructions}
"""

test_input = """<div><div><app-matrix-flight-card><div><div><div>DFW</div><div> 9:12  <span>PM</span></div></div><div><span></span></div><div><div>BPT</div><div> 10:39  <span>PM</span></div></div><div><div>1h 27m</div></div><div><div><app-stops-tooltip><span>Nonstop</span></app-stops-tooltip><span>Opens Nonstop details for DFW to BPT, departing at 9:12 PM</span></div></div><div><div><div><span></span></div><div><span> AA 3614 </span><span></span><span> E70-Embraer 170 </span><p><app-operated-by><div> Operated by Envoy Air as American Eagle
</div></app-operated-by></p></div></div></div><div><button><span>Details</span><span> for DFW to BPT, departing at 9:12 PM Nonstop</span></button><span></span><button><span>Seats</span><span> for DFW to BPT, departing at 9:12 PM Nonstop</span></button></div></div></app-matrix-flight-card><app-matrix-slice-alerts></app-matrix-slice-alerts></div><div><app-product-groups><div><div><button><div><span>Main</span><div><div>Round trip from</div><div></div></div><div><app-choose-flights-price-desktop><span>$484</span></app-choose-flights-price-desktop></div><div><span>, </span>Book at the airport </div></div><span>The lowest fare in the Main fare list starts at $484 Round trip, per person.</span><span> Click here for more fare options </span></button></div><div><button><div><span>Premium</span><div><div>Round trip from</div><div></div></div><div><app-choose-flights-price-desktop><span>$579</span></app-choose-flights-price-desktop></div><div><span>, </span>Book at the airport </div></div><span>The lowest fare in the Premium fare list starts at $579 Round trip, per person.</span><span> Click here for more fare options </span></button></div></div></app-product-groups></div><app-drawer></app-drawer></div>"""
prompt = ChatPromptTemplate.from_template(template=prompt_string)
messages = prompt.format_messages(html_content=test_input, format_instructions=format_instructions)

output = llm(messages)

print(output)
# object = pydantic_parser.parse(output.content)

# print(object.model_dump(mode='json'))
from flask import Flask, request, jsonify
import threading
import asyncio
import os
import constants
import json

from query_model import QueryModel
from preprocess_model import PreprocessModel

from langchain.document_loaders import JSONLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI

app = Flask(__name__)
os.environ["OPENAI_API_KEY"] = constants.OPENAI_KEY

# Initialize model
query_model = QueryModel()
preprocess_model = PreprocessModel()

@app.route('/api/send-html', methods=['POST'])
async def send_html():
    print("got request")
    data = request.json
    html_queries = data.get('data').get('html')

    html_queries = html_queries[:7]
    
    tasks = [preprocess_model.parse_html(query) for query in html_queries]
    responses = await asyncio.gather(*tasks)

    file_path = 'model_embeddings/restaurants.json'

    # # Step 1: Read the existing data from the file
    # try:
    #     with open(file_path, 'r') as file:
    #         data = json.load(file)
    # except FileNotFoundError:
    #     # If the file doesn't exist, create an empty list
    #     data = []

    # # Step 2: Append your new data
    # data.extend(responses)

    # Step 3: Write the modified data back to the file
    with open(file_path, 'w') as file:
        json.dump(responses, file, indent=4)
    
    return jsonify({"message": "HTML processed"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)


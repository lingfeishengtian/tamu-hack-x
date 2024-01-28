from flask import Flask, request, jsonify
import threading
import asyncio
import os
import constants
import json

from new_query_model import Chatbot
from preprocess_model import PreprocessModel

from langchain.document_loaders import JSONLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI

app = Flask(__name__)
os.environ["OPENAI_API_KEY"] = constants.OPENAI_KEY

# Initialize model
query_model = Chatbot()
preprocess_model = PreprocessModel()

@app.route('/api/send-html', methods=['POST'])
async def send_html():
    data = request.json
    html_queries = data.get('data').get('html')

    html_queries = html_queries[:2]

    print(html_queries)
    
    tasks = [preprocess_model.parse_html(query) for query in html_queries]
    responses = await asyncio.gather(*tasks)

    file_path = 'model_embeddings/restaurants.json'

    # Read existing data from the file
    try:
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        existing_data = []

    # Append new data to the existing data
    existing_data.extend(responses)

    # Write the updated data back to the file
    with open(file_path, 'w') as file:
        json.dump(existing_data, file, indent=4)
    
    return jsonify({"message": "HTML processed"})


@app.route('/api/send-query', methods=['POST'])
async def send_query():
    data = request.json
    query = data.get('data').get('query')
    
    response = query_model.ask(query)
    print(response['answer'])

    return jsonify({"message": response['answer']})

@app.route('/api/get-category', methods=['POST'])
async def send_category():
    data = request.json
    query = data.get('data').get('category')

    file_path = 'model_embeddings/restaurants.json'

    ret = []
    try:
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
            for obj in existing_data:
                if "type" in obj and obj["type"] == query:
                    ret.append(obj)
    except FileNotFoundError:
        ret = []

    return jsonify({"ret": (ret)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)


from new_query_model import Chatbot

bot = Chatbot()

response = bot.ask("I am looking for a restaurant that serves new american, what suggestions do you have")
print(response)
response = bot.ask("I don't like that option, can you give me something else")
print(response)
response = bot.ask("what was the previous option you just suggested?")
print(response)
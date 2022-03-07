import urllib.parse
import json
from pymongo import MongoClient

#--Edit your configuration here ------------------------------
username = urllib.parse.quote_plus('gun')
password = urllib.parse.quote_plus('0851100225')
auth_db = urllib.parse.quote_plus('admin')
server = urllib.parse.quote_plus('mars.mikelab.net')
port = urllib.parse.quote_plus('27017')
#-------------------------------------------------------------
clickstream_client = MongoClient(f'mongodb://{username}:{password}@{server}:{port}/?authSource={auth_db}')
# clickstream_collection = clickstream_client['newsfeed2']
tourist_collection = clickstream_client['tourist_map']

# list_a = [30038542, 31555431]
# for thread in list_a:
#     cursor = clickstream_collection[f'thread-20201031-11'].find({ 'thread_id': thread })
#     for record in cursor:
#         print(record['trend_score'])

# x = {}
# tourist_collection['thread_data'].insert_one(x)

thread_table = tourist_collection["thread_data"]
with open('database.json') as json_file:
    contents = json.load(json_file)
    for record in contents:
        thread_table.insert_one(record)
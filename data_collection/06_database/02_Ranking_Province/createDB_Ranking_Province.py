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
tourist_collection = clickstream_client['tourist_map']

thread_table = tourist_collection["Ranking_Province"]
with open('Ranking_Province.json') as json_file:
    contents = json.load(json_file)
    for record in contents:
        thread_table.insert_one(record)
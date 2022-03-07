import requests
import json
from bs4 import BeautifulSoup

# theme = ['forest', 'mountain', 'sea', 'waterfall']

# lines = open("kratoo_tags_forest.txt", "r").read().splitlines()

list_database = []
# for kratoo in lines:
#      url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
#      content_json = json.loads(url.text)

kratoo_id = '39442594'
url = requests.get('https://ptdev03.mikelab.net/kratooc/' + str(kratoo_id))
content_json = json.loads(url.text)

kratoo_id = content_json['_id']
title = content_json['_source']['title']
link = content_json['_source']['permalink']
tags = content_json['_source']['tags']

database = {}
database['_id'] = kratoo_id
database['title'] = title
database['permalink'] = link
database['tags'] = tags
# database['images'] = []

# uid = content_json["_source"]["uid"]
# comments = content_json["_source"]["comments"]

# # photo from desc_full
# desc_full = content_json["_source"]["desc_full"]
# soup = BeautifulSoup(desc_full, "html.parser")
# data_descfull = soup.find_all("img", {"class": "img-in-post"})

# img_src = []

# for img in data_descfull:
#      img_path = {}
#      if (img["src"]):
#           img_path['path'] = img["src"]
#           database['images'].append(img_path) 
#           img_src.append(img["src"])

# # photo from comment(only kratoo's user)
# for comment in comments:
#      if comment["uid"] == uid:
#           desc_comment = comment["desc"]
#           soup = BeautifulSoup(desc_comment, "html.parser")
#           data_desc_comment = soup.find_all("img", {"class": "img-in-post"})
#           for img in data_desc_comment:
#                img_path = {}  
#                if (img["src"]):
#                     img_path['path'] = img["src"]
#                     database['images'].append(img_path) 
#                     img_src.append(img["src"])                                                         
list_database.append(database)

with open('data_test.json', 'w', encoding='utf-8') as outfile:
    json.dump(list_database, outfile)


import requests
import json
import urllib
from urllib.error import HTTPError
from urllib.request import urlretrieve
from random import randint
from time import sleep

# select from key
# count1 = 0
f = open("SKE.txt", "a")         
for j in range(1,1001):
    url = requests.get("https://ptdev03.mikelab.net/search/ร้านอาหาร&room=บลูแพลนเน็ต&page=" + str(j))
    content_json = json.loads(url.text) 
    kratoo = content_json["pts_searchResult"]["hits"]["hits"]
    # count1 += 1
    # if count1%100==0:
    #     print("#")
    for i in range (10):
        kratoo_selected = kratoo[i]["_id"]
        f.write(kratoo_selected + '\n')
f.close()

print("key finished")

# select from tags
# kratoo_notuse = []
# lines = open("kratoo_key_thai_review.txt", "r").read().splitlines()
# for kratoo in lines:
#     url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
#     content_json = json.loads(url.text)
#     try:
#         tags = content_json["_source"]["tags"]
#         if (tags.index("เที่ยวไทย") == True):
#             f = open("kratoo_tags_thai_review.txt", "a") 
#             f.write(kratoo + '\n')
#     except (KeyError, ValueError) as error:
#         kratoo_notuse.append(kratoo)

# print("tag finished")
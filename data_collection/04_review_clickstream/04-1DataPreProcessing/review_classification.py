import requests
import json
import urllib
from urllib.error import HTTPError
from urllib.request import urlretrieve
from random import randint
from time import sleep

# select from key
# count1 = 0
# f = open("review_key_thai.txt", "a")         
# for j in range(1,1000):
#     url = requests.get("https://ptdev03.mikelab.net/search/เที่ยวไทย&room=บลูแพลนเน็ต&page=" + str(j))
#     content_json = json.loads(url.text) 
#     kratoo = content_json["pts_searchResult"]["hits"]["hits"]
#     # count1 += 1
#     # if count1%100==0:
#     #     print("#")
#     for i in range (10):
#         kratoo_selected = kratoo[i]["_id"]
#         f.write(kratoo_selected + '\n')
# f.close()

# print("key finished")

# select from tags
kratoo_notuse = []
lines = open("nodup_clickstream_topicID.txt", "r").read().splitlines()
count = 0
for kratoo in lines:
    url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
    content_json = json.loads(url.text)
    try:
        # tags = content_json["_source"]["tags"]
        kratoo_type = content_json["_source"]["type"]
        # if ((tags.index("เที่ยวไทย") == True or tags.index("สถานที่ท่องเที่ยวในประเทศ") == True or tags.index("ไทย") == True or tags.index("เที่ยววัด") == True) and kratoo_type == 4):
        if(kratoo_type == 4):
            f = open("review_tags_thai.txt", "a") 
            f.write(kratoo + '\n')
            count += 1
            print(count)
    except (KeyError, ValueError) as error:
        kratoo_notuse.append(kratoo)

print("tag finished")
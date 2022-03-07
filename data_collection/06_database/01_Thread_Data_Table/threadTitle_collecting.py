import requests
import json
import urllib
from bs4 import BeautifulSoup
from urllib.error import HTTPError
from urllib.request import urlretrieve
from random import randint
from time import sleep

# def CreateDatabase(kratoo_id):

#     url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
#     content_json = json.loads(url.text)
#     uid = content_json["_source"]["uid"]
#     comment_count = content_json["_source"]["comment_count"]
#     comments = content_json["_source"]["comments"]
#     threadId = content_json['_id']
#     title = content_json['_source']['title']
#     point = content_json["_source"]["point"]
#     emotion = content_json["_source"]["emotion"]["sum"]

#     data_dict = {}
#     data_dict["threadId"] = threadId
#     data_dict["title"] = title
#     data_dict["point"] = point
#     data_dict["emotion"] = emotion

#     return data_dict

process = 1
data_list = []
kratoo_notuse = []
lines = open("threadID_list.txt", "r").read().splitlines()

for kratoo in lines:
    url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
    content_json = json.loads(url.text)

    try:
        threadId = content_json["_id"]
        title = content_json["_source"]["title"]
        point = content_json["_source"]["point"]
        emotion = content_json["_source"]["emotion"]["sum"]

        data_dict = {}
        data_dict["threadId"] = threadId
        data_dict["title"] = title
        data_dict["point"] = point
        data_dict["emotion"] = emotion

        data_list.append(data_dict)

    except (KeyError, ValueError) as error:
        kratoo_notuse.append(kratoo)
    
    print("process : " + str(process) + "  |  tid : " + str(kratoo))
    process += 1


with open('threadTitle_data.json', 'w') as fp:
    fp.write('[' +',\n'.join(json.dumps(i) for i in data_list) +']\n')
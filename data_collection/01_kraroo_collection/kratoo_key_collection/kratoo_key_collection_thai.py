import requests
import json
import urllib
from urllib.error import HTTPError
from urllib.request import urlretrieve
from random import randint
from time import sleep

process = 1
lines = open("kratoo_key_thai.txt", "r").read().splitlines()
for kratoo in lines:
    url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
    content_json = json.loads(url.text)
    if content_json["found"] == True:
        uid = content_json["_source"]["uid"]
        comment_count = content_json["_source"]["comment_count"]
        comments = content_json["_source"]["comments"]
        desc = content_json["_source"]["desc"]
        
        # text from desc
        data_text = []
        data_text.append(desc)

        # text from comment(only kratoo's user)
        comment_no = 0
        for comment in comments:
            if comment["uid"] == uid:
                # comment_no += 1
                desc_comment = comment["desc"]
                data_text.append(str(desc_comment))

        f = open("kratoo_key_dataset_thai.txt", "a")
        f.write("<h1>"+str(kratoo)+"</h1>"+"\n")
        f.write(str(data_text))
        f.write("\n----------------------------------------------------------------------------------------------------------------\n")

    print("process : " + str(process))
    process += 1
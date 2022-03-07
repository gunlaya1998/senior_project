import requests
import json
import urllib
from urllib.error import HTTPError
from urllib.request import urlretrieve
from random import randint
from time import sleep

process = 1
lines = open("kratoo_tags_thai.txt", "r").read().splitlines()
for kratoo in lines:
    url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
    content_json = json.loads(url.text)
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

    f = open("kratoo_tags_dataset_thai.txt", "a")
    f.write("<h1>"+str(kratoo)+"</h1>"+"\n")
    f.write(str(data_text))
    f.write("\n----------------------------------------------------------------------------------------------------------------\n")

    print("process : " + str(process))
    process += 1


    # if image_count >= 10 and image_count <= 30:
    #     image_no += 1
    #     f = open("kratooURL_dataset_forest.html", "a")
    #     f.write("<h1>"+str(kratoo)+"</h1>"+"\n")
    #     for i in range (len(img_src_tag)):
    #         f.write("<h1>"+str(image_no)+"</h1>"+"\n")
    #         f.write(str(img_src_tag[i]) + '\n')
    #         image_no += 1
            
        # g = open("kratoo_dataset_forest.txt", "a") 
        # g.write(kratoo + '\n')
        # g.write('\n'.join(img_src) + '\n')

        # for i in range(len(lines)):
        #     try:
        #         urlretrieve(str(img_src[i]), "moutain"+str(j)+".jpg")
        #         sleep(randint(5,20))
        #     except FileNotFoundError as err:
        #         print(str(j)+"err")   
        #     except HTTPError as err:
        #         print(str(j)+"err")  
        #     print(str(kratoo) + ": no." + str(j) + " : " + img_src[i])
        #     j += 1

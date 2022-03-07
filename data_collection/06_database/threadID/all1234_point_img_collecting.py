import requests
import json
import urllib
from bs4 import BeautifulSoup
from urllib.error import HTTPError
from urllib.request import urlretrieve
from random import randint
from time import sleep

def CreateDatabase(kratoo_id, path):

    url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
    content_json = json.loads(url.text)
    uid = content_json["_source"]["uid"]
    comment_count = content_json["_source"]["comment_count"]
    comments = content_json["_source"]["comments"]
    threadId = content_json['_id']
    title = content_json['_source']['title']
    point = content_json["_source"]["point"]
    emotion = content_json["_source"]["emotion"]["sum"]

    data_dict = {}
    data_dict["threadId"] = threadId
    data_dict["title"] = title
    data_dict["point"] = point
    data_dict["emotion"] = emotion
    data_dict['images'] = path 

    return data_dict

process = 1
data_list = []
kratoo_notuse = []
lines = open("/data2/gun/1234_threadID_list.txt", "r").read().splitlines()

for kratoo in lines:
    url = requests.get("https://ptdev03.mikelab.net/kratooc/" + str(kratoo))
    content_json = json.loads(url.text)

    try:
        uid = content_json["_source"]["uid"]
        comment_count = content_json["_source"]["comment_count"]
        comments = content_json["_source"]["comments"]
        threadId = content_json["_id"]
        title = content_json["_source"]["title"]
        point = content_json["_source"]["point"]
        emotion = content_json["_source"]["emotion"]["sum"]
        desc = content_json["_source"]["desc"]

        photo_no = 0
        list_image_path = []
        img_src_tag = []
        img_src = []

        # photo from desc_full
        try:
            desc_full = content_json["_source"]["desc_full"]
            soup = BeautifulSoup(desc_full, "html.parser")
            # data_descfull = soup.find_all("img", {"class": "img-in-post"})
            data_descfull = soup.find_all("img", {"classimg-in-post"})
            image_count = 0
            for img in data_descfull:
                if (img["src"]):
                        img_src.append(img["src"])
                        img_src_tag.append(img)
                        image_count += 1

            # photo from comment(only kratoo's user)
            for comment in comments:
                if comment["uid"] == uid:
                        desc_comment = comment["desc"]
                        soup = BeautifulSoup(desc_comment, "html.parser")
                        data_desc_comment = soup.find_all("img", {"classimg-in-post"})
                        # data_desc_comment = soup.find_all("img", {"class": "img-in-post"})
                        for img in data_desc_comment:
                            if (img["src"]):
                                img_src.append(img["src"])
                                img_src_tag.append(img)
                                image_count += 1
            
            if image_count > 0:
                for i in range(len(img_src)):
                    try:
                        img_path = {}
                        image_filename = str(threadId) + "_" + str(photo_no) + ".jpg"
                        image_filepath = "/data2/gun/image_collection_1234/" + image_filename
                        img_path['path'] = image_filename
                        list_image_path.append(img_path)
                        urlretrieve(str(img_src[i]), image_filepath)
                        photo_no += 1
                        sleep(randint(5,10))
                    except FileNotFoundError as err:
                        print(str(photo_no)+"err")   
                    except HTTPError as err:
                        print(str(photo_no)+"err")  
                    # print(str(kratoo) + ": no." + str(i) + " : " + img_src[i])

                dict_information = CreateDatabase(kratoo, list_image_path)
                data_list.append(dict_information)

        except (KeyError, ValueError) as error:
            kratoo_notuse.append(kratoo)

    except (KeyError, ValueError) as error:
        kratoo_notuse.append(kratoo)
    # data_dict = {}
    # data_dict["threadId"] = threadId
    # data_dict["threadTitle"] = title
    # data_dict["point"] = point
    # data_dict["emotion"] = emotion
    # data_dict['images'] = path 

    # data_list.append(data_dict)
    
    print("process : " + str(process) + "  |  tid : " + str(kratoo))
    process += 1


with open('/data2/gun/all1234_point.json', 'w') as fp:
    fp.write('[' +',\n'.join(json.dumps(i) for i in data_list) +']\n')
import urllib.parse
import json
from pymongo import MongoClient
from datetime import datetime
from collections import defaultdict

# #--Edit your configuration here ------------------------------
# username = urllib.parse.quote_plus('pantip_data')
# password = urllib.parse.quote_plus('F`2j57h6')
# auth_db = urllib.parse.quote_plus('admin')
# server = urllib.parse.quote_plus('mars.mikelab.net')
# port = urllib.parse.quote_plus('27017')
#--Edit your configuration here ------------------------------
username = urllib.parse.quote_plus('gun')
password = urllib.parse.quote_plus('0851100225')
auth_db = urllib.parse.quote_plus('admin')
server = urllib.parse.quote_plus('mars.mikelab.net')
port = urllib.parse.quote_plus('27017')
#-------------------------------------------------------------
clickstream_client = MongoClient(f'mongodb://{username}:{password}@{server}:{port}/?authSource={auth_db}')

#-------------------------------------------------------------
# client = MongoClient(f"mongodb://{username}:{password}@{server}:{port}/?authSource={auth_db}")
db = clickstream_client['pantip_clickstream']

clickstream_list = []
# clickstream_dict = defaultdict(int)
clickstream_dict = {}
process = 0
lines = open("/data2/gun/1234_threadID_list.txt", "r").read().splitlines()

for month in range(1, 12):
    for day in range (1,32):
        for thread in lines:
            thread = int(thread)
            try :
                cursor = db[f'click-2020{month:02}{day:02}'].find({})
                for record in cursor:
                    if(thread == record["topic_id"]):
                        if(thread not in clickstream_dict):
                            clickstream_dict[thread] = 1
                        else:
                            clickstream_dict[thread] += 1
                        # clickstream_dict[thread] = clickstream_dict.setdefault(thread, 0) + 1
                # print(clickstream_dict)

            except KeyboardInterrupt:
                raise

            except :
                pass

        process += 1
        print(f'Process: {process} | Date: {day:02}/{month:02}')
    print(clickstream_dict)

clickstream_list.append(clickstream_dict)

with open('/data2/gun/1234_clickstreamData.json', 'w') as fp:
    fp.write('[' +',\n'.join(json.dumps(i) for i in clickstream_list) +']\n')
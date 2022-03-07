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
trendscore_collection = clickstream_client['blueplanet_trend_score']

line = open("threadID_list.txt", "r").read().splitlines()

score_dict = {}
kratoo_error = []
for tid in line:
    tid = int(tid)
    try:
        cursor = trendscore_collection[f'blueplanet_trend_score'].find({'thread_id': tid })
        for record in cursor:
            score_dict[tid] = record['trend_score']
            print(record['trend_score'])

    except KeyboardInterrupt:
                raise

    except:
        kratoo_error.append(tid)
        print(f'error : {tid}')

with open('trendscore_data.json', 'w') as fp:
    json.dump(score_dict, fp)

# x = {}
# tourist_collection['thread_data'].insert_one(x)


# thread_table = tourist_collection["Thread_Data"]
# with open('database.json') as json_file:
#     contents = json.load(json_file)
#     for record in contents:
#         thread_table.insert(record, check_keys=False)
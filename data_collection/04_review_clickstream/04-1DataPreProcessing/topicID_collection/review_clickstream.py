import urllib.parse
import json
from pymongo import MongoClient
from datetime import datetime

#--Edit your configuration here ------------------------------
username = urllib.parse.quote_plus('pantip_data')
password = urllib.parse.quote_plus('F`2j57h6')
auth_db = urllib.parse.quote_plus('admin')
server = urllib.parse.quote_plus('mars.mikelab.net')
port = urllib.parse.quote_plus('27017')
#-------------------------------------------------------------
client = MongoClient(f"mongodb://{username}:{password}@{server}:{port}/?authSource={auth_db}")
db = client['pantip_clickstream']

# f = open('review_all.txt','a')

for month in range (5,8):
    review_id = []
    f = open(f'review_{month:02}.txt','w')

    for day in range (1,32):
        cursor = db[f'click-2020{month:02}{day:02}'].find({"rooms" : "BP"})
        print(f'click-2020{month:02}{day:02}')
        for record in cursor:
            try :
                for i in record["tags"]:
                    if(i=="เที่ยวไทย" or i=="สถานที่ท่องเที่ยวในประเทศ" or i=="สถานที่ท่องเที่ยวกรุงเทพฯ" or i=="ประเทศไทย"
                        or i=="จังหวัดเชียงราย" or i=="จังหวัดเชียงใหม่" or i=="จังหวัดน่าน" or i=="จังหวัดพะเยา"
                        or i=="จังหวัดแพร่" or i=="จังหวัดแม่ฮ่องสอน" or i=="จังหวัดลำปาง" or i=="จังหวัดลำพูน" 
                        or i=="จังหวัดอุตรดิตถ์" or i=="จังหวัดกาฬสินธุ์" or i=="จังหวัดขอนแก่น" or i=="จังหวัดชัยภูมิ" 
                        or i=="จังหวัดนครพนม" or i=="จังหวัดนครราชสีมา" or i=="จังหวัดบึงกาฬ" or i=="จังหวัดบุรีรัมย์" 
                        or i=="จังหวัดมหาสารคาม" or i=="จังหวัดมุกดาหาร" or i=="จังหวัดยโสธร" or i=="จังหวัดร้อยเอ็ด" 
                        or i=="จังหวัดเลย" or i=="จังหวัดสกลนคร" or i=="จังหวัดสุรินทร์" or i=="จังหวัดศรีสะเกษ" 
                        or i=="จังหวัดหนองคาย" or i=="จังหวัดหนองบัวลำภู" or i=="จังหวัดอุดรธานี" or i=="จังหวัดอุบลราชธานี" 
                        or i=="จังหวัดอำนาจเจริญ" or i=="จังหวัดกำแพงเพชร" or i=="จังหวัดชัยนาท" or i=="จังหวัดนครนายก" 
                        or i=="จังหวัดนครปฐม" or i=="จังหวัดนครสวรรค์" or i=="จังหวัดนนทบุรี" or i=="จังหวัดปทุมธานี" 
                        or i=="จังหวัดพระนครศรีอยุธยา" or i=="จังหวัดพิจิตร" or i=="จังหวัดพิษณุโลก" or i=="จังหวัดเพชรบูรณ์" 
                        or i=="จังหวัดลพบุรี" or i=="จังหวัดสมุทรปราการ" or i=="จังหวัดสมุทรสงคราม" or i=="จังหวัดสมุทรสาคร" 
                        or i=="จังหวัดสิงห์บุรี" or i=="จังหวัดสุโขทัย" or i=="จังหวัดสุพรรณบุรี" or i=="จังหวัดสระบุรี" 
                        or i=="จังหวัดอ่างทอง" or i=="จังหวัดอุทัยธานี" or i=="จังหวัดจันทบุรี" or i=="จังหวัดฉะเชิงเทรา" 
                        or i=="จังหวัดชลบุรี" or i=="จังหวัดตราด" or i=="จังหวัดปราจีนบุรี" or i=="จังหวัดระยอง" 
                        or i=="จังหวัดสระแก้ว" or i=="จังหวัดกาญจนบุรี" or i=="จังหวัดตาก" or i=="จังหวัดประจวบคีรีขันธ์" 
                        or i=="จังหวัดเพชรบุรี" or i=="จังหวัดราชบุรี" or i=="จังหวัดกระบี่" or i=="จังหวัดชุมพร" 
                        or i=="จังหวัดตรัง" or i=="จังหวัดนครศรีธรรมราช" or i=="จังหวัดนราธิวาส" or i=="จังหวัดปัตตานี" 
                        or i=="จังหวัดพังงา" or i=="จังหวัดพัทลุง" or i=="จังหวัดภูเก็ต" or i=="จังหวัดระนอง" 
                        or i=="จังหวัดสตูล" or i=="จังหวัดสงขลา" or i=="จังหวัดสุราษฎร์ธานี" or i=="จังหวัดยะลา"):
                        
                        if(record['topic_id'] not in review_id):
                            review_id.append(record['topic_id'])

            except KeyboardInterrupt:
                raise
            except :
                pass

    f.write(str(review_id))
    f.write('\n')

    f.close()
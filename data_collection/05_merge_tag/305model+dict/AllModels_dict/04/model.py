file_no="04"
file_name="300_clean_dataset" # ชื่อไฟล์คลังข้อมูล
dict_path="/Users/j.kanlaya/Downloads/Mike/data_collection/05_merge_tag/305model+dict/data/dictionary/"
data_path="/Users/j.kanlaya/Downloads/Mike/data_collection/05_merge_tag/305model+dict/data/"

import codecs
from pythainlp.tokenize import word_tokenize
from pythainlp.tag import pos_tag
from nltk.tokenize import RegexpTokenizer
from sklearn_crfsuite import scorers,metrics
from sklearn.metrics import make_scorer
from sklearn.model_selection import cross_validate,train_test_split, cross_val_predict
import sklearn_crfsuite
import pandas as pd
import numpy as np
import csv
import pickle
import glob
import nltk
import re

dictionary = open(dict_path+'dictionary.txt', 'r', encoding="utf-8").read().splitlines()
thai_loc = open(dict_path+'Thailoc_clean.txt', 'r', encoding="tis-620").read().splitlines()
loc_place = open(dict_path+'tourplace_n.txt', 'r', encoding="tis-620").read().splitlines()
river = open(dict_path+'ชื่อคลอง.txt', 'r', encoding="tis-620").read().splitlines()
# road = open(dict_path+'ถนน_เพิ่มเติม.txt', 'r', encoding="tis-620").read().splitlines()
# sub_dis01 = open(dict_path+'ชื่อกิ่งอำเภอ.txt', 'r', encoding="tis-620").read().splitlines()
# sub_dis02 = open(dict_path+'ชื่อตำบล.txt', 'r', encoding="tis-620").read().splitlines()
# district = open(dict_path+'ชื่ออำเภอ.txt', 'r', encoding="tis-620").read().splitlines()
# province = open(dict_path+'ชื่อจังหวัด.txt', 'r', encoding="tis-620").read().splitlines()

#จัดการประโยคซ้ำ
data_not=[]
def Unique(p):
 text=re.sub("<[^>]*>","",p)
 text=re.sub("\[(.*?)\]","",text)
 text=re.sub("\[\/(.*?)\]","",text)
 if text not in data_not:
  data_not.append(text)
  return True
 else:
  return False
# เตรียมตัวตัด tag ด้วย re
pattern = r'\[(.*?)\](.*?)\[\/(.*?)\]'
tokenizer = RegexpTokenizer(pattern) # ใช้ nltk.tokenize.RegexpTokenizer เพื่อตัด [TIME]8.00[/TIME] ให้เป็น ('TIME','ไง','TIME')

# จัดการกับ tag ที่ไม่ได้ tag
def toolner_to_tag(text):
 text=text.strip()
 text=re.sub("<[^>]*>","",text)
 text=re.sub("(\[\/(.*?)\])","\\1***",text)#.replace('(\[(.*?)\])','***\\1')#  ตัดการกับพวกไม่มี tag word
 text=re.sub("(\[\w+\])","***\\1",text)
 text2=[]
 for i in text.split('***'):
  if "[" in i:
   text2.append(i)
  else:
   text2.append("[word]"+i+"[/word]")
 text="".join(text2)#re.sub("[word][/word]","","".join(text2))
 return text.replace("[word][/word]","")
# แปลง text ให้เป็น conll2002
def text2conll2002(text,pos=True):
    """
    ใช้แปลงข้อความให้กลายเป็น conll2002
    """
    text=toolner_to_tag(text) # นำไปใส่ tag [word]
    text=text.replace("''",'"')
    text=text.replace("’",'"').replace("‘",'"')#.replace('"',"")
    tag=tokenizer.tokenize(text) # แยก tag ออกมาจากข้อความ
    j=0
    conll2002="" # ประกาศตัวแปรเก็บ conll2002
    for tagopen,text,tagclose in tag: # ลูปใน tag โดยเป็น (tagopen,text,tagclose)
        word_cut=word_tokenize(text,engine="newmm") # ใช้ตัวตัดคำ newmm ของ PyThaiNLP
        i=0
        txt5=""
        while i<len(word_cut): #ลูปตามจำนวน token ที่ตัดในtag
            if word_cut[i]=="''" or word_cut[i]=='"':pass
            elif i==0 and tagopen!='word': # ไม่เป็น tag [word] และเป็น i หรือตัวเริ่มต้น tag
                txt5+=word_cut[i]
                txt5+='\t'+'B-'+tagopen
            elif tagopen!='word':
                txt5+=word_cut[i]
                txt5+='\t'+'I-'+tagopen
            else: # เป็น [word]
                txt5+=word_cut[i]
                txt5+='\t'+'O'
            txt5+='\n'
            #j+=1
            i+=1
        conll2002+=txt5
    if pos==False:
        return conll2002
    return postag(conll2002) # เพิ่ม postag ใส่
# ใช้สำหรับกำกับ pos tag เพื่อใช้กับ NER
# print(text2conll2002(t,pos=False))
def postag(text):
    listtxt=[i for i in text.split('\n') if i!='']
    list_word=[]
    for data in listtxt:
        list_word.append(data.split('\t')[0])
    #print(text)
    list_word=pos_tag(list_word,engine="perceptron")
    text=""
    i=0
    for data in listtxt:
        text+=data.split('\t')[0]+'\t'+list_word[i][1]+'\t'+data.split('\t')[1]+'\n'
        i+=1
    return text
# อ่านข้อมูลจากไฟล์
def get_data(fileopen):
	"""
    สำหรับใช้อ่านทั้งหมดทั้งในไฟล์ทีละรรทัดออกมาเป็น list
    """
	with codecs.open(fileopen, 'r',encoding='utf-8-sig') as f:
		lines = f.read().splitlines()
	return [a for a in lines if Unique(a)] # เอาไม่ซ้ำกัน

def alldata(lists):
    text=""
    for data in lists:
        text+=text2conll2002(data)
        text+='\n'
    return text

def alldata_list(lists):
    data_all=[]
    for data in lists:
        data_num=[]
        try:
            txt=text2conll2002(data,pos=True).split('\n') # นำไปแปลงเป็น conll2002
            for d in txt:
                tt=d.split('\t')
                if d!="":
                    if len(tt)==3:
                        data_num.append((tt[0],tt[1],tt[2]))
                    else:
                        data_num.append((tt[0],tt[1]))
            #print(data_num)
            data_all.append(data_num)
        except:
            print(data)
    #print(data_all)
    return data_all

def alldata_list_str(lists):
	string=""
	for data in lists:
		string1=""
		for j in data:
			string1+=j[0]+"	"+j[1]+"	"+j[2]+"\n"
		string1+="\n"
		string+=string1
	return string

def get_data_tag(listd):
	list_all=[]
	c=[]
	for i in listd:
		if i !='':
			c.append((i.split("\t")[0],i.split("\t")[1],i.split("\t")[2]))
		else:
			list_all.append(c)
			c=[]
	return list_all
def getall(lista):
    ll=[]
    for i in lista:
        o=True
        for j in ll:
            if re.sub("\[(.*?)\]","",i)==re.sub("\[(.*?)\]","",j):
                o=False
                break
        if o==True:
            ll.append(i)
    return ll

print("importing data & data processing ...")

data1=getall(get_data(data_path+file_name+".txt")) # นำคลังเข้าไป แยกออกเป็น list ละบรรทัด
datatofile=alldata_list(data1) # นำไปผ่านขั้นตอน 1 2 3 4

file = open(data_path+"threadID_list.txt", "r")
file = file.readlines()

threadID_list = []
for i in file:
    tmp = i.split("'")
    tmp = tmp[0].split("\n")
    threadID_list.append(int(tmp[0]))

data_label = []
for sentence_no in range(len(datatofile)):
    index = 0
    for item in datatofile[sentence_no]:
        item = list(item)
        item.insert(0, threadID_list[sentence_no])
        item.insert(1, sentence_no+1)
        item.insert(2, index)
        item = tuple(item)
        data_label.append(item)
        index += 1

i=0
loc = []
while(i < len(data_label)):
    if(data_label[i][5] == "B-LOCATION"):
        item = []
        item.append(data_label[i][0]) #append thread id
        item.append(data_label[i][1]) #append sentence no.
        item.append(data_label[i][2]) #append index
        word = data_label[i][3]
        while(data_label[i+1][5] == "I-LOCATION"):
            i += 1
            word += data_label[i][3]
        item.append(word)
        item.append("LOCATION")
        item = tuple(item)
    loc.append(item)
    i += 1

loc_list = list(dict.fromkeys(loc))
loc_list = loc_list[1:]

loc_df = pd.DataFrame(loc_list, columns=["Thread_id", "Thread_index", "Index", "Word", "Label"])

tt=[]
with open(file_name+"-pos.conll","w") as f:
    i=0
    while i<len(datatofile):
        for j in datatofile[i]:
            f.write(j[0]+"\t"+j[1]+"\t"+j[2]+"\n")
        if i+1<len(datatofile):
            f.write("\n")
        i+=1

with open(file_name+".conll","w") as f:
    i=0
    while i<len(datatofile):
        for j in datatofile[i]:
            f.write(j[0]+"\t"+j[2]+"\n")
        if i+1<len(datatofile):
            f.write("\n")
        i+=1

def doc2features(doc, i):
    word = doc[i][0]
    postag = doc[i][1]
    dic_check = True if word in dictionary else False
    thloc_check = True if word in thai_loc else False
    loc_check = True if word in loc_place else False
    river_check = True if word in river else False
#     road_check = True if word in road else False
#     subDis01_check = True if word in sub_dis01 else False
#     subDis02_check = True if word in sub_dis02 else False
#     district_check = True if word in district else False
#     province_check = True if word in province else False
    
    # Features from current word
    features={
        'word.word': word,
        'word.isspace':word.isspace(),
        'postag':postag,
        'word.isdigit()': word.isdigit(),
        'dic_check': dic_check,
        'thloc_check': thloc_check,
        'loc_check': loc_check,
        'river_check': river_check,
#         'road_check': road_check,
#         'subDis01_check': subDis01_check,
#         'subDis02_check': subDis02_check, 
#         'district_check': district_check,
#         'province_check': province_check
    }
    # Features from previous word
    if i > 0:
        prevword = doc[i-1][0]
        postag1 = doc[i-1][1]
        prev_dic_check = True if prevword in dictionary else False
        prev_thloc_check = True if prevword in thai_loc else False
        prev_loc_check = True if prevword in loc_place else False
        prev_river_check = True if prevword in river else False
#         prev_road_check = True if prevword in road else False
#         prev_subDis01_check = True if prevword in sub_dis01 else False
#         prev_subDis02_check = True if prevword in sub_dis02 else False
#         prev_district_check = True if prevword in district else False
#         prev_province_check = True if prevword in province else False
        
        features['word.prevword'] = prevword
        features['word.previsspace']= prevword.isspace()
        features['word.prepostag'] = postag1
        features['word.prevwordisdigit'] = prevword.isdigit()
        features['word.prev_dic_check'] = prev_dic_check
        features['word.prev_thloc_check'] = prev_thloc_check
        features['word.prev_loc_check'] = prev_loc_check
        features['word.prev_river_check'] = prev_river_check
#         features['word.prev_road_check'] = prev_road_check
#         features['word.prev_subDis01_check'] = prev_subDis01_check
#         features['word.prev_subDis02_check'] = prev_subDis02_check
#         features['word.prev_district_check'] = prev_district_check
#         features['word.prev_province_check'] = prev_province_check
        
    else:
        features['BOS'] = True # Special "Beginning of Sequence" tag
    # Features from next word
    if i < len(doc)-1:
        nextword = doc[i+1][0]
        postag1 = doc[i+1][1]
        next_dic_check = True if nextword in dictionary else False
        next_thloc_check = True if nextword in thai_loc else False
        next_loc_check = True if nextword in loc_place else False
        next_river_check = True if nextword in river else False
#         next_road_check = True if nextword in road else False
#         next_subDis01_check = True if nextword in sub_dis01 else False
#         next_subDis02_check = True if nextword in sub_dis02 else False
#         next_district_check = True if nextword in district else False
#         next_province_check = True if nextword in province else False
        
        features['word.nextword'] = nextword
        features['word.nextisspace']=nextword.isspace()
        features['word.nextpostag'] = postag1
        features['word.nextwordisdigit'] = nextword.isdigit()
        features['word.next_dic_check'] = next_dic_check
        features['word.next_thloc_check'] = next_thloc_check
        features['word.next_loc_check'] = next_loc_check
        features['word.next_river_check'] = next_river_check
#         features['word.next_road_check'] = next_road_check
#         features['word.next_subDis01_check'] = next_subDis01_check
#         features['word.next_subDis02_check'] = next_subDis02_check
#         features['word.next_district_check'] = next_district_check
#         features['word.next_province_check'] = next_province_check
    else:
        features['EOS'] = True # Special "End of Sequence" tag
    return features

def extract_features(doc):
    return [doc2features(doc, i) for i in range(len(doc))]

def get_labels(doc):
    return [tag for (token,postag,tag) in doc]

print("Training Model ...")
X_data = [extract_features(doc) for doc in datatofile] # เอา คำ แยกออกมา
y_data = [get_labels(doc) for doc in datatofile] # เอา tag แยกออกมา

X, X_test, y, y_test = train_test_split(X_data, y_data, test_size=0.1)

crf = sklearn_crfsuite.CRF(
    algorithm='lbfgs',
    c1=0.1,
    c2=0.1,
    max_iterations=500,
    all_possible_transitions=True,
    model_filename=file_name+"-pos.model0" # ตั้งชื่อโมเดล
)
crf.fit(X, y); # train

labels = list(crf.classes_)
labels.remove('O')
labels.remove('B-HOTEL')
labels.remove('I-HOTEL')
labels.remove('B-RESTAURANT')
labels.remove('I-RESTAURANT')

y_pred = crf.predict(X_test)

sorted_labels = sorted(
    labels,
    key=lambda name: (name[1:], name[0])
)
print("kfold evaluating ...")
fold_pred = cross_val_predict(crf, X, y, cv=10)

report = metrics.flat_classification_report(y, fold_pred, output_dict=True, labels=sorted_labels, digits=3)
df = pd.DataFrame(report).transpose()
df.to_csv(data_path+'/results/'+'all.csv', mode='a', header=True)
df.to_csv(data_path+'/results/'+file_no+'.csv', mode='w', header=True)

print(report)

model_name = '305_dict.sav'
pickle.dump( crf, open(model_name, 'wb') )
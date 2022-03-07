import re
import string
import json
from pythainlp.tokenize import word_tokenize

threadId_file = open("threadID_list.txt", "r")
threadId_list = []
while True: 
    line = threadId_file.readline() 
    line = line.strip('\n')
    threadId_list.append(line)
    if not line: 
        break


text = open("300_byLine.txt", 'r')
imgIndex_dict = {}
process = 0
while True: 
    line = text.readline() 
    if not line: 
        break
        
    tokens = word_tokenize(line, engine="newmm")
    
    tag_count = 0
    word_index = 0
    thread_index = 0
    tag_index = []
    while (word_index < len(tokens)):
        if("classimg-in-post" in tokens[word_index]):
            tag_index.append(word_index - tag_count - 3)
            tag_count += 1
            word_index += 1
            
            while ("/>" not in tokens[word_index]):
                tag_count += 1
                word_index += 1
                if(word_index == len(tokens)):
                    break

        else:
            word_index += 1
            
    if(tag_count == 0):    
        thread_index += 1
        
    thread_index += 1
    imgIndex_dict[threadId_list[thread_index]] = tag_index
    thread_index += 1

    process += 1
    print("process : " + str(process) + "  |  tid : " + str(threadId_list[thread_index]))

with open('img_index.json', 'w') as fp:
    json.dump(imgIndex_dict, fp)
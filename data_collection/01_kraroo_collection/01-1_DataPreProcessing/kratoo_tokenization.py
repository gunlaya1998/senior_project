from pythainlp.tokenize import word_tokenize
from pythainlp.tag import pos_tag
from pythainlp.tag import tag_provinces
import json

process = 1
text = open("ex.txt", "r").read()
# tags = open("kratoo_tags_thai.txt", "r").read()
# for i in range(len(tags)):
tokens = word_tokenize(text,engine='dict')
for i in range(len(tokens)):
    tag_words = tag_provinces(tokens)
    pos_words = pos_tag(tokens,engine='old')
    f = open("kratoo_pos-loc.txt", "a")
    f.write(str(tag_words))

    print("process : " + str(process))
    process += 1
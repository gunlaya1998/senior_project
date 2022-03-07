import string
import re

text = open("review_07.txt", "r").read()

text_01 = re.sub(r"\[\'", "", text, flags=re.I)
text_02 = re.sub(r"\'\]", "", text_01, flags=re.I)
text_03 = re.sub(r"\', \'", "\n", text_02, flags=re.I)

f = open("clickstream_topicID.txt", "a")
f.write(str(text_03))
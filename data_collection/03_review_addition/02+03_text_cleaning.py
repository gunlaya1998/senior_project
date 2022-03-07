import json
import string
import re

text = open("02+03_341dataset.txt", "r").read()

text = re.sub(r"\\n", "", text, flags=re.I)
text = re.sub(r"[⏰•·“”\"\\,@\'?\$%_*+=!`~]", "", text, flags=re.I)
text = re.sub(r"&nbsp;", "", text, flags=re.I)
text = re.sub(r"<h1>.*<h1>\n", "", text, flags=re.I)
text = re.sub(r"<h1>.*</h1>\n", "", text, flags=re.I)
text = re.sub(r"---*---", "", text, flags=re.I)
text = re.sub(r"\.\.\.*", "", text, flags=re.I)
# text = re.sub(r'^https?:\/\/.*[\r\n]*', '', text, flags=re.I)

from bs4 import BeautifulSoup
text = BeautifulSoup(text, "lxml").text

lines = text.split("\n")
non_empty_lines = [line for line in lines if line.strip() != ""]

string_without_empty_lines = ""
for line in non_empty_lines:
      string_without_empty_lines += line + "\n"

# clean_hotel_open = re.sub(r"\[HOTEL\]", "", string_without_empty_lines, flags=re.I)
# clean_hotel_close = re.sub(r"\[/HOTEL\]", "", clean_hotel_open, flags=re.I)

clean_text = string_without_empty_lines
f = open("300_clean_dataset_03.txt", "w")
f.write(str(clean_text))
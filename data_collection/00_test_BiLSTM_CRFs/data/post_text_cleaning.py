import json
import string
import re

text = open("02+03_341dataset.txt", "r").read()

clean_nl_text = re.sub(r"\\n", "", text, flags=re.I)
clean_punc = re.sub(r"[·“”\"\\,@\'?\$%_*+=!`~]", "", clean_nl_text, flags=re.I)
clean_symbol = re.sub(r"&nbsp;", "", clean_punc, flags=re.I)
clean_line = re.sub(r"<h1>.*\n", "", clean_symbol, flags=re.I)
clean_finishline = re.sub(r"---*---", "", clean_line, flags=re.I)
clean_dot = re.sub(r"\.\.\.*", "", clean_finishline, flags=re.I)
# clean_url = re.sub(r'^https?:\/\/.*[\r\n]*', '', clean_dot, flags=re.I)

from bs4 import BeautifulSoup
clean_html = BeautifulSoup(clean_dot, "lxml").text

lines = clean_html.split("\n")
non_empty_lines = [line for line in lines if line.strip() != ""]

string_without_empty_lines = ""
for line in non_empty_lines:
      string_without_empty_lines += line + "\n"

clean_hotel_open = re.sub(r"\[HOTEL\]", "", string_without_empty_lines, flags=re.I)
clean_hotel_close = re.sub(r"\[/HOTEL\]", "", clean_hotel_open, flags=re.I)

clean_text = clean_hotel_close
f = open("02+03_341dataset_clean.txt", "w")
f.write(str(clean_text))
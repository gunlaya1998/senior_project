import json
import string
import re

text = open("test_dataset.txt", "r").read()
# table = str.maketrans(dict.fromkeys(string.punctuation))  # OR {key: None for key in string.punctuation}
# nopunc_text = text.translate(table) 

text = re.sub(r"[•·“”\"\\,@\'?\$%_\[\]/*+=!`~]", "", text, flags=re.I)

emoji_pattern = re.compile("["
                            u"\U0001F600-\U0001F64F"  # emoticons
                            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                            u"\U0001F680-\U0001F6FF"  # transport & map symbols
                            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                            u"\U00002500-\U00002BEF"  # chinese char
                            u"\U00002702-\U000027B0"
                            u"\U00002702-\U000027B0"
                            u"\U000024C2-\U0001F251"
                            u"\U0001f926-\U0001f937"
                            u"\U00010000-\U0010ffff"
                            u"\u2640-\u2642"
                            u"\u2600-\u2B55"
                            u"\u200d"
                            u"\u23cf"
                            u"\u23e9"
                            u"\u231a"
                            u"\ufe0f"  # dingbats
                            u"\u3030"
                            "]+", flags=re.UNICODE)

text = emoji_pattern.sub(r'', text)

text = re.sub(r"&nbsp;", "", text, flags=re.I)

from bs4 import BeautifulSoup
clean_text = BeautifulSoup(text, "lxml").text

f = open("test_dataset.txt", "w")
f.write(str(text))
def get_ner(text):
    word_cut=word_tokenize(text,engine="newmm")
    list_word=pos_tag(word_cut,engine='perceptron')
    X_test = extract_features([(data,list_word[i][1]) for i,data in enumerate(word_cut)])
    y_=crf.predict_single(X_test)
    return [(word_cut[i],list_word[i][1],data) for i,data in enumerate(y_)]


while True:
    t=input("Text : ")
    print(get_ner(t))

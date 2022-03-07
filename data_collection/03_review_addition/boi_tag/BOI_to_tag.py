from nltk.tree import Tree
from nltk.chunk import conlltags2tree

conlltags = [(token, pos, tg) for token, pos, tg in zip(tokens, pos_tags, tags)]
ne_tree = conlltags2tree(conlltags)

original_text = []
for subtree in ne_tree:
    # skipping 'O' tags
    if type(subtree) == Tree:
        original_label = subtree.label()
        original_string = " ".join([token for token, pos in subtree.leaves()])
        original_text.append((original_string, original_label))
print(original_text)
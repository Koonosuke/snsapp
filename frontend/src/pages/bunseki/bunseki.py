import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
def analyze_messages(messages):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(messages)
    feature_names = vectorizer.get_feature_names_out()
    results = []
    for doc in tfidf_matrix:
        tfidf_scores = {feature_names[i]: doc[0, i] for i in range(doc.shape[1])}
        results.append(tfidf_scores)
    return results
if __name__ == "__main__":
    input_data = sys.stdin.read()
    messages = json.loads(input_data)
    analysis_results = analyze_messages(messages)
    print(json.dumps(analysis_results))
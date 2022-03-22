from sklearn.cluster import DBSCAN
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import json

df = pd.read_json('data_preprocessing.json')

tfidfv = TfidfVectorizer().fit(df['main_accords'])
data = tfidfv.transform(df['main_accords']).toarray()
data = pd.DataFrame(data)

model = DBSCAN(eps=0.431, min_samples=13)
predict = pd.DataFrame(model.fit_predict(data))
predict.columns = ['predict']
# print(predict['predict'].value_counts())

perfume_cluster = {x: [] for x in range(-1, 164)}
for i in range(37000):
    perfume_cluster[predict['predict'][i]].append(i + 1)

with open('perfume_cluster.json', 'w') as f:
    json.dump(perfume_cluster, f)
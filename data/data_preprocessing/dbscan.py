from sklearn import datasets
from sklearn.cluster import DBSCAN
# import matplotlib.pyplot as plt
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer

# iris = datasets.load_iris()

# labels = pd.DataFrame(iris.target)
# labels.columns=['labels']

# data = pd.DataFrame(iris.data)
# data.columns=['Sepal length','Sepal width','Petal length','Petal width']
# data = pd.concat([data, labels], axis=1)

# feature = data[['Sepal length','Sepal width','Petal length','Petal width']]

# model = DBSCAN(eps=0.4, min_samples=6)
# predict = pd.DataFrame(model.fit_predict(feature))
# predict.columns=['predict']

# r = pd.concat([feature, predict], axis=1)
# print(predict['predict'].value_counts())

df = pd.read_json('data_preprocessing.json')
# count_vector = CountVectorizer(ngram_range=(1, 1))
# c_vector_perfume = count_vector.fit_transform(df['main_accords']).toarray()

# data = pd.DataFrame(c_vector_perfume)

tfidfv = TfidfVectorizer().fit(df['main_accords'])
dd = tfidfv.transform(df['main_accords']).toarray()
data = pd.DataFrame(dd)

model = DBSCAN(eps=0.431, min_samples=13)
predict = pd.DataFrame(model.fit_predict(data))
predict.columns=['predict']
print(predict['predict'].value_counts())
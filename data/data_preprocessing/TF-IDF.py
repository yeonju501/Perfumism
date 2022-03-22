import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import time

start = time.time()

df = pd.read_json('data_preprocessing.json')
input_data = {
    "brand": "",
    "image": "",
    "launch_year": 0,
    "longevity": "",
    "main_accords": "citrus woody violet fresh musky amber vanilla sweet",
    "notes": "",
    "perfume": "user",
    "sillage": "",
}
df = df.append(input_data, ignore_index=True)
print(df)

tfidfv = TfidfVectorizer(ngram_range=(1, 1))
data = tfidfv.fit_transform(df['main_accords']).toarray()
data = pd.DataFrame(data)
print(data)

print('종료 시간 : ', time.time() - start)
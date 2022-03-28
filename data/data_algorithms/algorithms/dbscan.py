from sklearn.cluster import DBSCAN
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_like_based(accord_list):

    answerData = {
                "a1": 3,
                "a2": 4,
                "a3": 0,
                "a4": 2,
                "a5": 1,
            }

    input_data = {
        "id": "",
        "perfume": "user",
        "brand": "",
        "image": "",
        "launch_year": 0,
        "main_accords": accord_list,
        "notes": "",
        "longevity": "",
        "sillage": "",
        "total_survey": 0,
        "similar_perfume": []
    }

    if answerData["a5"] == 0:
        df = pd.read_json("popular.json")
    else :
        df = pd.read_json("unpopular.json")

    df = df.append(input_data, ignore_index=True)

    if answerData["a5"] == 0:
        new_df = df
    else:
        tfidfv = TfidfVectorizer().fit(df['main_accords'])
        data = tfidfv.transform(df['main_accords']).toarray()
        data = pd.DataFrame(data)

        model = DBSCAN(eps=0.5, min_samples=20)
        predict = pd.DataFrame(model.fit_predict(data))
        predict.columns = ['predict']

        filt = (predict['predict'] == predict.iloc[-1, 0])
        new_df = df[filt]

    feature = new_df['main_accords'] + ' ' + new_df['notes']

    tfidf_vector = TfidfVectorizer(ngram_range=(1, 1))
    c_vector_perfume = tfidf_vector.fit_transform(feature)

    perfume_c_sim = cosine_similarity(c_vector_perfume, c_vector_perfume).argsort()[:, ::-1]

    if len(new_df) < 30:
        sim_index = perfume_c_sim[len(new_df) - 1].reshape(-1)
    else:
        sim_index = perfume_c_sim[len(new_df) - 1, :30].reshape(-1)
    sim_index = sim_index[sim_index != len(new_df) - 1]
    result = new_df.iloc[sim_index]

    return result
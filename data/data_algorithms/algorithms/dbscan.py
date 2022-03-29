from sklearn.cluster import DBSCAN
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


mapping_table = [
    {
        0: ["cherry", "tropical", "fruity", "sour", "terpenic", "citrus", "tropical"],
        1: ["lavender", "tuberose", "terpenic", "yellow floral", "rose", "violet", "patchouli", "white floral", "aldehydic", "floral", "iris"],
        2: ["mossy", "foresty", "woody", "oud", "conifer", "patchouli"],
        3: ["ozonic", "aquatic", "marine"]
    },
    {
        0: ["cinnamon", "cherry", "vanilla", "gourmand", "coconut", "caramel", "balsamic", "beeswax", "sweet", "amber", "honey", "tropical", "fruity"],
        1: ["soapy", "musky", "beeswax", "powdery", "amber", "aldehydic"],
        2: ["vanilla", "gourmand", "coconut", "nutty", "beeswax", "milky", "lactonic"],
        3: ["cinnamon", "animalic", "vanilla", "fresh spicy", "camphor", "balsamic", "patchouli", "soft spicy", "aromatic", "warm spicy", "cannabis"],
        4: ["mossy", "foresty", "herbal", "earthy", "patchouli", "aromatic", "green"]
    },
    {
        0: ["eternal", "long lasting", "moderate"],
        1: ["weak", "very weak"]
    },
    {
        0: ["intimate"],
        1: ["moderate", "strong", "enormous"]
    }
]

def recommend_like_based(accord_list):

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

    df = pd.read_json("./data_algorithms/algorithms/popular.json")
    df = df.append(input_data, ignore_index=True)

    feature = df['main_accords'] + ' ' + df['notes']

    tfidf_vector = TfidfVectorizer(ngram_range=(1, 1))
    c_vector_perfume = tfidf_vector.fit_transform(feature)

    perfume_c_sim = cosine_similarity(c_vector_perfume, c_vector_perfume).argsort()[:, ::-1]

    if len(df) < 30:
        sim_index = perfume_c_sim[len(df) - 1].reshape(-1)
    else:
        sim_index = perfume_c_sim[len(df) - 1, :30].reshape(-1)
    sim_index = sim_index[sim_index != len(df) - 1]
    result = df.iloc[sim_index][:3].to_dict('list')['id']

    return result


def recommend_survey(answer_list):
    accord_list = []
    accord_list += mapping_table[0][answer_list[0]] + mapping_table[1][answer_list[1]]
  
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

    if answer_list[4] == 0:
        df = pd.read_json("./data_algorithms/algorithms/popular.json")
    else:
        df = pd.read_json("unpopular.json")

    df = df.append(input_data, ignore_index=True)

    if answer_list[4] == 0:
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
    result = new_df.iloc[sim_index][:3].to_dict('list')['id']

    return result

if __name__ == '__main__':
    arr = "wine vanilla sweet woody aromatic leather fruity warm spicy powdery animalic fresh violet"
    result = recommend_like_based(arr)
    print(result)
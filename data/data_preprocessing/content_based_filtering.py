from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# 향수 데이터 df 생성 및 사용할 칼럼 추출
df = pd.read_json('data_preprocessing.json')

sum_data = df['main_accords'] + ' ' + df['notes']

# acoords 및 notes 토큰 리스트로 변환 후 출현 빈도 count, BOW 인코딩 벡터 생성
count_vector = CountVectorizer(ngram_range=(1, 3))
c_vector_perfume = count_vector.fit_transform(sum_data)

# 코사인 유사도를 구한 벡터 저장
perfume_c_sim = cosine_similarity(c_vector_perfume, c_vector_perfume).argsort()[:, ::-1]

def get_recommend_perfume_list(df, perfume, top=30):

    # 특정 perfume (입력값) 데이터 추출
    target_perfume_index = df[df['perfume'] == perfume].index.values
    
    # 코사인 유사도 중 비슷한 코사인 유사도를 가진 정보 추출
    sim_index = perfume_c_sim[target_perfume_index, :top].reshape(-1)

    # 본인 제외
    sim_index = sim_index[sim_index != target_perfume_index]

    # df 생성
    result = df.iloc[sim_index].sort_values('total_survey', ascending=False)[:10]
    return result

print(get_recommend_perfume_list(df, perfume=df['perfume'][0]))
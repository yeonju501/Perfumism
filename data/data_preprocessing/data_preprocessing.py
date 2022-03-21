import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval

'''
데이터 1차 정제 (컨텐츠 기반 필터링을 위한 데이터 정제)
as-is
- 특징 및 노트가 null 인 데이터가 존재
- 리스트 형태의 데이터가 문자열로 저장되어 있음 ex) "['brand1', 'brand2', ...]"
- 컨텐츠 기반 필터링을 위해 리스트로 되어있는 특징 및 노트 데이터를 띄어쓰기로 구분된 문자열로 변환 필요
'''
# 초기 데이터 df 객체 생성
df = pd.read_json('perfumes.json')

# accords, notes --> null 인 향수 제거
for i in df.index:
    if df['main_accords'][i] == 'null' or df['notes'][i] == 'null':
        df.drop(i, axis=0, inplace=True)

# 인덱스 초기화
df.reset_index(inplace=True, drop=True)

for i in df.index:
    df['notes'][i] = df['notes'][i].replace('null', 'None')

# 문자열로 되어있는 배열 문자열 제거 ex) "['brand1', 'brand2', ...]""['brand1', 'brand2', ...]" --> ['brand1', 'brand2', ...]
df['main_accords'] = df['main_accords'].apply(literal_eval)
df['notes'] = df['notes'].apply(literal_eval)
df['longevity'] = df['longevity'].apply(literal_eval)
df['sillage'] = df['sillage'].apply(literal_eval)

# list 및 dict value --> 띄어쓰기로 구분된 문자열로 변환
for i in df.index:
    df['main_accords'][i] = ' '.join(df['main_accords'][i])
    if type(df['notes'][i]) == list:
        df['notes'][i] = ' '.join(df['notes'][i])
    elif type(df['notes'][i]) == dict:
        temp = ''
        for value in df['notes'][i].values():
            if type(value) == list:
                temp += ' '.join(value)
                temp += ' '
        if temp:
            df['notes'][i] = temp[:-1]

df.to_json('data_preprocessing1.json', orient='records')

'''
2차 정제 (DB에 저장하기 위한 데이터 정제)
as-is
- 데이터 파일 : 1차 정제에서 두 번째까지 진행한 데이터
- 향수 id 컬럼 필요
- total_survey 컬럼 필요
- longevity 컬럼 변경 필요
- sillage 컬럼 변경 필요
'''

# 초기 데이터 객체 생성
df = pd.read_json('data_preprocessing1.json')

# 향수 id 컬럼 추가
df['id'] = [x for x in range(1, len(df) + 1)]

# total_survey 추가
total_survey = []

for i in range(len(df)):
    cnt = 0
    for longevity in df['longevity'][i]:
        cnt += int(longevity)
    
    for sillage in df['sillage'][i]:
        cnt += int(sillage)
    total_survey.append(cnt)

df['total_survey'] = total_survey

# longevity 컬럼 변경 
longevity_title = ['very weak', 'weak', 'moderate', 'long lasting', 'eternal']

for i in range(len(df)):
    max_value = df['longevity'][i][0]
    max_idx = 0
    for j in range(1, 5):
        if max_value < df['longevity'][i][j]:
            max_value = df['longevity'][i][j]
            max_idx = j
    if max_value == 0:
        df['longevity'][i] = None
    else:
        df['longevity'][i] = longevity_title[max_idx]

# sillage 컬럼 변경
sillage_title = ['intimate', 'moderate', 'strong', 'enormous']

for i in range(len(df)):
    max_value = df['sillage'][i][0]
    max_idx = 0
    for j in range(1, 4):
        if max_value < df['sillage'][i][j]:
            max_value = df['sillage'][i][j]
            max_idx = j
    if max_value == 0:
        df['sillage'][i] = None
    else:
        df['sillage'][i] = sillage_title[max_idx]

# 컬럼 순서 변경
df = df[['id', 'perfume', 'brand', 'image', 'launch_year', 'main_accords', 'notes', 'longevity', 'sillage', 'total_survey']]

df.to_json('data_preprocessing2.json', orient='records')

'''
3차 정제 (DB에 저장하기 위한 데이터 추가 작업)
- similar_perfume 컬럼 필요 (컨텐츠 기반 필터링 결과)
'''

# 향수 데이터 df 생성 및 사용할 칼럼 추출
df = pd.read_json('data_preprocessing.json')
df2 = pd.read_json('data_preprocessing2.json')

df['total_survey'] = df2['total_survey']
df['id'] = df2['id']

sum_data = df['main_accords'] + ' ' + df['notes']

count_vector = CountVectorizer(ngram_range=(1, 3))
c_vector_perfume = count_vector.fit_transform(sum_data)

# # 코사인 유사도를 구한 벡터 저장
# perfume_c_sim = cosine_similarity(c_vector_perfume, c_vector_perfume).argsort()[:, ::-1]
# print(perfume_c_sim)
# np.save('./saved_c_sim', perfume_c_sim)
perfume_c_sim = np.load('./saved_c_sim.npy')
# print(perfume_c_sim)

def get_recommend_perfume_list(df, idx, top=30):

    # 특정 perfume (입력값) 데이터 추출
    target_perfume_index = idx
    
    # 코사인 유사도 중 비슷한 코사인 유사도를 가진 정보 추출
    sim_index = perfume_c_sim[target_perfume_index, :top].reshape(-1)

    # 본인 제외
    sim_index = sim_index[sim_index != target_perfume_index]

    # df 생성
    result = df.iloc[sim_index].sort_values('total_survey', ascending=False)[:10]
    return result

similar_perfume = []
for i in range(len(df)):
    temp = get_recommend_perfume_list(df, i)
    similar_perfume.append(list(temp['id']))

# print(similar_perfume)
df2['similar_perfume'] = similar_perfume
df2.to_json('data_preprocessing3.json', orient='records')
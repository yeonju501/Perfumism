# 🪄 Perfumism 
Perfumism은 **37,000개의 데이터를 기반으로 향수를 추천해주는 서비스**입니다.

여러 쇼핑몰을 돌아다닐 필요 없이, 한 눈에 모든 브랜드의 향수를 비교해보세요.

다양한 브랜드의 상세한 향수 정보도 확인하고, 취향에 알맞은 향수도 추천 받을 수 있어요.

Perfumism에서 당신의 가치를 더욱 빛내줄 향수를 찾아보세요.

## 🛠 기술 스택
<img src="https://user-images.githubusercontent.com/75344304/175805351-5074f969-575d-4ab0-9efc-dce3eae00d9d.png"  width="800" height="660"/>


## 🏗 프로젝트 아키텍쳐 
![architecture](https://user-images.githubusercontent.com/75344304/175805906-15cb3980-b8ce-4a36-a607-767bf3d40ddc.png)


## ⚙️ERD
![ERD](https://user-images.githubusercontent.com/75344304/175805877-ae32fd78-46ba-42aa-8151-18a3c80de2e3.png)


## ✨ 추천 알고리즘
: 코사인 유사도를 활용한 컨텐츠 기반 필터링(Content-based Filtering)

**초기 추천 시스템**

-   설문 및 좋아요를 바탕으로 사용자가 선호하는 향기 추출!
-   추출한 데이터를 향수 37,000개 데이터와 함께 코사인 유사도 계산
-   사용자 선호 향수와 가장 유사한 향수 데이터 추출

=> 37,000개 데이터를 한 번에 코사인 유사도 계산할 경우 평균 **300~360초 정도 소요**

=> 실시간으로 서비스를 제공하기에 부적합

**해결 방법**

-   코사인 유사도 계산 시간을 측정하기 위해 테스트 실시
-   데이터가 300개일 때 0.25s
-   500: 0.32s, 5000: 2.1s, 10000: 7.5s, 15000: 16s (데이터 수 : 계산 시간)
-   데이터 수가 증가할수록 기하급수적으로 계산시간이 증가함

=> 향수 데이터를 한 번에 계산하지 말고 사전에 유사한 향수끼리 **군집화**를 학습시키자!

=> 머신러닝 알고리즘 도입

**최종 추천 시스템**

-   37,000개 향수 데이터 DBSCAN을 활용하여 군집화
-   설문 및 좋아요를 바탕으로 사용자가 선호하는 향기 추출
-   추출한 데이터가 어떤 군집에 속하는지 탐색
-   해당 군집의 향수 데이터와 코사인 유사도 계산
-   가장 유사한 향수 데이터 추출

=> 5초 이내에 추천 결과를 확인할 수 있음

## 📌주요 기능

### 1. 추천
![recommendation](https://user-images.githubusercontent.com/75344304/175805927-52070d87-a105-49e5-ae11-a3a1a513bb39.png)

- 설문과 좋아요 2가지 방식으로 추천을 제공
- 워드 클라우드를 활용하여 사용자가 선호하는 향기를 보여주며, 추천 향수 3가지를 선정하여 제공
    
### 2. 향수 조회 및 검색
<img src="https://user-images.githubusercontent.com/75344304/175805947-2b3ef922-3a11-4bab-a088-1f8f680ab1d7.png"  width="800" height="600"/>

- 37,000개의 향수 목록 및 note 별 향수 필터링 제공
- 향기, 브랜드, 향수명으로 향수 검색 제공
- 상세 페이지에서 해당 향수 정보와 함께 유사 향수 추천 제공
    
### 3. 커뮤니티
<img src="https://user-images.githubusercontent.com/75344304/175806005-d4459185-4ed2-4cfd-b24f-f6d9d1ec4630.png"  width="800" height="400"/>

- 말머리를 통해 게시글을 분류하고 말머리 필터링 기능 제공
- 멀티 이미지 첨부가 가능하며, 댓글과 대댓글 작성 가능
    


## 💻 협업 룰
### Commit Type
```
$ git commit -m [#'JIRA 번호'] 타입 : 작업 설명 

```

| git status | 의미 |
| --- | ---|
| feat | 새로운 기능 추가|
| refactor | 코드 리팩토링 |
| style | 스타일 작업 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| chore | 빌드 업무 수정, 패키지 매니저 수정 |



## 😊 팀 소개
**권연주 (Backend, Data)**

**박예정 (Frontend, Data)**

**방기진 (Frontend, Data)**

**우동진 (Frontend)** 

**우상준 (Backend, Deployment)**

**이승기 (Backend)**
 





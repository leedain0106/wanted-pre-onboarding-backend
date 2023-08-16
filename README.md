# 원티드 프리온보딩 백엔드 인턴십 - 선발 과제

- 이다인

<br></br>
## 실행 방법
```bash
$ npm install
$ npm start
```

<br></br>
## 테이블 구조
![스크린샷 2023-08-16 오후 11 08 18](https://github.com/leedain0106/wanted-pre-onboarding-backend/assets/63581721/f94c654c-0346-4a4f-a0b9-ef9d8fa457a3)

<br></br>
## 실행 영상
<img src="https://github.com/leedain0106/wanted-pre-onboarding-backend/assets/63581721/69847fb0-8a47-43b8-9c36-ae1cec4320f6" width=1000 height=600 /> 


<br></br>
## API 설명
baseURL : http://localhost:3000

유저 관련 API
|     Method     | URL |             기능          |    Headers | QueryString | Body | Response |
| :---------: | :----: | :----------------------------: | :-------: | :-------: | :-------: | :-------: | 
|   POST    |  /auth/signin   |         회원가입         |  | | email, password | result, insertedId | 
|  POST  |  /auth/login   | 로그인 | | | email, password | result, accessToken |


게시물 관련 API
|     Method     | URL |             기능          |    Headers | QueryString | Body | Response |
| :---------: | :----: | :----------------------------: | :-------: | :-------: | :-------: | :-------: | 
|   POST    |  /post   |         게시물 생성         | Authorization: <br/> Bearer {{JWT}} | | title, content| result, insertedId |
|  GET  |  /post   | 목록 조회 | | page, limit | | result, totalCount, hasNextPage, list |
|  GET  |  /post/:id   | 특정 게시물 조회 | | | | result, info |
|  PUT  |  /post/:id  | 게시물 수정 | Authorization: <br/> Bearer {{JWT}} | | title, content | result |
|  DELETE  |  /post/:id   | 게시물 삭제 | Authorization: <br/> Bearer {{JWT}} | | | result |

- pagination은 queryString에 page, limit을 이용해서 구현(page: 현재 페이지, limit: 한 페이지 게시물 수) <br/>
  totalCount: 전체 게시물 수, hasNextPage: 다음 페이지 존재 여부



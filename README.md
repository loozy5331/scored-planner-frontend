# score-planner-frontend
점수 계획표 화면 구성을 위한 프론트엔드 서버

![Front-server-1](https://user-images.githubusercontent.com/36221276/168280725-03683570-b4a7-4a86-812e-58da4d872e5c.jpeg)

- Base: 사용자 로그인과 게스트 로그인을 위한 페이지
- MainAccount: 사용자 등록을 위한 회원가입 페이지
- MainCalendar: 점수 계획표 메인 페이지
- MainGraph: 계획의 통계 그래프 페이지

> 라이브러리
> - Vue3: 기본 프레임 워크 
> - axios: 백엔드 서버와 네트워크 통신
> - vuex: 전역 변수
> - vue-router: 페이지 이동
---

## 고려사항 및 설계 포인트

### 1. 목적에 따라 분리된 페이지
Header, Base, Footer를 분리하여 목적에 따라 Base 영역만 갱신하여 화면을 표시
-> 코드의 분리를 통해 유지 보수 및 확장 용이
-> 단, 디렉토리의 계층은 가능하면 깊지 않게(데이터의 전달)

### 2. 반복되는 요소 추출
빈번하게 등장하는 요소(ex. 달력의 '일')는 별도로 추출하여 코드의 중복을 줄임
    
### 3. 전역 변수 활용
계층의 차이가 많이 있다면 데이터를 전달하는 코드가 복잡해지기 때문에 전역 변수로 생명 주기를 관리

---

## 실행 방법 (Getting Started)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

---

## TODO
1. 디자인 수정이 필요...(너무 별로)
2. 자동으로 build and deploy 할 수 있는 구조로 변경
    - github action 활용?
    - 프론트엔드는 어떤 식으로 배포하는지 확인
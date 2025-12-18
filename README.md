# 📚 KT AIVLE School 4차 미니 프로젝트
2025.12.04 ~ 2025.12.09, 주말 제외 4일 진행

## 📌 프로젝트 주제
AI 이미지 생성 기술을 활용해 도서 표지를 자동 생성하는 기능을 포함한 도서 관리 시스템 개발



## 🛠️ 개발 환경 & 기술 스택
**Frontend**
- React, Vite, Axios, MUI 등

**Backend**
- Spring Boot, Spring Data JPA, H2 Database Engine, Lombok 등
---

## 🚀 개발 과정
### 1일차<br>
![ERD](https://github.com/user-attachments/assets/60dbed1f-ae97-429d-bda2-5b9e66d3e73e)
- 데이터베이스 설계 및 엔티티 속성 정의
- Spring Boot, React 프로젝트 환경 설정
- CORS 연동 (backend/src/main/java/com/example/api/bookmanage/config/WebConfig.java) 및 테스트
<br>

### 2일차
<img src="https://github.com/user-attachments/assets/47c756f4-4128-4314-840f-caa367a01926" width="600">

- Controller, Service, Repository, DTO 구현 (backend/src/main/java/com/example/api/bookmanage 하위 디렉토리)
- Postman을 활용한 REST API 단위 테스
- react, router, dom으로 페이지 경로 설정
- MUI를 사용한 기본 레이아웃 컴포넌트(AppBar 등) 구현
<br>

### 3일차
<img width="600" height="1233" alt="image" src="https://github.com/user-attachments/assets/da37b80f-1100-4a9f-a4c7-610167220260" />

- 도서 목록, 상세, 등록, 수정 페이지 UI 컴포넌트 구현
- BookService에 @Transactional 적용 (backend/src/main/java/com/example/api/bookmanage/service/BookService)
- 예외 Handling 처리 (backend/src/main/java/com/example/api/bookmanage/exception)
<br>

### 4일차
<img width="600" height="1373" alt="image" src="https://github.com/user-attachments/assets/09d41882-3ccd-4334-a660-083bea8a7ea7" />


- fetch를 사용하여 OpenAI API 직접 호출해 도서 표지 생성 기능 구현
- 백엔드 API를 호출하여 표지 URL을 DB에 최종 저장 및 화면에 표시
---

## 👥 팀원 소개

| 이름 | 역할 | 담당 업무 |
|------|------|-----------|
| 정대한 | 팀장, Frontend | UI 구성 및 Frontend 개발 |
| 박효정 | Frontend | Frontend 개발 및 OpenAI 연동 서비스 구현 |
| 김예은 | Fullstack | Backend 개발 및 Frontend 개발 |
| 남동균 | Fullstack | Backend 개발 및 Frontend 개발 |


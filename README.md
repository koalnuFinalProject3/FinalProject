# Final Project

## 📦 프로젝트 개요

- 작성예정.

## ⚙️ 개발 환경

- **React**: 19.0.0 (`react`, `react-dom`)
- **Vite**: 6.3.1 + `@vitejs/plugin-react` 4.3.4
- **ESLint**: 9.22.0

## 📋 주요 라이브러리

| 범주           | 라이브러리                                | 버전          |
| -------------- | ----------------------------------------- | ------------- |
| 빌드 툴        | Vite, @vitejs/plugin-react                | 6.3.1, 4.3.4  |
| 프레임워크     | React, React DOM                          | 19.0.0        |
| 라우팅         | React Router DOM                          | 7.5.3         |
| 상태 관리      | Zustand                                   | 5.0.3         |
| 서버 상태 관리 | @tanstack/react-query, devtools           | 5.74.9        |
| 캘린더         | @fullcalendar/react, daygrid, timegrid 등 | 6.1.17        |
| 날짜 선택 UI   | react-calendar                            | 5.1.0         |
| 데이터 시각화  | chart.js, react-chartjs-2                 | 4.4.9, 5.3.0  |
| UI 프레임워크  | Bootstrap, React Bootstrap                | 5.3.5, 2.10.9 |
| 애니메이션     | motion                                    | 12.9.2        |

## 📁 디렉터리 구조

```

├─ public/                # 정적 파일 (favicon 등)
├─ src/
│  ├─ assets              # 이미지, 폰트 등 리소스
│  ├─ common              # 공통 컴포넌트
│  ├─ hooks               # 커스텀 훅
│  ├─ layout              # 레이아웃 컴포넌트
│  ├─ pages               # 라우팅 페이지 컴포넌트
│  ├─ store               # 전역 상태 관리
│  ├─ styles              # 테마와 레이아웃 스타일
│  ├─ utils               # 유틸 함수
│  ├─ App.jsx             # 라우터 설정
│  ├─ main.jsx            # 진입점 (ReactDOM, CSS import 등)
│  └─ index.css           # 전역 스타일 시트
├─ .eslintrc.js           # ESLint 설정
├─ vite.config.js         # Vite 설정
├─ package.json
└─ README.md
```

---

_이 README는 팀원 모두가 개발 환경과 주요 라이브러리를 빠르게 이해하는 데 도움을 주기 위해 작성되었습니다._

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# AI 코딩 에이전트 벤치마킹 프로젝트 (AI Coding Agent Benchmark)

## 1. 과제 주제

본 프로젝트는 AI 코딩 에이전트(OpenCode CLI, Hermes Agent, Aider 등)의 자율 코드 생성 역량 및 프로젝트 규전 준수 능력을 평가하기 위한 테스트 벤치마킹 환경 구축 프로젝트입니다. **"로그인 및 회원가입 기능(`auth`)"** 구현을 공통 과제로 부여하여 다양한 LLM 및 코딩 에이전트 도구의 성과를 객관적으로 측정하고 비교합니다.

---

## 2. 프로젝트 목적

* **자율 코딩 역량 검증**: 사람의 추가 지시(Prompting) 없이 요구사항 문서와 지침서만으로 계획, 폼 유효성 검사(Validation), 탭 전환 상태 관리, 가입/로그인 UI 구현까지 완수하는 자율 실행 워크플로우 동작 검증
* **규칙 준수성(Rule Adherence) 평가**: FSD(Feature-Driven) 아키텍처 레이어 제약, 컴포넌트 단위 분리, Strict TypeScript 타입 정의 등 지정된 아키텍처 규칙을 오차 없이 이행하는지 측정
* **크로스 모델 벤치마킹**: Git 브랜치 격리를 활용하여 GPT, Claude, Hermes 등 다양한 LLM 모델 간 작성된 코드의 품질, 모듈화 수준, 자가 검증 성공률 비교 분석

---

## 3. 기술 스택 (Tech Stack)

### Core & Framework

* **Framework**: Next.js (App Router)
* **Language**: TypeScript (Strict Mode)

### State & Data Fetching

* **State Management & Fetching**: TanStack Query v5
* **Schema Validation**: Zod

### Styling & Tools

* **Styling**: Tailwind CSS
* **AI Agent Tools**: OpenCode CLI, Hermes Agent, Aider 등

---

## 4. 프로젝트 구조 (Directory Structure)

```text
runyourai-web-test/
 ├── .agent/                  # 에이전트 행위 제약 및 지식 문서
 │    ├── AGENT.md            # 에이전트 페르소나 및 핵심 전역 규칙
 │    ├── SKILL.md            # 단방향 비차단 실행 워크플로우
 │    ├── ARCHITECTURE.md     # 디렉터리 레이어 및 의존성 참조 규칙
 │    ├── DESIGN.md           # UI/UX 및 Tailwind 컨벤션
 │    └── TESTING.md          # 무인 자가 검증 및 테스트 가이드라인
 │
 ├── app/                     # Next.js App Router (페이지 라우팅 및 레이아웃)
 │    ├── ref/                # 정답지 비교용 서브 라우트 (.gitignore로 에이전트 차단)
 │    │    └── page.tsx       # 모범 답안 로그인/회원가입 화면 (http://localhost:3000/ref)
 │    ├── globals.css         # Tailwind CSS 설정
 │    ├── layout.tsx          # TanStack QueryProvider 연결
 │    └── page.tsx            # 에이전트 구현체 연결용 메인 테스트 페이지 (http://localhost:3000)
 │
 ├── features/                # 도메인 비즈니스 로직 레이어 (에이전트 샌드박스 영역)
 │    └── auth/
 │         ├── api/           # 로그인/회원가입 Custom Hooks 및 API 통신 함수
 │         ├── model/         # DTO 인터페이스, Zod 스키마, 폼 관련 타입 정의
 │         └── ui/            # 로그인/회원가입 폼 및 카드 UI 컴포넌트
 │
 └── shared/                  # 전역 공통 인프라 레이어
      ├── api/                # 전역 apiClient 인스턴스 및 queryKeys 팩토리
      ├── ui/                 # QueryProvider, Toast 등 공통 UI 컴포넌트
      └── utils/              # 공통 순수 유틸리티 (이메일/비밀번호 검증 등)

```

---

## 5. 레이어별 의존성 규칙

본 프로젝트는 상위 레이어가 하위 레이어만 참조할 수 있는 단방향 의존성 규칙을 적용합니다.

```text
[ app ] -> [ features ] -> [ shared ]

```

* `app` 레이어는 `features` 및 `shared`의 컴포넌트를 가져와 페이지를 조립하는 역할만 수행합니다.
* `features` 레이어는 피처 간 수평 참조를 금지하며, 공통 로직은 `shared` 레이어를 활용합니다.
* `shared` 레이어는 특정 도메인 지식을 포함하지 않으며, `features` 및 `app`의 코드를 참조할 수 없습니다.

---

## 6. 에이전트 평가 실행 절차

1. **메인 브랜치(main) 상태 유지**: 초기 환경 세팅 및 가이드라인 문서만 포함된 상태로 기본 브랜치 유지
2. **테스트 브랜치 분기**: 모델별 독립 테스트를 위한 브랜치 생성 (`git checkout -b test/[model-name]`)
3. **에이전트 작업 수행**: `runyourai-web-test` 디렉터리 내부에서 `.agent/` 가이드라인에 따라 3단계 자율 워크플로우 진행
* 1단계: 로그인/회원가입 구현 계획 수립
* 2단계: 순차적 자동 구현 (`model` -> `api` -> `ui` -> `app/page.tsx` 연결)
* 3단계: 무인 자가 검증 (`npm run type-check && npm run lint`)


4. **결과 비교 및 검증**:
* 에이전트 결과물: `http://localhost:3000`
* 정답지: `http://localhost:3000/ref`
* 브라우저 교차 검증 및 코드 레벨 리뷰 진행

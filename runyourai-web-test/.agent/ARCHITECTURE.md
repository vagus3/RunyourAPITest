```markdown
# ARCHITECTURE.md - 프로젝트 시스템 아키텍처 및 모듈 지침

본 문서는 AI 에이전트 및 개발자가 새로운 기능을 구현하거나 수정할 때 준수해야 하는 디렉터리 구조, 레이어별 책임, 의존성 제약 규칙을 정의합니다.

---

## 1. 디렉터리 레이어 구조 (Directory Layer Structure)

본 프로젝트는 도메인 단위 분리(Feature-Driven) 아키텍처를 채택합니다. `app/` 영역은 라우터 및 레이아웃 합성만 담당하며, 모든 비즈니스 로직은 `features/`와 `shared/`에 위치합니다.

```text
my-project/
 ├── .agent/                  # 에이전트 규칙 및 가이드라인 문서
 │
 │
 ├── app/                     # [Routing Layer] URL 주소 매핑 및 페이지 조립
 │    ├── ref/                # 정답지 비교용 서브 라우트 (읽기/수정 금지)
 │    ├── layout.tsx
 │    └── page.tsx            # 메인 테스트 페이지
 │
 ├── features/                # [Domain Layer] 도메인별 비즈니스 로직 및 전용 UI
 │    └── ai-key-management/  # 지정된 작업 샌드박스 영역
 │         ├── api/           # TanStack Query Custom Hooks, API 요청 함수
 │         ├── model/         # DTO 인터페이스, Zod 스키마, 타입 정의
 │         └── ui/            # 피처 전용 UI 컴포넌트
 │
 └── shared/                  # [Core Base Layer] 전역 공통 인프라 (도메인 지식 없음)
      ├── api/                # 전역 apiClient 인스턴스, queryKeys 팩토리
      ├── ui/                 # 전역 공통 UI (Toast 등)
      └── utils/              # 공통 순수 유틸리티 함수

```

---

## 2. 레이어별 역할 및 엄격한 제약 규칙 (Strict Constraints)

### 1) Routing Layer (`app/`)

* **역할**: URL 주소 경로 형성, 최상위 레이아웃 구성, 컴포넌트 조립(Composition).
* **허용 사항**: `features/` 및 `shared/`의 컴포넌트와 유틸리티를 import하여 페이지 구성.
* **금지 사항**:
* `page.tsx` 내부에 10줄 이상의 복잡한 비즈니스 상태/로직 직접 작성 금지.
* `app/ref/` 하위의 파일은 절대 읽거나 수정하지 말 것.



### 2) Domain Layer (`features/[feature-name]/`)

* **역할**: 특정 기능 도메인(예: `ai-key-management`)에 국한된 독립적 응집 모듈 구현.
* **내부 구조 표준**:
* `model/types.ts`: DTO 인터페이스 및 Zod 스키마 정의 (`any` 타입 엄격 금지).
* `api/useApiKey.ts`: TanStack Query 커스텀 훅 및 API 통신 함수 작성.
* `ui/ApiKeyWidget.tsx`: 피처 전용 UI 컴포넌트 작성.


* **금지 사항**:
* 지정된 피처 샌드박스 범위 외의 다른 `features/` 내부 코드를 수평 참조(import)하는 행위 금지.



### 3) Core Base Layer (`shared/`)

* **역할**: 앱 전체에서 재사용되는 도메인 무관(Domain-Agnostic) 전역 공통 인프라.
* **금지 사항**:
* `shared/` 내부 파일은 절대로 `features/`나 `app/` 폴더의 코드를 import할 수 없음 (단방향 의존성 유지).
* API 통신 시 raw `fetch` 및 `axios` 사용 금지 (반드시 `@/shared/api`의 `apiClient` 사용).
* 인라인 쿼리 키 하드코딩 금지 (반드시 `@/shared/api/queryKeys` 팩토리 활용).



---

## 3. 의존성 방향 및 참조 제약 (Dependency Boundaries)

상위 레이어는 하위 레이어만 참조할 수 있으며, 역방향 및 수평 교차 참조는 엄격히 금지됩니다.

```text
[ app ] --------> [ features ] --------> [ shared ]
   │                                         ▲
   └─────────────────────────────────────────┘

```

* **허용된 참조**:
* `app` -> `features`, `shared`
* `features` -> `shared`


* **금지된 참조**:
* `features` -> `app` (역방향 참조 금지)
* `shared` -> `features`, `app` (역방향 참조 금지)
* `features/A` -> `features/B` (수평 참조 금지, 필요 시 `shared`로 승격)



---

## 4. 데이터 및 상태 관리 패턴 (Data & State Flow)

1. **Server State (API 통신)**:
* TanStack Query v5를 기본으로 사용합니다.
* Query Key는 `@/shared/api/queryKeys` 객체를 통해서만 생성 및 참조합니다.


2. **Type Safety & Validation**:
* 백엔드 데이터 통신 시 Zod 스키마를 통해 검증하고, 명시적 DTO 인터페이스를 추출하여 사용합니다.


3. **Error Handling**:
* API 에러 발생 시 백엔드 `{ errorCode, message }` 구조를 수신하여 `Toast.error(message)`로 전역 노출합니다.



---

## 5. 파일 위치 결정 매트릭스 (Decision Matrix)

새로운 코드를 생성하거나 수정할 때 아래 기준에 따라 저장 위치를 결정해야 합니다.

| 질문 (Decision Point) | YES | NO |
| --- | --- | --- |
| **특정 비즈니스 도메인(예: AI 키 관리)에만 사용되는 코드인가?** | `@/features/[feature-name]/` | 다음 질문으로 이동 |
| **여러 기능에서 공통으로 재사용되는 도메인 무관 모듈인가?** | `@/shared/` | 다음 질문으로 이동 |
| **브라우저 URL 주소 경로를 형성하거나 최상위 페이지인가?** | `@/app/` | 위치 재검토 |

```

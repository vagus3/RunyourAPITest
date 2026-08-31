# AUTH_SPEC.md — 인증 페이지 핵심 스펙

> 새로운 AI가 인증 페이지를 구현할 때 반드시 알아야 할 최소 정보입니다.
> `app/ref/` 하위 파일은 **읽거나 수정하지 마세요.**

---

## FormData 필드명 (name 속성)

폼 제출 시 서버 액션이 읽는 필드명입니다. 반드시 일치시켜야 합니다.

| 폼 | 필드 | name 속성값 |
|---|---|---|
| 로그인 | 이메일 | `loginEmail` |
| 로그인 | 비밀번호 | `loginPassword` |
| 회원가입 | 이름 | `regName` |
| 회원가입 | 이메일 | `regEmail` |
| 회원가입 | 비밀번호 | `regPassword` |
| 회원가입 | 비밀번호 확인 | `regConfirmPassword` |

---

## 비밀번호 제약 조건

클라이언트(강도 표시) + 서버(Zod 검증) 양쪽 모두 적용해야 합니다.

1. 최소 8자 이상
2. 영문자 포함 (`/[A-Za-z]/`)
3. 숫자 포함 (`/[0-9]/`)
4. 특수문자 포함 (`/[^A-Za-z0-9]/`)

---

## 비밀번호 강도 계산 로직

위 조건 4개 중 충족 수를 점수(score)로 환산합니다.
단, 입력이 있지만 8자 미만인 경우는 score를 1로 처리(최소 표시).

| score | 색상 | 레이블 |
|---|---|---|
| 0 | bg-black/10 | 미입력 |
| 1 | bg-red-400 | 약함 |
| 2 | bg-amber-400 | 보통 |
| 3 | bg-emerald-500 | 안전함 |

---

## 서버 액션 반환 타입

```ts
type AuthFormState = {
  success: boolean;
  message: string;
};
```

---

## 아이콘 파일 위치 (public/)

| 파일 | 용도 |
|---|---|
| `/google.svg` | Google 소셜 로그인 버튼 아이콘 |
| `/github.svg` | GitHub 소셜 로그인 버튼 아이콘 |
| `/eye.svg` | 비밀번호 표시 상태 아이콘 |
| `/eye-off.svg` | 비밀번호 숨김 상태 아이콘 |
| `/runyour.svg` | 브랜드 로고 (좌측 Hero 섹션) |

---

## autoComplete 속성

| 필드 | autoComplete 값 |
|---|---|
| 로그인 이메일 | `"username email"` |
| 로그인 비밀번호 | `"current-password"` |
| 회원가입 비밀번호 | `"new-password"` |

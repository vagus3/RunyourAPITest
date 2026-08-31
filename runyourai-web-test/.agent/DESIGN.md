# 프론트엔드 디자인 시스템 및 Tailwind CSS 규칙 md 파일

## 1. 스타일 기본 규칙
- Style: B2B SaaS 대시보드 스타일 (Light mode 기본 + Dark Hero Accent)
- Root Layout Base: `RootLayout`의 `<body>`에 기본 스타일 적용 (`bg-light-bg text-dark-surface antialiased font-sans`). 모든 페이지에서 개별 중복 선언 생략.
- Utility Helper: 조건부 클래스 결합 시 반드시 `@/shared/lib/utils`의 `cn()` (`clsx` + `tailwind-merge`) 활용
- Arbitrary Bracket 금지: `text-[12px]`, `p-[13px]`, `bg-[#17181a]` 등의 임의 수치/HEX 값 대신 Tailwind 표준 유틸리티 클래스 및 `@theme` 토큰(`dark-surface`, `dark-bg` 등)만 활용

## 2. 컬러 팔레트 & 커스텀 테마 토큰 (`globals.css`)
- Custom Theme Colors:
  - Dark Surface / Main Text: `bg-dark-surface`, `text-dark-surface`, `border-dark-surface` (`#17181a`)
  - Dark Hero: `bg-dark-bg`, `text-dark-bg` (`#101114`)
  - Dark Card / Code: `bg-dark-card` (`#17181c`)
  - Light Background: `bg-light-bg` (`#f7f8fa`)
- Primary: `bg-blue-600`, `hover:bg-blue-700`, `text-blue-600`
- Surface & Border: Base `bg-slate-50`, Card/Modal `bg-white`, Border `border-slate-200`, `border-black/10`
- Status Badges:
  - Normal: `bg-emerald-50 text-emerald-700 border-emerald-200`
  - Warning (≥80%): `bg-amber-50 text-amber-700 border-amber-200`
  - Error (≥100%): `bg-rose-50 text-rose-700 border-rose-200`
- Typography & Spacing: Tailwind 표준 단위만 사용 (`text-xs`, `text-sm`, `text-3xl`, `text-4xl`, `text-5xl`, `p-2`, `p-4`, `gap-3` 등).


## 3. UI 스니펫 예시 (Progress Bar)
```tsx
<div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
  <div className={cn("h-full transition-all duration-300", isWarning ? "bg-amber-500" : "bg-blue-600")} style={{ width: `${percent}%` }} />
</div>
```

---

## 4. 인증 폼 (Auth Form) 디자인 규칙

> 상세 기능 스펙은 `.agent/AUTH_SPEC.md` 참조

### Input 필드
```
기본: h-11 w-full rounded-lg border bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-dark-surface focus:ring-4 focus:ring-black/5
에러: border-red-400 focus:ring-4 focus:ring-red-500/10
레이블: mb-2 block text-xs font-medium text-slate-700
에러 메시지: mt-1.5 text-xs text-red-500
```

### Submit 버튼
```
h-11 w-full rounded-lg bg-dark-surface text-sm font-medium text-white transition
hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
```
- pending 중: 흰색 스피너 (`animate-spin rounded-full border-2 border-white/30 border-t-white h-4 w-4`)

### 비밀번호 강도 바 색상 (회원가입 전용)
| 강도 | 색상 | 텍스트 색 |
|---|---|---|
| 1 (약함) | `bg-red-400` | `text-red-500` |
| 2 (보통) | `bg-amber-400` | `text-amber-500` |
| 3 (안전함) | `bg-emerald-500` | `text-emerald-500` |
| 0 (미입력) | `bg-black/10` | — |

### Toast 알림 색상
- 성공 도트: `bg-emerald-500`
- 실패 도트: `bg-red-500`
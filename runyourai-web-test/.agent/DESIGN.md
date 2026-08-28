# 프론트엔드 디자인 시스템 및 Tailwind CSS 규칙 md 파일

## 1. 스타일 기본 규칙
- Style: B2B SaaS 대시보드 스타일 (Light mode 기본)
- Utility Helper: 조건부 클래스 결합 시 반드시 `@/shared/lib/utils`의 `cn()` (`clsx` + `tailwind-merge`) 활용

## 2. 컬러 팔레트 & 여백 스케일
- Primary: `bg-blue-600`, `hover:bg-blue-700`, `text-blue-600`
- Surface & Border: Base `bg-slate-50`, Card/Modal `bg-white`, Border `border-slate-200`
- Status Badges:
- Normal: `bg-emerald-50 text-emerald-700 border-emerald-200`
- Warning (≥80%): `bg-amber-50 text-amber-700 border-amber-200`
- Error (≥100%): `bg-rose-50 text-rose-700 border-rose-200`
- Spacing: 표준 단위만 사용 (`p-2`, `p-4`, `gap-3` 등). 임의 수치(`p-[13px]`) 금지

## 3. UI 스니펫 예시 (Progress Bar)
```tsx
<div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
<div className={cn("h-full transition-all duration-300", isWarning ? "bg-amber-500" : "bg-blue-600")} style={{ width: `${percent}%` }} />
</div>
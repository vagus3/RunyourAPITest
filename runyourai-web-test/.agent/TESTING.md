**3. `TESTING.md` 
(자가 검증 테스트)**

```markdown
# 테스트 및 자가 검증 규칙

## 1. 환경 및 작성 규칙
- Stack: Vitest + React Testing Library + MSW
- UI 컴포넌트 및 Custom Hook 작성 시 동일 위치에 `.test.tsx` / `.test.ts` 동시 작성
- 로딩, 에러, 성공 상태 및 주요 사용자 이벤트(클릭/입력) 테스트 케이스 필수 포함

## 2. Self-Correction 실행
- 코드 작성 완료 시 터미널에서 `npm run test`를 실행하여 통과 여부를 검증하세요.
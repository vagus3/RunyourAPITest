import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-dark-surface">
          AI 에이전트 테스트 메인 화면
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          RunYourAI 평가 플랫폼 메인 페이지입니다.
        </p>

        <div className="mt-6">
          <Link
            href="/ref"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-dark-surface text-sm font-medium text-white transition hover:bg-slate-800 active:scale-95"
          >
            로그인 / 회원가입 화면 테스트 (/ref)
          </Link>
        </div>
      </div>
    </main>
  );
}
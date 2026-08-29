"use client";

import React, { useEffect, useState } from "react";

export default function AuthPageRef() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginEmailError, setLoginEmailError] = useState(false);

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [regEmailError, setRegEmailError] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLoginEmailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setLoginEmail(value);
        setLoginEmailError(
            value.length > 0 && !validateEmail(value)
        );
    };

    const handleRegEmailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setRegEmail(value);
        setRegEmailError(
            value.length > 0 && !validateEmail(value)
        );
    };

    useEffect(() => {
        if (!regPassword) {
            setPasswordStrength(0);
            setPasswordMatchError(false);
            return;
        }

        let score = 0;

        if (regPassword.length >= 8) score++;
        if (
            /[A-Za-z]/.test(regPassword) &&
            /[0-9]/.test(regPassword)
        ) {
            score++;
        }
        if (/[^A-Za-z0-9]/.test(regPassword)) score++;

        setPasswordStrength(score === 0 ? 1 : score);

        setPasswordMatchError(
            regConfirmPassword.length > 0 &&
            regPassword !== regConfirmPassword
        );
    }, [regPassword, regConfirmPassword]);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            loginEmailError ||
            !loginEmail ||
            !loginPassword
        ) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setToast({
                message: "성공적으로 로그인되었습니다.",
                type: "success",
            });
        }, 1200);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            regEmailError ||
            passwordMatchError ||
            passwordStrength < 1 ||
            !regName ||
            !regEmail
        ) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            setToast({
                message:
                    "회원가입이 완료되었습니다. 로그인해 주세요.",
                type: "success",
            });

            setRegName("");
            setRegEmail("");
            setRegPassword("");
            setRegConfirmPassword("");
            setActiveTab("login");
        }, 1200);
    };

    return (
        <main className="min-h-screen bg-light-bg text-dark-surface antialiased">
            {/* Toast */}
            {toast && (
                <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-dark-surface shadow-xl shadow-black/10">
                    <span
                        className={`h-2 w-2 rounded-full ${toast.type === "success"
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                    />
                    {toast.message}
                </div>
            )}

            <div className="grid min-h-screen lg:grid-cols-2">
                {/* =====================================================
                    LEFT — PRODUCT HERO
                ====================================================== */}
                <section className="relative hidden overflow-hidden bg-dark-bg px-12 py-10 text-white lg:flex xl:px-20">
                    {/* subtle background grid */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />

                    {/* ambient glow */}
                    <div className="absolute -right-32 top-1/4 h-128 w-128 rounded-full bg-blue-600/10 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-dark-bg">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4.5 w-4.5"
                                    fill="currentColor"
                                >
                                    <path d="M13.1 2 4 13.2h6.1L9.2 22 20 9.1h-6.3L13.1 2Z" />
                                </svg>
                            </div>

                            <span className="text-sm font-semibold tracking-tight">
                                RunYourAI
                            </span>
                        </div>

                        {/* Main */}
                        <div className="my-auto max-w-xl py-20">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                AI Agent Evaluation Platform
                            </div>

                            <h2 className="text-4xl font-semibold leading-tight tracking-tighter xl:text-5xl">
                                AI 에이전트의 성능을
                                <br />
                                <span className="text-white/45">
                                    코드로 증명하세요.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
                                다양한 AI 코딩 에이전트를 동일한 환경에서
                                실행하고, 성능과 안정성을 객관적으로
                                비교하세요.
                            </p>

                            {/* Code preview */}
                            <div className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-dark-card shadow-2xl shadow-black/20">
                                <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
                                    <span className="h-2 w-2 rounded-full bg-white/15" />
                                    <span className="h-2 w-2 rounded-full bg-white/15" />
                                    <span className="h-2 w-2 rounded-full bg-white/15" />
                                    <span className="ml-3 font-mono text-xs text-white/25">
                                        benchmark.ts
                                    </span>
                                </div>

                                <div className="space-y-2 px-5 py-5 font-mono text-xs leading-5">
                                    <div className="text-white/30">
                                        <span className="text-blue-400/70">
                                            const
                                        </span>{" "}
                                        benchmark =
                                    </div>

                                    <div className="pl-4 text-white/55">
                                        await agent.evaluate({"{"}
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-white/30">
                                            model:
                                        </span>{" "}
                                        <span className="text-emerald-400/70">
                                            "claude-sonnet"
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-white/30">
                                            tasks:
                                        </span>{" "}
                                        <span className="text-blue-400/70">
                                            128
                                        </span>
                                    </div>

                                    <div className="pl-4 text-white/55">
                                        {"})"}
                                    </div>

                                    <div className="pt-2 text-emerald-400/70">
                                        ✓ Evaluation completed in 42.8s
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-8 text-xs text-white/30">
                                <span>Benchmark</span>
                                <span>Evaluation</span>
                                <span>Observability</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-white/25">
                            <span>© 2026 RunYourAI Inc.</span>
                            <span>Built for AI developers</span>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    RIGHT — AUTH
                ====================================================== */}
                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
                    <div className="w-full max-w-sm">
                        {/* Mobile logo */}
                        <div className="mb-12 flex items-center gap-2 lg:hidden">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-surface text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="currentColor"
                                >
                                    <path d="M13.1 2 4 13.2h6.1L9.2 22 20 9.1h-6.3L13.1 2Z" />
                                </svg>
                            </div>

                            <span className="text-sm font-semibold">
                                RunYourAI
                            </span>
                        </div>

                        {/* Header */}
                        <div className="mb-9">
                            <h1 className="text-3xl font-semibold tracking-tight text-dark-surface">
                                {activeTab === "login"
                                    ? "다시 만나서 반가워요."
                                    : "계정을 만들어보세요."}
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {activeTab === "login"
                                    ? "RunYourAI Workspace에 로그인하세요."
                                    : "몇 가지 정보만 입력하면 바로 시작할 수 있습니다."}
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="mb-7 flex border-b border-black/10">
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveTab("login")
                                }
                                className={`relative flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === "login"
                                        ? "text-dark-surface"
                                        : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                로그인

                                {activeTab === "login" && (
                                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-dark-surface" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveTab("register")
                                }
                                className={`relative flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === "register"
                                        ? "text-dark-surface"
                                        : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                회원가입

                                {activeTab === "register" && (
                                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-dark-surface" />
                                )}
                            </button>
                        </div>

                        {/* Social */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-black/10 bg-white text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </button>

                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-black/10 bg-white text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-black/10" />
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                                또는
                            </span>
                            <div className="h-px flex-1 bg-black/10" />
                        </div>

                        {/* Login */}
                        {activeTab === "login" && (
                            <form
                                onSubmit={handleLoginSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-700">
                                        이메일
                                    </label>

                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={
                                            handleLoginEmailChange
                                        }
                                        placeholder="name@company.com"
                                        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-dark-surface outline-none transition placeholder:text-slate-400 ${loginEmailError
                                                ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                                                : "border-black/10 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                            }`}
                                        required
                                    />

                                    {loginEmailError && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            유효한 이메일 형식을
                                            입력해 주세요.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="block text-xs font-medium text-slate-700">
                                            비밀번호
                                        </label>

                                        <button
                                            type="button"
                                            className="text-xs font-medium text-slate-500 hover:text-dark-surface"
                                        >
                                            비밀번호 재설정
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={
                                                showLoginPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={loginPassword}
                                            onChange={(e) =>
                                                setLoginPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="비밀번호를 입력하세요"
                                            className="h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 pr-11 text-sm text-dark-surface outline-none transition placeholder:text-slate-400 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowLoginPassword(
                                                    !showLoginPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                            aria-label="비밀번호 표시"
                                        >
                                            {showLoginPassword ? (
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="m3 3 18 18"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <label className="flex cursor-pointer items-center gap-2 pt-0.5">
                                    <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 rounded border-black/20 accent-dark-surface"
                                    />
                                    <span className="text-xs text-slate-500">
                                        로그인 상태 30일간 유지
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex h-11 w-full items-center justify-center rounded-lg bg-dark-surface text-sm font-medium text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        "로그인"
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Register */}
                        {activeTab === "register" && (
                            <form
                                onSubmit={handleRegisterSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-700">
                                        이름
                                    </label>

                                    <input
                                        type="text"
                                        value={regName}
                                        onChange={(e) =>
                                            setRegName(e.target.value)
                                        }
                                        placeholder="홍길동"
                                        className="h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-700">
                                        이메일
                                    </label>

                                    <input
                                        type="email"
                                        value={regEmail}
                                        onChange={
                                            handleRegEmailChange
                                        }
                                        placeholder="name@company.com"
                                        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 ${regEmailError
                                                ? "border-red-400"
                                                : "border-black/10 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                            }`}
                                        required
                                    />

                                    {regEmailError && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            유효한 이메일 형식을
                                            입력해 주세요.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-700">
                                        비밀번호
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={
                                                showRegPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={regPassword}
                                            onChange={(e) =>
                                                setRegPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="8자 이상 입력하세요"
                                            className="h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowRegPassword(
                                                    !showRegPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                        >
                                            {showRegPassword ? (
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="m3 3 18 18"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.8}
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength >=
                                                            level
                                                            ? passwordStrength ===
                                                                1
                                                                ? "bg-red-400"
                                                                : passwordStrength ===
                                                                    2
                                                                    ? "bg-amber-400"
                                                                    : "bg-emerald-500"
                                                            : "bg-black/10"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <div className="mt-1.5 flex justify-between text-xs text-slate-400">
                                            <span>
                                                비밀번호 안전도
                                            </span>
                                            <span
                                                className={
                                                    passwordStrength ===
                                                        1
                                                        ? "text-red-500"
                                                        : passwordStrength ===
                                                            2
                                                            ? "text-amber-500"
                                                            : passwordStrength ===
                                                                3
                                                                ? "text-emerald-500"
                                                                : ""
                                                }
                                            >
                                                {passwordStrength === 0
                                                    ? "미입력"
                                                    : passwordStrength ===
                                                        1
                                                        ? "약함"
                                                        : passwordStrength ===
                                                            2
                                                            ? "보통"
                                                            : "안전함"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-700">
                                        비밀번호 확인
                                    </label>

                                    <input
                                        type="password"
                                        value={regConfirmPassword}
                                        onChange={(e) =>
                                            setRegConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="비밀번호를 다시 입력하세요"
                                        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 ${passwordMatchError
                                                ? "border-red-400"
                                                : "border-black/10 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                            }`}
                                        required
                                    />

                                    {passwordMatchError && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            비밀번호가 일치하지 않습니다.
                                        </p>
                                    )}
                                </div>

                                <label className="flex items-start gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-0.5 h-3.5 w-3.5 rounded border-black/20 accent-dark-surface"
                                    />

                                    <span className="text-xs leading-5 text-slate-500">
                                        <a
                                            href="#"
                                            className="font-medium text-slate-700 underline underline-offset-2"
                                        >
                                            서비스 이용약관
                                        </a>{" "}
                                        및{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-slate-700 underline underline-offset-2"
                                        >
                                            개인정보 처리방침
                                        </a>
                                        에 동의합니다.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={
                                        isLoading ||
                                        passwordMatchError ||
                                        regEmailError
                                    }
                                    className="mt-1 flex h-11 w-full items-center justify-center rounded-lg bg-dark-surface text-sm font-medium text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        "무료로 시작하기"
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Bottom */}
                        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                            계속 진행하면 RunYourAI의 서비스 약관 및
                            개인정보 처리방침에 동의하게 됩니다.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

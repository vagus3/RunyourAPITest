"use client";

import React, { useEffect, useState, useActionState } from "react";
import { loginAction, registerAction } from "./action";

export default function AuthPageRef() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

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

    // 서버 액션 사용
    const [loginState, loginFormAction, isLoginPending] = useActionState(
        loginAction,
        null
    );
    const [registerState, registerFormAction, isRegisterPending] = useActionState(
        registerAction,
        null
    );

    // derived states
    const passwordStrength = React.useMemo(() => {
        if (!regPassword) return 0;
        let score = 0;
        if (regPassword.length >= 8) score++;
        if (/[A-Za-z]/.test(regPassword) && /[0-9]/.test(regPassword)) score++;
        if (/[^A-Za-z0-9]/.test(regPassword)) score++;
        return score === 0 ? 1 : score;
    }, [regPassword]);

    const passwordMatchError = regConfirmPassword.length > 0 && regPassword !== regConfirmPassword;

    // Handle Toast & form side effects after Server Action completes
    useEffect(() => {
        if (loginState) {
            setToast({
                message: loginState.message,
                type: loginState.success ? "success" : "error",
            });
        }
    }, [loginState]);

    useEffect(() => {
        if (registerState) {
            setToast({
                message: registerState.message,
                type: registerState.success ? "success" : "error",
            });
            if (registerState.success) {
                // 회원가입 성공 시 폼 비우고 로그인 탭으로 이동
                setRegName("");
                setRegEmail("");
                setRegPassword("");
                setRegConfirmPassword("");
                setActiveTab("login");
            }
        }
    }, [registerState]);

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

    const handleLoginAction = (formData: FormData) => {
        if (loginEmailError || !loginEmail || !loginPassword) {
            return;
        }
        loginFormAction(formData);
    };

    const handleRegisterAction = (formData: FormData) => {
        if (
            regEmailError ||
            passwordMatchError ||
            passwordStrength < 1 ||
            !regName ||
            !regEmail ||
            !regPassword
        ) {
            return;
        }
        registerFormAction(formData);
    };


    return (
        <main className="min-h-screen bg-light-bg text-dark-surface antialiased">
            {/* Toast */}
            {toast && (
                <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-dark-surface shadow-xl shadow-black/10">
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

                    {/* 야광느낌 */}
                    <div className="absolute -right-32 top-1/4 h-128 w-128 rounded-full bg-blue-600/10 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-dark-bg">
                                <img
                                    src="/runyour.svg"
                                    alt="RunYourAI"
                                    className="h-4.5 w-4.5" />
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

                        {/* 탭 */}
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

                        {/* SNS 로그인 */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-black/10 bg-white text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
                            >
                                <img src="/google.svg" alt="Google" className="h-4 w-4" />
                                Google
                            </button>

                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-black/10 bg-white text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
                            >
                                <img src="/github.svg" alt="GitHub" className="h-4 w-4" />
                                GitHub
                            </button>
                        </div>

                        {/* 나누기 */}
                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-black/10" />
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                                또는
                            </span>
                            <div className="h-px flex-1 bg-black/10" />
                        </div>

                        {/* 로그인 */}
                        {activeTab === "login" && (
                            <form
                                action={handleLoginAction}
                                className="space-y-5"
                            >
                                <div>
                                    <label
                                        htmlFor="login-email"
                                        className="mb-2 block text-xs font-medium text-slate-700"
                                    >
                                        이메일
                                    </label>

                                    <input
                                        id="login-email"
                                        name="loginEmail"
                                        type="email"
                                        autoComplete="username email"
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
                                        <label
                                            htmlFor="login-password"
                                            className="block text-xs font-medium text-slate-700"
                                        >
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
                                            id="login-password"
                                            name="loginPassword"
                                            autoComplete="current-password"
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
                                            onClick={() => setShowLoginPassword(prev => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                            aria-label={showLoginPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                                            title={showLoginPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                                        >
                                            <img
                                                src={showLoginPassword ? "/eye.svg" : "/eye-off.svg"}
                                                alt=""
                                                className="h-4 w-4"
                                            />
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
                                    disabled={isLoginPending}
                                    className="flex h-11 w-full items-center justify-center rounded-lg bg-dark-surface text-sm font-medium text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoginPending ? (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        "로그인"
                                    )}
                                </button>
                            </form>
                        )}

                        {/* 회원가입 */}
                        {activeTab === "register" && (
                            <form
                                action={handleRegisterAction}
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="reg-name"
                                        className="mb-2 block text-xs font-medium text-slate-700"
                                    >
                                        이름
                                    </label>

                                    <input
                                        id="reg-name"
                                        name="regName"
                                        type="text"
                                        autoComplete="name"
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
                                    <label
                                        htmlFor="reg-email"
                                        className="mb-2 block text-xs font-medium text-slate-700"
                                    >
                                        이메일
                                    </label>

                                    <input
                                        id="reg-email"
                                        name="regEmail"
                                        type="email"
                                        autoComplete="email"
                                        value={regEmail}
                                        onChange={
                                            handleRegEmailChange
                                        }
                                        placeholder="[EMAIL_ADDRESS]"
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
                                    <label
                                        htmlFor="reg-password"
                                        className="mb-2 block text-xs font-medium text-slate-700"
                                    >
                                        비밀번호
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="reg-password"
                                            name="regPassword"
                                            autoComplete="new-password"
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
                                            placeholder="8자 이상 입력하세요(영문, 숫자, 특수문자 포함 권장)"
                                            className="h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-dark-surface focus:ring-4 focus:ring-black/5"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowRegPassword(prev => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                            aria-label={showRegPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                                            title={showRegPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                                        >
                                            {showRegPassword ? (
                                                <img src="/eye-off.svg" className="h-4 w-4" />
                                            ) : (
                                                <img src="/eye.svg" className="h-4 w-4" />
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
                                    <label
                                        htmlFor="reg-confirm-password"
                                        className="mb-2 block text-xs font-medium text-slate-700"
                                    >
                                        비밀번호 확인
                                    </label>

                                    <input
                                        id="reg-confirm-password"
                                        name="regConfirmPassword"
                                        autoComplete="new-password"
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
                                        isRegisterPending ||
                                        passwordMatchError ||
                                        regEmailError
                                    }
                                    className="mt-1 flex h-11 w-full items-center justify-center rounded-lg bg-dark-surface text-sm font-medium text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isRegisterPending ? (
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

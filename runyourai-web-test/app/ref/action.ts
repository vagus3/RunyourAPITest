"use server";

import { z } from "zod";

// 서버 메모리 DB (모의 데이터베이스)
interface User {
    name: string;
    email: string;
    passwordHash: string;
}

const mockUserDb: User[] = [
    { name: "테스터", email: "test@example.com", passwordHash: "password123!" }
];

// 유효성 검사 스키마 (Zod)
const loginSchema = z.object({
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요."),
});

const registerSchema = z.object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});


export type AuthFormState = {
    success: boolean;
    message: string;
    fieldErrors?: Record<string, string>;
};

// 1. 로그인 서버 액션
export async function loginAction(prevState: AuthFormState | null, formData: FormData): Promise<AuthFormState> {
    // 모의 네트워크 지연 (1초)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = formData.get("loginEmail") as string;
    const password = formData.get("loginPassword") as string;

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const user = mockUserDb.find((u) => u.email === email);
    if (!user) {
        return {
            success: false,
            message: "존재하지 않는 이메일 계정입니다. (테스트용 계정: test@example.com / password123!)",
        };
    }

    if (user.passwordHash !== password) {
        return {
            success: false,
            message: "비밀번호가 올바르지 않습니다.",
        };
    }

    return {
        success: true,
        message: `${user.name}님, 성공적으로 로그인되었습니다!`,
    };
}

// 2. 회원가입 서버 액션
export async function registerAction(prevState: AuthFormState | null, formData: FormData): Promise<AuthFormState> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const name = formData.get("regName") as string;
    const email = formData.get("regEmail") as string;
    const password = formData.get("regPassword") as string;

    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const existingUser = mockUserDb.find((u) => u.email === email);
    if (existingUser) {
        return {
            success: false,
            message: "이미 등록된 이메일 주소입니다.",
        };
    }

    // 모의 DB에 신규 유저 추가
    mockUserDb.push({ name, email, passwordHash: password });

    return {
        success: true,
        message: "회원가입이 완료되었습니다! 로그인 탭에서 로그인해 주세요.",
    };
}
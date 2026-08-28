// shared/api/queryKeys.ts

// 프로젝트 전체의 Query Key를 중앙에서 관리
export const queryKeys = {
    // 인증 관련 쿼리 키
    auth: {
        all: ['auth'] as const,
        session: () => [...queryKeys.auth.all, 'session'] as const,
    },

    // AI Key 관리 도메인 쿼리 키 (에이전트가 사용할 부분)
    aiKey: {
        all: ['aiKey'] as const,
        lists: () => [...queryKeys.aiKey.all, 'list'] as const,
        detail: (id: string) => [...queryKeys.aiKey.all, 'detail', id] as const,
    },
};
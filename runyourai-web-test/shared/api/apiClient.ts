// shared/api/apiClient.ts
export const apiClient = {
    async get<T>(url: string): Promise<T> {
        const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw { errorCode: res.status, message: errorData.message || 'API 요청 실패' };
        }
        return res.json();
    },

    async post<T>(url: string, body: unknown): Promise<T> {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw { errorCode: res.status, message: errorData.message || 'API 요청 실패' };
        }
        return res.json();
    },
};
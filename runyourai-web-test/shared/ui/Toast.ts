// shared/ui/Toast.ts

// 실제 프로젝트에서는 react-hot-toast나 sonner 등으로 교체
export const Toast = {
    success: (message: string) => {
        console.log(`✅ [SUCCESS]: ${message}`);
        alert(message); // 간단한 모의 구현
    },
    error: (message: string) => {
        console.error(`🚨 [ERROR]: ${message}`);
        alert(`에러: ${message}`); // 간단한 모의 구현
    },
    info: (message: string) => {
        console.info(`ℹ️ [INFO]: ${message}`);
    }
};
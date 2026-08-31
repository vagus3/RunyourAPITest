"use client";

interface PasswordToggleProps {
    /** 현재 비밀번호가 표시(plain text) 중인지 여부 */
    visible: boolean;
    /** 토글 버튼 클릭 핸들러 */
    onToggle: () => void;
    /** 추가 className (선택) */
    className?: string;
}

/**
 * 비밀번호 표시/숨기기 토글 버튼 컴포넌트.
 *
 * 사용 예:
 * ```tsx
 * const [showPassword, setShowPassword] = useState(false);
 *
 * <div className="relative">
 *   <input type={showPassword ? "text" : "password"} ... />
 *   <PasswordToggle
 *     visible={showPassword}
 *     onToggle={() => setShowPassword(prev => !prev)}
 *   />
 * </div>
 * ```
 *
 * 아이콘: public/eye.svg (표시) / public/eye-off.svg (숨김)
 */
export default function PasswordToggle({
    visible,
    onToggle,
    className = "",
}: PasswordToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
            title={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 ${className}`}
        >
            <img
                src={visible ? "/eye.svg" : "/eye-off.svg"}
                alt=""
                className="h-4 w-4"
            />
        </button>
    );
}

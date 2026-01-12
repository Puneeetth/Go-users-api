import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`input ${error ? 'input-error' : ''} ${className}`}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-rose-500 animate-fade-in">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;

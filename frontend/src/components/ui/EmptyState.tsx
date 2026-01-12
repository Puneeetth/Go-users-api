import { ReactNode } from 'react';
import { FileQuestion } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="p-4 mb-4 rounded-full bg-slate-100 dark:bg-slate-800">
                {icon || <FileQuestion className="w-10 h-10 text-slate-400" />}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                {description}
            </p>
            {action && (
                <Button onClick={action.onClick}>{action.label}</Button>
            )}
        </div>
    );
};

export default EmptyState;

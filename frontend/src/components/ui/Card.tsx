import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

const Card = ({ children, className = '', hover = false, ...props }: CardProps) => {
    return (
        <div
            className={`card p-6 ${hover ? 'transition-all duration-200 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;

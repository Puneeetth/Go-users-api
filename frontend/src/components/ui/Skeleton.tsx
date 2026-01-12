interface SkeletonProps {
    className?: string;
}

const Skeleton = ({ className = '' }: SkeletonProps) => {
    return (
        <div
            className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}
        />
    );
};

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-20" />
                </div>
            ))}
        </div>
    );
};

export default Skeleton;

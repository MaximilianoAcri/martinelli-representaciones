"use client";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const baseStyles = "animate-pulse bg-slate-200 dark:bg-slate-700";
  
  const variantStyles = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Skeleton className="h-56 w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <Skeleton className="h-6 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-2/3 mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <div className="flex gap-4 justify-center mt-8">
          <Skeleton className="h-14 w-48 rounded-xl" />
          <Skeleton className="h-14 w-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
import clsx from 'clsx'

type SkeletonProps = {
  // Size it where it is used, for example "h-4 w-full".
  className?: string
}

// A placeholder bar while content loads. The parent says "loading" with aria-busy; this is only the picture.
export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx('block animate-skeleton rounded bg-surface-subtle', className)}
    />
  )
}

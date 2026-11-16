import { Link } from '@ds/atoms/Link'

export type Crumb = {
  label: string
  href?: string
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const lastIndex = crumbs.length - 1

  return (
    <nav aria-label="Breadcrumb">
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0 font-ui text-caption text-text-muted">
        {crumbs.map((crumb, position) => {
          const isCurrent = position === lastIndex
          return (
            <li
              key={`${crumb.label}-${position}`}
              className="not-first:before:mr-2 not-first:before:content-['/']"
            >
              {crumb.href && !isCurrent ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined}>{crumb.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

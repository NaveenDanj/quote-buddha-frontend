import clsx from 'clsx'

type DividerProps = {
  className?: string
}

// A hairline rule. It is decoration, so assistive technology skips it.
export function Divider({ className }: DividerProps) {
  return (
    <hr aria-hidden="true" className={clsx('m-0 border-0 border-t border-border', className)} />
  )
}

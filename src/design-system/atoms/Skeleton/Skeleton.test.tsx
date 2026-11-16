import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Skeleton className="h-4 w-full" />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div aria-busy="true">
        <Skeleton className="h-4 w-full" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

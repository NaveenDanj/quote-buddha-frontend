import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Field, getDescribedBy } from './Field'

describe('Field', () => {
  it('connects the label to the control', () => {
    render(
      <Field controlId="email" label="Email">
        <input id="email" />
      </Field>,
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('keeps a hidden label for screen readers', () => {
    render(
      <Field controlId="email" label="Email" isLabelHidden>
        <input id="email" />
      </Field>,
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('Email')).toHaveClass('sr-only')
  })

  it('shows the hint and the error text', () => {
    render(
      <Field
        controlId="email"
        label="Email"
        hint="Used for the share link"
        errorText="Enter an email"
      >
        <input id="email" />
      </Field>,
    )
    expect(screen.getByText('Used for the share link')).toBeInTheDocument()
    expect(screen.getByText('Enter an email')).toBeInTheDocument()
  })

  it('lists the texts a control should point at', () => {
    expect(getDescribedBy('email', 'a hint', 'an error')).toBe('email-hint email-error')
    expect(getDescribedBy('email', undefined, 'an error')).toBe('email-error')
    expect(getDescribedBy('email', undefined, undefined)).toBeUndefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Field controlId="email" label="Email" hint="Used for the share link">
        <input id="email" />
      </Field>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

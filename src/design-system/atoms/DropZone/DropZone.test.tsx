import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { DropZone } from './DropZone'

const sampleFile = new File(['sample'], 'notes.pdf', { type: 'application/pdf' })

describe('DropZone', () => {
  it('is found by its visible text and passes on a chosen file', async () => {
    const onFilesChosen = vi.fn()
    const user = userEvent.setup()
    render(<DropZone title="Drop a file here or choose one" onFilesChosen={onFilesChosen} />)

    await user.upload(screen.getByLabelText('Drop a file here or choose one'), sampleFile)

    expect(onFilesChosen).toHaveBeenCalledWith([sampleFile])
  })

  it('passes on a dropped file', () => {
    const onFilesChosen = vi.fn()
    render(<DropZone title="Drop a file here or choose one" onFilesChosen={onFilesChosen} />)

    // userEvent has no drag and drop, so this one test sends the drop event directly.
    fireEvent.drop(screen.getByText('Drop a file here or choose one'), {
      dataTransfer: { files: [sampleFile] },
    })

    expect(onFilesChosen).toHaveBeenCalledWith([sampleFile])
  })

  it('takes only the first dropped file unless several are allowed', () => {
    const onFilesChosen = vi.fn()
    const secondFile = new File(['more'], 'more.pdf', { type: 'application/pdf' })
    render(<DropZone title="Drop here" onFilesChosen={onFilesChosen} />)

    fireEvent.drop(screen.getByText('Drop here'), {
      dataTransfer: { files: [sampleFile, secondFile] },
    })

    expect(onFilesChosen).toHaveBeenCalledWith([sampleFile])
  })

  it('offers only the allowed file types', () => {
    render(<DropZone title="Drop here" accept=".pdf,.docx" onFilesChosen={() => {}} />)
    expect(screen.getByLabelText('Drop here')).toHaveAttribute('accept', '.pdf,.docx')
  })

  it('ignores files when disabled', () => {
    const onFilesChosen = vi.fn()
    render(<DropZone title="Drop here" disabled onFilesChosen={onFilesChosen} />)

    fireEvent.drop(screen.getByText('Drop here'), { dataTransfer: { files: [sampleFile] } })

    expect(onFilesChosen).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DropZone title="Drop a file here" hint="PDF only" onFilesChosen={() => {}} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

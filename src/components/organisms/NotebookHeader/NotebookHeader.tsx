import { Breadcrumbs } from '@ds/atoms/Breadcrumbs'
import { IconButton } from '@ds/atoms/IconButton'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

type NotebookHeaderProps = {
  title: string
  onExportMarkdown: () => void
  onExportBibtex: () => void
}

// The name of the notebook, and the buttons that export it.
export function NotebookHeader({ title, onExportMarkdown, onExportBibtex }: NotebookHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-block">
      <div className="grid gap-group">
        <Breadcrumbs crumbs={[{ label: wording.navNotebookLabel }]} />
        <Text variant="toolTitle">{title}</Text>
      </div>
      <div className="flex gap-section">
        <IconButton
          icon="download"
          label={wording.exportMarkdownLabel}
          onClick={onExportMarkdown}
        />
        <IconButton icon="cite" label={wording.exportBibtexLabel} onClick={onExportBibtex} />
      </div>
    </div>
  )
}

import { Text } from '@ds/atoms/Text'

type ToolPageHeadingProps = {
  title: string
  intro: string
  isInline?: boolean
}

export function ToolPageHeading({ title, intro, isInline = false }: ToolPageHeadingProps) {
  if (isInline) {
    return (
      <div className="flex flex-wrap items-end justify-between gap-block">
        <Text variant="toolTitle">{title}</Text>
        <Text variant="caption" isMuted>
          {intro}
        </Text>
      </div>
    )
  }

  return (
    <div className="grid gap-group">
      <Text variant="toolTitle">{title}</Text>
      <Text variant="ui" as="p" isMuted className="max-w-(--measure-reading)">
        {intro}
      </Text>
    </div>
  )
}

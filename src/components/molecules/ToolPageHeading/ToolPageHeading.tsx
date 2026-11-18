import { Text } from '@ds/atoms/Text'

type ToolPageHeadingProps = {
  title: string
  intro: string
}

export function ToolPageHeading({ title, intro }: ToolPageHeadingProps) {
  return (
    <div className="grid gap-group">
      <Text variant="toolTitle">{title}</Text>
      <Text variant="ui" as="p" isMuted className="max-w-(--measure-reading)">
        {intro}
      </Text>
    </div>
  )
}

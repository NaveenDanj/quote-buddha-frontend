import { Icon, type IconName } from '@ds/atoms/Icon'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'

type EmptyStateProps = {
  icon?: IconName
  title: string
  description?: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <Surface
      gap={SurfaceSpace.small}
      padding={SurfaceSpace.medium}
      className="justify-items-center text-center text-text-muted"
    >
      {icon ? <Icon name={icon} size="large" /> : null}
      <Text variant="label" as="p">
        {title}
      </Text>
      {description ? (
        <Text variant="caption" as="p">
          {description}
        </Text>
      ) : null}
    </Surface>
  )
}

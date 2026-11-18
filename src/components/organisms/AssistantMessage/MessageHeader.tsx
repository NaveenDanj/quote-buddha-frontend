import type { ReactNode } from 'react'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

export function MessageHeader({ children }: { children?: ReactNode }) {
  return (
    <Text variant="caption" as="div" isMuted className="flex flex-wrap items-center gap-block">
      <Text variant="caption" as="b" weight="semibold" className="text-text">
        {wording.productName}
      </Text>
      {children}
    </Text>
  )
}

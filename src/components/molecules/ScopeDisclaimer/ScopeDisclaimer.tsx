import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

export function ScopeDisclaimer() {
  return (
    <Text
      variant="caption"
      as="p"
      isMuted
      className="max-w-(--measure-reading) border-t border-border pt-block"
    >
      {wording.verifyDisclaimer}
    </Text>
  )
}

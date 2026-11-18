import { LinkButton } from '@ds/atoms/LinkButton'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

type FootnoteMarkerProps = {
  number: number
  onOpen: (number: number) => void
}

// The marker is a small superscript, so a pseudo-element makes the clickable area big enough to hit.
export function FootnoteMarker({ number, onOpen }: FootnoteMarkerProps) {
  return (
    <Text variant="small" className="align-super leading-none">
      <LinkButton
        textVariant="small"
        weight="medium"
        isUnderlined={false}
        isAccent
        aria-label={`${wording.sourceLabel} ${number}`}
        onClick={() => onOpen(number)}
        className="px-px before:-inset-x-1 before:-inset-y-3"
      >
        {`[${number}]`}
      </LinkButton>
    </Text>
  )
}

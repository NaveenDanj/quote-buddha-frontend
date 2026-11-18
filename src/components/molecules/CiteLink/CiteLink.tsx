import { LinkButton } from '@ds/atoms/LinkButton'

type CiteLinkProps = {
  citationId: string
  label: string
  onOpen: (citationId: string) => void
}

export function CiteLink({ citationId, label, onOpen }: CiteLinkProps) {
  return (
    <LinkButton
      textVariant="code"
      weight="medium"
      className="whitespace-nowrap"
      onClick={() => onOpen(citationId)}
    >
      {label}
    </LinkButton>
  )
}

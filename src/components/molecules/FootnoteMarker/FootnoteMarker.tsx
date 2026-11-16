import { wording } from '@wording'

type FootnoteMarkerProps = {
  number: number
  onOpen: (number: number) => void
}

// The marker is a small superscript, so a pseudo-element makes the clickable area big enough to hit.
export function FootnoteMarker({ number, onOpen }: FootnoteMarkerProps) {
  return (
    <span className="align-super text-stamp leading-none">
      <button
        type="button"
        aria-label={`${wording.sourceLabel} ${number}`}
        onClick={() => onOpen(number)}
        className="relative cursor-pointer border-0 bg-transparent px-px font-ui font-medium text-accent before:absolute before:-inset-x-1 before:-inset-y-3 before:content-[''] hover:underline"
      >
        {`[${number}]`}
      </button>
    </span>
  )
}

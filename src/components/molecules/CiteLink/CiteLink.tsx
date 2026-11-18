type CiteLinkProps = {
  citationId: string
  label: string
  onOpen: (citationId: string) => void
}

// The pseudo-element makes the clickable area taller than the line of text, which is too small to hit on a phone.
export function CiteLink({ citationId, label, onOpen }: CiteLinkProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(citationId)}
      className="relative cursor-pointer border-0 bg-transparent font-code text-code font-medium whitespace-nowrap text-text underline decoration-1 underline-offset-4 transition-colors duration-(--motion-fast) before:absolute before:inset-x-0 before:-inset-y-2 before:content-[''] hover:text-accent"
    >
      {label}
    </button>
  )
}

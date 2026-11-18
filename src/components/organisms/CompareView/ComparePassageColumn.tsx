import { Mark } from '@ds/atoms/Mark'
import { Select } from '@ds/atoms/Select'
import { Text } from '@ds/atoms/Text'
import { markTerms, type ComparableOption, type ComparablePassage } from '@domain'

type ComparePassageColumnProps = {
  label: string
  options: ComparableOption[]
  selectedCitationId?: string
  onChoosePassage: (citationId: string) => void
  passage?: ComparablePassage
  // The terms to underline in the Pali, for example the ones both passages share.
  markedTerms: string[]
}

// One of the two passages: a list to choose it from, its Pali with the shared terms underlined, and the translation.
export function ComparePassageColumn({
  label,
  options,
  selectedCitationId,
  onChoosePassage,
  passage,
  markedTerms,
}: ComparePassageColumnProps) {
  const paliParts = passage ? markTerms(passage.paliText, markedTerms) : []

  return (
    <div className="grid min-w-0 content-start gap-group">
      <Select
        label={label}
        options={options.map((option) => ({ value: option.citationId, label: option.label }))}
        value={selectedCitationId}
        onValueChange={onChoosePassage}
      />
      {passage ? (
        <>
          <Text variant="readingLarge" as="p" lang="pi">
            {paliParts.map((part, index) =>
              part.isMarked ? (
                <Mark key={index}>{part.text}</Mark>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </Text>
          <Text variant="reading" as="p">
            {passage.translationText}
          </Text>
        </>
      ) : null}
    </div>
  )
}

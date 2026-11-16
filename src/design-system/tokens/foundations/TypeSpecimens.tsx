import { readTokenText } from './readToken'

type Specimen = {
  role: string
  sizeToken: string
  className: string
  sample: string
  language?: string
}

const specimens: Specimen[] = [
  {
    role: 'Display',
    sizeToken: '--text-display',
    className: 'font-reading text-display font-normal',
    sample: 'What does the text say?',
  },
  {
    role: 'Heading 1',
    sizeToken: '--text-heading-1',
    className: 'font-reading text-heading-1 font-normal',
    sample: 'Sources for this answer',
  },
  {
    role: 'Heading 2',
    sizeToken: '--text-heading-2',
    className: 'font-reading text-heading-2 font-medium',
    sample: 'Evidence matrix',
  },
  {
    role: 'Heading 3',
    sizeToken: '--text-heading-3',
    className: 'font-reading text-heading-3 font-medium',
    sample: 'Claim 1',
  },
  {
    role: 'Reading',
    sizeToken: '--text-reading',
    className: 'font-reading text-reading',
    sample: 'Sample sentence in the reading size, used for answers and quotations.',
  },
  {
    role: 'Reading large',
    sizeToken: '--text-reading-large',
    className: 'font-reading text-reading-large',
    sample: 'Sample sentence in the large reading size.',
  },
  {
    role: 'Pali',
    sizeToken: '--text-pali',
    className: 'font-reading text-pali',
    sample: 'Evaṃ me sutaṃ. ṃ ñ ṇ ṭ ḍ ḷ ṅ ā ī ū',
    language: 'pi',
  },
  {
    role: 'UI',
    sizeToken: '--text-ui',
    className: 'font-ui text-ui',
    sample: 'Ask a question about the early texts',
  },
  {
    role: 'Label',
    sizeToken: '--text-label',
    className: 'font-ui text-label font-semibold',
    sample: 'Evidence',
  },
  {
    role: 'Caption',
    sizeToken: '--text-caption',
    className: 'font-ui text-caption',
    sample: 'Translator: not recorded in source',
  },
  {
    role: 'Code and citation IDs',
    sizeToken: '--text-code',
    className: 'font-code text-code',
    sample: 'DN 1 §1.1.3',
  },
]

export function TypeSpecimens() {
  return (
    <div className="font-ui">
      {specimens.map((specimen) => (
        <div key={specimen.role} className="grid gap-1 border-b border-border py-3">
          <div className="font-code text-code text-text-muted">
            {specimen.role} · {specimen.sizeToken} · {readTokenText(specimen.sizeToken)}
          </div>
          <div className={specimen.className} lang={specimen.language}>
            {specimen.sample}
          </div>
        </div>
      ))}
    </div>
  )
}

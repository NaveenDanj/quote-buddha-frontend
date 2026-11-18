import { useState } from 'react'
import { useCheckDocumentMutation } from '@api/documentCheck'
import { sampleDocumentCheckResult } from '@api/documentCheck/sampleDocumentCheck'
import { wording } from '@wording'

// What the page needs: the two inputs, whether a check can start, and what came back.
export function useDocumentCheck() {
  const [pastedText, setPastedText] = useState(wording.documentSampleText)
  const [chosenFile, setChosenFile] = useState<File>()
  const [checkDocument, { data: checkedResult, isLoading: isChecking }] = useCheckDocumentMutation()

  // Until the backend answers, the page shows the sample result, as the prototype does.
  const result = checkedResult ?? sampleDocumentCheckResult

  const hasSomethingToCheck = pastedText.trim().length > 0 || chosenFile !== undefined

  function check() {
    void checkDocument({ pastedText, file: chosenFile })
  }

  return {
    pastedText,
    setPastedText,
    chosenFile,
    setChosenFile,
    canCheck: hasSomethingToCheck,
    isChecking,
    result,
    check,
  }
}

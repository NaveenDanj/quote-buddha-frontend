import { useState } from 'react'
import { useCheckDocumentMutation } from '@api/documentCheck'

// What the page needs: the two inputs, whether a check can start, and what came back.
export function useDocumentCheck() {
  const [pastedText, setPastedText] = useState('')
  const [chosenFile, setChosenFile] = useState<File>()
  const [checkDocument, { data: result, isLoading: isChecking }] = useCheckDocumentMutation()

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

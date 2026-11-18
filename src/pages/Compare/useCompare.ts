import { useState } from 'react'
import { useNavigate } from 'react-router'
import { compareTerms } from '@domain'
import { useGetComparableOptionsQuery, useGetComparablePassageQuery } from '@api/compare'
import { useCreateFreeNoteMutation } from '@api/notebook'
import { useNewQuestion } from '@pages/NewChat/useNewQuestion'
import { AppPath } from '@pages/routes'
import { askAboutDifferenceQuestion, compareNoteText } from '@wording'

// What the Compare page needs: the two chosen passages, and what to do with the comparison.
export function useCompare() {
  const navigate = useNavigate()
  const newQuestion = useNewQuestion()
  const [createFreeNote] = useCreateFreeNoteMutation()
  const { data: options } = useGetComparableOptionsQuery()
  const [chosenFirstId, setChosenFirstId] = useState<string>()
  const [chosenSecondId, setChosenSecondId] = useState<string>()

  const allOptions = options ?? []
  // Until two are chosen, the first two passages are compared.
  const firstCitationId = chosenFirstId ?? allOptions[0]?.citationId
  const secondCitationId = chosenSecondId ?? allOptions[1]?.citationId
  const { data: firstPassage } = useGetComparablePassageQuery(firstCitationId)
  const { data: secondPassage } = useGetComparablePassageQuery(secondCitationId)

  function addToNotebook() {
    if (!firstPassage || !secondPassage) {
      return
    }
    const comparison = compareTerms(firstPassage.terms, secondPassage.terms)
    createFreeNote(compareNoteText(firstPassage.label, secondPassage.label, comparison.shared))
    navigate(AppPath.notebook)
  }

  function askAboutDifference() {
    if (firstPassage && secondPassage) {
      void newQuestion.sendQuestion(
        askAboutDifferenceQuestion(firstPassage.label, secondPassage.label),
      )
    }
  }

  return {
    options: allOptions,
    firstCitationId,
    secondCitationId,
    chooseFirst: setChosenFirstId,
    chooseSecond: setChosenSecondId,
    firstPassage,
    secondPassage,
    addToNotebook,
    askAboutDifference,
  }
}

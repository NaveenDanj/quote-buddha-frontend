import { useState } from 'react'
import { useNavigate } from 'react-router'
import { filterTerms } from '@domain'
import { useGetTermQuery, useGetTermsQuery } from '@api/terms'
import { useNewQuestion } from '@pages/NewChat/useNewQuestion'
import { AppPath } from '@pages/routes'
import { askAboutTermQuestion } from '@wording'

// What the Terms page needs: the terms that match the search, the chosen term, and what to do with it.
export function useTerms() {
  const navigate = useNavigate()
  const newQuestion = useNewQuestion()
  const { data: terms } = useGetTermsQuery()
  const [query, setQuery] = useState('')
  const [chosenTermId, setChosenTermId] = useState<string>()

  const allTerms = terms ?? []
  const matchingTerms = filterTerms(allTerms, query)
  // Until one is chosen, the first term is shown.
  const selectedTermId = chosenTermId ?? allTerms[0]?.id
  const { data: term } = useGetTermQuery(selectedTermId)

  function openReader() {
    navigate(AppPath.reader)
  }

  function askAboutTerm() {
    if (term) {
      void newQuestion.sendQuestion(askAboutTermQuestion(term.pali))
    }
  }

  return {
    terms: matchingTerms,
    query,
    setQuery,
    selectedTermId,
    chooseTerm: setChosenTermId,
    term,
    openReader,
    askAboutTerm,
  }
}

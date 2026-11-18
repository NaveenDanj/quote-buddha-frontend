import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { CheckDocument } from '@pages/CheckDocument'
import { Conversation } from '@pages/Conversation'
import { NewChat } from '@pages/NewChat'
import { Notebook } from '@pages/Notebook'
import { Reader } from '@pages/Reader'
import { VerifyQuote } from '@pages/VerifyQuote'
import { AppPath } from '@pages/routes'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath.newChat} element={<NewChat />} />
        <Route path={AppPath.chat} element={<Conversation />} />
        <Route path={AppPath.checkDocument} element={<CheckDocument />} />
        <Route path={AppPath.verifyQuote} element={<VerifyQuote />} />
        <Route path={AppPath.reader} element={<Reader />} />
        <Route path={AppPath.notebook} element={<Notebook />} />
        <Route path="*" element={<Navigate to={AppPath.newChat} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

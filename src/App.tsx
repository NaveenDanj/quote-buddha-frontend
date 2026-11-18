import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Conversation } from '@pages/Conversation'
import { NewChat } from '@pages/NewChat'
import { AppPath } from '@pages/routes'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath.newChat} element={<NewChat />} />
        <Route path={AppPath.chat} element={<Conversation />} />
        <Route path="*" element={<Navigate to={AppPath.newChat} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

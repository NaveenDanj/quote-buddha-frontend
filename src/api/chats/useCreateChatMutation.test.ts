import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { clearChats } from './chatStore'
import { useCreateChatMutation } from './useCreateChatMutation'
import { useGetChatsQuery } from './useGetChatsQuery'

describe('chats', () => {
  beforeEach(() => clearChats())

  it('starts with no chats', () => {
    const { result } = renderHook(() => useGetChatsQuery())

    expect(result.current.data).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('shows a created chat to every component that reads the chats', async () => {
    const { result } = renderHook(() => ({
      chats: useGetChatsQuery(),
      create: useCreateChatMutation(),
    }))
    const [createChat] = result.current.create

    let createdTitle = ''
    await act(async () => {
      const chat = await createChat({ title: 'What is diṭṭhi?' }).unwrap()
      createdTitle = chat.title
    })

    expect(createdTitle).toBe('What is diṭṭhi?')
    expect(result.current.chats.data?.map((chat) => chat.title)).toEqual(['What is diṭṭhi?'])
  })
})

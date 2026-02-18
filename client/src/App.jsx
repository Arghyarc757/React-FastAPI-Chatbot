import { useState, useCallback } from 'react'
import { streamChat } from './api/chat'
import MessageList from './components/MessageList'
import SearchStatus from './components/SearchStatus'
import ChatInput from './components/ChatInput'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [checkpointId, setCheckpointId] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [searchState, setSearchState] = useState({ phase: null, query: '', urls: [] })

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isStreaming) return

    const userMessage = { role: 'user', content: text.trim() }
    setMessages((prev) => [...prev, userMessage])
    setIsStreaming(true)
    setSearchState({ phase: null, query: '', urls: [] })

    let assistantContent = ''
    setMessages((prev) => [...prev, { role: 'assistant', content: '', isStreaming: true }])

    await streamChat(text.trim(), checkpointId, {
      onCheckpoint: (id) => setCheckpointId(id),
      onContent: (chunk) => {
        assistantContent += chunk
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant') {
            next[next.length - 1] = { ...last, content: assistantContent, isStreaming: true }
          }
          return next
        })
      },
      onSearchStart: (query) => setSearchState({ phase: 'searching', query, urls: [] }),
      onSearchResults: (urls) => setSearchState((s) => ({ ...s, phase: 'reading', urls })),
      onEnd: () => {
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant') next[next.length - 1] = { ...last, isStreaming: false }
          return next
        })
        setSearchState({ phase: 'writing', query: '', urls: [] })
      },
      onError: (err) => {
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant')
            next[next.length - 1] = { ...last, content: last.content || `Error: ${err.message}`, isStreaming: false }
          return next
        })
      },
    })

    setIsStreaming(false)
    setSearchState({ phase: null, query: '', urls: [] })
  }, [checkpointId, isStreaming])

  const handleNewChat = useCallback(() => {
    setMessages([])
    setCheckpointId(null)
    setSearchState({ phase: null, query: '', urls: [] })
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">July</h1>
        <button type="button" className="btn-new" onClick={handleNewChat}>
          New chat
        </button>
      </header>

      <main className="main">
        <MessageList messages={messages} />
        {messages.length > 0 && (
          <SearchStatus phase={searchState.phase} query={searchState.query} urls={searchState.urls} />
        )}
        <ChatInput onSend={handleSend} disabled={isStreaming} placeholder="Ask anything..." />
      </main>
    </div>
  )
}

export default App

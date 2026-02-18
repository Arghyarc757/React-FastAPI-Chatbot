import { useState } from 'react'
import './ChatInput.css'

export default function ChatInput({ onSend, disabled, placeholder }) {
  const [value, setValue] = useState('')

  const submit = () => {
    const t = value.trim()
    if (!t || disabled) return
    onSend(t)
    setValue('')
  }

  return (
    <div className="chat-input-wrap">
      <textarea
        className="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            submit()
          }
        }}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
      />
      <button
        type="button"
        className="chat-send"
        onClick={submit}
        disabled={disabled || !value.trim()}
      >
        Send
      </button>
    </div>
  )
}

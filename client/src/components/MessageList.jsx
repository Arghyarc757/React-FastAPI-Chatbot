import './MessageList.css'

export default function MessageList({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>Send a message to start. I can search the web when needed.</p>
      </div>
    )
  }

  return (
    <div className="message-list">
      {messages.map((msg, i) => (
        <div key={i} className={`message message--${msg.role}`}>
          <span className="message-role">{msg.role === 'user' ? 'You' : 'Assistant'}</span>
          <div className="message-content">
            {msg.content || (msg.isStreaming ? '…' : '')}
            {msg.isStreaming && <span className="message-cursor" />}
          </div>
        </div>
      ))}
    </div>
  )
}

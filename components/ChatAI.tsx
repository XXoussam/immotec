'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Sparkles, ChevronDown } from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'ai'
  text: string
}

const INITIAL: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: 'Bonjour ! Je suis l\'assistant Immotec. Posez-moi vos questions sur l\'immobilier parisien.',
  },
]

export default function ChatAI() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL)
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (text: string) => {
    if (!text.trim() || typing) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: 'Merci pour votre message. Un conseiller Immotec vous apportera une réponse personnalisée très prochainement.',
        },
      ])
      setTyping(false)
    }, 900)
  }

  return (
    <>
      <button
        className="chat-trigger"
        onClick={() => setOpen(v => !v)}
        aria-label="Assistant IA Immotec"
      >
        {open ? <X size={19} /> : <MessageSquare size={19} />}
      </button>

      <div className={`chat-panel${open ? ' chat-panel--open' : ''}`}>

        <div className="chat-header">
          <div className="chat-header-left">
            <Sparkles size={13} className="chat-spark" />
            <span>Assistant Immotec</span>
            <ChevronDown size={13} className="chat-chevron" />
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Fermer">
            <X size={15} />
          </button>
        </div>

        <div className="chat-messages" data-lenis-prevent>
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg chat-msg--${msg.role}`}>
              {msg.role === 'ai' && (
                <div className="chat-avatar">
                  <Sparkles size={10} />
                </div>
              )}
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chat-msg chat-msg--ai">
              <div className="chat-avatar"><Sparkles size={10} /></div>
              <div className="chat-bubble chat-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Posez votre question…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
          />
          <button className="chat-send" onClick={() => send(input)} aria-label="Envoyer">
            <Send size={14} />
          </button>
        </div>

      </div>
    </>
  )
}

import { useState } from 'react'
import { SUGGESTIONS, replyTo } from '../lib/agentReplies.js'

let nextId = 1

function createMessage(author, text) {
  nextId += 1
  return { id: nextId, author, text }
}

const INITIAL = [
  createMessage(
    'prototipo',
    'Este chat é um protótipo sem integração com modelo de IA. As respostas são textos locais, escolhidos por palavras da sua mensagem.',
  ),
]

export default function AgentPage() {
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [messages, setMessages] = useState(INITIAL)

  function send(text) {
    const value = text.trim()
    if (!value) {
      setError('Escreva uma mensagem antes de enviar.')
      return
    }
    if (value.length > 400) {
      setError('Use no máximo 400 caracteres.')
      return
    }
    setError('')
    setDraft('')
    setMessages((current) => [
      ...current,
      createMessage('voce', value),
      createMessage('prototipo', replyTo(value)),
    ])
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Flow Agent</p>
        <h1>Perguntas sobre esta demonstração</h1>
        <p className="lead">
          A conversa ajuda a explicar os módulos. Ela não pesquisa vagas, não
          lê currículos e não consulta um modelo.
        </p>
        <p className="demo-flag">Protótipo · respostas demonstrativas locais</p>
      </header>

      <section className="chat panel" aria-labelledby="conversa">
        <h2 id="conversa" className="sr-only">Conversa demonstrativa</h2>
        <ol className="messages" aria-live="polite">
          {messages.map((message) => (
            <li key={message.id} className={message.author}>
              <span>{message.author === 'voce' ? 'Você' : 'Resposta demonstrativa'}</span>
              <p>{message.text}</p>
            </li>
          ))}
        </ol>
        <div className="suggestions">
          {SUGGESTIONS.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => send(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            send(draft)
          }}
        >
          <label htmlFor="mensagem">Mensagem</label>
          <div className="composer">
            <textarea
              id="mensagem"
              rows={3}
              maxLength={400}
              value={draft}
              placeholder="Pergunte como a divergência é classificada"
              onChange={(event) => setDraft(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'erro-mensagem' : undefined}
            />
            <button type="submit" className="button primary">
              Enviar
            </button>
          </div>
          {error ? <p id="erro-mensagem" className="field-error" role="alert">{error}</p> : null}
        </form>
      </section>
    </div>
  )
}

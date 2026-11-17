
import { useState } from 'react'

let nextId = 1

function createMessage(author, text) {
  nextId += 1
  return { id: nextId, author, text }
}

const INITIAL = [
  createMessage(
    'prototipo',
    'Olá! Sou o FLOW.AGENT. Descreva uma tarefa repetitiva ou um processo que você gostaria de melhorar. Vou sugerir possibilidades de automação com IA.'
  ),
]

const SUGGESTIONS = [
  'Como automatizar a conferência de planilhas?',
  'Como reduzir tarefas repetitivas no trabalho?',
  'Como usar IA para analisar dados?',
]

export default function AgentPage() {
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [messages, setMessages] = useState(INITIAL)
  const [loading, setLoading] = useState(false)

  async function send(text) {
    const value = text.trim()

    if (loading) return

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
    setLoading(true)

    setMessages((current) => [
      ...current,
      createMessage('voce', value),
    ])

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: value }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao consultar a IA.')
      }

      setMessages((current) => [
        ...current,
        createMessage('prototipo', data.answer),
      ])
    } catch (err) {
      setError(err.message || 'Não foi possível conectar à IA.')
      setDraft(value)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Flow Agent</p>
        <h1>Seu assistente de automação com IA</h1>
        <p className="lead">
          Descreva uma atividade repetitiva e descubra como
          simplificá-la com inteligência artificial e automações.
        </p>
        <p className="demo-flag">
          Protótipo experimental · respostas geradas por IA
        </p>
      </header>

      <section className="chat panel" aria-labelledby="conversa">
        <h2 id="conversa" className="sr-only">
          Conversa com FLOW.AGENT
        </h2>

        <ol className="messages" aria-live="polite">
          {messages.map((message) => (
            <li key={message.id} className={message.author}>
              <span>
                {message.author === 'voce'
                  ? 'Você'
                  : 'FLOW.AGENT'}
              </span>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {message.text}
              </p>
            </li>
          ))}

          {loading && (
            <li className="prototipo">
              <span>FLOW.AGENT</span>
              <p>Analisando sua solicitação...</p>
            </li>
          )}
        </ol>

        <div className="suggestions">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={loading}
              onClick={() => send(suggestion)}
            >
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
              placeholder="Ex.: preciso conferir 50 planilhas toda semana..."
              onChange={(event) => setDraft(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? 'erro-mensagem' : undefined
              }
              disabled={loading}
            />

            <button
              type="submit"
              className="button primary"
              disabled={loading}
            >
              {loading ? 'Analisando...' : 'Enviar'}
            </button>
          </div>

          {error && (
            <p
              id="erro-mensagem"
              className="field-error"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>
      </section>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { CLASS_META } from '../lib/compareOrder.js'
import { SIMULATION_ORDER } from '../lib/demoOrders.js'
import { formatAmount, formatMoney, formatPercent } from '../lib/format.js'

const STEPS = [
  {
    title: 'Ler o exemplo',
    detail: 'A página usa um registro fictício definido no código.',
  },
  {
    title: 'Conferir campos',
    detail: 'Identificador, serviço e os dois valores estão preenchidos.',
  },
  {
    title: 'Calcular a diferença',
    detail: 'Aplica valor medido menos valor solicitado.',
  },
  {
    title: 'Classificar',
    detail: 'Usa a mesma regra publicada no Flow Analyze.',
  },
  {
    title: 'Mostrar o resultado',
    detail: 'O resultado aparece só nesta tela. Nada é enviado para fora.',
  },
]

const meta = CLASS_META[SIMULATION_ORDER.classificacao]

function stepMessage(index) {
  if (index === 0) {
    return `${SIMULATION_ORDER.id} carregada: ${SIMULATION_ORDER.servico}.`
  }
  if (index === 1) {
    return 'Campos obrigatórios do exemplo estão presentes.'
  }
  if (index === 2) {
    return `Diferença calculada: ${formatMoney(SIMULATION_ORDER.diferenca)}.`
  }
  if (index === 3) {
    return `${meta.label} (${formatPercent(SIMULATION_ORDER.percentual)}).`
  }
  return 'Simulação encerrada nesta página.'
}

export default function AutomatePage() {
  const [cursor, setCursor] = useState(-1)
  const [log, setLog] = useState([])
  const running = cursor >= 0 && cursor < STEPS.length

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setTimeout(() => {
      setLog((current) => [...current, stepMessage(cursor)])
      setCursor((current) => current + 1)
    }, 700)
    return () => window.clearTimeout(timer)
  }, [running, cursor])

  function run() {
    setLog([])
    setCursor(0)
  }

  function reset() {
    setLog([])
    setCursor(-1)
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Flow Automate</p>
        <h1>Roteiro de verificação, passo a passo</h1>
        <p className="lead">
          As etapas abaixo descrevem uma rotina que esta tela sabe ilustrar.
          O botão apenas avança o exemplo na interface.
        </p>
        <p className="demo-flag">Simulação local · nenhuma automação externa é executada</p>
      </header>

      <section className="panel" aria-labelledby="exemplo">
        <h2 id="exemplo">Exemplo usado na simulação</h2>
        <dl className="facts">
          <div>
            <dt>Ordem</dt>
            <dd>{SIMULATION_ORDER.id}</dd>
          </div>
          <div>
            <dt>Serviço</dt>
            <dd>{SIMULATION_ORDER.servico}</dd>
          </div>
          <div>
            <dt>Processo</dt>
            <dd>{SIMULATION_ORDER.processo}</dd>
          </div>
          <div>
            <dt>Solicitado</dt>
            <dd>{formatAmount(SIMULATION_ORDER.solicitado)}</dd>
          </div>
          <div>
            <dt>Medido</dt>
            <dd>{formatAmount(SIMULATION_ORDER.medido)}</dd>
          </div>
        </dl>
        <div className="actions">
          <button type="button" className="button primary" onClick={run} disabled={running}>
            {running ? 'Simulação em andamento' : 'Executar simulação'}
          </button>
          <button type="button" className="button ghost" onClick={reset} disabled={running || cursor < 0}>
            Limpar simulação
          </button>
        </div>
      </section>

      <ol className="steps">
        {STEPS.map((step, index) => {
          const state = cursor < 0 ? 'wait' : index < cursor ? 'done' : index === cursor ? 'now' : 'wait'
          return (
            <li key={step.title} className={state}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <section className="panel" aria-live="polite">
        <h2>Registro da execução simulada</h2>
        {log.length === 0 ? (
          <p className="empty">A simulação ainda não foi executada nesta visita à página.</p>
        ) : (
          <ul className="log">
            {log.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
        {cursor >= STEPS.length ? (
          <p className={`badge ${meta.tone}`}>
            Resultado do exemplo: {meta.label}
          </p>
        ) : null}
      </section>
    </div>
  )
}

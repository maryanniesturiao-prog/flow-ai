import { useState } from 'react'
import { CLASS_META, summarizeOrders } from '../lib/compareOrder.js'
import { DEMO_ORDERS, withComparison } from '../lib/demoOrders.js'
import { formatAmount, formatMoney, formatPercent, parseAmount } from '../lib/format.js'

const EMPTY = {
  id: '',
  servico: '',
  processo: '',
  solicitado: '',
  medido: '',
}

function validate(form, orders) {
  const errors = {}
  const id = form.id.trim()
  if (!/^[A-Za-z0-9-]{3,20}$/.test(id)) {
    errors.id = 'Use de 3 a 20 letras, números ou hífen.'
  } else if (orders.some((order) => order.id.toLowerCase() === id.toLowerCase())) {
    errors.id = 'Este identificador já está na tabela.'
  }

  if (form.servico.trim().length < 3) {
    errors.servico = 'Descreva o serviço com pelo menos 3 caracteres.'
  }
  if (form.processo.trim().length < 3) {
    errors.processo ='Informe o nome do projeto ou processo analisado.'
  }

  const solicitado = parseAmount(form.solicitado)
  const medido = parseAmount(form.medido)
  if (!solicitado.ok) errors.solicitado = solicitado.error
  if (!medido.ok) errors.medido = medido.error

  return {
    errors,
    value:
      solicitado.ok && medido.ok
        ? {
            id,
            servico: form.servico.trim(),
            processo: form.processo.trim(),
            solicitado: solicitado.value,
            medido: medido.value,
          }
        : null,
  }
}

export default function AnalyzePage() {
  const [orders, setOrders] = useState(DEMO_ORDERS)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('A tabela começou com a amostra fictícia.')
  const summary = summarizeOrders(orders)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const result = validate(form, orders)
    setErrors(result.errors)
    if (Object.keys(result.errors).length > 0) {
      setNotice('Revise os campos destacados antes de incluir a ordem.')
      return
    }
    setOrders((current) => [withComparison(result.value), ...current])
    setForm(EMPTY)
    setNotice(`${result.value.id} entrou na tabela com a comparação calculada nesta página.`)
  }

  function removeOrder(id) {
    setOrders((current) => current.filter((order) => order.id !== id))
    setNotice(`${id} foi removida desta sessão.`)
  }

  function restoreSample() {
    setOrders(DEMO_ORDERS)
    setForm(EMPTY)
    setErrors({})
    setNotice('Amostra fictícia restaurada.')
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Flow Analyze</p>
        <h1>Comparar valor solicitado e valor medido</h1>
        <p className="lead">
          Informe uma ordem fictícia. A diferença e a classificação são
          calculadas no navegador, com a regra publicada ao lado do formulário.
        </p>
      </header>

      <div className="split">
        <form className="panel" onSubmit={onSubmit} noValidate>
          <h2>Nova ordem fictícia</h2>
          <div className="fields">
            <label>
              Identificador
              <input
                value={form.id}
                onChange={(event) => update('id', event.target.value)}
                placeholder="OS-2500"
                aria-invalid={Boolean(errors.id)}
                aria-describedby={errors.id ? 'erro-id' : undefined}
              />
              {errors.id ? <span id="erro-id" className="field-error">{errors.id}</span> : null}
            </label>
            <label>
              Serviço
              <input
                value={form.servico}
                onChange={(event) => update('servico', event.target.value)}
                placeholder="Entrevista estruturada"
                aria-invalid={Boolean(errors.servico)}
                aria-describedby={errors.servico ? 'erro-servico' : undefined}
              />
              {errors.servico ? (
                <span id="erro-servico" className="field-error">{errors.servico}</span>
              ) : null}
            </label>
            <label className="wide">
              Processo seletivo fictício
              <input
                value={form.processo}
                onChange={(event) => update('processo', event.target.value)}
                placeholder="Analista financeiro — Casa Horizonte"
                aria-invalid={Boolean(errors.processo)}
                aria-describedby={errors.processo ? 'erro-processo' : undefined}
              />
              {errors.processo ? (
                <span id="erro-processo" className="field-error">{errors.processo}</span>
              ) : null}
            </label>
            <label>
              Valor solicitado
              <input
                inputMode="decimal"
                value={form.solicitado}
                onChange={(event) => update('solicitado', event.target.value)}
                placeholder="1500,00"
                aria-invalid={Boolean(errors.solicitado)}
                aria-describedby={errors.solicitado ? 'erro-solicitado' : undefined}
              />
              {errors.solicitado ? (
                <span id="erro-solicitado" className="field-error">{errors.solicitado}</span>
              ) : null}
            </label>
            <label>
              Valor medido
              <input
                inputMode="decimal"
                value={form.medido}
                onChange={(event) => update('medido', event.target.value)}
                placeholder="1600,00"
                aria-invalid={Boolean(errors.medido)}
                aria-describedby={errors.medido ? 'erro-medido' : undefined}
              />
              {errors.medido ? (
                <span id="erro-medido" className="field-error">{errors.medido}</span>
              ) : null}
            </label>
          </div>
          <div className="actions">
            <button type="submit" className="button primary">
              Incluir na tabela
            </button>
            <button
              type="button"
              className="button ghost"
              onClick={() => {
                setForm(EMPTY)
                setErrors({})
              }}
            >
              Limpar formulário
            </button>
          </div>
        </form>

        <aside className="panel rule">
          <h2>Regra usada na comparação</h2>
          <ol>
            <li>Diferença = valor medido − valor solicitado.</li>
            <li>Diferença absoluta menor que R$ 0,01: Conforme.</li>
            <li>Valor solicitado zero, com diferença: Divergência crítica. Não há percentual.</li>
            <li>Até 5% do solicitado: Divergência leve.</li>
            <li>Acima de 5% e até 15%: Divergência relevante.</li>
            <li>Acima de 15%: Divergência crítica.</li>
          </ol>
        </aside>
      </div>

      <p className="notice" role="status">{notice}</p>

      <section className="panel table-panel" aria-labelledby="resultado">
        <div className="section-head">
          <h2 id="resultado">Resultado nesta sessão</h2>
          <button type="button" className="button ghost" onClick={restoreSample}>
            Restaurar amostra
          </button>
        </div>
        <p className="note">
          {summary.total === 0
            ? 'Nenhuma ordem na tabela.'
            : `${summary.total} ${summary.total === 1 ? 'ordem' : 'ordens'} · ${summary.divergentes} com divergência. Contagem apenas do que está visível agora.`}
        </p>
        {orders.length === 0 ? (
          <p className="empty">Inclua uma ordem ou restaure a amostra fictícia.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <caption>Ordens fictícias e classificação calculada localmente</caption>
              <thead>
                <tr>
                  <th scope="col">Ordem</th>
                  <th scope="col">Valor solicitado</th>
                  <th scope="col">Valor medido</th>
                  <th scope="col">Diferença</th>
                  <th scope="col">Classificação</th>
                  <th scope="col">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const meta = CLASS_META[order.classificacao]
                  return (
                    <tr key={order.id}>
                      <th scope="row">
                        <strong>{order.id}</strong>
                        <span>{order.servico}</span>
                        <span>{order.processo}</span>
                      </th>
                      <td>{formatAmount(order.solicitado)}</td>
                      <td>{formatAmount(order.medido)}</td>
                      <td>{formatMoney(order.diferenca)}</td>
                      <td>
                        <span className={`badge ${meta.tone}`}>{meta.label}</span>
                        <span className="percent">{formatPercent(order.percentual)}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => removeOrder(order.id)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

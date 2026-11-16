import { CLASS_META, summarizeOrders } from '../lib/compareOrder.js'
import { DEMO_ORDERS } from '../lib/demoOrders.js'
import { formatAmount, formatMoney, formatPercent } from '../lib/format.js'

const summary = summarizeOrders(DEMO_ORDERS)
const preview = DEMO_ORDERS.find((order) => order.classificacao !== 'conforme')

const modules = [
  {
    href: '#analisar',
    kicker: 'Módulo 1',
    title: 'Flow Analyze',
    text: 'Inclua ordens fictícias e veja valor solicitado, valor medido, diferença e classificação. A conta é feita em JavaScript no navegador.',
  },
  {
    href: '#automatizar',
    kicker: 'Módulo 2',
    title: 'Flow Automate',
    text: 'Um roteiro visual com cinco etapas e um exemplo que avança na tela. A execução é uma simulação local, sem sistema externo.',
  },
  {
    href: '#agente',
    kicker: 'Módulo 3',
    title: 'Flow Agent',
    text: 'Um chat para consultar o próprio protótipo. As respostas são textos prontos, sem modelo de IA.',
  },
]

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Plataforma de demonstração</p>
          <h1>Apoio visual à conferência de ordens de serviço.</h1>
          <p className="lead">
            O FLOW.AI mostra, nesta primeira versão, como um recrutador pode
            comparar valores, acompanhar um roteiro de verificação e ler
            explicações do próprio protótipo. Nada aqui consulta sistemas
            externos.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#analisar">
              Abrir Flow Analyze
            </a>
            <a className="button ghost" href="#sobre">
              Sobre o projeto
            </a>
          </div>
        </div>
        <article className="preview-card">
          <p className="demo-flag">Trecho da amostra fictícia</p>
          <h2>{preview.id}</h2>
          <p>{preview.servico}</p>
          <dl>
            <div>
              <dt>Solicitado</dt>
              <dd>{formatAmount(preview.solicitado)}</dd>
            </div>
            <div>
              <dt>Medido</dt>
              <dd>{formatAmount(preview.medido)}</dd>
            </div>
            <div>
              <dt>Diferença</dt>
              <dd>{formatMoney(preview.diferenca)}</dd>
            </div>
          </dl>
          <p className={`badge ${CLASS_META[preview.classificacao].tone}`}>
            {CLASS_META[preview.classificacao].label} · {formatPercent(preview.percentual)}
          </p>
        </article>
      </section>

      <section className="section" aria-labelledby="indicadores">
        <div className="section-head">
          <h2 id="indicadores">Indicadores da amostra</h2>
          <p className="demo-flag">Dados de demonstração</p>
        </div>
        <p className="note">
          Os números abaixo são a contagem da amostra fictícia embutida no
          código ({summary.total} ordens). Não descrevem uma operação real nem
          uma economia de tempo.
        </p>
        <div className="stats">
          <article>
            <strong>{summary.total}</strong>
            <span>ordens na amostra</span>
          </article>
          <article>
            <strong>{summary.conforme}</strong>
            <span>classificadas como conformes</span>
          </article>
          <article>
            <strong>{summary.divergentes}</strong>
            <span>com alguma divergência</span>
          </article>
          <article>
            <strong>3</strong>
            <span>módulos nesta versão</span>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="modulos">
        <div className="section-head">
          <h2 id="modulos">Módulos</h2>
        </div>
        <div className="cards">
          {modules.map((module) => (
            <a key={module.href} className="card" href={module.href}>
              <span className="kicker">{module.kicker}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
              <span className="card-link">Abrir módulo</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

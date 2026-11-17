
import { CLASS_META, summarizeOrders } from '../lib/compareOrder.js'
import { DEMO_ORDERS } from '../lib/demoOrders.js'
import { formatAmount, formatMoney, formatPercent } from '../lib/format.js'
import './HomePage.css'

const summary = summarizeOrders(DEMO_ORDERS)
const preview = DEMO_ORDERS.find(
  (order) => order.classificacao !== 'conforme'
)

const modules = [
  {
    number: '01',
    href: '#analisar',
    title: 'Flow Analyze',
    category: 'ANÁLISE DE DADOS',
    text: 'Compare valores solicitados e medidos, identifique divergências e organize informações para apoiar decisões.',
    icon: '◈',
  },
  {
    number: '02',
    href: '#automatizar',
    title: 'Flow Automate',
    category: 'AUTOMAÇÃO DE PROCESSOS',
    text: 'Explore uma simulação visual de um processo estruturado em etapas, do recebimento à verificação.',
    icon: '↗',
  },
  {
    number: '03',
    href: '#agente',
    title: 'Flow Agent',
    category: 'ASSISTENTE EXPERIMENTAL',
    text: 'Converse com um assistente demonstrativo que explica o funcionamento do projeto por meio de respostas predefinidas.',
    icon: '✳',
  },
]

export default function HomePage() {
  return (
    <div className="page flow-portfolio">
      <section className="flow-intro">
        <div className="flow-intro-content">
          <span className="flow-pill">
            PORTFÓLIO INTERATIVO · 2026
          </span>

          <p className="flow-overline">
            AUTOMAÇÃO / DADOS / TECNOLOGIA
          </p>

          <h1>
            Menos tarefas repetitivas.
            <span> Mais espaço para pensar.</span>
          </h1>

          <p className="flow-description">
            FLOW.AI é um laboratório experimental de
            ferramentas digitais. Uma proposta para explorar
            como dados, processos e interfaces podem tornar
            atividades complexas mais claras e eficientes.
          </p>

          <div className="flow-buttons">
            <a className="flow-button-primary" href="#analisar">
              Explorar ferramentas <span>↗</span>
            </a>
            <a className="flow-button-secondary" href="#sobre">
              Conhecer o projeto
            </a>
          </div>

          <div className="flow-intro-foot">
            <span className="flow-pulse" />
            Protótipo funcional com dados fictícios
          </div>
        </div>

        <div className="flow-art" aria-hidden="true">
          <div className="flow-orbit flow-orbit-one" />
          <div className="flow-orbit flow-orbit-two" />
          <div className="flow-art-core">
            <span>F</span>
          </div>
          <div className="flow-floating flow-floating-one">
            ANALYZE
          </div>
          <div className="flow-floating flow-floating-two">
            AUTOMATE
          </div>
          <div className="flow-floating flow-floating-three">
            AGENT
          </div>
        </div>
      </section>

      <section className="flow-story">
        <div className="flow-section-heading">
          <span className="flow-overline">01 / O CONCEITO</span>
          <h2>Da complexidade à clareza.</h2>
          <p>
            Muitos processos envolvem conferências manuais,
            informações dispersas e etapas repetitivas.
            O FLOW.AI explora três maneiras de organizar
            essas atividades em uma experiência digital.
          </p>
        </div>

        <div className="flow-steps">
          <article>
            <span>01</span>
            <h3>Entender</h3>
            <p>Identificar o problema e organizar os dados.</p>
          </article>
          <div className="flow-step-arrow" aria-hidden="true">→</div>
          <article>
            <span>02</span>
            <h3>Estruturar</h3>
            <p>Transformar tarefas em etapas compreensíveis.</p>
          </article>
          <div className="flow-step-arrow" aria-hidden="true">→</div>
          <article>
            <span>03</span>
            <h3>Experimentar</h3>
            <p>Testar soluções em um ambiente demonstrativo.</p>
          </article>
        </div>
      </section>

      <section className="flow-modules" aria-labelledby="flow-modules-title">
        <div className="flow-section-heading">
          <span className="flow-overline">02 / EXPLORE</span>
          <h2 id="flow-modules-title">
            Três ferramentas. Diferentes possibilidades.
          </h2>
          <p>
            Escolha um módulo e experimente o protótipo.
            Cada ferramenta funciona de forma independente.
          </p>
        </div>

        <div className="flow-module-grid">
          {modules.map((module) => (
            <a
              className="flow-module-card"
              href={module.href}
              key={module.number}
            >
              <div className="flow-module-top">
                <span>{module.number} / 03</span>
                <span className="flow-module-icon">
                  {module.icon}
                </span>
              </div>
              <div>
                <span className="flow-module-category">
                  {module.category}
                </span>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </div>
              <span className="flow-module-link">
                Experimentar módulo <span>↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="flow-results">
        <div className="flow-section-heading">
          <span className="flow-overline">03 / DEMONSTRAÇÃO</span>
          <h2>Uma amostra, números verificáveis.</h2>
          <p>
            Os indicadores abaixo são calculados a partir
            de ordens fictícias incluídas no código.
            Não representam resultados de uma operação real.
          </p>
        </div>

        <div className="flow-stat-grid">
          <article>
            <strong>{summary.total}</strong>
            <span>Ordens na amostra</span>
          </article>
          <article>
            <strong>{summary.conforme}</strong>
            <span>Ordens conformes</span>
          </article>
          <article>
            <strong>{summary.divergentes}</strong>
            <span>Com divergência</span>
          </article>
          <article>
            <strong>03</strong>
            <span>Módulos demonstrativos</span>
          </article>
        </div>

        {preview && (
          <div className="flow-example">
            <div>
              <span className="flow-overline">
                EXEMPLO DE ANÁLISE
              </span>
              <h3>{preview.id}</h3>
              <p>{preview.servico}</p>
            </div>
            <div className="flow-example-values">
              <div>
                <span>Solicitado</span>
                <strong>{formatAmount(preview.solicitado)}</strong>
              </div>
              <div>
                <span>Medido</span>
                <strong>{formatAmount(preview.medido)}</strong>
              </div>
              <div>
                <span>Diferença</span>
                <strong>{formatMoney(preview.diferenca)}</strong>
              </div>
              <div>
                <span>Classificação</span>
                <strong>
                  {CLASS_META[preview.classificacao].label}
                  {' · '}
                  {formatPercent(preview.percentual)}
                </strong>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="flow-final">
        <span className="flow-overline">PRÓXIMO PASSO</span>
        <h2>Agora é sua vez de explorar.</h2>
        <p>
          Experimente as ferramentas e conheça as decisões
          por trás deste protótipo.
        </p>
        <a className="flow-button-primary" href="#analisar">
          Começar demonstração ↗
        </a>
      </section>
    </div>
  )
}

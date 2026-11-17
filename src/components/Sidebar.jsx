
const LINKS = [
  { id: 'inicio', label: 'Início', hint: 'Visão da demonstração' },
  { id: 'estudo', label: 'Estudo de caso', hint: 'Conheça a criação do FLOW.AI' },
  { id: 'analisar', label: 'Flow Analyze', hint: 'Comparar valores' },
  { id: 'automatizar', label: 'Flow Automate', hint: 'Roteiro simulado' },
  { id: 'agente', label: 'Flow Agent', hint: 'Assistente com IA' },
  { id: 'sobre', label: 'Sobre o projeto', hint: 'Escopo e limites' },
]


export default function Sidebar({ view, open }) {
  return (
    <aside className={open ? 'sidebar open' : 'sidebar'} aria-label="Navegação principal">
      <a className="brand" href="#inicio">
        <span className="mark" aria-hidden="true">
          F
        </span>
        <span>
          <strong>FLOW.AI</strong>
          <small>Demonstração para recrutadores</small>
        </span>
      </a>
      <nav>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={view === link.id ? 'page' : undefined}
          >
            <span>{link.label}</span>
            <small>{link.hint}</small>
          </a>
        ))}
      </nav>
      <p className="sidebar-foot">
  FLOW.AI é um projeto experimental.
  Os dados dos módulos demonstrativos são fictícios.
  O Flow Agent utiliza IA quando conectado à API.
</p>
    </aside>
  )
}

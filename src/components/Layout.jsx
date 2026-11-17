import { useState } from 'react'
import Sidebar from './Sidebar.jsx'

const TITLES = {
  inicio: 'Início',
  analisar: 'Flow Analyze',
  automatizar: 'Flow Automate',
  agente: 'Flow Agent',
  estudo: 'Estudo de caso',
  sobre: 'Sobre o projeto',
}

export default function Layout({ view, children }) {
  return <Frame key={view} view={view}>{children}</Frame>
}

function Frame({ view, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="shell">
      <Sidebar view={view} open={open} />
      {open ? (
        <button
          type="button"
          className="backdrop"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="workspace">
        <header className="topbar">
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
          <p className="crumb">{TITLES[view]}</p>
          <p className="topbar-note">FLOW.AI · Plataforma experimental em desenvolvimento</p>
        </header>
        <main className="content" id="conteudo">
          {children}
        </main>
      </div>
    </div>
  )
}

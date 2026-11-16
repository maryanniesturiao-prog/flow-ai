import { useEffect, useState } from 'react'
import Layout from './components/Layout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import AgentPage from './pages/AgentPage.jsx'
import AnalyzePage from './pages/AnalyzePage.jsx'
import AutomatePage from './pages/AutomatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import CaseStudyPage from './pages/CaseStudyPage.jsx'

const VIEWS = ['inicio', 'analisar', 'automatizar', 'agente', 'estudo', 'sobre']

function readView() {
  const hash = window.location.hash.replace('#', '')
  return VIEWS.includes(hash) ? hash : 'inicio'
}

export default function App() {
  const [view, setView] = useState(readView)

  useEffect(() => {
    const onHash = () => setView(readView())
    window.addEventListener('hashchange', onHash)
    if (!VIEWS.includes(window.location.hash.replace('#', ''))) {
      window.location.replace('#inicio')
    }
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const pages = {
    inicio: <HomePage />,
    analisar: <AnalyzePage />,
    automatizar: <AutomatePage />,
    agente: <AgentPage />,
    estudo: <CaseStudyPage />,
    sobre: <AboutPage />,
  }

  return <Layout view={view}>{pages[view]}</Layout>
}

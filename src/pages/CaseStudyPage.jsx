
import './CaseStudyPage.css'

const tools = [
  {
    number: '01',
    title: 'Flow Analyze',
    type: 'Ferramenta funcional',
    description:
      'Compara valores solicitados e medidos, calcula diferenças percentuais e classifica divergências por regras definidas.',
    href: '#analisar',
  },
  {
    number: '02',
    title: 'Flow Automate',
    type: 'Simulação interativa',
    description:
      'Demonstra visualmente um fluxo de conferência em cinco etapas, permitindo acompanhar o processamento de um exemplo fictício.',
    href: '#automatizar',
  },
  {
    number: '03',
    title: 'Flow Agent',
    type: 'Protótipo conversacional',
    description:
      'Apresenta um chat com respostas predefinidas sobre o projeto. A integração com IA generativa é uma evolução planejada.',
    href: '#agente',
  },
]

export default function CaseStudyPage() {
  return (
    <div className="case-study">
      <section className="case-hero">
        <span className="case-eyebrow">
          FLOW.AI / ESTUDO DE CASO / 2026
        </span>

        <h1>
          Da ideia
          <span> à solução.</span>
        </h1>

        <p className="case-lead">
          Como transformar uma atividade repetitiva em uma
          experiência digital mais clara, organizada e testável?
        </p>

        <div className="case-author">
        <img
  className="case-avatar"
  src="/foto-maryannie.jpg.jpeg"
  alt="Foto de Maryannie Sturião"
/>
          <div>
            <strong>Maryannie Sturião</strong>
            <span>Criadora do FLOW.AI</span>
          </div>
        </div>

        <a className="case-primary" href="#analisar">
          Experimentar a plataforma ↗
        </a>
      </section>

      
<section className="case-section case-my-story">
  <span className="case-eyebrow">A HISTÓRIA POR TRÁS DO FLOW.AI</span>

  <h2>Olá, eu sou a Maryannie! 👋</h2>

  <p>
    Sou estudante de Arquitetura e Urbanismo na UFPR,
    técnica em Mecânica pelo IFPR e tenho interesse em
    tecnologia, automação e inteligência artificial.
  </p>

  <p>
    Durante meu estágio no Banco do Brasil, tive contato
    com atividades que envolviam conferência de informações,
    comparação de quantidades e análise de divergências.
    Percebi como esses processos podem exigir tempo e
    atenção quando realizados manualmente.
  </p>

  <div className="case-highlight">
    <span>O QUESTIONAMENTO QUE DEU INÍCIO AO PROJETO</span>
    <h3>
      E se a tecnologia pudesse tornar essas tarefas
      mais simples, rápidas e organizadas?
    </h3>
  </div>

  <p>
    Foi a partir dessa experiência que decidi criar o
    FLOW.AI, um projeto pessoal e independente para
    experimentar soluções digitais que ajudem a
    organizar informações e simplificar processos.
  </p>

  <p>
    Mais do que apresentar uma ideia, queria construir
    algo que outras pessoas pudessem experimentar.
    Por isso, desenvolvi este portfólio interativo.
  </p>

  <a className="case-primary" href="#analisar">
    Agora é sua vez de testar ↗
  </a>
</section>

      <section className="case-section">
        <span className="case-eyebrow">01 / O DESAFIO</span>
        <h2>O tempo gasto em tarefas repetitivas.</h2>
        <p>
          Conferir informações, comparar valores e identificar
          inconsistências são atividades que exigem atenção.
          Quando realizadas manualmente, podem envolver
          várias verificações e cálculos repetidos.
        </p>

        <div className="case-process">
          <div>Receber informações</div>
          <span>→</span>
          <div>Comparar valores</div>
          <span>→</span>
          <div>Identificar divergências</div>
          <span>→</span>
          <div>Organizar resultados</div>
        </div>
      </section>

      <section className="case-section">
        <span className="case-eyebrow">02 / A PROPOSTA</span>
        <h2>Uma ideia, três experimentos.</h2>
        <p>
          O FLOW.AI nasceu como um laboratório de soluções
          digitais para explorar diferentes formas de apoiar
          processos: análise de dados, simulação de automações
          e interação conversacional.
        </p>

        <div className="case-highlight">
          <span>O PRINCÍPIO DO PROJETO</span>
          <h3>
            A tecnologia deve simplificar o trabalho,
            não tornar o processo mais complicado.
          </h3>
        </div>
      </section>

      <section className="case-section">
        <span className="case-eyebrow">03 / AS FERRAMENTAS</span>
        <h2>Explore o que foi construído.</h2>
        <p>
          Os módulos podem ser testados individualmente,
          utilizando dados fictícios e sem conexão com
          sistemas corporativos.
        </p>

        <div className="case-tool-grid">
          {tools.map((tool) => (
            <article className="case-tool" key={tool.number}>
              <span className="case-tool-number">
                {tool.number} / 03
              </span>
              <span className="case-tool-type">
                {tool.type}
              </span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <a href={tool.href}>
                Testar ferramenta ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section">
        <span className="case-eyebrow">04 / COMO FUNCIONA</span>
        <h2>Da entrada ao resultado.</h2>
        <p>
          No Flow Analyze, o usuário informa os dados de
          uma ordem fictícia. O navegador executa os cálculos
          e apresenta a classificação correspondente.
        </p>

        <div className="case-flow">
          {[
            'Entrada de dados',
            'Validação',
            'Cálculo',
            'Classificação',
            'Resultado',
          ].map((step, index) => (
            <div className="case-flow-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        <span className="case-eyebrow">05 / DESENVOLVIMENTO</span>
        <h2>Do conceito ao protótipo.</h2>
        <p>
          O projeto foi desenvolvido como uma aplicação web
          com React, Vite, JavaScript e CSS. As funcionalidades
          foram organizadas em módulos independentes, com
          cálculos realizados no navegador.
        </p>

        <div className="case-tech">
          <span>React</span>
          <span>JavaScript</span>
          <span>Vite</span>
          <span>CSS</span>
          <span>GitHub</span>
          <span>Vercel</span>
        </div>
      </section>

      <section className="case-section">
        <span className="case-eyebrow">06 / PRÓXIMOS PASSOS</span>
        <h2>Um projeto em evolução.</h2>
        <p>
          O FLOW.AI é um protótipo experimental. A próxima
          etapa poderá incluir integração com modelos de IA,
          processamento de documentos, conexão com APIs e
          automações executadas em ambientes reais.
        </p>

        <div className="case-roadmap">
          <div>
            <span>AGORA</span>
            <strong>Protótipo interativo</strong>
            <p>Interface, cálculos e simulações locais.</p>
          </div>
          <div>
            <span>PRÓXIMA ETAPA</span>
            <strong>Integração com IA</strong>
            <p>Respostas dinâmicas e análise de informações.</p>
          </div>
          <div>
            <span>FUTURO</span>
            <strong>Automações conectadas</strong>
            <p>Integração com serviços e processos externos.</p>
          </div>
        </div>
      </section>

      <section className="case-end">
        <span className="case-eyebrow">FLOW.AI / MARYANNIE STURIÃO</span>
        <h2>Conheça a ideia. Teste a solução.</h2>
        <p>
          Um experimento de tecnologia aplicada à
          simplificação de processos.
        </p>
        <a className="case-primary" href="#analisar">
          Explorar Flow Analyze ↗
        </a>
      </section>
    </div>
  )
}

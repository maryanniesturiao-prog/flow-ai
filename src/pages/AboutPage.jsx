export default function AboutPage() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Sobre o projeto</p>
        <h1>O que esta versão é — e o que ela não faz</h1>
        <p className="lead">
          FLOW.AI é um protótipo de interface para conversar com recrutadores
          sobre conferência de ordens de serviço. Os exemplos são fictícios.
        </p>
      </header>

      <div className="about-grid">
        <article className="panel">
          <h2>Problema</h2>
          <p>
            Em processos seletivos, o valor pedido em uma ordem de serviço e o
            valor depois apurado podem divergir. Conferir isso em planilha
            solta o contexto: a diferença e o grau da divergência não ficam
            visíveis no mesmo lugar.
          </p>
        </article>
        <article className="panel">
          <h2>Solução nesta versão</h2>
          <p>
            A aplicação compara os dois valores no navegador, mostra a
            classificação pela regra publicada e oferece um roteiro visual da
            mesma verificação. O chat explica a demonstração com textos prontos.
          </p>
        </article>
        <article className="panel">
          <h2>Tecnologias</h2>
          <ul>
            <li>React e Vite, com a configuração já existente do projeto.</li>
            <li>JavaScript no navegador para comparação, validação e navegação.</li>
            <li>CSS próprio, sem biblioteca de componentes.</li>
            <li>Não há backend, banco, autenticação, API ou modelo de IA.</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Próximos passos</h2>
          <ul>
            <li>Revisar com recrutadores se os campos da ordem cobrem o uso pretendido.</li>
            <li>Confirmar a regra de classificação com quem opera o processo.</li>
            <li>Decidir, só depois disso, se haverá persistência ou integração. Nenhuma das duas existe aqui.</li>
          </ul>
        </article>
      </div>
    </div>
  )
}

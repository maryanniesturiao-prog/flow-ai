const REPLIES = {
  ajuda:
    'Posso explicar apenas o que esta demonstração faz. Pergunte sobre a classificação de divergência, a simulação de rotina, este chat ou as tecnologias do projeto. As respostas estão escritas no código e não passam por um modelo de IA.',
  analise:
    'No Flow Analyze, a diferença é o valor medido menos o valor solicitado. Se a diferença absoluta fica abaixo de um centavo, a ordem é Conforme. Com valor solicitado zero e diferença, a classificação é Divergência crítica, porque não existe base percentual. Nos demais casos: até 5% é divergência leve, acima de 5% até 15% é relevante, e acima de 15% é crítica. O cálculo acontece no seu navegador.',
  automacao:
    'O Flow Automate não dispara automação externa. O botão percorre, nesta página, cinco etapas com um exemplo fictício e usa a mesma comparação do Flow Analyze. O resultado fica só na tela.',
  agente:
    'Este chat é um protótipo. Ele escolhe um texto pronto conforme palavras da sua mensagem. Não há modelo de linguagem, API ou agente em execução.',
  sobre:
    'O projeto é uma interface React com Vite. Não há servidor, banco, autenticação nem integração. A seção Sobre o projeto descreve o problema ilustrado, a solução desta versão e o que ainda precisaria ser decidido.',
  padrao:
    'Não há uma resposta demonstrativa para essa frase. Tente uma das sugestões ou pergunte sobre análise, simulação, chat ou tecnologias.',
}

export function replyTo(message) {
  const text = message
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')

  if (/ajuda|oi\b|ola|bom dia|boa tarde|boa noite/.test(text)) return REPLIES.ajuda
  if (/analis|diverg|ordem|valor|compar|classific/.test(text)) return REPLIES.analise
  if (/autom|fluxo|simul|rotina|etapa/.test(text)) return REPLIES.automacao
  if (/chat|agente|modelo|\bia\b|inteligenc/.test(text)) return REPLIES.agente
  if (/sobre|tecnolog|proximo|projeto|react|vite/.test(text)) return REPLIES.sobre
  return REPLIES.padrao
}

export const SUGGESTIONS = [
  'Como a divergência é classificada?',
  'O que a automação faz de verdade?',
  'Este chat usa um modelo de IA?',
  'Quais tecnologias estão no projeto?',
]

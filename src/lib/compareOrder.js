const CENT = 0.005

export const CLASS_META = {
  conforme: { label: 'Conforme', tone: 'ok' },
  leve: { label: 'Divergência leve', tone: 'warn' },
  relevante: { label: 'Divergência relevante', tone: 'mid' },
  critica: { label: 'Divergência crítica', tone: 'bad' },
}

function round2(value) {
  return Math.round(value * 100) / 100
}

/**
 * Compara valor medido e valor solicitado.
 * Diferença = medido − solicitado.
 * |diferença| menor que um centavo → Conforme.
 * Solicitado zero com diferença → Divergência crítica (não há base percentual).
 * Até 5% → leve; acima de 5% até 15% → relevante; acima de 15% → crítica.
 */
export function compareOrder(solicitado, medido) {
  const diferenca = round2(medido - solicitado)
  const absoluto = Math.abs(diferenca)

  if (absoluto < CENT) {
    return {
      diferenca,
      percentual: solicitado === 0 ? null : 0,
      classificacao: 'conforme',
    }
  }

  if (solicitado === 0) {
    return { diferenca, percentual: null, classificacao: 'critica' }
  }

  const percentual = (absoluto / Math.abs(solicitado)) * 100
  let classificacao = 'critica'
  if (percentual <= 5) classificacao = 'leve'
  else if (percentual <= 15) classificacao = 'relevante'

  return { diferenca, percentual, classificacao }
}

export function summarizeOrders(orders) {
  const counts = { conforme: 0, leve: 0, relevante: 0, critica: 0 }
  for (const order of orders) {
    counts[order.classificacao] += 1
  }
  const divergentes = counts.leve + counts.relevante + counts.critica
  return { total: orders.length, divergentes, ...counts }
}

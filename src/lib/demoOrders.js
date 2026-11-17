import { compareOrder } from './compareOrder.js'

const SAMPLE = [
  {
    id: 'OS-2401',
    servico: 'Triagem de currículos',
    processo: 'Analista de dados — Norte Talentos',
    solicitado: 4800,
    medido: 4800,
  },
  {
    id: 'OS-2402',
    servico: 'Entrevistas por competência',
    processo: 'Coordenação comercial — Lume Varejo',
    solicitado: 9200,
    medido: 8900,
  },
  {
    id: 'OS-2408',
    servico: 'Mapeamento de mercado',
    processo: 'Especialista fiscal — Oficina Atlas',
    solicitado: 3500,
    medido: 4100,
  },
  {
    id: 'OS-2415',
    servico: 'Avaliação técnica',
    processo: 'Desenvolvedor pleno — Estúdio Maré',
    solicitado: 2700,
    medido: 3000,
  },
]

export function withComparison(order) {
  return { ...order, ...compareOrder(order.solicitado, order.medido) }
}

export const DEMO_ORDERS = SAMPLE.map(withComparison)

export const SIMULATION_ORDER = withComparison({
  id: 'OS-9001',
  servico: 'Dinâmica de grupo',
  processo: 'Supervisão de loja — Casa Vertente',
  solicitado: 6400,
  medido: 7100,
})

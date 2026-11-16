const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const percent = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatMoney(value) {
  const formatted = money.format(Math.abs(value))
  if (value > 0) return `+${formatted}`
  if (value < 0) return `−${formatted}`
  return formatted
}

export function formatAmount(value) {
  return money.format(value)
}

export function formatPercent(value) {
  if (value == null) return 'sem base percentual'
  return `${percent.format(value)}%`
}

export function parseAmount(input) {
  const raw = String(input ?? '').trim()
  if (!raw) return { ok: false, error: 'Informe um valor.' }

  const normalized = raw.includes(',')
    ? raw.replace(/\s/g, '').replace(/\./g, '').replace(',', '.')
    : raw.replace(/\s/g, '')

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return { ok: false, error: 'Use um número positivo, como 1500,50.' }
  }

  return { ok: true, value: Math.round(Number(normalized) * 100) / 100 }
}

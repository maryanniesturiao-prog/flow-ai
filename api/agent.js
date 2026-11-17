
const MODEL = 'gemini-2.5-flash'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const message = req.body?.message

  if (typeof message !== 'string' || !message.trim() || message.length > 400) {
    return res.status(400).json({
      error: 'Escreva uma mensagem de até 400 caracteres.',
    })
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'IA não configurada.' })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: `Você é o FLOW.AGENT, um assistente de melhoria de processos.
Ajude a identificar tarefas repetitivas e oportunidades de automação.
Responda em português brasileiro, de forma clara e prática.
Sugira etapas, ferramentas e cuidados.
Não invente resultados, integrações ou economias de tempo.
Não peça senhas, dados pessoais ou informações confidenciais.
Mantenha as respostas concisas.`,
            }],
          },
          contents: [{
            role: 'user',
            parts: [{ text: message.trim() }],
          }],
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.5,
          },
        }),
      }
    )

    if (!response.ok) {
        console.error('Erro Gemini:', response.status, await response.text())
      return res.status(502).json({
        error: 'A IA está indisponível no momento. Tente novamente.',
      })
    }

    const data = await response.json()
    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim()

    if (!answer) {
      return res.status(502).json({
        error: 'A IA não retornou uma resposta.',
      })
    }

    return res.status(200).json({ answer })
  } catch (error) {
    console.error('Erro na integração com Gemini:', error)
    return res.status(500).json({
      error: 'Não foi possível conectar à IA.',
    })
  }
}

import { ai } from '..'

export const generatePrompt = async (userMessage: string) => {
  const reply = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: userMessage,
  })
  const message = reply.candidates?.[0]?.content?.parts?.[0]?.text

  if (!message) return 'No response received from AI Agent'

  console.log(message)

  return message
}

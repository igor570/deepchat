import { ai } from '..'

export const generatePrompt = async (userMessage: string) => {
  const reply = await ai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: userMessage }],
  })

  //Return the ai message
  return reply.choices[0].message.content
}

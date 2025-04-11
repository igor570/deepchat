import { ai } from '..'

export const generatePrompt = async (userMessage: string) => {
    const reply = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: userMessage,
    })

    if (!reply.text) return 'No response received from AI Agent'

    return reply.text
}

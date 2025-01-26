import type { ChatCompletionCreateParams } from "openai/resources/chat"

export class Groq {
  private apiKey: string
  private baseUrl = "https://api.groq.com/openai/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  chat = {
    completions: {
      create: async (params: ChatCompletionCreateParams) => {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })

        if (!response.ok) {
          throw new Error(`Groq API error: ${response.statusText}`)
        }

        return response.json()
      },
    },
  }
}


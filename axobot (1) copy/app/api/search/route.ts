import { NextResponse } from "next/server"
import { Groq } from "@/lib/groq"
import { searchYouTubeVideos } from "@/lib/youtube"

const GROQ_API_KEY = process.env.GROQ_API_KEY

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set in environment variables")
}

export async function POST(req: Request) {
  try {
    const { query, previousResults } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const groq = new Groq(GROQ_API_KEY)
    const factPrompt = `You are Axobot, an AI assistant specializing in space phenomena. Provide 3 to 5 interesting facts or explanations about "${query}" related to space. Present each fact or explanation as a separate, concise paragraph that's easy to understand. Use asterisks (*) to highlight important terms or concepts. If there are previous results, build upon that information: ${previousResults ? JSON.stringify(previousResults) : "No previous results"}.`

    const paperPrompt = `You are a research assistant specializing in space science. Provide 3 to 5 relevant research paper titles and URLs about "${query}" in the format: Title: [title], URL: [url]. Only include papers from reputable scientific journals or space agencies (e.g., NASA, ESA). Ensure all URLs are valid, accessible, and start with https://. Do not generate or guess URLs; only provide real, existing papers.`

    const [factCompletion, paperCompletion, youtubeResults] = await Promise.all([
      groq.chat.completions
        .create({
          messages: [{ role: "user", content: factPrompt }],
          model: "llama-3.3-70b-versatile",
        })
        .catch((error) => {
          console.error("Error in Groq fact completion:", error)
          throw new Error("Failed to generate facts")
        }),
      groq.chat.completions
        .create({
          messages: [{ role: "user", content: paperPrompt }],
          model: "llama-3.3-70b-versatile",
        })
        .catch((error) => {
          console.error("Error in Groq paper completion:", error)
          throw new Error("Failed to generate paper recommendations")
        }),
      searchYouTubeVideos(query).catch((error) => {
        console.error("Error in YouTube search:", error)
        return []
      }),
    ])

    const facts = factCompletion.choices[0]?.message?.content?.split("\n\n").filter(Boolean) || []

    if (facts.length === 0) {
      throw new Error("No facts generated")
    }

    const paperContent = paperCompletion.choices[0]?.message?.content || ""
    const papers = paperContent
      .split("\n")
      .filter(Boolean)
      .map((paper) => {
        const [title, url] = paper.split(", URL: ")
        return {
          title: title.replace("Title: ", "").trim(),
          url: url?.trim() || "",
        }
      })
      .filter((paper) => paper.url.startsWith("https://"))

    return NextResponse.json({ results: facts, papers, youtubeResults })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        error: `An error occurred while processing your request: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}


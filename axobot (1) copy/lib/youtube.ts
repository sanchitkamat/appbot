export async function searchYouTubeVideos(query: string): Promise<Array<{ id: string; title: string }>> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query,
      )}&type=video&maxResults=3&key=${process.env.YOUTUBE_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => ({
        id: item.id?.videoId || "",
        title: item.snippet?.title || "",
      }))
    }
    return []
  } catch (error) {
    console.error("Error searching YouTube:", error)
    return []
  }
}


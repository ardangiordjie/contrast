import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const { location, query } = await request.json()

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const hasPerplexity = !!process.env.PERPLEXITY_API_KEY
    let weatherData
    let service = "Demo Mode"
    let realData = false

    if (hasPerplexity) {
      try {
        // Real Perplexity API call
        const response = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-sonar-small-128k-online",
            messages: [
              {
                role: "system",
                content:
                  "You are a weather assistant. Provide current weather forecast data in a structured format. Include temperature, conditions, and any special events like cherry blossoms or other seasonal information.",
              },
              {
                role: "user",
                content: `Get the current weather forecast for ${location}. ${query || "Include next 3-4 days forecast and any special seasonal events."} Return data in JSON format with: forecast array (date, condition, temp, sunset, icon emoji), specialEvent, and recommendation.`,
              },
            ],
            temperature: 0.2,
          }),
        })

        if (response.ok) {
          const perplexityData = await response.json()
          const content = perplexityData.choices?.[0]?.message?.content || ""

          // Try to parse JSON from response
          try {
            const jsonMatch = content.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              weatherData = JSON.parse(jsonMatch[0])
              service = "Perplexity"
              realData = true
            }
          } catch (parseError) {
            console.log("[Perplexity] Could not parse JSON, using text response")
            // Create structured data from text response
            weatherData = {
              location,
              forecast: [
                { date: "Next 3 days", condition: "See details", temp: "--", icon: "🌤️" },
              ],
              rawResponse: content,
              specialEvent: "Check forecast details",
              recommendation: content.substring(0, 200),
            }
            service = "Perplexity (text)"
            realData = true
          }
        }
      } catch (err) {
        console.error("[Perplexity] API Error:", err)
      }
    }

    // Fallback to demo data if no API key or API failed
    if (!realData) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      weatherData = {
        location,
        forecast: [
          { date: "April 6", condition: "Sunny", temp: 72, sunset: "6:45 PM", icon: "☀️" },
          { date: "April 7", condition: "Partly Cloudy", temp: 68, sunset: "6:47 PM", icon: "🌤️" },
          { date: "April 8-9", condition: "Rain", temp: 62, rainChance: 70, icon: "🌧️" },
        ],
        specialEvent: "Cherry blossom peak: 4 days",
        recommendation: "Book April 6 or 7 immediately for best conditions",
      }
      service = "Demo Mode (No API key - set PERPLEXITY_API_KEY)"
    }

    const duration = Date.now() - startTime

    console.log(`[${service}] Weather data ${realData ? "fetched" : "simulated"} for ${location} in ${duration}ms`)

    return NextResponse.json({
      success: true,
      duration,
      data: weatherData,
      service,
      realData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error("[Weather] Error:", error)

    return NextResponse.json(
      {
        success: false,
        duration,
        error: "Failed to fetch weather data",
      },
      { status: 500 },
    )
  }
}


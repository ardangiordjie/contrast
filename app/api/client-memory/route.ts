import { NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for demo (fallback)
const clientMemory = new Map<string, any>()

// Pre-populate with demo data
clientMemory.set("client-1", {
  preferences: "Prefers natural light, outdoor locations, candid shots",
  style: "Documentary style with some posed portraits",
  notes: "Allergic to certain flowers",
})

clientMemory.set("client-2", {
  preferences: "Prefers golden hour photography, urban backgrounds with architecture",
  style: "Modern and editorial style",
  notes: "Wants photos for professional portfolio",
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const { action, clientId, data, query } = await request.json()

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 })
    }

    const hasHyperspell = !!process.env.HYPERSPELL_API_KEY
    let result
    let service = "Local Memory"
    let realAPI = false

    if (action === "store") {
      if (hasHyperspell) {
        try {
          // Real Hyperspell API call
          const response = await fetch("https://api.hyperspell.com/memory/store", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.HYPERSPELL_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientId, data }),
          })

          if (response.ok) {
            const hyperspellData = await response.json()
            result = { stored: true, clientId, hyperspellId: hyperspellData.id }
            service = "Hyperspell"
            realAPI = true
          }
        } catch (err) {
          console.error("[Hyperspell] Store error:", err)
        }
      }

      // Fallback to local storage
      if (!realAPI) {
        await new Promise((resolve) => setTimeout(resolve, 600))
        clientMemory.set(clientId, { ...clientMemory.get(clientId), ...data })
        result = { stored: true, clientId }
        service = hasHyperspell ? "Local Memory (API failed)" : "Local Memory (No API key)"
      }

      console.log(`[${service}] Stored data for client ${clientId}`)
    } else if (action === "recall") {
      if (hasHyperspell) {
        try {
          // Real Hyperspell API call
          const response = await fetch("https://api.hyperspell.com/memory/query", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.HYPERSPELL_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientId, query }),
          })

          if (response.ok) {
            const hyperspellData = await response.json()
            result = { recalled: true, clientId, data: hyperspellData }
            service = "Hyperspell"
            realAPI = true
          }
        } catch (err) {
          console.error("[Hyperspell] Recall error:", err)
        }
      }

      // Fallback to local storage
      if (!realAPI) {
        await new Promise((resolve) => setTimeout(resolve, 600))
        const memories = clientMemory.get(clientId) || {
          preferences: "Golden hour photography, urban backgrounds with architecture",
          style: "Modern editorial style",
          notes: "Professional portfolio photos",
        }
        result = { recalled: true, clientId, data: memories }
        service = hasHyperspell ? "Local Memory (API failed)" : "Local Memory (No API key - set HYPERSPELL_API_KEY)"
      }

      console.log(`[${service}] Recalled data for client ${clientId}`)
    } else {
      return NextResponse.json({ error: "Invalid action. Use 'store' or 'recall'" }, { status: 400 })
    }

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      duration,
      result,
      service,
      realAPI,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error("[Memory] Error:", error)

    return NextResponse.json(
      {
        success: false,
        duration,
        error: "Memory operation failed",
      },
      { status: 500 },
    )
  }
}

// GET endpoint to retrieve all client memories (for demo purposes)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const clientId = searchParams.get("clientId")

  if (clientId) {
    const memories = clientMemory.get(clientId) || null
    return NextResponse.json({ clientId, memories })
  }

  // Return all memories
  const allMemories = Array.from(clientMemory.entries()).map(([id, data]) => ({
    clientId: id,
    data,
  }))

  return NextResponse.json({ allMemories })
}


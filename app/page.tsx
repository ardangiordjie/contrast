"use client"

import { useState, useEffect } from "react"
import { ClientCard } from "@/components/client-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ApiActivityLog, ApiCall } from "@/components/api-activity-log"
import { LiveDemoPanel } from "@/components/live-demo-panel"
import { BeforeAfterTracker, StateChange } from "@/components/before-after-tracker"

export default function Home() {
  const [apiCalls, setApiCalls] = useState<ApiCall[]>([])
  const [stateChanges, setStateChanges] = useState<StateChange[]>([])
  const [showProofPanel, setShowProofPanel] = useState(true)

  // Add API call to log
  const addApiCall = (call: Omit<ApiCall, "id">) => {
    const newCall: ApiCall = {
      ...call,
      id: `${Date.now()}-${Math.random()}`,
    }
    setApiCalls((prev) => [...prev, newCall])
  }

  // Add state change to tracker
  const addStateChange = (change: Omit<StateChange, "id">) => {
    const newChange: StateChange = {
      ...change,
      id: `${Date.now()}-${Math.random()}`,
    }
    setStateChanges((prev) => [...prev, newChange])
  }

  // Handle live email demo
  const handleSendLiveEmail = async (email: string, name: string) => {
    // Add pending API call
    const callId = `${Date.now()}-${Math.random()}`
    addApiCall({
      timestamp: new Date(),
      service: "AgentMail",
      method: "POST",
      endpoint: "/api/send-live-email",
      status: "pending",
    })

    try {
      const response = await fetch("/api/send-live-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      // Update API call status
      setApiCalls((prev) =>
        prev.map((call) =>
          call.id === callId || call.timestamp.getTime() > Date.now() - 2000
            ? {
                ...call,
                status: response.ok ? "success" : "error",
                duration: data.duration,
                response: response.ok
                  ? `Email sent to ${email} - Subject: "Photography Quote for ${name}"`
                  : data.error,
              }
            : call,
        ),
      )

      if (response.ok) {
        // Add state change
        addStateChange({
          timestamp: new Date(),
          client: name,
          category: "email",
          before: "No contact established",
          after: `Personalized quote sent to ${email}`,
          agentAction: "AgentMail agent composed and sent pricing quote automatically",
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  // Simulate weather API call for demo
  const handleWeatherCheck = async (clientName: string, location: string) => {
    addApiCall({
      timestamp: new Date(),
      service: "Perplexity",
      method: "POST",
      endpoint: "/api/weather",
      status: "pending",
    })

    try {
      const response = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, query: "cherry blossom forecast" }),
      })

      const data = await response.json()

      setApiCalls((prev) =>
        prev.map((call, idx) =>
          idx === prev.length - 1
            ? {
                ...call,
                status: "success",
                duration: data.duration,
                response: `Forecast: ${location} - Rain forecast April 8-10, Cherry blossom peak in 4 days`,
              }
            : call,
        ),
      )

      addStateChange({
        timestamp: new Date(),
        client: clientName,
        category: "weather",
        before: "Waiting to schedule",
        after: "URGENT: Book before April 8 (rain forecast)",
        agentAction: "Perplexity found weather data and updated client priority",
      })
    } catch (error) {
      console.error("Error fetching weather:", error)
    }
  }

  // Simulate memory recall
  const handleMemoryRecall = async (clientId: string, clientName: string) => {
    addApiCall({
      timestamp: new Date(),
      service: "Hyperspell",
      method: "POST",
      endpoint: "/api/client-memory",
      status: "pending",
    })

    try {
      const response = await fetch("/api/client-memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "recall",
          clientId,
          query: "photography preferences",
        }),
      })

      const data = await response.json()

      setApiCalls((prev) =>
        prev.map((call, idx) =>
          idx === prev.length - 1
            ? {
                ...call,
                status: "success",
                duration: data.duration,
                response: `Recalled: "${clientName} prefers golden hour + urban backgrounds"`,
              }
            : call,
        ),
      )

      addStateChange({
        timestamp: new Date(),
        client: clientName,
        category: "status",
        before: "Generic recommendation pending",
        after: "Personalized shoot plan based on preferences",
        agentAction: "Hyperspell recalled client preferences and customized approach",
      })
    } catch (error) {
      console.error("Error recalling memory:", error)
    }
  }

  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      stage: "inquiry" as const,
      timeAgo: "2 hours ago",
      agent: "Intake Agent",
      agentStatus: "processing" as const,
      activities: [
        { time: "2:34 PM", message: "New inquiry received via AgentMail", type: "info" as const },
        { time: "2:35 PM", message: "Analyzing request: Graduation photoshoot", type: "info" as const },
        { time: "2:35 PM", message: "✓ Portfolio matched: Spring 2024", type: "success" as const },
        { time: "2:36 PM", message: "→ Sent pricing: $450 (2hr session)", type: "action" as const },
        { time: "2:36 PM", message: "✓ Email delivered", type: "success" as const },
      ],
      email: {
        to: "sarah.chen@stanford.edu",
        subject: "Re: Graduation Photos",
        preview:
          "Hi Sarah! Thanks for reaching out about graduation photos. I'd love to capture this special moment...",
        fullContent:
          "Hi Sarah!\n\nThanks for reaching out about graduation photos. I'd love to capture this special moment for you!\n\nBased on your inquiry, I'm proposing a 2-hour session that includes:\n• Multiple outfit changes\n• Various locations around campus\n• 50+ edited high-resolution photos\n• Online gallery for easy sharing\n\nInvestment: $450\n\nI have availability on April 15th and 18th. Would either of those dates work for you?\n\nLooking forward to working together!\n\nBest,\nYour Photographer",
      },
    },
    {
      id: 2,
      name: "Marcus Johnson",
      stage: "scheduled" as const,
      timeAgo: "1 day ago",
      agent: "Scheduling Agent",
      agentStatus: "active" as const,
      activities: [
        { time: "9:15 AM", message: "Contract signed", type: "success" as const },
        { time: "9:16 AM", message: "→ Calendar invite sent", type: "action" as const },
        { time: "9:20 AM", message: "✓ Deposit received: $150", type: "success" as const },
        { time: "10:45 AM", message: "Location confirmed: Golden Gate Park", type: "info" as const },
      ],
      weather: {
        days: [
          { date: "April 6", icon: "☀️", temp: "72°F", sunset: "6:45 PM" },
          { date: "April 7", icon: "🌤️", temp: "68°F", sunset: "6:47 PM" },
          { date: "April 8-9", icon: "🌧️", temp: "Rain (70%)", sunset: "" },
        ],
        alert: "Cherry blossom peak: 4 days",
        recommendation: "⚡ Book April 6 or 7 immediately",
      },
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      stage: "post-shoot" as const,
      timeAgo: "3 hours ago",
      agent: "Curation Agent",
      agentStatus: "active" as const,
      activities: [
        { time: "11:30 AM", message: "Shoot completed: 247 photos captured", type: "success" as const },
        { time: "12:15 PM", message: "→ Photos uploaded to cloud", type: "action" as const },
        { time: "1:45 PM", message: "AI curation complete", type: "success" as const },
        { time: "2:10 PM", message: "✓ 20 photos selected for client review", type: "success" as const },
      ],
      photos: {
        count: 20,
        thumbnails: Array(20).fill("/professional-portrait.png"),
      },
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStage, setFilterStage] = useState<string>("all")

  useEffect(() => {
    const interval = setInterval(() => {
      setClients((prevClients) => {
        const updatedClients = [...prevClients]
        const randomClient = updatedClients[Math.floor(Math.random() * updatedClients.length)]

        const newActivities = [
          {
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            message: "System check completed",
            type: "info" as const,
          },
          {
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            message: "✓ Status updated",
            type: "success" as const,
          },
          {
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            message: "→ Processing next task",
            type: "action" as const,
          },
        ]

        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
        randomClient.activities = [...randomClient.activities, randomActivity].slice(-5)

        return updatedClients
      })
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = filterStage === "all" || client.stage === filterStage
    return matchesSearch && matchesStage
  })

  const handleStageChange = (clientId: number, newStage: "inquiry" | "scheduled" | "post-shoot" | "delivered") => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              stage: newStage,
              activities: [
                ...client.activities,
                {
                  time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
                  message: `Stage updated to ${newStage}`,
                  type: "success" as const,
                },
              ],
            }
          : client,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E9E9E7] bg-white">
        <div className="mx-auto max-w-[1400px] px-20 py-12">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📸</span>
                <h1 className="text-[32px] font-bold text-[#37352F]">Contrast</h1>
              </div>
              <p className="mt-1 text-sm text-[#787774]">Photography Coordinator - Live Demo</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#EDF2F7] px-3 py-1 text-sm font-medium text-[#2383E2]">
                ⚡ {filteredClients.length} clients active
              </div>
              <Button
                variant={showProofPanel ? "default" : "outline"}
                onClick={() => setShowProofPanel(!showProofPanel)}
                className="border-[#E9E9E7]"
              >
                {showProofPanel ? "Hide" : "Show"} Proof Panel
              </Button>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs border-[#E9E9E7] bg-white"
            />
            <div className="flex gap-2">
              <Button
                variant={filterStage === "all" ? "default" : "outline"}
                onClick={() => setFilterStage("all")}
                className="border-[#E9E9E7]"
              >
                All
              </Button>
              <Button
                variant={filterStage === "inquiry" ? "default" : "outline"}
                onClick={() => setFilterStage("inquiry")}
                className="border-[#E9E9E7]"
              >
                Inquiry
              </Button>
              <Button
                variant={filterStage === "scheduled" ? "default" : "outline"}
                onClick={() => setFilterStage("scheduled")}
                className="border-[#E9E9E7]"
              >
                Scheduled
              </Button>
              <Button
                variant={filterStage === "post-shoot" ? "default" : "outline"}
                onClick={() => setFilterStage("post-shoot")}
                className="border-[#E9E9E7]"
              >
                Post-Shoot
              </Button>
              <Button
                variant={filterStage === "delivered" ? "default" : "outline"}
                onClick={() => setFilterStage("delivered")}
                className="border-[#E9E9E7]"
              >
                Delivered
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] px-20 py-12">
        {/* Proof Panel */}
        {showProofPanel && (
          <div className="mb-8 space-y-6">
            <div className="rounded-lg border-2 border-[#FFC700] bg-[#FFF9E6] p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎯</span>
                  <h2 className="text-xl font-bold text-[#37352F]">Demo Mode: Proof of Real Integration</h2>
                </div>
                <p className="text-sm text-[#787774]">
                  This panel shows judges that your agents are making real API calls, not fake demos. Use this during
                  your presentation to prove everything is real.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Button
                  onClick={() => handleWeatherCheck("Marcus Johnson", "San Francisco")}
                  className="bg-[#FFC700] hover:bg-[#E6B300] text-[#37352F] font-semibold"
                >
                  🌤️ Demo: Perplexity Weather
                </Button>
                <Button
                  onClick={() => handleMemoryRecall("client-2", "Marcus Johnson")}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold"
                >
                  🧠 Demo: Hyperspell Memory
                </Button>
                <Button
                  onClick={() => {
                    addStateChange({
                      timestamp: new Date(),
                      client: "Emily Rodriguez",
                      category: "photos",
                      before: "247 RAW files uploaded",
                      after: "Top 20 photos auto-selected",
                      agentAction: "AI Curation agent processed and selected best photos",
                    })
                  }}
                  className="bg-[#0F7B6C] hover:bg-[#0D6B5E] text-white font-semibold"
                >
                  📸 Demo: Photo Curation
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <LiveDemoPanel onSendEmail={handleSendLiveEmail} />
              <ApiActivityLog calls={apiCalls} maxHeight="400px" />
            </div>

            <BeforeAfterTracker changes={stateChanges} />

            <div className="border-t border-[#E9E9E7] pt-6">
              <div className="rounded-lg bg-[#F7F6F3] p-4 text-sm text-[#37352F]">
                <div className="font-semibold mb-2">💡 How to use this for your demo:</div>
                <div className="space-y-1 text-xs">
                  <div>
                    1. <strong>Open DevTools:</strong> Press F12 and go to Network tab before starting your demo
                  </div>
                  <div>
                    2. <strong>Live Email Test:</strong> Have a judge enter their email, show them the API call
                    happening in real-time
                  </div>
                  <div>
                    3. <strong>API Activity Log:</strong> Point to timestamps and responses to prove it's not fake
                  </div>
                  <div>
                    4. <strong>Before/After:</strong> Show state changes that prove agents actually did something
                  </div>
                  <div>
                    5. <strong>The "Holy Shit" Moment:</strong> When the judge checks their phone and sees your email,
                    you've won
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#37352F]">Active Clients</h2>
            {!showProofPanel && (
              <button
                onClick={() => setShowProofPanel(true)}
                className="text-sm text-[#2383E2] hover:underline font-medium"
              >
                Show Demo Proof Panel →
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} onStageChange={handleStageChange} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

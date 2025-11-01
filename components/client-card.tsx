"use client"

import { useState } from "react"
import { StageBadge } from "./stage-badge"
import { SubagentCard } from "./subagent-card"
import { ActivityFeed } from "./activity-feed"
import { EmailPreview } from "./email-preview"
import { WeatherAlert } from "./weather-alert"
import { PhotoGrid } from "./photo-grid"
import { Button } from "./ui/button"

type Stage = "inquiry" | "scheduled" | "post-shoot" | "delivered"
type AgentStatus = "active" | "processing" | "idle"

interface Activity {
  time: string
  message: string
  type: "info" | "success" | "action" | "warning"
}

interface Email {
  to: string
  subject: string
  preview: string
}

interface WeatherDay {
  date: string
  icon: string
  temp: string
  sunset: string
}

interface Weather {
  days: WeatherDay[]
  alert: string
  recommendation: string
}

interface Photos {
  count: number
  thumbnails: string[]
}

interface Client {
  id: number
  name: string
  stage: Stage
  timeAgo: string
  agent: string
  agentStatus: AgentStatus
  activities: Activity[]
  email?: Email
  weather?: Weather
  photos?: Photos
}

export function ClientCard({
  client,
  onStageChange,
}: {
  client: Client
  onStageChange?: (clientId: number, newStage: Stage) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showStageMenu, setShowStageMenu] = useState(false)

  const stages: Stage[] = ["inquiry", "scheduled", "post-shoot", "delivered"]
  const currentStageIndex = stages.indexOf(client.stage)
  const nextStage = stages[currentStageIndex + 1]

  return (
    <div className="fade-in rounded-lg border border-[#E9E9E7] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-sm">
      {/* Client Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <h2 className="text-[22px] font-semibold text-[#37352F]">{client.name}</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-[#787774] hover:text-[#37352F] transition-colors"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-[#9B9A97]">
          <div className="relative">
            <button onClick={() => setShowStageMenu(!showStageMenu)} className="hover:opacity-80 transition-opacity">
              <StageBadge stage={client.stage} />
            </button>
            {showStageMenu && (
              <div className="absolute top-full left-0 mt-2 z-10 rounded-md border border-[#E9E9E7] bg-white shadow-lg p-2 space-y-1">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      onStageChange?.(client.id, stage)
                      setShowStageMenu(false)
                    }}
                    className="block w-full text-left px-3 py-1.5 text-sm rounded hover:bg-[#F7F6F3] transition-colors"
                  >
                    <StageBadge stage={stage} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <span>•</span>
          <span>{client.timeAgo}</span>
        </div>
      </div>

      <div className="my-4 border-t border-dotted border-[#E9E9E7]" />

      <SubagentCard name={client.agent} status={client.agentStatus} />

      <div className="my-4 border-t border-dotted border-[#E9E9E7]" />

      <ActivityFeed activities={client.activities} isExpanded={isExpanded} />

      {client.email && (
        <>
          <div className="my-4 border-t border-dotted border-[#E9E9E7]" />
          <EmailPreview email={client.email} />
        </>
      )}

      {client.weather && (
        <>
          <div className="my-4 border-t border-dotted border-[#E9E9E7]" />
          <WeatherAlert weather={client.weather} />
        </>
      )}

      {client.photos && (
        <>
          <div className="my-4 border-t border-dotted border-[#E9E9E7]" />
          <PhotoGrid photos={client.photos} />
        </>
      )}

      {nextStage && (
        <>
          <div className="my-4 border-t border-dotted border-[#E9E9E7]" />
          <Button
            onClick={() => onStageChange?.(client.id, nextStage)}
            className="w-full bg-[#2383E2] hover:bg-[#1a6bc4] text-white"
          >
            Move to {nextStage.charAt(0).toUpperCase() + nextStage.slice(1)} →
          </Button>
        </>
      )}
    </div>
  )
}

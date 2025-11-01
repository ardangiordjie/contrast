"use client"

import { useState, useEffect } from "react"

export interface ApiCall {
  id: string
  timestamp: Date
  service: "AgentMail" | "Perplexity" | "Hyperspell" | "OpenAI"
  method: string
  endpoint: string
  status: "pending" | "success" | "error"
  duration?: number
  response?: string
}

interface ApiActivityLogProps {
  calls: ApiCall[]
  maxHeight?: string
}

export function ApiActivityLog({ calls, maxHeight = "400px" }: ApiActivityLogProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getServiceIcon = (service: ApiCall["service"]) => {
    switch (service) {
      case "AgentMail":
        return "📧"
      case "Perplexity":
        return "🔍"
      case "Hyperspell":
        return "🧠"
      case "OpenAI":
        return "🤖"
      default:
        return "⚡"
    }
  }

  const getStatusColor = (status: ApiCall["status"]) => {
    switch (status) {
      case "success":
        return "bg-[#0F7B6C] text-white"
      case "error":
        return "bg-[#E03E3E] text-white"
      case "pending":
        return "bg-[#FFC700] text-[#8B6914]"
      default:
        return "bg-[#E9E9E7] text-[#787774]"
    }
  }

  return (
    <div className="rounded-lg border border-[#E9E9E7] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h2 className="text-lg font-semibold text-[#37352F]">Live API Activity</h2>
          <span className="rounded-full bg-[#0F7B6C] px-2 py-0.5 text-xs font-medium text-white">
            {calls.filter((c) => c.status === "success").length} calls
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-[#787774] hover:text-[#37352F] transition-colors"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="mb-4 rounded-md bg-[#F7F6F3] p-3 text-sm text-[#37352F]">
            <div className="flex items-center gap-2">
              <span className="text-base">💡</span>
              <span className="font-medium">Proof of Real Integration</span>
            </div>
            <p className="mt-1 text-xs text-[#787774]">
              These are actual API calls happening in real-time. Open your browser DevTools (Network tab) to verify!
            </p>
          </div>

          <div className="space-y-2" style={{ maxHeight, overflowY: "auto" }}>
            {calls.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#9B9A97]">
                No API calls yet. Interact with the agents to see live activity.
              </div>
            ) : (
              calls
                .slice()
                .reverse()
                .map((call) => (
                  <div
                    key={call.id}
                    className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-md border border-[#E9E9E7] bg-white p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-xl">{getServiceIcon(call.service)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-[#37352F] text-sm">{call.service}</span>
                            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${getStatusColor(call.status)}`}>
                              {call.status}
                            </span>
                          </div>
                          <div className="font-mono text-xs text-[#787774] mb-1">
                            {call.method} {call.endpoint}
                          </div>
                          {call.response && (
                            <div className="mt-2 rounded bg-[#F7F6F3] p-2 text-xs text-[#37352F] overflow-x-auto">
                              {call.response}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 ml-3">
                        <span className="font-mono text-xs text-[#9B9A97] whitespace-nowrap">
                          {call.timestamp.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                        {call.duration && (
                          <span className="font-mono text-xs text-[#0F7B6C]">{call.duration}ms</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </>
      )}
    </div>
  )
}


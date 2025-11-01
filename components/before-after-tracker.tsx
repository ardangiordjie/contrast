"use client"

import { useState } from "react"

export interface StateChange {
  id: string
  timestamp: Date
  client: string
  category: "email" | "weather" | "photos" | "status"
  before: string
  after: string
  agentAction: string
}

interface BeforeAfterTrackerProps {
  changes: StateChange[]
}

export function BeforeAfterTracker({ changes }: BeforeAfterTrackerProps) {
  const [selectedChange, setSelectedChange] = useState<StateChange | null>(null)

  const getCategoryIcon = (category: StateChange["category"]) => {
    switch (category) {
      case "email":
        return "📧"
      case "weather":
        return "🌤️"
      case "photos":
        return "📸"
      case "status":
        return "🔄"
      default:
        return "⚡"
    }
  }

  const getCategoryColor = (category: StateChange["category"]) => {
    switch (category) {
      case "email":
        return "bg-[#EDF2F7] border-[#2383E2] text-[#2383E2]"
      case "weather":
        return "bg-[#FFF3CD] border-[#FFC700] text-[#8B6914]"
      case "photos":
        return "bg-[#F5E6FF] border-[#8B5CF6] text-[#6B21A8]"
      case "status":
        return "bg-[#D3F8F0] border-[#0F7B6C] text-[#0F7B6C]"
      default:
        return "bg-[#F7F6F3] border-[#E9E9E7] text-[#787774]"
    }
  }

  return (
    <div className="rounded-lg border border-[#E9E9E7] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🔄</span>
          <h2 className="text-lg font-semibold text-[#37352F]">Before/After Proof</h2>
          <span className="rounded-full bg-[#2383E2] px-2 py-0.5 text-xs font-medium text-white">
            {changes.length} changes
          </span>
        </div>
        <p className="text-sm text-[#787774]">State changes that prove agents actually did something</p>
      </div>

      <div className="space-y-3">
        {changes.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#9B9A97]">
            No state changes yet. Agent actions will appear here.
          </div>
        ) : (
          changes
            .slice()
            .reverse()
            .map((change) => (
              <div
                key={change.id}
                className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-md border border-[#E9E9E7] bg-white hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => setSelectedChange(selectedChange?.id === change.id ? null : change)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(change.category)}</span>
                      <div>
                        <div className="font-semibold text-[#37352F] text-sm">{change.client}</div>
                        <div className="text-xs text-[#787774]">{change.agentAction}</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#9B9A97]">
                      {change.timestamp.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md bg-[#FFF3F3] border border-[#E9E9E7] p-3">
                      <div className="text-xs font-semibold text-[#E03E3E] mb-1">BEFORE</div>
                      <div className="text-sm text-[#37352F]">{change.before}</div>
                    </div>
                    <div className="rounded-md bg-[#D3F8F0] border border-[#0F7B6C] p-3">
                      <div className="text-xs font-semibold text-[#0F7B6C] mb-1">AFTER</div>
                      <div className="text-sm text-[#37352F]">{change.after}</div>
                    </div>
                  </div>

                  {selectedChange?.id === change.id && (
                    <div className="mt-3 pt-3 border-t border-dotted border-[#E9E9E7]">
                      <div className={`rounded-md border p-3 text-sm ${getCategoryColor(change.category)}`}>
                        <div className="font-semibold mb-1">Agent Action:</div>
                        <div>{change.agentAction}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[#E9E9E7]">
        <div className="text-xs text-[#787774]">
          <div className="font-semibold mb-1">💡 How to use this for demos:</div>
          <div className="pl-4 space-y-0.5">
            <div>1. Show the "BEFORE" state to judges</div>
            <div>2. Trigger an agent action (send email, check weather, etc.)</div>
            <div>3. Show the "AFTER" state immediately</div>
            <div>4. Point to this log as proof the agent actually worked</div>
          </div>
        </div>
      </div>
    </div>
  )
}


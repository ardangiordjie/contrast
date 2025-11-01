"use client"

import { useState } from "react"

interface Activity {
  time: string
  message: string
  type: "info" | "success" | "action" | "warning"
}

export function ActivityFeed({
  activities,
  isExpanded = false,
}: {
  activities: Activity[]
  isExpanded?: boolean
}) {
  const [showAll, setShowAll] = useState(false)

  const getMessageColor = (type: Activity["type"]) => {
    switch (type) {
      case "success":
        return "text-[#0F7B6C]"
      case "action":
        return "text-[#2383E2]"
      case "warning":
        return "text-[#D9730D]"
      default:
        return "text-[#37352F]"
    }
  }

  const displayedActivities = isExpanded || showAll ? activities : activities.slice(-3)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-[#37352F]">Activity</h3>
        {activities.length > 3 && !isExpanded && (
          <button onClick={() => setShowAll(!showAll)} className="text-xs text-[#2383E2] hover:underline">
            {showAll ? "Show less" : `Show all (${activities.length})`}
          </button>
        )}
      </div>
      <div className="max-h-[240px] space-y-2.5 overflow-y-auto">
        {displayedActivities.map((activity, index) => (
          <div key={index} className="flex gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="font-mono text-[13px] text-[#9B9A97]">{activity.time}</span>
            <span className={getMessageColor(activity.type)}>{activity.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

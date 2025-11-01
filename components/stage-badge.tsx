type Stage = "inquiry" | "scheduled" | "post-shoot" | "delivered"

const stageConfig = {
  inquiry: {
    label: "🔵 INQUIRY",
    className: "bg-[#EDF5FD] text-[#1E5A8E] border-[#B8DAFF]",
  },
  scheduled: {
    label: "⏰ SCHEDULED",
    className: "bg-[#FFF8E1] text-[#8B6914] border-[#FFE082]",
  },
  "post-shoot": {
    label: "📸 POST-SHOOT",
    className: "bg-[#F3E8FF] text-[#6B46A0] border-[#D4B5FF]",
  },
  delivered: {
    label: "✓ DELIVERED",
    className: "bg-[#E6F4F1] text-[#0A5C4F] border-[#80CBC4]",
  },
}

export function StageBadge({ stage }: { stage: Stage }) {
  const config = stageConfig[stage]

  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  )
}

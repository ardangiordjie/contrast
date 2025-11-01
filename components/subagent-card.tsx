type AgentStatus = "active" | "processing" | "idle"

export function SubagentCard({ name, status }: { name: string; status: AgentStatus }) {
  const statusConfig = {
    active: { color: "#0F7B6C", label: "Active" },
    processing: { color: "#9065B0", label: "Processing" },
    idle: { color: "#D3D3D1", label: "Idle" },
  }

  const config = statusConfig[status]

  return (
    <div className="rounded-md bg-[#F7F6F3] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🤖</span>
          <span className="text-sm font-medium text-[#37352F]">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} />
          <span className="text-xs text-[#787774]">{config.label}</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface LiveDemoPanelProps {
  onSendEmail: (email: string, name: string) => Promise<void>
}

export function LiveDemoPanel({ onSendEmail }: LiveDemoPanelProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [countdown, setCountdown] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setIsLoading(true)
    setStatus("sending")

    // Start countdown
    let count = 30
    setCountdown(count)
    const countdownInterval = setInterval(() => {
      count -= 1
      setCountdown(count)
      if (count <= 0) {
        clearInterval(countdownInterval)
      }
    }, 1000)

    try {
      await onSendEmail(email, name)
      setStatus("sent")
      clearInterval(countdownInterval)
      setCountdown(null)
    } catch (error) {
      setStatus("error")
      clearInterval(countdownInterval)
      setCountdown(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border-2 border-[#2383E2] bg-gradient-to-br from-[#EDF2F7] to-white p-6 shadow-lg">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-xl font-bold text-[#37352F]">The "Send It to Me Right Now" Test</h2>
        </div>
        <p className="text-sm text-[#787774]">
          Give us your email and we'll have our agent send you a personalized pricing quote in{" "}
          <span className="font-semibold text-[#2383E2]">30 seconds</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#37352F] mb-1">
            Your Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="e.g., Alex Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="border-[#E9E9E7] bg-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#37352F] mb-1">
            Your Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="border-[#E9E9E7] bg-white"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !email || !name}
          className="w-full bg-[#2383E2] hover:bg-[#1a6bc4] text-white font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Sending via AgentMail...
            </span>
          ) : (
            "⚡ Send Me a Quote Now"
          )}
        </Button>
      </form>

      {countdown !== null && countdown > 0 && (
        <div className="mt-4 rounded-md bg-[#FFF3CD] border border-[#FFC700] p-3 text-center">
          <div className="text-2xl font-bold text-[#8B6914]">{countdown}s</div>
          <div className="text-xs text-[#8B6914]">Check your inbox...</div>
        </div>
      )}

      {status === "sent" && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300 rounded-md bg-[#D3F8F0] border-l-4 border-[#0F7B6C] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">✅</span>
            <span className="font-semibold text-[#0F7B6C]">Email Sent!</span>
          </div>
          <p className="text-sm text-[#37352F]">
            Check <span className="font-semibold">{email}</span> right now. You should have received a personalized
            quote from our agent!
          </p>
          <div className="mt-3 text-xs text-[#787774]">
            💡 This was a real AgentMail API call. Check the API Activity Log above for proof.
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-md bg-[#FFE6E6] border-l-4 border-[#E03E3E] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">❌</span>
            <span className="font-semibold text-[#E03E3E]">Something went wrong</span>
          </div>
          <p className="text-sm text-[#37352F]">
            Unable to send email. This is a demo environment. In production, this would send a real email via AgentMail
            API.
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#E9E9E7]">
        <div className="text-xs text-[#787774] space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Why this works:</span>
          </div>
          <div className="pl-4 space-y-0.5">
            <div>✓ Judge participates in the demo</div>
            <div>✓ They get actual proof in their inbox</div>
            <div>✓ Shows real-time agent coordination</div>
            <div>✓ Creates a memorable "holy shit" moment</div>
          </div>
        </div>
      </div>
    </div>
  )
}


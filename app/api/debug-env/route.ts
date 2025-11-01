import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasAgentMail: !!process.env.AGENTMAIL_API_KEY,
    hasPerplexity: !!process.env.PERPLEXITY_API_KEY,
    hasHyperspell: !!process.env.HYPERSPELL_API_KEY,
    hasResend: !!process.env.RESEND_API_KEY,
    agentMailPrefix: process.env.AGENTMAIL_API_KEY?.substring(0, 5),
    perplexityPrefix: process.env.PERPLEXITY_API_KEY?.substring(0, 5),
    hyperspellPrefix: process.env.HYPERSPELL_API_KEY?.substring(0, 5),
  })
}


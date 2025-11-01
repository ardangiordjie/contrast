"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface Email {
  to: string
  subject: string
  preview: string
  fullContent?: string
}

export function EmailPreview({ email }: { email: Email }) {
  const [showFullEmail, setShowFullEmail] = useState(false)

  return (
    <>
      <div className="rounded-md border border-[#E9E9E7] bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-base">📧</span>
          <span className="text-sm font-medium text-[#37352F]">Email Sent</span>
        </div>

        <div className="mb-3 border-t border-dotted border-[#E9E9E7]" />

        <div className="space-y-1 text-sm">
          <div className="text-[#787774]">
            <span className="font-medium">To:</span> {email.to}
          </div>
          <div className="text-[#787774]">
            <span className="font-medium">Subject:</span> {email.subject}
          </div>
        </div>

        <div className="my-3 border-t border-dotted border-[#E9E9E7]" />

        <p className="text-sm leading-relaxed text-[#37352F]">{email.preview}</p>

        <button
          onClick={() => setShowFullEmail(true)}
          className="mt-3 text-sm font-medium text-[#2383E2] transition-all hover:underline"
        >
          View Full Email →
        </button>
      </div>

      <Dialog open={showFullEmail} onOpenChange={setShowFullEmail}>
        <DialogContent className="max-w-2xl bg-white border-[#E9E9E7]">
          <DialogHeader>
            <DialogTitle className="text-[#37352F]">{email.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1 text-sm border-b border-[#E9E9E7] pb-4">
              <div className="text-[#787774]">
                <span className="font-medium">To:</span> {email.to}
              </div>
              <div className="text-[#787774]">
                <span className="font-medium">Subject:</span> {email.subject}
              </div>
            </div>
            <div className="text-sm leading-relaxed text-[#37352F] whitespace-pre-wrap">
              {email.fullContent || email.preview}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

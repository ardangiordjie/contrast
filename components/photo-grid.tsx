"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Photos {
  count: number
  thumbnails: string[]
}

export function PhotoGrid({ photos }: { photos: Photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set())
  const [showLightbox, setShowLightbox] = useState(false)
  const [sent, setSent] = useState(false)

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index)
    setShowLightbox(true)
  }

  const handlePrevious = () => {
    if (selectedPhoto !== null && selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1)
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null && selectedPhoto < photos.thumbnails.length - 1) {
      setSelectedPhoto(selectedPhoto + 1)
    }
  }

  const togglePhotoSelection = (index: number) => {
    const newSelected = new Set(selectedPhotos)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedPhotos(newSelected)
  }

  const handleSendToClient = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📸</span>
          <span className="text-sm font-medium text-[#37352F]">Curated Selection</span>
        </div>
        {selectedPhotos.size > 0 && (
          <span className="text-xs text-[#2383E2] font-medium">{selectedPhotos.size} selected</span>
        )}
      </div>
      <p className="mb-3 text-sm text-[#787774]">{photos.count} photos selected</p>

      <div className="mb-3 border-t border-dotted border-[#E9E9E7]" />

      <div className="grid grid-cols-4 gap-2">
        {photos.thumbnails.map((src, index) => (
          <div
            key={index}
            className="relative h-[75px] w-[75px] overflow-hidden rounded border border-[#E9E9E7] transition-all hover:opacity-85 cursor-pointer group"
            onClick={() => handlePhotoClick(index)}
          >
            <Image src={src || "/placeholder.svg"} alt={`Photo ${index + 1}`} fill className="object-cover" />
            {/* Selection checkbox overlay */}
            <div
              className="absolute top-1 right-1 z-10"
              onClick={(e) => {
                e.stopPropagation()
                togglePhotoSelection(index)
              }}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selectedPhotos.has(index)
                    ? "bg-[#2383E2] border-[#2383E2]"
                    : "bg-white/80 border-white group-hover:border-[#2383E2]"
                }`}
              >
                {selectedPhotos.has(index) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-dotted border-[#E9E9E7]" />

      <Button
        onClick={handleSendToClient}
        disabled={sent}
        className="w-full bg-[#2383E2] hover:bg-[#1a6bb8] text-white disabled:bg-[#0F7B6C] disabled:opacity-100"
      >
        {sent ? "✓ Sent to Client" : "Send to Client →"}
      </Button>

      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-4xl bg-white border-[#E9E9E7] p-0">
          <div className="relative">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedPhoto !== null && (
              <>
                <div className="relative h-[600px] w-full">
                  <Image
                    src={photos.thumbnails[selectedPhoto] || "/placeholder.svg"}
                    alt={`Photo ${selectedPhoto + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Navigation buttons */}
                {selectedPhoto > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {selectedPhoto < photos.thumbnails.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}

                {/* Photo counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                  {selectedPhoto + 1} / {photos.thumbnails.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

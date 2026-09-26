'use client'

import { useState } from 'react'
import { CosmicMediaObject } from '@/types'

interface ScreenshotGalleryProps {
  screenshots: CosmicMediaObject[]
  alt: string
}

export default function ScreenshotGallery({ screenshots, alt }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!screenshots || screenshots.length === 0) return null

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.map((shot, index) => {
          if (!shot?.imgix_url) return null
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 aspect-video"
            >
              <img
                src={`${shot.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
                alt={`${alt} screenshot ${index + 1}`}
                width={600}
                height={340}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          )
        })}
      </div>

      {selectedIndex !== null &&
        (() => {
          const activeShot = screenshots[selectedIndex]
          if (!activeShot) return null
          return (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300"
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={`${activeShot.imgix_url}?w=1600&h=900&fit=max&auto=format,compress`}
                alt={`${alt} screenshot large`}
                className="max-w-full max-h-full rounded-xl object-contain"
              />
            </div>
          )
        })()}
    </div>
  )
}
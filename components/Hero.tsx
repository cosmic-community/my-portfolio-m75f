import Link from 'next/link'
import { ContactInfo } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import AvailabilityBadge from './AvailabilityBadge'

interface HeroProps {
  contact: ContactInfo | null
}

export default function Hero({ contact }: HeroProps) {
  const fullName = getMetafieldValue(contact?.metadata?.full_name) || 'Your Name'
  const headline =
    getMetafieldValue(contact?.metadata?.headline) || 'Developer & Content Creator'
  const bio =
    getMetafieldValue(contact?.metadata?.bio) ||
    'Building useful products and sharing what I learn along the way.'
  const photo = contact?.metadata?.profile_photo
  const available = Boolean(contact?.metadata?.available_for_freelance)

  return (
    <section className="relative overflow-hidden bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
              <AvailabilityBadge available={available} />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-900 dark:text-white">Hi, I&apos;m </span>
              <span className="text-gradient">{fullName}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6">
              {headline}
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
              {bio}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {photo?.imgix_url && (
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-2xl">
                <img
                  src={`${photo.imgix_url}?w=512&h=512&fit=crop&auto=format,compress`}
                  alt={fullName}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
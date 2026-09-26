import { ContactInfo } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import AvailabilityBadge from './AvailabilityBadge'

interface ContactCardProps {
  contact: ContactInfo | null
}

export default function ContactCard({ contact }: ContactCardProps) {
  if (!contact) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        Contact information is not available right now.
      </div>
    )
  }

  const metadata = (contact.metadata || {}) as Record<string, unknown>

  const email = getMetafieldValue(metadata.email)
  const phone = getMetafieldValue(metadata.phone)
  const location = getMetafieldValue(metadata.location)
  const bio = getMetafieldValue(metadata.bio || metadata.message)
  const resumeUrl = (metadata.resume as { url?: string } | undefined)?.url
  const availableRaw = metadata.available
  const isAvailable =
    availableRaw === true || getMetafieldValue(availableRaw).toLowerCase() === 'true'

  const socialLinks = (metadata.social_links || {}) as Record<string, unknown>
  const links = [
    { key: 'github', label: 'GitHub' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'twitter', label: 'Twitter' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'website', label: 'Website' },
  ]
    .map((item) => ({
      ...item,
      url: getMetafieldValue(socialLinks[item.key]),
    }))
    .filter((item) => item.url)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
        <AvailabilityBadge available={isAvailable} />
      </div>

      {bio && <p className="mb-6 text-gray-600 dark:text-gray-300">{bio}</p>}

      <div className="space-y-4">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
              ✉️
            </span>
            <span>{email}</span>
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
              📞
            </span>
            <span>{phone}</span>
          </a>
        )}

        {location && (
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
              📍
            </span>
            <span>{location}</span>
          </div>
        )}

        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
              📄
            </span>
            <span>Download Resume</span>
          </a>
        )}
      </div>

      {links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-700 dark:hover:text-indigo-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
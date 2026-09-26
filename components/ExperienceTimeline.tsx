import { WorkExperience } from '@/types'
import { getMetafieldValue, formatDate } from '@/lib/cosmic'

interface ExperienceTimelineProps {
  experiences: WorkExperience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        No work experience available yet.
      </div>
    )
  }

  return (
    <div className="relative space-y-10 border-l-2 border-gray-200 pl-8 dark:border-gray-700">
      {experiences.map((experience) => {
        const metadata = (experience.metadata || {}) as Record<string, unknown>

        const role = getMetafieldValue(metadata.role || metadata.position || metadata.title)
        const company = getMetafieldValue(metadata.company || metadata.company_name)
        const location = getMetafieldValue(metadata.location)
        const description = getMetafieldValue(metadata.description || metadata.summary)
        const startDate = getMetafieldValue(metadata.start_date)
        const endDate = getMetafieldValue(metadata.end_date)
        const isCurrent =
          metadata.current === true ||
          getMetafieldValue(metadata.current).toLowerCase() === 'true' ||
          !endDate

        const logo = metadata.company_logo as
          | { imgix_url?: string; url?: string }
          | undefined

        return (
          <div key={experience.id} className="relative">
            <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-indigo-600 dark:border-gray-900" />

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {logo?.imgix_url && (
                    <img
                      src={`${logo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                      alt={company || experience.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {role || experience.title}
                    </h3>
                    {company && (
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    {formatDate(startDate)} — {isCurrent ? 'Present' : formatDate(endDate)}
                  </p>
                  {location && <p className="mt-1">{location}</p>}
                </div>
              </div>

              {description && (
                <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
import { getWorkExperience } from '@/lib/cosmic'
import ExperienceTimeline from '@/components/ExperienceTimeline'

export const metadata = {
  title: 'Experience | My Portfolio',
  description: 'A timeline of professional work experience.',
}

export default async function ExperiencePage() {
  const experiences = await getWorkExperience()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Experience
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Where I&apos;ve worked and what I&apos;ve built along the way.
        </p>
      </div>
      <ExperienceTimeline experiences={experiences} />
    </div>
  )
}
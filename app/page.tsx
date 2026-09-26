import Link from 'next/link'
import { getContactInfo, getProjects, getSkills } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import SkillsPreview from '@/components/SkillsPreview'

export default async function HomePage() {
  const [contact, projects, skills] = await Promise.all([
    getContactInfo(),
    getProjects(),
    getSkills(),
  ])

  const featured = projects.filter((project) => Boolean(project?.metadata?.featured))
  const featuredProjects = featured.length > 0 ? featured : projects.slice(0, 3)

  return (
    <div>
      <Hero contact={contact} />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              A selection of work I&apos;m proud of
            </p>
          </div>
          <Link
            href="/projects"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            View all projects →
          </Link>
        </div>
        <FeaturedProjects projects={featuredProjects} />
      </section>

      <section className="bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Skills &amp; Tools
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Technologies I work with every day
              </p>
            </div>
            <Link
              href="/skills"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              View all skills →
            </Link>
          </div>
          <SkillsPreview skills={skills.slice(0, 12)} />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Have a project in mind?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          I&apos;m always excited to collaborate on interesting projects and create engaging content.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
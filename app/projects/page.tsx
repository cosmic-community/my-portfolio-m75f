import { getProjects } from '@/lib/cosmic'
import ProjectsExplorer from '@/components/ProjectsExplorer'

export const metadata = {
  title: 'Projects | My Portfolio',
  description: 'Explore client work, personal projects, and YouTube tutorials.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of client work, personal experiments, and tutorials I&apos;ve created for YouTube.
        </p>
      </div>
      <ProjectsExplorer projects={projects} />
    </div>
  )
}
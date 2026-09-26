import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-16">
        Projects coming soon.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        if (!project || !project.id) return null
        return <ProjectCard key={project.id} project={project} />
      })}
    </div>
  )
}
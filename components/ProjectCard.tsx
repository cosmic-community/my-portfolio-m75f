import Link from 'next/link'
import { Project } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ProjectCardProps {
  project: Project
}

export function projectTypeStyles(type?: string): string {
  switch (type) {
    case 'Client Work':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
    case 'Personal Project':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
    case 'YouTube Tutorial':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const title = project.title
  const description = getMetafieldValue(project.metadata?.short_description)
  const image = project.metadata?.featured_image
  const projectType = getMetafieldValue(project.metadata?.project_type)
  const techStack = project.metadata?.tech_stack || []

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🚀
          </div>
        )}
        {projectType && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${projectTypeStyles(
              projectType
            )}`}
          >
            {projectType}
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {description}
          </p>
        )}
        {techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {techStack.slice(0, 4).map((skill) => {
              if (!skill || !skill.id) return null
              return (
                <span
                  key={skill.id}
                  className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {getMetafieldValue(skill.metadata?.name) || skill.title}
                </span>
              )
            })}
            {techStack.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
'use client'

import { useMemo, useState } from 'react'
import { Project } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import ProjectCard, { projectTypeStyles } from './ProjectCard'

interface ProjectsExplorerProps {
  projects: Project[]
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const types = useMemo(() => {
    const unique = new Set<string>()
    projects.forEach((project) => {
      const type = getMetafieldValue(project?.metadata?.project_type)
      if (type) unique.add(type)
    })
    return Array.from(unique)
  }, [projects])

  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(
      (project) => getMetafieldValue(project?.metadata?.project_type) === activeFilter
    )
  }, [projects, activeFilter])

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        <button
          onClick={() => setActiveFilter('All')}
          className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
            activeFilter === 'All'
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
          }`}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              activeFilter === type
                ? projectTypeStyles(type) + ' border-transparent'
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-20">
          No projects found for this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            if (!project || !project.id) return null
            return <ProjectCard key={project.id} project={project} />
          })}
        </div>
      )}
    </div>
  )
}
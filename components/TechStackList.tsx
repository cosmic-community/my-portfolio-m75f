import { Skill } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TechStackListProps {
  skills: Skill[]
}

export default function TechStackList({ skills }: TechStackListProps) {
  if (!skills || skills.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        if (!skill || !skill.id) return null
        return (
          <span
            key={skill.id}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <span>{getMetafieldValue(skill.metadata?.icon) || '⚙️'}</span>
            <span>{getMetafieldValue(skill.metadata?.name) || skill.title}</span>
          </span>
        )
      })}
    </div>
  )
}
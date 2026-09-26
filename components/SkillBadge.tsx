import { Skill } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SkillBadgeProps {
  skill: Skill
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const name = getMetafieldValue(skill.metadata?.name) || skill.title
  const icon = getMetafieldValue(skill.metadata?.icon) || '⚡'

  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-lg leading-none">{icon}</span>
      {name}
    </span>
  )
}
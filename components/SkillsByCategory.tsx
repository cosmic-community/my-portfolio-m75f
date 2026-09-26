import { Skill } from '@/types'
import SkillBadge from './SkillBadge'

interface SkillsByCategoryProps {
  skillsByCategory: Record<string, Skill[]>
}

export default function SkillsByCategory({ skillsByCategory }: SkillsByCategoryProps) {
  const categories = Object.keys(skillsByCategory).filter((category) => {
    const skills = skillsByCategory[category]
    return skills && skills.length > 0
  })

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        No skills available yet.
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const skills = skillsByCategory[category]

        if (!skills || skills.length === 0) {
          return null
        }

        return (
          <section key={category}>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {category}
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <SkillBadge key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
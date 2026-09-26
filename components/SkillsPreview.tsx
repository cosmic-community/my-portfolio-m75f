import { Skill } from '@/types'
import SkillBadge from './SkillBadge'

interface SkillsPreviewProps {
  skills: Skill[]
}

export default function SkillsPreview({ skills }: SkillsPreviewProps) {
  if (!skills || skills.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-10">
        Skills coming soon.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => {
        if (!skill || !skill.id) return null
        return <SkillBadge key={skill.id} skill={skill} />
      })}
    </div>
  )
}
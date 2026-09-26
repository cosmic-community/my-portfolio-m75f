import { getSkills, groupSkillsByCategory } from '@/lib/cosmic'
import SkillsByCategory from '@/components/SkillsByCategory'

export const metadata = {
  title: 'Skills | My Portfolio',
  description: 'Technologies and tools grouped by category with proficiency levels.',
}

export default async function SkillsPage() {
  const skills = await getSkills()
  const grouped = groupSkillsByCategory(skills)
  const categories = Object.keys(grouped).sort()

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Skills
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tools and technologies I use to build products and create content.
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">
          Skills coming soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories
            .filter((category) => {
              const categorySkills = grouped[category]
              return categorySkills && categorySkills.length > 0
            })
            .map((category) => {
              const categorySkills = grouped[category]
              if (!categorySkills) return null
              return (
                <SkillsByCategory
                  key={category}
                  category={category}
                  skills={categorySkills}
                />
              )
            })}
        </div>
      )}
    </div>
  )
}
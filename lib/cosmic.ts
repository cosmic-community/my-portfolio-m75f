import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import type { Skill, Project, WorkExperience, ContactInfo } from '@/types'

// Write client kept available for potential mutations. All reads go through
// getCosmic() (via lib/cosmic-preview) so the dashboard live-preview iframe
// can render draft content.
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'contact-info' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const objects = response.objects as ContactInfo[]
    return objects[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch contact info')
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'projects' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Project[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch projects')
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Project) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch project')
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'skills' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Skill[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch skills')
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'work-experience' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const experiences = response.objects as WorkExperience[]

    return experiences.sort((a, b) => {
      const isCurrentA = Boolean(a.metadata?.current_position)
      const isCurrentB = Boolean(b.metadata?.current_position)
      if (isCurrentA !== isCurrentB) return isCurrentA ? -1 : 1

      const rawA = a.metadata?.start_date
      const rawB = b.metadata?.start_date
      const timeA = rawA ? Date.parse(rawA) : NaN
      const timeB = rawB ? Date.parse(rawB) : NaN
      const dateA = Number.isNaN(timeA) ? 0 : timeA
      const dateB = Number.isNaN(timeB) ? 0 : timeB
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch work experience')
  }
}

export function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  const result: Record<string, Skill[]> = {}
  for (const skill of skills) {
    if (!skill) continue
    const category = getMetafieldValue(skill.metadata?.category) || 'Other'
    const existing = result[category]
    if (existing) {
      existing.push(skill)
    } else {
      result[category] = [skill]
    }
  }
  return result
}

export function proficiencyToPercent(proficiency: unknown): number {
  const value = getMetafieldValue(proficiency).toLowerCase().trim()
  if (value === '') return 60

  const numeric = Number(value)
  if (!Number.isNaN(numeric)) {
    return Math.min(100, Math.max(0, numeric))
  }

  const levels: Record<string, number> = {
    beginner: 25,
    novice: 25,
    intermediate: 50,
    proficient: 65,
    advanced: 80,
    expert: 95,
    master: 100,
  }

  return levels[value] ?? 60
}

export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
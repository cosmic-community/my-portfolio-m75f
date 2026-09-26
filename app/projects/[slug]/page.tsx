// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getMetafieldValue } from '@/lib/cosmic'
import TechStackList from '@/components/TechStackList'
import ScreenshotGallery from '@/components/ScreenshotGallery'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { projectTypeStyles } from '@/components/ProjectCard'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const title = project.title
  const description = getMetafieldValue(project.metadata?.short_description)
  const details = getMetafieldValue(project.metadata?.details)
  const featuredImage = project.metadata?.featured_image
  const screenshots = project.metadata?.screenshots || []
  const techStack = project.metadata?.tech_stack || []
  const liveUrl = getMetafieldValue(project.metadata?.live_url)
  const githubUrl = getMetafieldValue(project.metadata?.github_url)
  const youtubeUrl = getMetafieldValue(project.metadata?.youtube_url)
  const projectType = getMetafieldValue(project.metadata?.project_type)

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <Link
        href="/projects"
        className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <div className="mb-8">
        {projectType && (
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${projectTypeStyles(
              projectType
            )}`}
          >
            {projectType}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            🔗 Live Demo
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            💻 View Code
          </a>
        )}
      </div>

      {featuredImage?.imgix_url && (
        <div className="mb-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {youtubeUrl && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Watch the Video
          </h2>
          <YouTubeEmbed url={youtubeUrl} />
        </div>
      )}

      {details && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Project Details
          </h2>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: details }}
          />
        </div>
      )}

      {techStack.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h2>
          <TechStackList skills={techStack} />
        </div>
      )}

      {screenshots.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Screenshots
          </h2>
          <ScreenshotGallery screenshots={screenshots} alt={title} />
        </div>
      )}
    </article>
  )
}
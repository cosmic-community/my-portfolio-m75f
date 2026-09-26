# My Portfolio

![App Preview](https://imgix.cosmicjs.com/669445b0-b9ad-11f1-8db3-4fb4c6c7a846-autopilot-photo-1498050108023-c5249f4df085-1790428982659.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive Next.js portfolio for a developer and YouTube content creator — powered entirely by [Cosmic](https://www.cosmicjs.com).

## Features

- 🏠 Hero home page with name, headline, bio, photo, and freelance availability badge
- 🚀 Filterable Projects index (Client Work, Personal Project, YouTube Tutorial)
- 📸 Project detail pages with screenshot gallery, tech stack, live/GitHub links, and embedded YouTube video
- ⚡ Skills page grouped by category with emoji icons and proficiency bars
- 💼 Experience timeline with company logos and current-position badges
- 📇 Contact page with email and social links
- 🌗 Dark mode toggle with persisted preference
- ✅ Fully typed with strict TypeScript

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ab7c6e8135b7942815e0447&clone_repository=6ab7ca09135b7942815e04d9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience.
>
> User instructions: A youtuber and freelancer portfolio with projects, skills, work experience, and contact info"

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called "My Portfolio". The content is managed in Cosmic CMS with the following object types: skills, projects, work-experience, contact-info. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A modern, responsive personal portfolio website for a developer and YouTube content creator. Pages: Home (hero with full name, headline, bio, profile photo, freelance availability badge, featured projects, skills preview), Projects index with filtering by project type (Client Work, Personal Project, YouTube Tutorial), Project detail pages (featured image, screenshots gallery, rich-text details, tech stack linked to skills, live/GitHub links, embedded YouTube video when youtube_url exists), Skills page grouped by category with proficiency levels and emoji icons, Experience page with a timeline of work experience (company logo, role, employment type, dates, current position), and a Contact section with email and links to YouTube, GitHub, LinkedIn. Clean, professional design with dark mode friendly styling."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) headless CMS via [`@cosmicjs/sdk`](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with the `skills`, `projects`, `work-experience`, and `contact-info` object types

### Installation

```bash
bun install
```

Create your environment variables (see your hosting dashboard's Environment Variables panel):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all projects with connected skills (tech stack) via depth
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single project by slug
const { object: project } = await cosmic.objects
  .findOne({ type: 'projects', slug: 'my-project' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from four Cosmic object types:

- **skills** — `name`, `icon`, `category`, `proficiency`
- **projects** — `short_description`, `details`, `featured_image`, `screenshots`, `tech_stack` (linked to skills), `live_url`, `github_url`, `youtube_url`, `project_type`, `featured`
- **work-experience** — `company`, `role`, `company_logo`, `employment_type`, `start_date`, `end_date`, `current_position`, `description`
- **contact-info** — `full_name`, `headline`, `bio`, `profile_photo`, `email`, `youtube_channel`, `github`, `linkedin`, `available_for_freelance`

All content updates in your [Cosmic](https://www.cosmicjs.com) bucket are reflected automatically on next request. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables above in the project settings
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project in [Netlify](https://www.netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the environment variables above in the site settings
5. Deploy

<!-- README_END -->
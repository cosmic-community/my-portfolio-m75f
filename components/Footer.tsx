import { getContactInfo, getMetafieldValue } from '@/lib/cosmic'

export default async function Footer() {
  const contact = await getContactInfo()
  const fullName = getMetafieldValue(contact?.metadata?.full_name) || 'My Portfolio'
  const github = getMetafieldValue(contact?.metadata?.github)
  const linkedin = getMetafieldValue(contact?.metadata?.linkedin)
  const youtube = getMetafieldValue(contact?.metadata?.youtube_channel)
  const year = new Date().getFullYear()

  const socials = [
    { label: 'GitHub', href: github, icon: '💻' },
    { label: 'LinkedIn', href: linkedin, icon: '🔗' },
    { label: 'YouTube', href: youtube, icon: '▶️' },
  ].filter((social) => social.href)

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {year} {fullName}. All rights reserved.
        </p>
        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
              >
                <span>{social.icon}</span>
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
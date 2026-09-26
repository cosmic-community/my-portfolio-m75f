import { getContactInfo } from '@/lib/cosmic'
import ContactCard from '@/components/ContactCard'

export const metadata = {
  title: 'Contact | My Portfolio',
  description: 'Get in touch for freelance work, collaborations, or just to say hi.',
}

export default async function ContactPage() {
  const contact = await getContactInfo()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project, question, or just want to connect? Reach out through any of the channels below.
        </p>
      </div>
      <ContactCard contact={contact} />
    </div>
  )
}
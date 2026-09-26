interface AvailabilityBadgeProps {
  available: boolean
}

export default function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
        available
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          available ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
        }`}
      />
      {available ? 'Available for Freelance' : 'Not Currently Available'}
    </span>
  )
}
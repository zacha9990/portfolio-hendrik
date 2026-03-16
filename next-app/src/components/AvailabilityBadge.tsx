type Status = 'open' | 'closed' | 'freelance'

const config: Record<Status, { label: string; color: string; dot: string }> = {
  open: {
    label: 'Open to Opportunities',
    color: 'text-green-400 border-green-400/20 bg-green-400/10',
    dot: 'bg-green-400',
  },
  freelance: {
    label: 'Open to Freelance Only',
    color: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10',
    dot: 'bg-yellow-400',
  },
  closed: {
    label: 'Currently Unavailable',
    color: 'text-red-400 border-red-400/20 bg-red-400/10',
    dot: 'bg-red-400',
  },
}

export default function AvailabilityBadge({ status }: { status: Status }) {
  const c = config[status] ?? config.open
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs border rounded-full ${c.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${c.dot}`} />
      {c.label}
    </span>
  )
}

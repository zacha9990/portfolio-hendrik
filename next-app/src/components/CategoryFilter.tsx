'use client'

const categories = [
  { value: '', label: 'All' },
  { value: 'gis', label: 'GIS' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'government', label: 'Government' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'android', label: 'Android' },
]

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: string
  onChange: (cat: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            active === c.value
              ? 'bg-accent text-white border-accent'
              : 'bg-surface text-text-secondary border-border hover:border-accent/40 hover:text-text-primary'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

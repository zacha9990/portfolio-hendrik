import TechBadge from './TechBadge'

interface Experience {
  id: string
  company: string
  role: string
  location?: string
  period?: string
  tech_stack?: { id?: string; name: string }[]
  highlights?: { id?: string; item: string }[]
}

export default function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <div className="relative pl-6 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-1.5 bottom-0 w-px bg-border" />
      {/* Dot */}
      <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-bg" />

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="font-semibold text-text-primary text-sm">{exp.role}</h3>
          <p className="text-text-secondary text-xs mt-0.5">
            {exp.company}
            {exp.location && ` · ${exp.location}`}
            {exp.period && (
              <span className="ml-2 font-mono text-xs text-accent/70">{exp.period}</span>
            )}
          </p>
        </div>

        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-1">
            {exp.highlights.map((h, i) => (
              <li key={h.id ?? i} className="text-xs text-text-secondary leading-relaxed flex gap-2">
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                <span>{h.item}</span>
              </li>
            ))}
          </ul>
        )}

        {exp.tech_stack && exp.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {exp.tech_stack.map((t, i) => (
              <TechBadge key={t.id ?? i} name={t.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

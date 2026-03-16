interface Skill {
  id: string
  name: string
  category: string
}

const categoryLabels: Record<string, string> = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  databases: 'Databases',
  tools: 'Tools',
  specialty: 'Specialty',
}

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const order = ['languages', 'frameworks', 'databases', 'tools', 'specialty']

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {order
        .filter((cat) => grouped[cat])
        .map((cat) => (
          <div key={cat}>
            <h4 className="text-xs font-mono text-accent uppercase tracking-wider mb-3">
              {categoryLabels[cat] ?? cat}
            </h4>
            <div className="flex flex-wrap gap-2">
              {grouped[cat].map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-xs bg-surface border border-border text-text-secondary rounded hover:border-accent/40 hover:text-text-primary transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import TechBadge from './TechBadge'

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  company?: string
  period?: string
  category?: string[]
  tech_stack?: { id?: string; name: string }[]
  thumbnail?: { url: string; alt?: string }
  is_confidential?: boolean
  is_featured?: boolean
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col bg-surface border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-colors">
      {/* Thumbnail */}
      <div className="relative h-44 bg-bg flex items-center justify-center overflow-hidden">
        {project.thumbnail?.url ? (
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt || project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-border select-none">No preview</span>
          </div>
        )}
        {project.is_confidential && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-surface/90 border border-border text-text-secondary rounded">
            Confidential
          </span>
        )}
        {project.is_featured && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-accent/20 border border-accent/30 text-accent rounded">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-semibold text-text-primary text-sm leading-tight">{project.title}</h3>
          {project.company && (
            <p className="text-text-secondary text-xs mt-0.5">{project.company} · {project.period}</p>
          )}
        </div>

        {project.description && (
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">{project.description}</p>
        )}

        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {project.tech_stack.slice(0, 4).map((t, i) => (
              <TechBadge key={t.id ?? i} name={t.name} />
            ))}
            {project.tech_stack.length > 4 && (
              <span className="text-xs text-text-secondary">+{project.tech_stack.length - 4}</span>
            )}
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto text-xs text-accent hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

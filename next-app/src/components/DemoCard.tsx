import Image from 'next/image'
import TechBadge from './TechBadge'

interface Demo {
  id: string
  title: string
  description?: string
  subdomain?: string
  tech_stack?: string[]
  thumbnail?: { url: string; alt?: string }
  is_active?: boolean
}

export default function DemoCard({ demo }: { demo: Demo }) {
  return (
    <div className="flex flex-col bg-surface border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-colors">
      <div className="relative h-44 bg-bg overflow-hidden">
        {demo.thumbnail?.url ? (
          <Image
            src={demo.thumbnail.url}
            alt={demo.thumbnail.alt || demo.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-border">No preview</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-semibold text-text-primary text-sm">{demo.title}</h3>

        {demo.description && (
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">{demo.description}</p>
        )}

        {demo.tech_stack && demo.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {demo.tech_stack.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          {demo.is_active && demo.subdomain ? (
            <a
              href={`https://${demo.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-accent border border-accent/30 px-3 py-1.5 rounded hover:bg-accent/10 transition-colors"
            >
              Launch Demo →
            </a>
          ) : (
            <span className="text-xs text-text-secondary border border-border px-3 py-1.5 rounded">
              Currently Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

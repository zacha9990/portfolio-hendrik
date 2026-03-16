import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProject, getProjects } from '@/lib/payload'
import TechBadge from '@/components/TechBadge'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const data = await getProjects()
  return (data?.docs ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return { title: 'Project — Zacharias Hendrik' }
  return {
    title: `${project.title} — Zacharias Hendrik`,
    description: project.description ?? '',
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      {/* Back */}
      <Link href="/projects" className="text-xs text-text-secondary hover:text-accent transition-colors mb-6 inline-flex items-center gap-1">
        ← Back to Projects
      </Link>

      <div className="flex flex-col gap-8 mt-4">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 items-center">
            {project.is_confidential && (
              <span className="px-2 py-0.5 text-xs bg-surface border border-border text-text-secondary rounded">
                Confidential
              </span>
            )}
            {project.is_featured && (
              <span className="px-2 py-0.5 text-xs bg-accent/20 border border-accent/30 text-accent rounded">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-text-primary">{project.title}</h1>
          <div className="text-sm text-text-secondary flex flex-wrap gap-x-4 gap-y-1">
            {project.role && <span>{project.role}</span>}
            {project.company && <span>{project.company}</span>}
            {project.customer && <span>Client: {project.customer}</span>}
            {project.period && <span className="font-mono text-accent/70">{project.period}</span>}
          </div>
        </div>

        {/* Tech Stack */}
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((t: string) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Overview
            </h2>
            <p className="text-text-secondary leading-relaxed">{project.description}</p>
          </div>
        )}

        {/* Impact */}
        {project.impact && (
          <div className="border border-accent/20 bg-accent/5 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Business Impact
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">{project.impact}</p>
          </div>
        )}

        {/* Screenshots */}
        {!project.is_confidential && project.screenshots?.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Screenshots
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.screenshots.map((s: { url: string; alt?: string }, i: number) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-border">
                  <Image
                    src={s.url}
                    alt={s.alt || `${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confidential notice */}
        {project.is_confidential && (
          <div className="border border-border rounded-lg p-4">
            <p className="text-xs text-text-secondary">
              This project is confidential. Screenshots and implementation details are not publicly available.
            </p>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.website_url && (
            <a href={project.website_url} target="_blank" rel="noopener noreferrer"
              className="text-xs border border-border px-3 py-1.5 rounded text-text-secondary hover:border-accent/40 hover:text-accent transition-colors">
              Visit Website →
            </a>
          )}
          {project.playstore_url && (
            <a href={project.playstore_url} target="_blank" rel="noopener noreferrer"
              className="text-xs border border-border px-3 py-1.5 rounded text-text-secondary hover:border-accent/40 hover:text-accent transition-colors">
              Play Store →
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="text-xs border border-border px-3 py-1.5 rounded text-text-secondary hover:border-accent/40 hover:text-accent transition-colors">
              GitHub →
            </a>
          )}
          {project.related_demo?.subdomain && project.related_demo?.is_active && (
            <a href={`https://${project.related_demo.subdomain}`} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-accent/10 border border-accent/30 px-3 py-1.5 rounded text-accent hover:bg-accent/20 transition-colors">
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

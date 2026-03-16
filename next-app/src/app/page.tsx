export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getProjects, getSiteSettings } from '@/lib/payload'
import ProjectCard from '@/components/ProjectCard'
import AvailabilityBadge from '@/components/AvailabilityBadge'

export default async function HomePage() {
  const [settings, featured] = await Promise.all([
    getSiteSettings(),
    getProjects({ featured: true }),
  ])

  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-2xl flex flex-col gap-5">
          {settings?.availability_status && (
            <div>
              <AvailabilityBadge status={settings.availability_status} />
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            Zacharias Hendrik
          </h1>

          {settings?.tagline ? (
            <p className="text-lg text-text-secondary leading-relaxed">{settings.tagline}</p>
          ) : (
            <p className="text-lg text-text-secondary leading-relaxed">
              Backend Engineer building enterprise systems that scale — from geospatial platforms to
              fintech compliance.
            </p>
          )}

          <p className="font-mono text-sm text-text-secondary/70 tracking-wide">
            Backend Engineer · GIS · Fintech · Enterprise Systems
          </p>

          <div className="flex gap-3 mt-2">
            <Link
              href="/projects"
              className="bg-accent text-white text-sm px-5 py-2.5 rounded hover:bg-accent/90 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="bg-surface border border-border text-text-primary text-sm px-5 py-2.5 rounded hover:border-accent/40 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured?.docs?.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Featured Projects</h2>
            <Link href="/projects" className="text-sm text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.docs.map((project: { id: string; slug: string; title: string }) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Strip */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-text-primary mb-3">
            Have a project in mind?
          </h2>
          <p className="text-text-secondary mb-6">
            Let&apos;s build something great together.
          </p>
          <Link
            href="/contact"
            className="bg-accent text-white text-sm px-6 py-2.5 rounded hover:bg-accent/90 transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  )
}

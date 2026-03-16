'use client'

import { useEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import CategoryFilter from '@/components/CategoryFilter'

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filtered, setFiltered] = useState<Project[]>([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_PAYLOAD_API
    fetch(`${api}/projects?limit=100&sort=sort_order`)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.docs ?? [])
        setFiltered(data.docs ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleFilter = (cat: string) => {
    setCategory(cat)
    if (!cat) {
      setFiltered(projects)
    } else {
      setFiltered(projects.filter((p) => p.category?.includes(cat)))
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary mt-2 text-sm">
            A selection of enterprise, government, and freelance work over 7+ years.
          </p>
        </div>

        <CategoryFilter active={category} onChange={handleFilter} />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-surface border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-sm">No projects found for this category.</p>
        )}
      </div>
    </div>
  )
}

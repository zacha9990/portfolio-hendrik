const API = process.env.NEXT_PUBLIC_PAYLOAD_API

export async function getProjects(params?: { featured?: boolean; category?: string }) {
  const query = new URLSearchParams({ limit: '100' })
  if (params?.featured) query.append('where[is_featured][equals]', 'true')
  if (params?.category) query.append('where[category][contains]', params.category)
  const res = await fetch(`${API}/projects?${query}`, { next: { revalidate: 3600 } })
  if (!res.ok) return { docs: [] }
  return res.json()
}

export async function getProject(slug: string) {
  const res = await fetch(`${API}/projects?where[slug][equals]=${slug}&depth=2`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

export async function getDemos() {
  const res = await fetch(`${API}/demos?where[is_active][equals]=true&limit=20`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return { docs: [] }
  return res.json()
}

export async function getExperience() {
  const res = await fetch(`${API}/experience?sort=sort_order&limit=20`, {
    cache: 'no-store',
  })
  if (!res.ok) return { docs: [] }
  return res.json()
}

export async function getSkills() {
  const res = await fetch(`${API}/skills?sort=sort_order&limit=100`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return { docs: [] }
  return res.json()
}

export async function getSiteSettings() {
  const res = await fetch(`${API}/globals/site-settings?depth=1`, { next: { revalidate: 3600 } })
  if (!res.ok) return null
  return res.json()
}

export async function submitContact(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const res = await fetch(`${API}/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

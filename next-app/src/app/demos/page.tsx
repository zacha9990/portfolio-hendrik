export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getDemos } from '@/lib/payload'
import DemoCard from '@/components/DemoCard'

export const metadata: Metadata = {
  title: 'Live Demos — Zacharias Hendrik',
  description: 'Explore live working demos of selected projects.',
}

export default async function DemosPage() {
  const data = await getDemos()
  const demos = data?.docs ?? []

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Live Demos</h1>
          <p className="text-text-secondary mt-2 text-sm">
            Explore live working demos of selected projects.
          </p>
        </div>

        {demos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demos.map((demo: { id: string }) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        ) : (
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-text-secondary text-sm">
              No live demos available yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

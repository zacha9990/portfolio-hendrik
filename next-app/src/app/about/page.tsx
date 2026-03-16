export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Image from 'next/image'
import { getExperience, getSkills, getSiteSettings } from '@/lib/payload'
import ExperienceItem from '@/components/ExperienceItem'
import SkillsGrid from '@/components/SkillsGrid'

export const metadata: Metadata = {
  title: 'About — Zacharias Hendrik',
  description: 'Backend Engineer with 7+ years experience in enterprise systems, GIS, and fintech.',
}

export default async function AboutPage() {
  const [settings, experience, skills] = await Promise.all([
    getSiteSettings(),
    getExperience(),
    getSkills(),
  ])

  const profilePhoto = settings?.profile_photo?.url

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 flex flex-col gap-16">
      {/* Bio */}
      <section>
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {profilePhoto && (
            <div className="shrink-0">
              <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-border">
                <Image src={profilePhoto} alt="Zacharias Hendrik" fill className="object-cover" />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-text-primary">About Me</h1>
            <p className="text-text-secondary leading-relaxed">
              {settings?.bio_short ??
                'Backend-focused fullstack engineer with 7+ years of experience building scalable enterprise systems across agro-industry, fintech, and government sectors. Specialized in Laravel, Node.js, and PostgreSQL — with deep expertise in GIS/geospatial platforms and financial compliance systems.'}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      {skills?.docs?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-6">Skills & Technologies</h2>
          <SkillsGrid skills={skills.docs} />
        </section>
      )}

      {/* Experience */}
      {experience?.docs?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-6">Work Experience</h2>
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {experience.docs.map((exp: any) => (
              <ExperienceItem key={exp.id} exp={exp} />
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-6">Education</h2>
        <div className="relative pl-6">
          <div className="absolute left-0 top-1.5 bottom-0 w-px bg-border" />
          <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-bg" />
          <div>
            <h3 className="font-semibold text-text-primary text-sm">Universitas Gadjah Mada</h3>
            <p className="text-text-secondary text-xs mt-0.5">
              Associate Degree, Information Technology
              <span className="ml-2 font-mono text-xs text-accent/70">2008 – 2015</span>
            </p>
            <p className="text-text-secondary text-xs mt-1">Yogyakarta, Indonesia</p>
          </div>
        </div>
      </section>
    </div>
  )
}

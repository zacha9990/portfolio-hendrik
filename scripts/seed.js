#!/usr/bin/env node
/**
 * Phase 3 Seed Script — Portfolio CMS
 * Usage:
 *   PAYLOAD_EMAIL=admin@example.com PAYLOAD_PASSWORD=yourpass node scripts/seed.js
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // allow self-signed / ZeroSSL on VPS

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'https://qz-hendrik.com:8443'
const EMAIL = process.env.PAYLOAD_EMAIL
const PASSWORD = process.env.PAYLOAD_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('Usage: PAYLOAD_EMAIL=... PAYLOAD_PASSWORD=... node scripts/seed.js')
  process.exit(1)
}

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
const SITE_SETTINGS = {
  tagline:
    'Backend Engineer building enterprise systems that scale — from geospatial platforms to fintech compliance.',
  bio_short:
    'Backend-focused software engineer with 7+ years of experience developing scalable enterprise applications in industries ranging from agro-industry to fintech. Skilled in Laravel, Node.js, and PostgreSQL — with deep expertise in GIS/geospatial platforms and financial compliance systems.',
  availability_status: 'open',
  social_links: {
    linkedin: 'https://linkedin.com/in/zacharias-hendrik-27a002145',
    github: 'https://github.com/zacha9990',
    email: 'qzacharias.hendrik@gmail.com',
    whatsapp: '6289674252886',
  },
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const SKILLS = [
  // Languages
  { name: 'PHP', category: 'languages', sort_order: 1 },
  { name: 'JavaScript', category: 'languages', sort_order: 2 },
  { name: 'TypeScript', category: 'languages', sort_order: 3 },
  { name: 'SQL', category: 'languages', sort_order: 4 },
  { name: 'Bash', category: 'languages', sort_order: 5 },
  // Frameworks
  { name: 'Laravel', category: 'frameworks', sort_order: 1 },
  { name: 'Node.js', category: 'frameworks', sort_order: 2 },
  { name: 'Express.js', category: 'frameworks', sort_order: 3 },
  { name: 'Next.js', category: 'frameworks', sort_order: 4 },
  { name: 'React', category: 'frameworks', sort_order: 5 },
  { name: 'Android (Java)', category: 'frameworks', sort_order: 6 },
  // Databases
  { name: 'PostgreSQL', category: 'databases', sort_order: 1 },
  { name: 'PostGIS', category: 'databases', sort_order: 2 },
  { name: 'MySQL', category: 'databases', sort_order: 3 },
  { name: 'Oracle', category: 'databases', sort_order: 4 },
  { name: 'SQL Server', category: 'databases', sort_order: 5 },
  // Tools & Platforms
  { name: 'Docker', category: 'tools', sort_order: 1 },
  { name: 'Git', category: 'tools', sort_order: 2 },
  { name: 'Nginx', category: 'tools', sort_order: 3 },
  { name: 'Linux', category: 'tools', sort_order: 4 },
  // Specialty
  { name: 'GIS / Geospatial', category: 'specialty', sort_order: 1 },
  { name: 'OpenLayers', category: 'specialty', sort_order: 2 },
  { name: 'Google Maps API', category: 'specialty', sort_order: 3 },
  { name: 'Fintech & OJK Compliance', category: 'specialty', sort_order: 4 },
  { name: 'REST API Design', category: 'specialty', sort_order: 5 },
]

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
// Inferred from project data — update periods/highlights as needed
const EXPERIENCE = [
  {
    company: 'Triputra Agro Persada',
    location: 'Indonesia',
    role: 'Fullstack Developer',
    period: '2022 – Present',
    tech_stack: [
      { name: 'PHP Laravel' },
      { name: 'Node.js (Express)' },
      { name: 'PostgreSQL' },
      { name: 'Oracle' },
      { name: 'OpenLayers' },
    ],
    highlights: [
      { item: 'Built RumahTAP, a housing management app for employee dormitories.' },
      { item: 'Developed Workflow GIS with multi-level document approval for plantation management.' },
      { item: 'Built BlockAssignment, a GIS-based assignment system for 10,000+ oil palm field workers.' },
    ],
    sort_order: 1,
  },
  {
    company: 'Abadi Sejahtera Finansindo',
    location: 'Indonesia',
    role: 'PHP Developer',
    period: '2020 – 2022',
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    highlights: [
      { item: 'Built internal dashboard and reporting tools for lending operations.' },
      {
        item: 'Developed OJK compliance reporting system to automatically submit loan and repayment data to the Financial Services Authority.',
      },
      {
        item: 'Integrated Pinhome partnership for full personal loan application business process.',
      },
    ],
    sort_order: 2,
  },
  {
    company: 'Tristan Artha Media',
    location: 'Indonesia',
    role: 'Full-Stack Developer',
    period: '2018 – 2020',
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    highlights: [
      { item: 'Built executive management dashboard and reporting system.' },
      { item: 'Developed telemarketing and telesales management/scheduling system.' },
      { item: 'Created whitelabel website templates using .NET C# and SQL Server.' },
    ],
    sort_order: 3,
  },
  {
    company: 'Government IT Projects',
    location: 'Indonesia',
    role: 'Full-Stack Developer (Contract)',
    period: '2015 – 2018',
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    highlights: [
      {
        item: 'Delivered BPSDM-Diklat training administration system for Ministry of Public Works and Housing.',
      },
      {
        item: 'Built AHU-Pewarganegaraan citizenship application system for Ministry of Law and Human Rights.',
      },
      { item: 'Developed BPHN-JFT system for National Law Development Agency.' },
    ],
    sort_order: 4,
  },
  {
    company: 'GIS & Freelance Projects',
    location: 'Indonesia',
    role: 'Full-Stack Developer',
    period: '2013 – 2015',
    tech_stack: [
      { name: 'PHP' },
      { name: 'JavaScript' },
      { name: 'OpenLayers' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
    ],
    highlights: [
      {
        item: 'Developed WebGIS for Ministry of Environment and Forestry (KLHK) for environmental monitoring.',
      },
      {
        item: 'Built SBS Atlas WebGIS for WWF to map the Sunda-Banda Seascape marine conservation area.',
      },
      {
        item: 'Delivered Android-based Beach Information System for Ministry of Public Works and Housing.',
      },
    ],
    sort_order: 5,
  },
]

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'BlockAssignment',
    slug: 'block-assignment',
    description:
      'GIS-based assignment management system for field workers in oil palm plantations. Enables supervisors to assign and track daily tasks across plantation blocks via an interactive map interface.',
    impact:
      'Digitized manual field assignment workflows for thousands of plantation workers, reducing coordination overhead and enabling real-time task tracking across large-scale agricultural land.',
    period: '2022 – 2024',
    role: 'Fullstack Developer',
    company: 'Triputra Agro Persada',
    customer: '',
    category: ['gis', 'enterprise'],
    tech_stack: [
      { name: 'PHP Laravel' },
      { name: 'Node.js (Express)' },
      { name: 'PostgreSQL' },
      { name: 'Oracle' },
      { name: 'OpenLayers' },
    ],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: true,
    sort_order: 1,
  },
  {
    title: 'Workflow GIS',
    slug: 'workflow-gis',
    description:
      'Document workflow approval system with multi-level approval, integrated with GIS for geospatial context on plantation operations and land management documents.',
    impact:
      'Streamlined document approval across multiple departments in a large agro-industrial conglomerate, replacing manual paper-based workflows.',
    period: '2022 – 2023',
    role: 'Fullstack Developer',
    company: 'Triputra Agro Persada',
    customer: '',
    category: ['gis', 'enterprise'],
    tech_stack: [
      { name: 'PHP Laravel' },
      { name: 'Node.js (Express)' },
      { name: 'PostgreSQL' },
      { name: 'Oracle' },
    ],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 2,
  },
  {
    title: 'RumahTAP',
    slug: 'rumahtap',
    description:
      'Housing management application for employee dormitories, handling unit allocation, occupant records, maintenance requests, and reporting for plantation housing estates.',
    impact:
      'Replaced spreadsheet-based housing management with a centralized digital system for managing hundreds of employee housing units.',
    period: '2022 – 2023',
    role: 'Fullstack Developer',
    company: 'Triputra Agro Persada',
    customer: '',
    category: ['enterprise'],
    tech_stack: [
      { name: 'PHP Laravel' },
      { name: 'Node.js (Express)' },
      { name: 'PostgreSQL' },
      { name: 'Oracle' },
    ],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 3,
  },
  {
    title: 'OJK Compliance Reporting Tools',
    slug: 'ojk-reporting-tools',
    description:
      'Automated reporting system to send loan and repayment data to OJK (Otoritas Jasa Keuangan — Financial Services Authority of Indonesia) in the required format and schedule.',
    impact:
      'Eliminated manual reporting errors and ensured 100% compliance with OJK regulatory submission requirements for a fintech lending company.',
    period: '2021 – 2022',
    role: 'PHP Developer',
    company: 'Abadi Sejahtera Finansindo',
    customer: '',
    category: ['fintech'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: true,
    sort_order: 4,
  },
  {
    title: 'Personal Loan App (Pinhome Partnership)',
    slug: 'personal-loan-pinhome',
    description:
      'End-to-end personal loan application system built for a fintech company in partnership with Pinhome, covering the full loan business process from application to disbursement.',
    impact:
      'Enabled the company to launch a new loan product in partnership with Pinhome, expanding the customer acquisition channel.',
    period: '2020 – 2021',
    role: 'PHP Developer',
    company: 'Abadi Sejahtera Finansindo',
    customer: '',
    category: ['fintech'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 5,
  },
  {
    title: 'Dashboard & Reporting Tools — Abadi Sejahtera',
    slug: 'dashboard-abadi-sejahtera',
    description:
      'Management dashboard and reporting suite for internal operations of a fintech lending company, including portfolio monitoring and business performance metrics.',
    impact: '',
    period: '2020 – 2021',
    role: 'PHP Developer',
    company: 'Abadi Sejahtera Finansindo',
    customer: '',
    category: ['fintech'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 6,
  },
  {
    title: 'AHU-Pewarganegaraan',
    slug: 'ahu-pewarganegaraan',
    description:
      'Citizenship application and administrative system for the Directorate General of General Legal Administration (AHU) under the Ministry of Law and Human Rights.',
    impact:
      'Digitized citizenship application workflows for one of Indonesia\'s largest government ministries, serving thousands of applications.',
    period: '2017 – 2018',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Ministry of Law and Human Rights',
    category: ['government', 'enterprise'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: true,
    sort_order: 7,
  },
  {
    title: 'BPSDM-Diklat',
    slug: 'bpsdm-diklat',
    description:
      'Training administration, management, and scheduling system for BPSDM (Human Resources Development Agency) at the Ministry of Public Works and Housing.',
    impact: '',
    period: '2017 – 2018',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Ministry of Public Works and Housing',
    category: ['government', 'enterprise'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 8,
  },
  {
    title: 'BPHN-JFT',
    slug: 'bphn-jft',
    description:
      'Functional position management system for BPHN (National Law Development Agency), handling assessments and administration of functional government positions.',
    impact: '',
    period: '2016 – 2017',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'National Law Development Agency (BPHN)',
    category: ['government'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 9,
  },
  {
    title: 'SBS Atlas WebGIS',
    slug: 'sbs-atlas-webgis',
    description:
      'Interactive web-based GIS atlas for the Sunda Banda Seascape program, mapping marine biodiversity, conservation areas, and ecological data across Indonesian waters.',
    impact:
      'Provided WWF with a publicly accessible geospatial platform to visualize and communicate marine conservation data across the Sunda-Banda Seascape region.',
    period: '2015 – 2016',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'World Wide Fund for Nature (WWF)',
    category: ['gis'],
    tech_stack: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'OpenLayers' }, { name: 'PostgreSQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: false,
    is_featured: true,
    sort_order: 10,
  },
  {
    title: 'WebGIS KLHK',
    slug: 'webgis-klhk',
    description:
      'Geographic Information System for the Ministry of Environment and Forestry (KLHK), supporting environmental monitoring and forest management data visualization.',
    impact:
      'Delivered a national-scale GIS platform used by the Ministry of Environment and Forestry for environmental monitoring and policy support.',
    period: '2014 – 2015',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Ministry of Environment and Forestry (KLHK)',
    category: ['gis', 'government'],
    tech_stack: [
      { name: 'PHP' },
      { name: 'JavaScript' },
      { name: 'OpenLayers' },
      { name: 'Google Maps API' },
      { name: 'PostgreSQL' },
    ],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 11,
  },
  {
    title: 'WebGIS Kabupaten Serang',
    slug: 'webgis-kabupaten-serang',
    description:
      'Regional Geographic Information System for Serang Regency Government, providing geospatial data management and map visualization for regional planning.',
    impact: '',
    period: '2014 – 2015',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Serang Regency Government',
    category: ['gis', 'government'],
    tech_stack: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'OpenLayers' }, { name: 'PostgreSQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 12,
  },
  {
    title: 'Beach Information System',
    slug: 'beach-information-system',
    description:
      'Android-based beach information system for the Ministry of Public Works and Housing, providing field data collection and visualization for coastal infrastructure management.',
    impact: '',
    period: '2014 – 2015',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Ministry of Public Works and Housing',
    category: ['government', 'android'],
    tech_stack: [{ name: 'Android' }, { name: 'PHP' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 13,
  },
  {
    title: 'Aplikasi Retribusi Sampah Merauke',
    slug: 'retribusi-sampah-merauke',
    description:
      'Waste retribution management system for Merauke Regency Government, handling billing, payment tracking, and geographic mapping of waste collection areas.',
    impact: '',
    period: '2013 – 2014',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Merauke Regency Government',
    category: ['government'],
    tech_stack: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'OpenLayers' }, { name: 'MySQL' }],
    website_url: 'http://www.retribusisampahmerauke.com',
    github_url: '',
    playstore_url: '',
    is_confidential: false,
    is_featured: false,
    sort_order: 14,
  },
  {
    title: 'Executive App — Tristan Artha Media',
    slug: 'executive-app-tristan',
    description:
      'Management, dashboard, and reporting system for executive-level monitoring of business operations at a financial services and media company.',
    impact: '',
    period: '2019 – 2020',
    role: 'Full-Stack Developer',
    company: 'Tristan Artha Media',
    customer: '',
    category: ['enterprise'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 15,
  },
  {
    title: 'Telemarketing App — Tristan Artha Media',
    slug: 'telemarketing-app-tristan',
    description:
      'Telesales management and scheduling system for managing outbound call campaigns, agent scheduling, and performance tracking.',
    impact: '',
    period: '2018 – 2019',
    role: 'Full-Stack Developer',
    company: 'Tristan Artha Media',
    customer: '',
    category: ['enterprise'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 16,
  },
  {
    title: 'Realtime Telemetri',
    slug: 'realtime-telemetri',
    description:
      'Real-time telemetry monitoring system for Balai Pantai Denpasar, providing live data visualization for coastal and environmental sensor readings.',
    impact: '',
    period: '2016 – 2017',
    role: 'Full-Stack Developer',
    company: '',
    customer: 'Balai Pantai Denpasar',
    category: ['government', 'enterprise'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 17,
  },
  {
    title: 'Manna Campus E-commerce',
    slug: 'manna-campus',
    description:
      'E-commerce platform with Android mobile app for Mirota Kampus Yogyakarta, enabling online ordering and delivery for a major campus store.',
    impact: '',
    period: '2015 – 2016',
    role: 'Backend & Mobile Developer',
    company: '',
    customer: 'Mirota Kampus Yogyakarta',
    category: ['freelance', 'android'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'MySQL' }, { name: 'Android' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: false,
    is_featured: false,
    sort_order: 18,
  },
  {
    title: 'Koperasi Simpan Pinjam Andalan Bersama',
    slug: 'koperasi-andalan-bersama',
    description:
      'Online loan application system for a cooperative (KSP), including member management, loan application, approval workflow, and repayment tracking with Android app.',
    impact: '',
    period: '2018 – 2019',
    role: 'PHP & Android Developer',
    company: '',
    customer: 'Koperasi Andalan Bersama',
    category: ['fintech', 'android'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'JavaScript' }, { name: 'Android Studio' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 19,
  },
  {
    title: 'Happy Farmers Salatiga Delivery',
    slug: 'happy-farmers-delivery',
    description:
      'Delivery management system with Android app for a fresh produce delivery service in Salatiga, covering order management, route planning, and driver dispatch.',
    impact: '',
    period: '2019 – 2020',
    role: 'Full-Stack Developer',
    company: '',
    customer: '',
    category: ['freelance', 'android'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'Android Studio' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: false,
    is_featured: false,
    sort_order: 20,
  },
  {
    title: 'Kasir Kita',
    slug: 'kasir-kita',
    description:
      'Android-based Point of Sales (POS) application with backend API for small businesses, covering product management, transactions, and sales reporting.',
    impact: '',
    period: '2016 – 2017',
    role: 'Backend Developer',
    company: '',
    customer: '',
    category: ['freelance', 'android'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: false,
    is_featured: false,
    sort_order: 21,
  },
  {
    title: 'Kantor Kita',
    slug: 'kantor-kita',
    description:
      'HR management application covering employee records, attendance, leave management, and payroll reporting for small-to-medium businesses.',
    impact: '',
    period: '2016 – 2017',
    role: 'Backend Developer',
    company: '',
    customer: '',
    category: ['enterprise'],
    tech_stack: [{ name: 'PHP Laravel' }, { name: 'MySQL' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: false,
    is_featured: false,
    sort_order: 22,
  },
  {
    title: 'Whitelabel Website',
    slug: 'whitelabel-website',
    description:
      'Whitelabel website template system for financial services products, built with .NET C# backend and SQL Server.',
    impact: '',
    period: '2018 – 2019',
    role: 'Frontend Developer',
    company: 'Tristan Artha Media',
    customer: '',
    category: ['enterprise'],
    tech_stack: [{ name: 'CSS' }, { name: 'JavaScript' }, { name: 'DotNet C#' }, { name: 'SQL Server' }],
    website_url: '',
    github_url: '',
    playstore_url: '',
    is_confidential: true,
    is_featured: false,
    sort_order: 23,
  },
]

// ─────────────────────────────────────────────────────────────────────────────

async function api(method, path, body, token) {
  const res = await fetch(`${PAYLOAD_URL}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data?.errors ?? data)}`)
  return data
}

async function login() {
  process.stdout.write('Logging in... ')
  const data = await api('POST', '/users/login', { email: EMAIL, password: PASSWORD })
  console.log('✓')
  return data.token
}

async function seedSiteSettings(token) {
  process.stdout.write('Site settings... ')
  await api('POST', '/globals/site-settings', SITE_SETTINGS, token)
  console.log('✓')
}

async function seedCollection(token, slug, items, label) {
  process.stdout.write(`${label} (${items.length})... `)
  let ok = 0
  for (const item of items) {
    try {
      await api('POST', `/${slug}`, item, token)
      ok++
      process.stdout.write('.')
    } catch (err) {
      process.stdout.write('✗')
      console.error(`\n  Failed: ${item.name || item.title || item.company} — ${err.message}`)
    }
  }
  console.log(` (${ok}/${items.length} ok)`)
}

async function main() {
  console.log(`\nSeeding to: ${PAYLOAD_URL}\n`)
  try {
    const token = await login()
    await seedSiteSettings(token)
    await seedCollection(token, 'skills', SKILLS, 'Skills')
    await seedCollection(token, 'experience', EXPERIENCE, 'Experience')
    await seedCollection(token, 'projects', PROJECTS, 'Projects')
    console.log('\n✅ Phase 3 seed complete!\n')
  } catch (err) {
    console.error('\n❌ Fatal error:', err.message)
    process.exit(1)
  }
}

main()

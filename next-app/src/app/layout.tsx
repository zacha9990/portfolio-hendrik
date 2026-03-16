import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Zacharias Hendrik — Backend Engineer',
  description:
    'Backend Engineer specializing in enterprise systems, GIS, and fintech compliance.',
  openGraph: {
    title: 'Zacharias Hendrik — Backend Engineer',
    description:
      'Backend Engineer specializing in enterprise systems, GIS, and fintech compliance.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Zacharias Hendrik',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-text-primary min-h-screen font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

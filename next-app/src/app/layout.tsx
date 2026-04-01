import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTracker from '@/components/PageTracker'

export const metadata: Metadata = {
  title: 'Zacharias Hendrik — Backend Engineer',
  description:
    'Backend Engineer specializing in enterprise systems, GIS, and fintech compliance.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
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
        <PageTracker />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

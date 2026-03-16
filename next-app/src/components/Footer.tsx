import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm">
          © {new Date().getFullYear()} Zacharias Hendrik. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://linkedin.com/in/zacharias-hendrik-27a002145"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent text-sm transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/zacha9990"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent text-sm transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="mailto:qzacharias.hendrik@gmail.com"
            className="text-text-secondary hover:text-accent text-sm transition-colors"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}

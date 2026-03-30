export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPost } from '@/lib/payload'
import RichText from '@/components/RichText'

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      {/* Back link */}
      <Link href="/blog" className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary mb-8 transition-colors">
        ← Back to Blog
      </Link>

      {/* Cover image */}
      {post.cover_image?.url && (
        <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
          <Image
            src={post.cover_image.url}
            alt={post.cover_image.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
          {post.published_at && <span>{formatDate(post.published_at)}</span>}
          {post.read_time && (
            <>
              <span>·</span>
              <span>{post.read_time} min read</span>
            </>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((t: { tag: string }, i: number) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-surface border border-border text-text-secondary rounded"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}

        {post.excerpt && (
          <p className="mt-4 text-text-secondary text-sm leading-relaxed border-l-4 border-accent pl-4 italic">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Divider */}
      <hr className="border-border mb-8" />

      {/* Rich text content */}
      <article>
        <RichText content={post.content} />
      </article>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors">
          ← Back to Blog
        </Link>
      </div>
    </div>
  )
}

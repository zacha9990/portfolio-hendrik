import Link from 'next/link'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  cover_image?: { url: string; alt?: string }
  tags?: { tag: string }[]
  published_at?: string
  read_time?: number
  is_featured?: boolean
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-surface border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-colors">
      {/* Cover image */}
      <div className="relative h-44 bg-bg flex items-center justify-center overflow-hidden">
        {post.cover_image?.url ? (
          <Image
            src={post.cover_image.url}
            alt={post.cover_image.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-border select-none">No cover</span>
          </div>
        )}
        {post.is_featured && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-accent/20 border border-accent/30 text-accent rounded">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-semibold text-text-primary text-sm leading-snug group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
            {post.published_at && <span>{formatDate(post.published_at)}</span>}
            {post.read_time && (
              <>
                <span>·</span>
                <span>{post.read_time} min read</span>
              </>
            )}
          </div>
        </div>

        {post.excerpt && (
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {post.tags.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-bg border border-border text-text-secondary rounded"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

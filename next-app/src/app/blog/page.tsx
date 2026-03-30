export const dynamic = 'force-dynamic'

import BlogCard from '@/components/BlogCard'
import { getPosts } from '@/lib/payload'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights on backend engineering and software development.',
}

export default async function BlogPage() {
  const data = await getPosts()
  const posts = data.docs ?? []

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Blog</h1>
          <p className="text-text-secondary mt-2 text-sm">
            Thoughts, tutorials, and notes on backend engineering and software development.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post: Parameters<typeof BlogCard>[0]['post']) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-sm">No posts published yet. Check back soon.</p>
        )}
      </div>
    </div>
  )
}

import type { BlogPost } from '@/types/blog'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { BlogCard } from '@/features/blog/components/BlogCard'

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading title="Related posts" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

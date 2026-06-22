import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | 'All'>('All')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    getAllPosts().then(setPosts)
    getAllTags().then(setTags)
  }, [])

  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') return posts
    return posts.filter((post) => post.tags.includes(activeTag))
  }, [posts, activeTag])

  const [featured, ...rest] = filteredPosts

  return (
    <PageContainer className="flex flex-col gap-10 py-16 md:py-24">
      <SectionHeading
        eyebrow="Blog"
        title="Notes on analysis & technology"
        description="Write-ups on business process analysis, system analysis, data analytics, and lessons from research and teaching."
      />

      <div className="flex flex-wrap gap-2">
        {(['All', ...tags] as const).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              activeTag === tag
                ? 'border-primary/40 bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts match this tag yet.</p>
      ) : (
        <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featured ? (
            <StaggerItem className="lg:col-span-2">
              <BlogCard post={featured} variant="featured" />
            </StaggerItem>
          ) : null}
          {rest.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </PageContainer>
  )
}

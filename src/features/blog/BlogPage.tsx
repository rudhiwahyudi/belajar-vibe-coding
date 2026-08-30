import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'
import { useLanguage } from '@/hooks/useLanguage'

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | 'All'>('All')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<string[]>([])
  const { t } = useLanguage()

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
      <FadeIn>
        <SectionHeading
          eyebrow={t('blogPage.eyebrow')}
          title={t('blogPage.title')}
          description={t('blogPage.description')}
        />
      </FadeIn>

      <FadeIn delay={0.06}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter blog">
          {(['All', ...tags] as const).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                activeTag === tag
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground',
              )}
            >
              {tag === 'All' ? t('projectsPage.filterAll') : tag}
            </button>
          ))}
        </div>
      </FadeIn>

      {filteredPosts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">{t('blogPage.noPosts')}</p>
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

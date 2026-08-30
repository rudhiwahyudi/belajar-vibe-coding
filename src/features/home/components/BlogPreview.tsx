import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { getAllPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { useLanguage } from '@/hooks/useLanguage'

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    getAllPosts().then((all) => setPosts(all.slice(0, 3)))
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="section-padding border-t border-border/40 bg-secondary/20">
      <PageContainer className="flex flex-col gap-10">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t('blog.eyebrow')}
            title={t('blog.title')}
            description={t('blog.description')}
          />
          <Button variant="outline" render={<Link to="/blog" />} className="w-fit shrink-0 rounded-full border-border/60 bg-background px-5 text-[13.5px] font-medium hover:bg-secondary">
            {t('blog.readBlog')}
            <ArrowRight className="size-3.5" />
          </Button>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageContainer>
    </section>
  )
}

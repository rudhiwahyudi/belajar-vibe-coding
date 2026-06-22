import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { getAllPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getAllPosts().then((all) => setPosts(all.slice(0, 3)))
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <PageContainer className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Writing"
            title="From the blog"
            description="Notes on business process analysis, system analysis, and data analytics."
          />
          <Button variant="outline" render={<Link to="/blog" />}>
            Read the blog
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

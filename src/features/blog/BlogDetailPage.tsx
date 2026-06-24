import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { FadeIn } from '@/components/motion/FadeIn'
import { Separator } from '@/components/ui/separator'
import { TechBadge } from '@/components/shared/TechBadge'
import { Prose } from '@/components/shared/Prose'
import { TableOfContents } from '@/features/blog/components/TableOfContents'
import { ShareButtons } from '@/features/blog/components/ShareButtons'
import { RelatedPosts } from '@/features/blog/components/RelatedPosts'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    if (!slug) { setPost(null); return }
    getPostBySlug(slug).then((p) => {
      setPost(p ?? null)
      if (p) getRelatedPosts(p.slug).then(setRelatedPosts)
    })
  }, [slug])

  if (post === undefined) return null
  if (!post) return <Navigate to="/blog" replace />

  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <PageContainer className="flex flex-col gap-12 py-16 md:py-24">
      <FadeIn className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag) => (
            <TechBadge key={tag} label={tag} />
          ))}
        </div>
      </FadeIn>

      <FadeIn className="relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl border border-border bg-secondary">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="text-gradient text-6xl font-bold">{post.category.charAt(0)}</span>
        )}
      </FadeIn>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
        <FadeIn>
          <Prose content={post.content} className="prose-headings:scroll-mt-24" />
        </FadeIn>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents headings={post.headings} />
          <Separator />
          <ShareButtons title={post.title} url={url} />
        </aside>
      </div>

      <Separator />

      <RelatedPosts posts={relatedPosts} />
    </PageContainer>
  )
}

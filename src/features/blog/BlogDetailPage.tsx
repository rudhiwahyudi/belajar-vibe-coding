import { Navigate, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { FadeIn } from '@/components/motion/FadeIn'
import { Separator } from '@/components/ui/separator'
import { TechBadge } from '@/components/shared/TechBadge'
import { TableOfContents } from '@/features/blog/components/TableOfContents'
import { ShareButtons } from '@/features/blog/components/ShareButtons'
import { RelatedPosts } from '@/features/blog/components/RelatedPosts'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const relatedPosts = getRelatedPosts(post.slug)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const { Content } = post

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

      <FadeIn className="flex aspect-[21/9] items-center justify-center rounded-3xl border border-border bg-secondary">
        <span className="text-gradient text-6xl font-bold">{post.category.charAt(0)}</span>
      </FadeIn>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
        <FadeIn
          className={[
            'prose prose-zinc dark:prose-invert max-w-none',
            'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24',
            'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
            'prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
            'prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-secondary',
          ].join(' ')}
        >
          <Content />
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

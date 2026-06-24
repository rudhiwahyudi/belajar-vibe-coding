import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import { TechBadge } from '@/components/shared/TechBadge'
import { cn } from '@/lib/utils'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured'
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5',
        variant === 'featured' && 'lg:col-span-2 lg:flex-row',
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden border-b border-border bg-secondary',
          variant === 'featured' ? 'aspect-[16/9] lg:aspect-auto lg:w-1/2 lg:border-b-0 lg:border-r' : 'aspect-[16/9]',
        )}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="bg-gradient-accent absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20" />
            <span className="text-gradient text-3xl font-bold">{post.category.charAt(0)}</span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="flex items-start justify-between gap-2 text-lg font-semibold tracking-tight">
          {post.title}
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </h3>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <TechBadge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  )
}

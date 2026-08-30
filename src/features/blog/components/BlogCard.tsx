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
      aria-label={`Read article: ${post.title}`}
      className={cn(
        'card-hover group flex flex-col overflow-hidden rounded-[20px] border border-border/60 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        variant === 'featured' && 'lg:col-span-2 lg:flex-row',
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-secondary/50',
          variant === 'featured' ? 'aspect-[16/9] lg:aspect-auto lg:w-1/2' : 'aspect-[16/9]',
        )}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/40" />
            <span className="relative flex size-11 items-center justify-center rounded-2xl bg-background text-sm font-semibold tracking-tight shadow-sm ring-1 ring-border/50">
              {post.category.charAt(0)}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">{post.category}</span>
          <span aria-hidden="true" className="text-border">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true" className="text-border">·</span>
          <span>{post.readingTime} min</span>
        </div>
        <h3 className="flex items-start justify-between gap-3 text-[15px] font-[600] leading-snug tracking-tight">
          <span className="line-clamp-2">{post.title}</span>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
            <ArrowUpRight className="size-3.5" />
          </span>
        </h3>
        <p className="line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {post.tags.slice(0, 3).map((tag) => (
            <TechBadge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  )
}

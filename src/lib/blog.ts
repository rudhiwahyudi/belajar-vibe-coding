import readingTime from 'reading-time/lib/reading-time'
import GithubSlugger from 'github-slugger'
import type { BlogPost, BlogPostMeta, TocHeading } from '@/types/blog'

interface MdxModule {
  default: BlogPost['Content']
  frontmatter: Omit<BlogPostMeta, 'readingTime' | 'slug'>
}

const modules = import.meta.glob<MdxModule>('/src/content/blog/*.mdx', {
  eager: true,
})

const rawModules = import.meta.glob<string>('/src/content/blog/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.mdx$/, '')
}

function extractHeadings(body: string): TocHeading[] {
  const slugger = new GithubSlugger()
  const headings: TocHeading[] = []

  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim())
    if (!match) continue

    const text = match[2].trim()
    headings.push({
      id: slugger.slug(text),
      text,
      depth: match[1].length,
    })
  }

  return headings
}

function buildPosts(): BlogPost[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = slugFromPath(path)
      const raw = rawModules[path] ?? ''
      const body = raw.replace(/^---[\s\S]*?---/, '')
      const stats = readingTime(body)

      return {
        slug,
        ...mod.frontmatter,
        readingTime: Math.max(1, Math.round(stats.minutes)),
        Content: mod.default,
        headings: extractHeadings(body),
      }
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

const posts = buildPosts()

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []

  return posts
    .filter((post) => post.slug !== slug)
    .filter((post) => post.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags)
}

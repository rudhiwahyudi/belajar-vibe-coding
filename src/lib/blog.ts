import GithubSlugger from 'github-slugger'
import { supabase } from '@/lib/supabase'
import type { BlogPost, TocHeading } from '@/types/blog'

function extractHeadings(body: string): TocHeading[] {
  const slugger = new GithubSlugger()
  const headings: TocHeading[] = []
  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim())
    if (!match) continue
    const text = match[2].trim()
    headings.push({ id: slugger.slug(text), text, depth: match[1].length })
  }
  return headings
}

const SELECT_COLS =
  'slug,title,excerpt,content,cover_image,published_at,updated_at,reading_time,tags,category'

type DbPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  published_at: string | null
  updated_at: string | null
  reading_time: number
  tags: string[]
  category: string
}

function mapPost(row: DbPost): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    publishedAt: row.published_at ?? '',
    updatedAt: row.updated_at ?? undefined,
    readingTime: row.reading_time,
    tags: row.tags,
    category: row.category as BlogPost['category'],
    headings: extractHeadings(row.content),
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(SELECT_COLS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(SELECT_COLS)
    .eq('status', 'published')
    .eq('slug', slug)
    .single()
  if (error) return undefined
  return mapPost(data)
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const current = await getPostBySlug(slug)
  if (!current) return []

  const { data, error } = await supabase
    .from('blog_posts')
    .select(SELECT_COLS)
    .eq('status', 'published')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(20)
  if (error) return []

  return (data ?? [])
    .map(mapPost)
    .filter((post) => post.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit)
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('status', 'published')
  if (error) return []
  const tags = new Set<string>()
  ;(data ?? []).forEach((row) => (row.tags as string[]).forEach((t) => tags.add(t)))
  return Array.from(tags)
}

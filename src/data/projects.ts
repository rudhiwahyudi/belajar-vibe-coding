import { supabase } from '@/lib/supabase'
import type { Project } from '@/types/project'

const SELECT_COLS =
  'slug,title,tagline,summary,description,focus_areas,status,featured,cover_image,gallery,tech_stack,role,timeline_start,timeline_end,links,highlights,metrics,architecture'

type DbProject = {
  slug: string
  title: string
  tagline: string
  summary: string
  description: string
  focus_areas: string[]
  status: 'completed' | 'in-progress' | 'archived'
  featured: boolean
  cover_image: string
  gallery: string[]
  tech_stack: string[]
  role: string
  timeline_start: string
  timeline_end: string | null
  links: Record<string, string>
  highlights: string[]
  metrics: { label: string; value: string }[] | null
  architecture: { image?: string; description?: string } | null
}

function mapProject(row: DbProject): Project {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    summary: row.summary,
    description: row.description,
    focusAreas: row.focus_areas as Project['focusAreas'],
    status: row.status,
    featured: row.featured,
    coverImage: row.cover_image,
    gallery: row.gallery,
    techStack: row.tech_stack,
    role: row.role,
    timeline: { start: row.timeline_start, end: row.timeline_end ?? undefined },
    links: row.links,
    highlights: row.highlights,
    metrics: row.metrics ?? undefined,
    architecture: row.architecture ?? undefined,
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_COLS)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapProject)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_COLS)
    .eq('featured', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapProject)
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_COLS)
    .eq('slug', slug)
    .single()
  if (error) return undefined
  return mapProject(data)
}

export async function getRelatedProjects(slug: string, limit = 3): Promise<Project[]> {
  const current = await getProjectBySlug(slug)
  if (!current) return []

  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_COLS)
    .neq('slug', slug)
    .order('created_at', { ascending: false })
  if (error) return []

  return (data ?? [])
    .map(mapProject)
    .filter((p) => p.focusAreas.some((area) => current.focusAreas.includes(area)))
    .slice(0, limit)
}

export async function getAllFocusAreas(): Promise<string[]> {
  const { data, error } = await supabase.from('projects').select('focus_areas')
  if (error) return []
  const areas = new Set<string>()
  ;(data ?? []).forEach((row) => (row.focus_areas as string[]).forEach((a) => areas.add(a)))
  return Array.from(areas)
}

export async function getAllTechStacks(): Promise<string[]> {
  const { data, error } = await supabase.from('projects').select('tech_stack')
  if (error) return []
  const stacks = new Set<string>()
  ;(data ?? []).forEach((row) => (row.tech_stack as string[]).forEach((t) => stacks.add(t)))
  return Array.from(stacks).sort()
}

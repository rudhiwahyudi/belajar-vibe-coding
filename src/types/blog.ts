import type { ComponentType } from 'react'
import type { FocusArea } from './common'

export type BlogCategory = FocusArea | 'Career' | 'Scholarship'

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string
  updatedAt?: string
  readingTime: number // minutes
  tags: string[]
  category: BlogCategory
}

export interface TocHeading {
  id: string
  text: string
  depth: number
}

export interface BlogPost extends BlogPostMeta {
  Content: ComponentType
  headings: TocHeading[]
}

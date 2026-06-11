declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { BlogPostMeta } from './blog'

  export const frontmatter: Omit<BlogPostMeta, 'readingTime' | 'slug'>
  const MDXComponent: ComponentType
  export default MDXComponent
}

// Import the core estimator directly to avoid pulling in `reading-time`'s
// `lib/stream` (which calls `util.inherits` and breaks in the browser).
declare module 'reading-time/lib/reading-time' {
  import type { Options, ReadTimeResults } from 'reading-time'

  export default function readingTime(text: string, options?: Options): ReadTimeResults
}

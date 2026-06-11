import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface ProseProps {
  content: string
  className?: string
}

/** Renders markdown with consistent article typography. */
export function Prose({ content, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-zinc dark:prose-invert max-w-none',
        'prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-secondary',
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

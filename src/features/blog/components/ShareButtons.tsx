import { useState } from 'react'
import { Check, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinkedinIcon, XIcon } from '@/components/icons/BrandIcons'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    {
      label: 'Share on X',
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Share on LinkedIn',
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Share
      </h3>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.label}
            variant="outline"
            size="icon"
            render={<a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} />}
          >
            <link.icon className="size-4" />
          </Button>
        ))}
        <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy link">
          {copied ? <Check className="size-4" /> : <LinkIcon className="size-4" />}
        </Button>
      </div>
    </div>
  )
}

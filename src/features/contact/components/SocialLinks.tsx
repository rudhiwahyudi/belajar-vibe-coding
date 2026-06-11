import { Mail } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons/BrandIcons'
import { cn } from '@/lib/utils'

const socialLinks = [
  { label: 'GitHub', href: siteConfig.social.github, icon: GithubIcon },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: 'X', href: siteConfig.social.x, icon: XIcon },
].filter((link): link is typeof link & { href: string } => Boolean(link.href))

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <link.icon className="size-4" />
        </a>
      ))}
      <a
        href={`mailto:${siteConfig.email}`}
        aria-label="Email"
        className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <Mail className="size-4" />
      </a>
    </div>
  )
}

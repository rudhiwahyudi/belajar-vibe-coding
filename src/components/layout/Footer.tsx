import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons/BrandIcons'
import { NAV_ITEMS } from '@/lib/constants'
import { siteConfig } from '@/data/site-config'

const socialLinks = [
  { label: 'GitHub', href: siteConfig.social.github, icon: GithubIcon },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: 'X', href: siteConfig.social.x, icon: XIcon },
].filter((link): link is typeof link & { href: string } => Boolean(link.href))

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <PageContainer className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="bg-gradient-accent flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white">
              {siteConfig.initials}
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">{siteConfig.tagline}</p>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <link.icon className="size-4" />
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </PageContainer>
      <PageContainer className="border-t border-border/60 py-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with React, Tailwind CSS, and
          Framer Motion.
        </p>
      </PageContainer>
    </footer>
  )
}

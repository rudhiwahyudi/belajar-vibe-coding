import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons/BrandIcons'
import { NAV_ITEMS } from '@/lib/constants'
import { siteConfig } from '@/data/site-config'
import { useLanguage } from '@/hooks/useLanguage'

const socialLinks = [
  { label: 'GitHub', href: siteConfig.social.github, icon: GithubIcon },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: 'X', href: siteConfig.social.x, icon: XIcon },
].filter((link): link is typeof link & { href: string } => Boolean(link.href))

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/40 bg-secondary/10 print:hidden">
      <PageContainer className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-14">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5 font-medium tracking-tight rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
              <img src="/logo.png" alt={siteConfig.name} className="size-5 object-contain brightness-0 invert dark:brightness-0 dark:invert-0" />
            </span>
            <span className="text-[14px] font-medium">{siteConfig.name}</span>
          </Link>
          <p className="max-w-sm text-pretty text-[13.5px] leading-[1.6] text-muted-foreground">{t('footer.tagline')}</p>
          <div className="flex items-center gap-2 pt-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <link.icon className="size-3.5" aria-hidden />
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2.5 text-[13.5px]" aria-label="Footer">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="font-[450] tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-1 py-1"
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </Link>
          ))}
        </nav>
      </PageContainer>
      <div className="border-t border-border/40">
        <PageContainer className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground/70">
            © {new Date().getFullYear()} {siteConfig.name}. {t('footer.builtWith')}
          </p>
          <p className="text-xs text-muted-foreground/50">Indonesia · Available for collaboration</p>
        </PageContainer>
      </div>
    </footer>
  )
}

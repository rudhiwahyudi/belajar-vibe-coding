import { NavLink, Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { MobileNav } from '@/components/layout/MobileNav'
import { PageContainer } from '@/components/layout/PageContainer'
import { NAV_ITEMS } from '@/lib/constants'
import { siteConfig } from '@/data/site-config'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/hooks/useLanguage'

interface NavbarProps {
  onOpenCommandPalette: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 print:hidden">
      <PageContainer className="flex h-[60px] items-center justify-between gap-4 md:h-[64px]">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
          <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <img src="/logo.png" alt={siteConfig.name} className="size-5 object-contain brightness-0 invert dark:brightness-0 dark:invert-0" />
          </span>
          <span className="hidden text-[15px] font-medium tracking-tight sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-1.5 text-[13.5px] font-[450] tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )
              }
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCommandPalette}
            aria-label={`${t('nav.search')} (⌘K)`}
            className="hidden h-9 min-h-[36px] rounded-full border-border/60 bg-secondary/50 px-3.5 text-[13px] font-normal text-muted-foreground hover:bg-secondary hover:text-foreground sm:inline-flex focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Search className="size-3.5 opacity-60" aria-hidden />
            {t('nav.search')}
            <kbd className="ml-1.5 hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground lg:inline-flex" aria-hidden>
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCommandPalette}
            className="size-11 min-h-[44px] min-w-[44px] rounded-full sm:hidden"
            aria-label={`${t('nav.search')} (⌘K)`}
          >
            <Search className="size-4" aria-hidden />
          </Button>
          <div className="ml-1 hidden h-4 w-px bg-border sm:block" aria-hidden />
          <ThemeToggle />
          <LanguageToggle />
          <MobileNav />
        </div>
      </PageContainer>
    </header>
  )
}

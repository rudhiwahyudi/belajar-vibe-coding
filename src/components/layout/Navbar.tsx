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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl print:hidden">
      <PageContainer className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <img src="/logo.png" alt={siteConfig.name} className="size-8 object-contain" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
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
            className="hidden text-muted-foreground sm:inline-flex"
          >
            <Search className="size-3.5" />
            {t('nav.search')}
            <kbd className="ml-2 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCommandPalette}
            className="sm:hidden"
            aria-label={t('nav.search')}
          >
            <Search className="size-4" />
          </Button>
          <ThemeToggle />
          <LanguageToggle />
          <MobileNav />
        </div>
      </PageContainer>
    </header>
  )
}

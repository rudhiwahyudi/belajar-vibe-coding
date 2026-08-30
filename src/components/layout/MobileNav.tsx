import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/hooks/useLanguage'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="size-11 min-h-[44px] min-w-[44px] rounded-full lg:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Open menu">
            <Menu className="size-[18px]" aria-hidden />
          </Button>
        }
      />
      <SheetContent side="right" className="w-[300px] border-l border-border/50 bg-background/95 backdrop-blur-xl">
        <SheetHeader className="border-b border-border/40 pb-4 text-left">
          <SheetTitle className="text-[13px] font-medium uppercase tracking-widest text-muted-foreground">
            {t('nav.search') === 'Search' ? 'Navigation' : 'Navigasi'}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-3.5 py-3 text-[15px] font-[450] tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] flex items-center',
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
      </SheetContent>
    </Sheet>
  )
}

import { Outlet, ScrollRestoration } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { NoiseOverlay } from '@/components/shared/NoiseOverlay'
import { PageTransition } from '@/components/motion/PageTransition'
import { useCommandPalette } from '@/hooks/useCommandPalette'

export function RootLayout() {
  const { open, setOpen } = useCommandPalette()
  const location = useLocation()

  return (
    <div className="flex min-h-svh flex-col">
      <NoiseOverlay />
      <Navbar onOpenCommandPalette={() => setOpen(true)} />
      <CommandPalette open={open} onOpenChange={setOpen} />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

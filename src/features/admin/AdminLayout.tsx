import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return null
  if (!session) return <Navigate to="/admin/login" replace />

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-sm font-medium text-foreground'
      : 'text-sm text-muted-foreground hover:text-foreground transition-colors'

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-5xl items-center gap-6 px-4">
          <span className="text-sm font-semibold">Admin</span>

          <nav className="flex gap-4">
            <NavLink to="/admin/blog" className={navClass}>Blog</NavLink>
            <NavLink to="/admin/projects" className={navClass}>Projects</NavLink>
            <NavLink to="/admin/journey" className={navClass}>Journey</NavLink>
            <NavLink to="/admin/certificates" className={navClass}>Certificates</NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← View site
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

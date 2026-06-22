import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface Row {
  id: string
  title: string
  issuer: string
  issued_at: string
  featured: boolean
  sort_order: number
}

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Row[]>([])

  async function load() {
    const { data } = await supabase
      .from('certificates')
      .select('id, title, issuer, issued_at, featured, sort_order')
      .order('sort_order', { ascending: true })
    setItems(data ?? [])
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this certificate?')) return
    await supabase.from('certificates').delete().eq('id', id)
    load()
  }

  function formatMonth(value: string) {
    const [y, m] = value.split('-')
    return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', {
      month: 'short', year: 'numeric',
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Certificates</h1>
        <Button size="sm" render={<Link to="/admin/certificates/new" />}>
          New certificate
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Issued</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Featured</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-12">Order</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.issuer}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {formatMonth(item.issued_at)}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.featured ? (
                    <span className="text-yellow-500" title="Featured">★</span>
                  ) : (
                    <span className="text-border">☆</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground text-center">
                  {item.sort_order}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/admin/certificates/${item.id}/edit`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No certificates yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

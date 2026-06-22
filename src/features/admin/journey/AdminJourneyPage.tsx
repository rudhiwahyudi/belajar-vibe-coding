import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

const TYPE_LABEL: Record<string, string> = {
  work: 'Work',
  education: 'Education',
  achievement: 'Milestone',
}

const TYPE_COLOR: Record<string, string> = {
  work: 'text-blue-500',
  education: 'text-green-500',
  achievement: 'text-yellow-500',
}

interface Row {
  id: string
  type: string
  title: string
  organization: string
  range_start: string
  range_end: string | null
  sort_order: number
}

export default function AdminJourneyPage() {
  const [items, setItems] = useState<Row[]>([])

  async function load() {
    const { data } = await supabase
      .from('journey_items')
      .select('id, type, title, organization, range_start, range_end, sort_order')
      .order('sort_order', { ascending: true })
    setItems(data ?? [])
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this journey item?')) return
    await supabase.from('journey_items').delete().eq('id', id)
    load()
  }

  function formatRange(start: string, end: string | null) {
    const fmt = (s: string) => {
      const [y, m] = s.split('-')
      return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', {
        month: 'short', year: 'numeric',
      })
    }
    return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Journey</h1>
        <Button size="sm" render={<Link to="/admin/journey/new" />}>
          New item
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Period</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-12">Order</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.organization}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${TYPE_COLOR[item.type]}`}>
                    {TYPE_LABEL[item.type] ?? item.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {formatRange(item.range_start, item.range_end)}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground text-center">
                  {item.sort_order}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/admin/journey/${item.id}/edit`}
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
                  No journey items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

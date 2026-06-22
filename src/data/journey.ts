import { supabase } from '@/lib/supabase'
import type { JourneyItem } from '@/types/journey'

function mapItem(row: Record<string, unknown>): JourneyItem {
  return {
    id: row.id as string,
    type: row.type as JourneyItem['type'],
    title: row.title as string,
    organization: row.organization as string,
    location: (row.location as string) || undefined,
    range: {
      start: row.range_start as string,
      end: (row.range_end as string) || undefined,
    },
    description: (row.description as string) || '',
    bullets: (row.bullets as string[]) || [],
    logo: (row.logo as string) || undefined,
    tags: (row.tags as string[]) || [],
    link: (row.link as string) || undefined,
  }
}

export async function getJourneySorted(): Promise<JourneyItem[]> {
  const { data } = await supabase
    .from('journey_items')
    .select('*')
    .order('sort_order', { ascending: true })
  return (data ?? []).map(mapItem)
}

export async function getJourneyByType(type: JourneyItem['type']): Promise<JourneyItem[]> {
  const { data } = await supabase
    .from('journey_items')
    .select('*')
    .eq('type', type)
    .order('sort_order', { ascending: true })
  return (data ?? []).map(mapItem)
}

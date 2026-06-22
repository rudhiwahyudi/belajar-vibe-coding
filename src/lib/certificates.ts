import { supabase } from '@/lib/supabase'
import type { Certificate } from '@/types/certificate'

function mapCert(row: Record<string, unknown>): Certificate {
  return {
    id: row.id as string,
    title: row.title as string,
    issuer: row.issuer as string,
    issuedAt: row.issued_at as string,
    expiresAt: (row.expires_at as string) || undefined,
    credentialId: (row.credential_id as string) || undefined,
    credentialUrl: (row.credential_url as string) || undefined,
    coverImage: (row.cover_image as string) || undefined,
    tags: (row.tags as string[]) || [],
    featured: (row.featured as boolean) ?? false,
    sortOrder: (row.sort_order as number) ?? 0,
  }
}

export async function getAllCertificates(): Promise<Certificate[]> {
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .order('sort_order', { ascending: true })
  return (data ?? []).map(mapCert)
}

export async function getFeaturedCertificates(): Promise<Certificate[]> {
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
  return (data ?? []).map(mapCert)
}

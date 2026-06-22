import { supabase } from '@/lib/supabase'
import type { Resume } from '@/types/resume'

export async function getResume(): Promise<Resume | null> {
  const { data } = await supabase.from('resume').select('*').limit(1)
  const row = data?.[0]
  if (!row) return null
  return {
    id: row.id as string,
    name: row.name as string,
    tagline: row.tagline as string,
    summary: row.summary as string,
    email: (row.email as string) || undefined,
    phone: (row.phone as string) || undefined,
    location: (row.location as string) || undefined,
    website: (row.website as string) || undefined,
    linkedin: (row.linkedin as string) || undefined,
    github: (row.github as string) || undefined,
    experience: (row.experience as Resume['experience']) || [],
    education: (row.education as Resume['education']) || [],
    skills: (row.skills as Resume['skills']) || [],
    pdfUrl: (row.pdf_url as string) || undefined,
    updatedAt: row.updated_at as string,
  }
}

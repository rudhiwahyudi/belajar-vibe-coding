import { supabase } from '@/lib/supabase'
import type { Resume } from '@/types/resume'

export async function getResume(): Promise<Resume | null> {
  const { data } = await supabase.from('resume').select('*').limit(1).single()
  if (!data) return null
  return {
    id: data.id as string,
    name: data.name as string,
    tagline: data.tagline as string,
    summary: data.summary as string,
    email: (data.email as string) || undefined,
    phone: (data.phone as string) || undefined,
    location: (data.location as string) || undefined,
    website: (data.website as string) || undefined,
    linkedin: (data.linkedin as string) || undefined,
    github: (data.github as string) || undefined,
    experience: (data.experience as Resume['experience']) || [],
    education: (data.education as Resume['education']) || [],
    skills: (data.skills as Resume['skills']) || [],
    pdfUrl: (data.pdf_url as string) || undefined,
    updatedAt: data.updated_at as string,
  }
}

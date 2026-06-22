import { supabase } from '@/lib/supabase'

export async function uploadMedia(file: File, folder = 'uploads'): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'bin'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `${folder}/${filename}`

  const { data, error } = await supabase.storage
    .from('portfolio-media')
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(data.path)

  return publicUrl
}

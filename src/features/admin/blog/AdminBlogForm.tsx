import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { uploadMedia } from '@/features/admin/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const CATEGORIES = [
  'System Analysis',
  'Business Process Analysis',
  'Technology Solutions',
  'Data & Research',
  'Career',
] as const

const schema = z.object({
  title: z.string().min(1, 'Required'),
  slug: z.string().min(1, 'Required'),
  excerpt: z.string().min(1, 'Required'),
  content: z.string(),
  category: z.string().min(1, 'Required'),
  tags: z.string(),
  status: z.enum(['draft', 'published']),
  published_at: z.string(),
  reading_time: z.number().int().min(1),
  cover_image: z.string(),
})

type FormValues = z.infer<typeof schema>

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '')
}

function calcReadingTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).filter(Boolean).length / 200))
}

const inputClass =
  'h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export default function AdminBlogForm() {
  const { id } = useParams<{ id: string }>()
  const mode = id ? 'edit' : 'new'
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [uploading, setUploading] = useState(false)
  const coverRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: CATEGORIES[0],
      tags: '',
      status: 'draft' as const,
      published_at: '',
      reading_time: 1,
      cover_image: '',
    },
  })

  useEffect(() => {
    if (mode !== 'edit' || !id) return
    supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return
        reset({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          tags: (data.tags as string[]).join(', '),
          status: data.status,
          published_at: data.published_at
            ? data.published_at.split('T')[0]
            : '',
          reading_time: data.reading_time,
          cover_image: data.cover_image,
        })
      })
  }, [id, mode, reset])

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadMedia(file, 'covers')
      setValue('cover_image', url)
    } catch {
      setServerError('Image upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function onSubmit(values: FormValues) {
    setSaving(true)
    setServerError('')

    const payload = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: values.status,
      published_at:
        values.status === 'published'
          ? values.published_at || new Date().toISOString()
          : null,
      reading_time: values.reading_time,
      cover_image: values.cover_image,
    }

    const { error } =
      mode === 'edit' && id
        ? await supabase.from('blog_posts').update(payload).eq('id', id)
        : await supabase.from('blog_posts').insert(payload)

    if (error) {
      setServerError(error.message)
      setSaving(false)
    } else {
      navigate('/admin/blog')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {mode === 'edit' ? 'Edit Post' : 'New Post'}
        </h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/blog')}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>

      {serverError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="flex flex-col gap-5">
          <Field label="Title" error={errors.title?.message}>
            <Input {...register('title')} placeholder="Post title" />
          </Field>

          <Field label="Slug" error={errors.slug?.message}>
            <div className="flex gap-2">
              <Input {...register('slug')} placeholder="post-slug" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => setValue('slug', toSlug(getValues('title')))}
              >
                Generate
              </Button>
            </div>
          </Field>

          <Field label="Excerpt" error={errors.excerpt?.message}>
            <Textarea
              {...register('excerpt')}
              placeholder="Short description shown on cards"
              className="min-h-20"
            />
          </Field>

          <Field label="Content (Markdown)" error={errors.content?.message}>
            <Textarea
              {...register('content')}
              placeholder="Write your post in Markdown…"
              className="min-h-96 font-mono text-xs"
            />
            <button
              type="button"
              className="self-start text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setValue('reading_time', calcReadingTime(getValues('content')))}
            >
              ↻ Recalculate reading time
            </button>
          </Field>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          <Field label="Status" error={errors.status?.message}>
            <select {...register('status')} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <Field label="Category" error={errors.category?.message}>
            <select {...register('category')} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Tags (comma-separated)" error={errors.tags?.message}>
            <Input {...register('tags')} placeholder="sql, analysis, data" />
          </Field>

          <Field label="Published date" error={errors.published_at?.message}>
            <Input {...register('published_at')} type="date" />
          </Field>

          <Field label="Reading time (min)" error={errors.reading_time?.message}>
            <Input {...register('reading_time', { valueAsNumber: true })} type="number" min={1} />
          </Field>

          <Separator />

          <Field label="Cover image" error={errors.cover_image?.message}>
            <Input {...register('cover_image')} placeholder="https://…" />
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => coverRef.current?.click()}
            >
              {uploading ? 'Uploading…' : 'Upload image'}
            </Button>
          </Field>
        </aside>
      </div>
    </form>
  )
}

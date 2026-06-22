import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { uploadMedia } from '@/features/admin/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const FOCUS_AREAS = [
  'System Analysis',
  'Business Process Analysis',
  'Technology Solutions',
  'Data & Research',
] as const

const schema = z.object({
  title: z.string().min(1, 'Required'),
  slug: z.string().min(1, 'Required'),
  tagline: z.string(),
  summary: z.string(),
  description: z.string(),
  focus_areas: z.array(z.string()),
  status: z.enum(['completed', 'in-progress', 'archived']),
  featured: z.boolean(),
  role: z.string(),
  timeline_start: z.string().min(1, 'Required (YYYY-MM)'),
  timeline_end: z.string(),
  cover_image: z.string(),
  gallery: z.string(),
  tech_stack: z.string(),
  link_live: z.string(),
  link_repo: z.string(),
  link_demo: z.string(),
  highlights: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })),
  architecture_description: z.string(),
})

type FormValues = z.infer<typeof schema>

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '')
}

const inputClass =
  'h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30'

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Separator />
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h2>
    </div>
  )
}

export default function AdminProjectsForm() {
  const { id } = useParams<{ id: string }>()
  const mode = id ? 'edit' : 'new'
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const coverRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      slug: '',
      tagline: '',
      summary: '',
      description: '',
      focus_areas: [],
      status: 'in-progress' as const,
      featured: false,
      role: '',
      timeline_start: '',
      timeline_end: '',
      cover_image: '',
      gallery: '',
      tech_stack: '',
      link_live: '',
      link_repo: '',
      link_demo: '',
      highlights: '',
      metrics: [],
      architecture_description: '',
    },
  })

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: 'metrics',
  })

  useEffect(() => {
    if (mode !== 'edit' || !id) return
    supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return
        const metrics = Array.isArray(data.metrics) ? data.metrics : []
        reset({
          title: data.title,
          slug: data.slug,
          tagline: data.tagline,
          summary: data.summary,
          description: data.description,
          focus_areas: data.focus_areas ?? [],
          status: data.status,
          featured: data.featured,
          role: data.role,
          timeline_start: data.timeline_start,
          timeline_end: data.timeline_end ?? '',
          cover_image: data.cover_image,
          gallery: (data.gallery as string[]).join('\n'),
          tech_stack: (data.tech_stack as string[]).join('\n'),
          link_live: (data.links as Record<string, string>)?.live ?? '',
          link_repo: (data.links as Record<string, string>)?.repo ?? '',
          link_demo: (data.links as Record<string, string>)?.demo ?? '',
          highlights: (data.highlights as string[]).join('\n'),
          metrics,
          architecture_description: (data.architecture as { description?: string })?.description ?? '',
        })
      })
  }, [id, mode, reset])

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    try {
      const url = await uploadMedia(file, 'covers')
      setValue('cover_image', url)
    } catch {
      setServerError('Cover upload failed.')
    } finally {
      setUploadingCover(false)
      e.target.value = ''
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    setUploadingGallery(true)
    try {
      const urls = await Promise.all(files.map((f) => uploadMedia(f, 'gallery')))
      const current = getValues('gallery').trim()
      setValue('gallery', current ? `${current}\n${urls.join('\n')}` : urls.join('\n'))
    } catch {
      setServerError('Gallery upload failed.')
    } finally {
      setUploadingGallery(false)
      e.target.value = ''
    }
  }

  async function onSubmit(values: FormValues) {
    setSaving(true)
    setServerError('')

    const links: Record<string, string> = {}
    if (values.link_live) links.live = values.link_live
    if (values.link_repo) links.repo = values.link_repo
    if (values.link_demo) links.demo = values.link_demo

    const payload = {
      title: values.title,
      slug: values.slug,
      tagline: values.tagline,
      summary: values.summary,
      description: values.description,
      focus_areas: values.focus_areas,
      status: values.status,
      featured: values.featured,
      role: values.role,
      timeline_start: values.timeline_start,
      timeline_end: values.timeline_end || null,
      cover_image: values.cover_image,
      gallery: values.gallery.split('\n').map((s) => s.trim()).filter(Boolean),
      tech_stack: values.tech_stack.split('\n').map((s) => s.trim()).filter(Boolean),
      links,
      highlights: values.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
      metrics: values.metrics.length > 0 ? values.metrics : null,
      architecture:
        values.architecture_description
          ? { description: values.architecture_description }
          : null,
    }

    const { error } =
      mode === 'edit' && id
        ? await supabase.from('projects').update(payload).eq('id', id)
        : await supabase.from('projects').insert(payload)

    if (error) {
      setServerError(error.message)
      setSaving(false)
    } else {
      navigate('/admin/projects')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {mode === 'edit' ? 'Edit Project' : 'New Project'}
        </h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/projects')}
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

      {/* Basic info */}
      <Field label="Title" error={errors.title?.message}>
        <Input {...register('title')} placeholder="Project title" />
      </Field>

      <Field label="Slug" error={errors.slug?.message}>
        <div className="flex gap-2">
          <Input {...register('slug')} placeholder="project-slug" />
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

      <Field label="Tagline" error={errors.tagline?.message}>
        <Input {...register('tagline')} placeholder="One-line description" />
      </Field>

      <Field label="Summary" error={errors.summary?.message}>
        <Textarea {...register('summary')} placeholder="2–3 sentence summary" className="min-h-20" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Status" error={errors.status?.message}>
          <select {...register('status')} className={inputClass}>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </Field>

        <Field label="Role" error={errors.role?.message}>
          <Input {...register('role')} placeholder="System Analyst" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Timeline start" hint="YYYY-MM" error={errors.timeline_start?.message}>
          <Input {...register('timeline_start')} placeholder="2023-09" />
        </Field>
        <Field label="Timeline end" hint="YYYY-MM or blank = Present" error={errors.timeline_end?.message}>
          <Input {...register('timeline_end')} placeholder="2024-03" />
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register('featured')}
          id="featured"
          type="checkbox"
          className="size-4 rounded border-input"
        />
        <Label htmlFor="featured" className="font-normal">
          Featured (shown on homepage)
        </Label>
      </div>

      <Field label="Focus areas" error={errors.focus_areas?.message}>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {FOCUS_AREAS.map((area) => (
            <label key={area} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                {...register('focus_areas')}
                type="checkbox"
                value={area}
                className="size-4 rounded border-input"
              />
              {area}
            </label>
          ))}
        </div>
      </Field>

      {/* Content */}
      <SectionHeader title="Content" />

      <Field label="Cover image" error={errors.cover_image?.message}>
        <div className="flex gap-2">
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
            className="shrink-0"
            disabled={uploadingCover}
            onClick={() => coverRef.current?.click()}
          >
            {uploadingCover ? '…' : 'Upload'}
          </Button>
        </div>
      </Field>

      <Field label="Gallery" hint="One URL per line" error={errors.gallery?.message}>
        <Textarea {...register('gallery')} placeholder="https://…" className="min-h-24 font-mono text-xs" />
        <div className="flex gap-2">
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploadingGallery}
            onClick={() => galleryRef.current?.click()}
          >
            {uploadingGallery ? 'Uploading…' : 'Upload images'}
          </Button>
        </div>
      </Field>

      <Field label="Description (Markdown)" error={errors.description?.message}>
        <Textarea
          {...register('description')}
          placeholder="Full project description in Markdown…"
          className="min-h-64 font-mono text-xs"
        />
      </Field>

      <Field label="Highlights" hint="One per line" error={errors.highlights?.message}>
        <Textarea
          {...register('highlights')}
          placeholder="Led the requirements phase end-to-end&#10;Coordinated 5 stakeholders across 2 business units"
          className="min-h-28"
        />
      </Field>

      {/* Tech & Links */}
      <SectionHeader title="Tech & Links" />

      <Field label="Tech stack" hint="One per line" error={errors.tech_stack?.message}>
        <Textarea
          {...register('tech_stack')}
          placeholder="SQL&#10;BPMN&#10;Stakeholder Management"
          className="min-h-28"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Live URL" error={errors.link_live?.message}>
          <Input {...register('link_live')} placeholder="https://…" />
        </Field>
        <Field label="Repo URL" error={errors.link_repo?.message}>
          <Input {...register('link_repo')} placeholder="https://github.com/…" />
        </Field>
        <Field label="Demo URL" error={errors.link_demo?.message}>
          <Input {...register('link_demo')} placeholder="https://…" />
        </Field>
      </div>

      {/* Metrics */}
      <SectionHeader title="Metrics (optional)" />

      <div className="flex flex-col gap-3">
        {metricFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              {...register(`metrics.${index}.label`)}
              placeholder="Label (e.g. Stakeholders)"
              className="flex-1"
            />
            <Input
              {...register(`metrics.${index}.value`)}
              placeholder="Value (e.g. 8)"
              className="w-28"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 text-destructive hover:text-destructive"
              onClick={() => removeMetric(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => appendMetric({ label: '', value: '' })}
        >
          + Add metric
        </Button>
      </div>

      {/* Architecture */}
      <SectionHeader title="Architecture (optional)" />

      <Field label="Architecture description" error={errors.architecture_description?.message}>
        <Textarea
          {...register('architecture_description')}
          placeholder="Brief description of the system architecture…"
          className="min-h-20"
        />
      </Field>
    </form>
  )
}

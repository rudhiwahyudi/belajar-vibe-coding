import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const schema = z.object({
  type: z.enum(['work', 'education', 'achievement']),
  title: z.string().min(1, 'Required'),
  organization: z.string().min(1, 'Required'),
  location: z.string(),
  range_start: z.string().min(1, 'Required (YYYY-MM)'),
  range_end: z.string(),
  description: z.string(),
  bullets: z.string(),
  tags: z.string(),
  logo: z.string(),
  link: z.string(),
  sort_order: z.number().int().min(0),
})

type FormValues = z.infer<typeof schema>

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

export default function AdminJourneyForm() {
  const { id } = useParams<{ id: string }>()
  const mode = id ? 'edit' : 'new'
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'work',
      title: '',
      organization: '',
      location: '',
      range_start: '',
      range_end: '',
      description: '',
      bullets: '',
      tags: '',
      logo: '',
      link: '',
      sort_order: 0,
    },
  })

  useEffect(() => {
    if (mode !== 'edit' || !id) return
    supabase
      .from('journey_items')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return
        reset({
          type: data.type,
          title: data.title,
          organization: data.organization,
          location: data.location ?? '',
          range_start: data.range_start,
          range_end: data.range_end ?? '',
          description: data.description ?? '',
          bullets: ((data.bullets as string[]) ?? []).join('\n'),
          tags: ((data.tags as string[]) ?? []).join(', '),
          logo: data.logo ?? '',
          link: data.link ?? '',
          sort_order: data.sort_order ?? 0,
        })
      })
  }, [id, mode, reset])

  async function onSubmit(values: FormValues) {
    setSaving(true)
    setServerError('')

    const payload = {
      type: values.type,
      title: values.title,
      organization: values.organization,
      location: values.location || null,
      range_start: values.range_start,
      range_end: values.range_end || null,
      description: values.description,
      bullets: values.bullets.split('\n').map((s) => s.trim()).filter(Boolean),
      tags: values.tags.split(',').map((s) => s.trim()).filter(Boolean),
      logo: values.logo || null,
      link: values.link || null,
      sort_order: values.sort_order,
    }

    const { error } =
      mode === 'edit' && id
        ? await supabase.from('journey_items').update(payload).eq('id', id)
        : await supabase.from('journey_items').insert(payload)

    if (error) {
      setServerError(error.message)
      setSaving(false)
    } else {
      navigate('/admin/journey')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {mode === 'edit' ? 'Edit Journey Item' : 'New Journey Item'}
        </h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => navigate('/admin/journey')}>
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

      <Field label="Type" error={errors.type?.message}>
        <select {...register('type')} className={inputClass}>
          <option value="work">Work</option>
          <option value="education">Education</option>
          <option value="achievement">Milestone / Achievement</option>
        </select>
      </Field>

      <Field label="Title" error={errors.title?.message}>
        <Input {...register('title')} placeholder="System Analyst" />
      </Field>

      <Field label="Organization" error={errors.organization?.message}>
        <Input {...register('organization')} placeholder="Company / Institution" />
      </Field>

      <Field label="Location" error={errors.location?.message}>
        <Input {...register('location')} placeholder="Indonesia (optional)" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start" hint="YYYY-MM" error={errors.range_start?.message}>
          <Input {...register('range_start')} placeholder="2023-09" />
        </Field>
        <Field label="End" hint="YYYY-MM or blank = Present" error={errors.range_end?.message}>
          <Input {...register('range_end')} placeholder="2024-06" />
        </Field>
      </div>

      <Field label="Description" error={errors.description?.message}>
        <Textarea {...register('description')} placeholder="Brief description…" className="min-h-20" />
      </Field>

      <Field label="Bullets" hint="One per line" error={errors.bullets?.message}>
        <Textarea
          {...register('bullets')}
          placeholder="Key achievement or responsibility&#10;Another bullet point"
          className="min-h-32"
        />
      </Field>

      <Field label="Tags" hint="Comma-separated" error={errors.tags?.message}>
        <Input {...register('tags')} placeholder="SQL, System Analysis, BPMN" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Logo URL" error={errors.logo?.message}>
          <Input {...register('logo')} placeholder="https://…" />
        </Field>
        <Field label="External link" error={errors.link?.message}>
          <Input {...register('link')} placeholder="https://…" />
        </Field>
      </div>

      <Field label="Sort order" hint="Lower = shown first" error={errors.sort_order?.message}>
        <Input {...register('sort_order', { valueAsNumber: true })} type="number" min={0} className="w-28" />
      </Field>
    </form>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { uploadMedia } from '@/features/admin/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const schema = z.object({
  title: z.string().min(1, 'Required'),
  issuer: z.string().min(1, 'Required'),
  issued_at: z.string().min(1, 'Required (YYYY-MM)'),
  expires_at: z.string(),
  credential_id: z.string(),
  credential_url: z.string(),
  cover_image: z.string(),
  tags: z.string(),
  featured: z.boolean(),
  sort_order: z.number().int().min(0),
})

type FormValues = z.infer<typeof schema>

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

export default function AdminCertificatesForm() {
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
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      issuer: '',
      issued_at: '',
      expires_at: '',
      credential_id: '',
      credential_url: '',
      cover_image: '',
      tags: '',
      featured: false,
      sort_order: 0,
    },
  })

  useEffect(() => {
    if (mode !== 'edit' || !id) return
    supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return
        reset({
          title: data.title,
          issuer: data.issuer,
          issued_at: data.issued_at,
          expires_at: data.expires_at ?? '',
          credential_id: data.credential_id ?? '',
          credential_url: data.credential_url ?? '',
          cover_image: data.cover_image ?? '',
          tags: ((data.tags as string[]) ?? []).join(', '),
          featured: data.featured ?? false,
          sort_order: data.sort_order ?? 0,
        })
      })
  }, [id, mode, reset])

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadMedia(file, 'certificates')
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
      issuer: values.issuer,
      issued_at: values.issued_at,
      expires_at: values.expires_at || null,
      credential_id: values.credential_id || null,
      credential_url: values.credential_url || null,
      cover_image: values.cover_image || null,
      tags: values.tags.split(',').map((s) => s.trim()).filter(Boolean),
      featured: values.featured,
      sort_order: values.sort_order,
    }

    const { error } =
      mode === 'edit' && id
        ? await supabase.from('certificates').update(payload).eq('id', id)
        : await supabase.from('certificates').insert(payload)

    if (error) {
      setServerError(error.message)
      setSaving(false)
    } else {
      navigate('/admin/certificates')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {mode === 'edit' ? 'Edit Certificate' : 'New Certificate'}
        </h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => navigate('/admin/certificates')}>
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

      <Field label="Title" error={errors.title?.message}>
        <Input {...register('title')} placeholder="AWS Solutions Architect" />
      </Field>

      <Field label="Issuer" error={errors.issuer?.message}>
        <Input {...register('issuer')} placeholder="Amazon Web Services" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Issued" hint="YYYY-MM" error={errors.issued_at?.message}>
          <Input {...register('issued_at')} placeholder="2024-03" />
        </Field>
        <Field label="Expires" hint="YYYY-MM or blank" error={errors.expires_at?.message}>
          <Input {...register('expires_at')} placeholder="2027-03" />
        </Field>
      </div>

      <Separator />

      <Field label="Credential ID" error={errors.credential_id?.message}>
        <Input {...register('credential_id')} placeholder="ABC-123-XYZ" />
      </Field>

      <Field label="Credential URL" error={errors.credential_url?.message}>
        <Input {...register('credential_url')} placeholder="https://…" />
      </Field>

      <Field label="Tags" hint="Comma-separated" error={errors.tags?.message}>
        <Input {...register('tags')} placeholder="Cloud, AWS, Architecture" />
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
          className="self-start"
          disabled={uploading}
          onClick={() => coverRef.current?.click()}
        >
          {uploading ? 'Uploading…' : 'Upload image'}
        </Button>
      </Field>

      <div className="flex items-center gap-3">
        <input
          {...register('featured')}
          id="featured"
          type="checkbox"
          className="size-4 rounded border-input"
        />
        <Label htmlFor="featured" className="font-normal">
          Featured (shown prominently)
        </Label>
      </div>

      <Field label="Sort order" hint="Lower = shown first" error={errors.sort_order?.message}>
        <Input
          {...register('sort_order', { valueAsNumber: true })}
          type="number"
          min={0}
          className="w-28"
        />
      </Field>
    </form>
  )
}

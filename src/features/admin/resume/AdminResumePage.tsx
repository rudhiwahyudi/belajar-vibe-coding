import { useEffect, useRef, useState } from 'react'
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

const experienceSchema = z.object({
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  location: z.string(),
  bullets: z.string(),
})

const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  period: z.string(),
  note: z.string(),
})

const skillSchema = z.object({
  category: z.string(),
  items: z.string(),
})

const schema = z.object({
  name: z.string().min(1, 'Required'),
  tagline: z.string(),
  summary: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  linkedin: z.string(),
  github: z.string(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  pdf_url: z.string(),
})

type FormValues = z.infer<typeof schema>

function Field({ label, hint, error, children }: {
  label: string; hint?: string; error?: string; children: React.ReactNode
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
    <div className="flex flex-col gap-3 pt-2">
      <Separator />
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
    </div>
  )
}

export default function AdminResumePage() {
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [serverError, setServerError] = useState('')
  const [uploading, setUploading] = useState(false)
  const pdfRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', tagline: '', summary: '',
      email: '', phone: '', location: '', website: '', linkedin: '', github: '',
      experience: [], education: [], skills: [], pdf_url: '',
    },
  })

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: 'experience' })

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: 'education' })

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: 'skills' })

  useEffect(() => {
    supabase.from('resume').select('*').limit(1).single().then(({ data }) => {
      if (!data) return
      setResumeId(data.id as string)
      const exp = (data.experience as Record<string, unknown>[]) ?? []
      const edu = (data.education as Record<string, unknown>[]) ?? []
      const skills = (data.skills as Record<string, unknown>[]) ?? []
      reset({
        name: (data.name as string) || '',
        tagline: (data.tagline as string) || '',
        summary: (data.summary as string) || '',
        email: (data.email as string) || '',
        phone: (data.phone as string) || '',
        location: (data.location as string) || '',
        website: (data.website as string) || '',
        linkedin: (data.linkedin as string) || '',
        github: (data.github as string) || '',
        experience: exp.map((e) => ({
          title: (e.title as string) || '',
          organization: (e.organization as string) || '',
          period: (e.period as string) || '',
          location: (e.location as string) || '',
          bullets: ((e.bullets as string[]) || []).join('\n'),
        })),
        education: edu.map((e) => ({
          degree: (e.degree as string) || '',
          institution: (e.institution as string) || '',
          period: (e.period as string) || '',
          note: (e.note as string) || '',
        })),
        skills: skills.map((s) => ({
          category: (s.category as string) || '',
          items: (s.items as string) || '',
        })),
        pdf_url: (data.pdf_url as string) || '',
      })
    })
  }, [reset])

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadMedia(file, 'resume')
      setValue('pdf_url', url)
    } catch {
      setServerError('PDF upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function onSubmit(values: FormValues) {
    setSaving(true)
    setSaved(false)
    setServerError('')

    const payload = {
      name: values.name,
      tagline: values.tagline,
      summary: values.summary,
      email: values.email || null,
      phone: values.phone || null,
      location: values.location || null,
      website: values.website || null,
      linkedin: values.linkedin || null,
      github: values.github || null,
      experience: values.experience.map((e) => ({
        title: e.title,
        organization: e.organization,
        period: e.period,
        location: e.location || undefined,
        bullets: e.bullets.split('\n').map((s) => s.trim()).filter(Boolean),
      })),
      education: values.education.map((e) => ({
        degree: e.degree,
        institution: e.institution,
        period: e.period,
        note: e.note || undefined,
      })),
      skills: values.skills.map((s) => ({
        category: s.category,
        items: s.items,
      })),
      pdf_url: values.pdf_url || null,
    }

    const { error } = resumeId
      ? await supabase.from('resume').update(payload).eq('id', resumeId)
      : await supabase.from('resume').insert(payload).select('id').single().then(async (res) => {
          if (res.data) setResumeId((res.data as { id: string }).id)
          return res
        })

    if (error) {
      setServerError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Resume / CV</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-500">Saved ✓</span>}
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

      {/* Personal info */}
      <Field label="Full name" error={errors.name?.message}>
        <Input {...register('name')} placeholder="Rudhi Wahyudi" />
      </Field>
      <Field label="Tagline">
        <Input {...register('tagline')} placeholder="System Analyst · Business Process Analyst" />
      </Field>
      <Field label="Summary">
        <Textarea {...register('summary')} placeholder="2–3 sentence professional summary…" className="min-h-24" />
      </Field>

      <SectionHeader title="Contact" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email"><Input {...register('email')} placeholder="you@email.com" /></Field>
        <Field label="Phone"><Input {...register('phone')} placeholder="+62 xxx" /></Field>
        <Field label="Location"><Input {...register('location')} placeholder="Indonesia" /></Field>
        <Field label="Website"><Input {...register('website')} placeholder="https://…" /></Field>
        <Field label="LinkedIn"><Input {...register('linkedin')} placeholder="https://linkedin.com/in/…" /></Field>
        <Field label="GitHub"><Input {...register('github')} placeholder="https://github.com/…" /></Field>
      </div>

      {/* Experience */}
      <SectionHeader title="Experience" />
      <div className="flex flex-col gap-6">
        {expFields.map((field, i) => (
          <div key={field.id} className="rounded-lg border border-border p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Experience {i + 1}</span>
              <button type="button" onClick={() => removeExp(i)}
                className="text-xs text-destructive hover:text-destructive/80">
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Job title">
                <Input {...register(`experience.${i}.title`)} placeholder="System Analyst" />
              </Field>
              <Field label="Organization">
                <Input {...register(`experience.${i}.organization`)} placeholder="Company name" />
              </Field>
              <Field label="Period">
                <Input {...register(`experience.${i}.period`)} placeholder="Sep 2023 – Present" />
              </Field>
              <Field label="Location">
                <Input {...register(`experience.${i}.location`)} placeholder="Indonesia" />
              </Field>
            </div>
            <Field label="Bullets" hint="One per line">
              <Textarea
                {...register(`experience.${i}.bullets`)}
                placeholder="Key achievement or responsibility&#10;Another bullet point"
                className="min-h-28"
              />
            </Field>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => appendExp({ title: '', organization: '', period: '', location: '', bullets: '' })}
        >
          + Add experience
        </Button>
      </div>

      {/* Education */}
      <SectionHeader title="Education" />
      <div className="flex flex-col gap-4">
        {eduFields.map((field, i) => (
          <div key={field.id} className="rounded-lg border border-border p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Education {i + 1}</span>
              <button type="button" onClick={() => removeEdu(i)}
                className="text-xs text-destructive hover:text-destructive/80">
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Degree">
                <Input {...register(`education.${i}.degree`)} placeholder="Bachelor's in Informatics" />
              </Field>
              <Field label="Institution">
                <Input {...register(`education.${i}.institution`)} placeholder="University name" />
              </Field>
              <Field label="Period">
                <Input {...register(`education.${i}.period`)} placeholder="Aug 2019 – Jun 2023" />
              </Field>
              <Field label="Note">
                <Input {...register(`education.${i}.note`)} placeholder="GPA, honors, activities…" />
              </Field>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => appendEdu({ degree: '', institution: '', period: '', note: '' })}
        >
          + Add education
        </Button>
      </div>

      {/* Skills */}
      <SectionHeader title="Skills" />
      <div className="flex flex-col gap-3">
        {skillFields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-[160px_1fr_auto] items-start gap-3">
            <Input {...register(`skills.${i}.category`)} placeholder="Category" />
            <Input {...register(`skills.${i}.items`)} placeholder="SQL, Python, Tableau" />
            <button type="button" onClick={() => removeSkill(i)}
              className="mt-1.5 text-xs text-destructive hover:text-destructive/80 whitespace-nowrap">
              Remove
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => appendSkill({ category: '', items: '' })}
        >
          + Add skill group
        </Button>
      </div>

      {/* PDF */}
      <SectionHeader title="PDF Version" />
      <Field label="PDF URL" hint="Public download link">
        <Input {...register('pdf_url')} placeholder="https://… or /resume.pdf" />
        <input
          ref={pdfRef}
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          disabled={uploading}
          onClick={() => pdfRef.current?.click()}
        >
          {uploading ? 'Uploading…' : 'Upload PDF'}
        </Button>
      </Field>
    </form>
  )
}

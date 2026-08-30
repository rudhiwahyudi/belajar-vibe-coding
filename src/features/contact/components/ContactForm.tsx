import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/hooks/useLanguage'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(2, 'Please add a short subject.'),
  message: z.string().min(10, 'Message should be at least 10 characters.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

type SubmitStatus = 'idle' | 'success' | 'error'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const { t } = useLanguage()

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  // Focus first invalid field on submit error (WCAG focus-management)
  const onInvalid = () => {
    const firstError = (Object.keys(errors) as (keyof ContactFormValues)[])[0]
    if (firstError) setFocus(firstError)
  }

  // Also focus after validation errors appear
  const hasErrors = Object.keys(errors).length > 0

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle')

    try {
      if (!FORMSPREE_ID) throw new Error('Missing FORMSPREE_ID')
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const isEn = t('nav.search') === 'Search'

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-5" noValidate aria-describedby={hasErrors ? 'form-error-summary' : undefined}>
      {/* Error summary — anchor links to fields */}
      {hasErrors ? (
        <div id="form-error-summary" role="alert" aria-live="polite" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
          <p className="text-sm font-medium text-destructive">{isEn ? 'Please fix the following:' : 'Mohon perbaiki:'}</p>
          <ul className="mt-1.5 flex flex-col gap-1 text-sm text-destructive/90">
            {errors.name && <li><a href="#name" className="underline underline-offset-2 hover:text-destructive">{errors.name.message}</a></li>}
            {errors.email && <li><a href="#email" className="underline underline-offset-2 hover:text-destructive">{errors.email.message}</a></li>}
            {errors.subject && <li><a href="#subject" className="underline underline-offset-2 hover:text-destructive">{errors.subject.message}</a></li>}
            {errors.message && <li><a href="#message" className="underline underline-offset-2 hover:text-destructive">{errors.message.message}</a></li>}
          </ul>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-[13px] font-medium">
            {t('contact.form.name')} <span className="text-destructive" aria-hidden>*</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder={isEn ? 'Your name' : 'Nama Anda'}
            {...register('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="h-11 min-h-[44px] bg-white/[0.04] dark:bg-black/[0.2] border-white/[0.15] dark:border-white/[0.08] focus-visible:bg-white/[0.06] dark:focus-visible:bg-black/[0.3]"
          />
          {errors.name ? <p id="name-error" role="alert" className="text-xs text-destructive">{errors.name.message}</p> : <p className="text-xs text-muted-foreground/70">{isEn ? '2+ characters' : 'Minimal 2 karakter'}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-[13px] font-medium">
            {t('contact.form.email')} <span className="text-destructive" aria-hidden>*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : 'email-helper'}
            className="h-11 min-h-[44px] bg-white/[0.04] dark:bg-black/[0.2] border-white/[0.15] dark:border-white/[0.08] focus-visible:bg-white/[0.06] dark:focus-visible:bg-black/[0.3]"
          />
          {errors.email ? <p id="email-error" role="alert" className="text-xs text-destructive">{errors.email.message}</p> : <p id="email-helper" className="text-xs text-muted-foreground/70">{isEn ? "We'll never share your email" : 'Email tidak akan dibagikan'}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject" className="text-[13px] font-medium">
          {t('contact.form.subject')} <span className="text-destructive" aria-hidden>*</span>
        </Label>
        <Input
          id="subject"
          autoComplete="off"
          placeholder={isEn ? "What's this about?" : 'Mengenai apa ini?'}
          {...register('subject')}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className="h-11 min-h-[44px] bg-white/[0.04] dark:bg-black/[0.2] border-white/[0.15] dark:border-white/[0.08] focus-visible:bg-white/[0.06] dark:focus-visible:bg-black/[0.3]"
        />
        {errors.subject ? <p id="subject-error" role="alert" className="text-xs text-destructive">{errors.subject.message}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-[13px] font-medium">
          {t('contact.form.message')} <span className="text-destructive" aria-hidden>*</span>
        </Label>
        <Textarea
          id="message"
          rows={6}
          autoComplete="off"
          placeholder={
            isEn
              ? 'Tell me a bit about your project, role, or question...'
              : 'Ceritakan sedikit tentang proyek, lowongan pekerjaan, atau pertanyaan Anda...'
          }
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-helper'}
          className="min-h-[120px] bg-white/[0.04] dark:bg-black/[0.2] border-white/[0.15] dark:border-white/[0.08] focus-visible:bg-white/[0.06] dark:focus-visible:bg-black/[0.3]"
        />
        {errors.message ? <p id="message-error" role="alert" className="text-xs text-destructive">{errors.message.message}</p> : <p id="message-helper" className="text-xs text-muted-foreground/70">{isEn ? 'At least 10 characters' : 'Minimal 10 karakter'}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="h-11 min-h-[44px] self-start rounded-full px-6 text-[14px] font-medium active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
      </Button>

      <div aria-live="polite" aria-atomic="true" className="min-h-[20px]">
        {status === 'success' ? (
          <p className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="size-4" aria-hidden />
            {t('contact.form.success')}
          </p>
        ) : null}

        {status === 'error' ? (
          <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
            <AlertCircle className="size-4" aria-hidden />
            {isEn
              ? 'Something went wrong. Please try again or email me directly.'
              : 'Terjadi kesalahan. Silakan coba lagi atau kirim email langsung ke saya.'}
          </p>
        ) : null}
      </div>
    </form>
  )
}

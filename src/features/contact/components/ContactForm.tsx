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
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle')

    try {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('contact.form.name')}</Label>
          <Input id="name" placeholder={isEn ? 'Your name' : 'Nama Anda'} {...register('name')} aria-invalid={!!errors.name} />
          {errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t('contact.form.email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject">{t('contact.form.subject')}</Label>
        <Input
          id="subject"
          placeholder={isEn ? "What's this about?" : 'Mengenai apa ini?'}
          {...register('subject')}
          aria-invalid={!!errors.subject}
        />
        {errors.subject ? <p className="text-xs text-destructive">{errors.subject.message}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t('contact.form.message')}</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder={
            isEn
              ? 'Tell me a bit about your project, role, or question...'
              : 'Ceritakan sedikit tentang proyek, lowongan pekerjaan, atau pertanyaan Anda...'
          }
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message ? <p className="text-xs text-destructive">{errors.message.message}</p> : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
      </Button>

      {status === 'success' ? (
        <p className="flex items-center gap-2 text-sm text-success">
          <CheckCircle2 className="size-4" />
          {t('contact.form.success')}
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="size-4" />
          {isEn
            ? 'Something went wrong. Please try again or email me directly.'
            : 'Terjadi kesalahan. Silakan coba lagi atau kirim email langsung ke saya.'}
        </p>
      ) : null}
    </form>
  )
}

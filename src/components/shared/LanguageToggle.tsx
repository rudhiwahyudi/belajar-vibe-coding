import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'Ubah ke Bahasa Indonesia' : 'Switch to English'}
      className="flex h-11 min-h-[44px] items-center gap-1.5 rounded-full px-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Globe className="size-4" aria-hidden />
      <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
    </Button>
  )
}

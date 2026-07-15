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
      className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50"
    >
      <Globe className="size-4" />
      <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
    </Button>
  )
}

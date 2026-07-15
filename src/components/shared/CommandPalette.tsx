import { useNavigate } from 'react-router-dom'
import { Download, Mail, Moon, Sun, Globe } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { NAV_ITEMS } from '@/lib/constants'
import { siteConfig } from '@/data/site-config'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t, toggleLanguage } = useLanguage()

  function runCommand(action: () => void) {
    onOpenChange(false)
    action()
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t('commandPalette.placeholder')} />
      <CommandList>
        <CommandEmpty>{t('commandPalette.noResults')}</CommandEmpty>
        <CommandGroup heading={t('commandPalette.navigate')}>
          {NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => runCommand(() => navigate(item.href))}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('commandPalette.actions')}>
          <CommandItem
            onSelect={() => runCommand(() => window.open(`mailto:${siteConfig.email}`))}
          >
            <Mail />
            {t('commandPalette.emailMe')}
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open(siteConfig.resumeUrl, '_blank'))}
          >
            <Download />
            {t('commandPalette.downloadResume')}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(toggleTheme)}>
            {theme === 'dark' ? <Sun /> : <Moon />}
            {t('commandPalette.toggleTheme')}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(toggleLanguage)}>
            <Globe />
            {t('commandPalette.toggleLang')}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

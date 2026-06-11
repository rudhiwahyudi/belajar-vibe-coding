import { useNavigate } from 'react-router-dom'
import { Download, Mail, Moon, Sun } from 'lucide-react'
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

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  function runCommand(action: () => void) {
    onOpenChange(false)
    action()
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => runCommand(() => navigate(item.href))}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => window.open(`mailto:${siteConfig.email}`))}
          >
            <Mail />
            Email me
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open(siteConfig.resumeUrl, '_blank'))}
          >
            <Download />
            Download résumé
          </CommandItem>
          <CommandItem onSelect={() => runCommand(toggleTheme)}>
            {theme === 'dark' ? <Sun /> : <Moon />}
            Toggle theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

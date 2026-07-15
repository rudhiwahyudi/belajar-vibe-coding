import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '@/data/translations'

export type Language = 'en' | 'id'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-language'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'id') return stored

  // Fallback to browser language
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('id')) return 'id'
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((curr) => (curr === 'en' ? 'id' : 'en'))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, language)
      document.documentElement.lang = language
    }
  }, [language])

  // Translation helper resolving nested keys (e.g., 'hero.tagline')
  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.')
      let current: any = translations[language]

      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k]
        } else {
          // Fallback to English translation first if key not found in current language
          let enCurrent: any = translations['en']
          for (const enK of keys) {
            if (enCurrent && typeof enCurrent === 'object' && enK in enCurrent) {
              enCurrent = enCurrent[enK]
            } else {
              return key // Return original key if fallback also fails
            }
          }
          return typeof enCurrent === 'string' ? enCurrent : key
        }
      }

      return typeof current === 'string' ? current : key
    },
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

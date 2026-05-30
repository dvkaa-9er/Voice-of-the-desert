'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, type Locale } from '@/lib/translations'

interface LanguageContextType {
  locale: Locale
  t: (key: string) => string
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: (key) => key,
  toggleLocale: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  const t = (key: string) => translations[locale][key] ?? key

  const toggleLocale = () => setLocale((prev) => (prev === 'en' ? 'mn' : 'en'))

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

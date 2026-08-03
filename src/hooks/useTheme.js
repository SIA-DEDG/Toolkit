import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sia-theme'

// Lê a preferência salva: 'dark' | 'light' | null (segue o sistema)
function getStored() {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'dark' || value === 'light' ? value : null
}

function systemPrefersDark() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Gerencia o tema via atributo data-theme no <html>. Default = segue o sistema;
// ao clicar no botão, fixa dark/light e persiste no localStorage.
export function useTheme() {
  const [choice, setChoice] = useState(getStored) // null = sistema
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

  // Aplica/limpa o atributo e persiste
  useEffect(() => {
    const root = document.documentElement
    if (choice) {
      root.setAttribute('data-theme', choice)
      localStorage.setItem(STORAGE_KEY, choice)
    } else {
      root.removeAttribute('data-theme')
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [choice])

  // Acompanha mudanças do sistema (relevante quando choice === null)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event) => setSystemDark(event.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isDark = choice ? choice === 'dark' : systemDark
  const toggle = () => setChoice(isDark ? 'light' : 'dark')

  return { isDark, toggle }
}

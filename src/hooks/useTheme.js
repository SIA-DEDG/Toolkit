import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sia-theme'

/**
 * Lê a escolha manual de tema salva no localStorage.
 *
 * @returns {'dark'|'light'|null} A escolha salva, ou null quando não há
 *   nenhuma — nesse caso o tema segue o sistema.
 */
function getStoredTheme() {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'dark' || value === 'light' ? value : null
}

/**
 * @returns {boolean} true se o sistema operacional está em modo escuro agora.
 */
function systemPrefersDark() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Controla o tema da página. Sem escolha manual, segue o sistema; ao chamar
 * `toggle`, fixa dark/light no atributo data-theme do <html> e persiste no
 * localStorage. As cores em si vivem no index.css.
 *
 * @returns {{isDark: boolean, toggle: () => void}} Estado atual do tema e a
 *   função que alterna entre claro e escuro.
 */
export function useTheme() {
  const [choice, setChoice] = useState(getStoredTheme)
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => setSystemDark(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const isDark = choice ? choice === 'dark' : systemDark
  const toggle = () => setChoice(isDark ? 'light' : 'dark')

  return { isDark, toggle }
}

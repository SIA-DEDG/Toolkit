import { useEffect, useState } from 'react'

/**
 * Acompanha a largura da viewport, reavaliando quando a janela é redimensionada.
 *
 * @param {number} [breakpoint=767] - Largura máxima, em px, considerada mobile.
 * @returns {boolean} true enquanto a viewport estiver abaixo do breakpoint.
 */
export function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handleChange = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMobile
}

import { useState, useCallback } from 'react'

export function useLayoutVariant() {
  const [isLegacy, setIsLegacy] = useState(
    () => new URLSearchParams(window.location.search).get('view') === 'legacy'
  )

  const toggle = useCallback(() => {
    setIsLegacy(prev => {
      const next = !prev
      const url = new URL(window.location.href)
      next ? url.searchParams.set('view', 'legacy') : url.searchParams.delete('view')
      window.history.replaceState(null, '', url)
      return next
    })
  }, [])

  return { isLegacy, toggle }
}

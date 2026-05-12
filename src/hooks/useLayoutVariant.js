import { useState, useCallback } from 'react'

const VARIANTS = ['decision', 'grid', 'snake']

function readVariant() {
  const v = new URLSearchParams(window.location.search).get('view')
  return VARIANTS.includes(v) ? v : 'decision'
}

export function useLayoutVariant() {
  const [variant, setVariant] = useState(readVariant)

  const setAndPush = useCallback((next) => {
    setVariant(next)
    const url = new URL(window.location.href)
    if (next === 'decision') {
      url.searchParams.delete('view')
    } else {
      url.searchParams.set('view', next)
    }
    window.history.replaceState(null, '', url)
  }, [])

  // legacy shim so existing callers still work
  const isLegacy = variant === 'snake'
  const toggle = useCallback(() => setAndPush(isLegacy ? 'decision' : 'snake'), [isLegacy, setAndPush])

  return { variant, setVariant: setAndPush, isLegacy, toggle }
}

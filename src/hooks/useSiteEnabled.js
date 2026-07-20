import { useEffect, useState } from 'react'
import { fetchSiteEnabled } from '../config/supabase'

// Retorna 'loading' | 'enabled' | 'disabled'. Fail-closed: erro vira 'disabled'.
export function useSiteEnabled() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    fetchSiteEnabled()
      .then((enabled) => {
        if (active) setStatus(enabled ? 'enabled' : 'disabled')
      })
      .catch(() => {
        if (active) setStatus('disabled')
      })

    return () => {
      active = false
    }
  }, [])

  return status
}

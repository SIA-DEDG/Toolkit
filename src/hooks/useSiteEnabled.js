import { useEffect, useState } from 'react'
import { fetchSiteEnabled } from '../config/supabase'

/**
 * Consulta o kill switch do site uma vez, na montagem.
 *
 * Qualquer falha vira 'disabled' (fail-closed): na dúvida, o site não aparece.
 * O flag `active` evita setState depois do unmount.
 *
 * @returns {'loading'|'enabled'|'disabled'} Estado da consulta. 'loading'
 *   enquanto a resposta não chega.
 */
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

import { useState, useCallback } from 'react'

let nextToastId = 1

/**
 * Estado da fila de notificações. Normalmente você não chama este hook direto —
 * o ToastProvider já o usa e expõe o `add` via contexto (useToastContext).
 *
 * @returns {{
 *   toasts: Array<{id: number, message: string, type: string}>,
 *   add: (message: string, type?: 'success'|'error') => void,
 *   remove: (id: number) => void
 * }} Lista atual, mais as funções de empilhar e descartar.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type = 'success') => {
    const id = nextToastId++
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, add, remove }
}

import { useState, useCallback } from 'react'

let _nextId = 1

// Gerencia a lista de toasts ativos com funções de add e remove
export function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type = 'success') => {
    const id = _nextId++
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, add, remove }
}

import { useState, useCallback } from 'react'

let _nextId = 1

export function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type = 'success') => {
    const id = _nextId++
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, add, remove }
}

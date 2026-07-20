import React, { createContext, useContext } from 'react'
import { useToast } from './useToast'
import { Toast } from '../components/Toast'

const ToastContext = createContext(null)

// Fornece o contexto de toast para toda a árvore e renderiza o container de notificações
export function ToastProvider({ children }) {
  const { toasts, add, remove } = useToast()

  return (
    <ToastContext.Provider value={add}>
      {children}
      <Toast toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  )
}

// Hook para acessar a função add do contexto de toast
export function useToastContext() {
  const ctx = useContext(ToastContext)
  if (ctx === null) {
    throw new Error('useToastContext must be used inside <ToastProvider>')
  }
  return ctx
}

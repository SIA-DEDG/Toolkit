import React, { createContext, useContext } from 'react'
import { useToast } from './useToast'
import { Toast } from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const { toasts, add, remove } = useToast()

  return (
    <ToastContext.Provider value={add}>
      {children}
      <Toast toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  return useContext(ToastContext)
}

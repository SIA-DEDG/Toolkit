import React, { createContext, useContext } from 'react'
import { useToast } from './useToast'
import { Toast } from '../components/Toast'

const ToastContext = createContext(null)

/**
 * Publica a função de notificação para toda a árvore e monta o container que
 * desenha os toasts ativos.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Árvore que ganha acesso ao contexto.
 */
export function ToastProvider({ children }) {
  const { toasts, add, remove } = useToast()

  return (
    <ToastContext.Provider value={add}>
      {children}
      <Toast toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  )
}

/**
 * Acessa a função de disparar notificações.
 *
 * @returns {(message: string, type?: 'success'|'error') => void} Chame como
 *   addToast('Mensagem', 'error'). O tipo default é 'success'.
 * @throws {Error} Se usado fora de um <ToastProvider>.
 */
export function useToastContext() {
  const addToast = useContext(ToastContext)
  if (addToast === null) {
    throw new Error('useToastContext must be used inside <ToastProvider>')
  }
  return addToast
}

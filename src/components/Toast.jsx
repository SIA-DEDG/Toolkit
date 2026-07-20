import React, { useEffect } from 'react'

// Container que empilha as notificações ativas no canto superior direito
export function Toast({ toasts, remove }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} remove={remove} />
      ))}
    </div>
  )
}

// Item individual de toast com auto-remoção após 4s
function ToastItem({ toast, remove }) {
  useEffect(() => {
    const timer = setTimeout(() => remove(toast.id), 4000)
    return () => clearTimeout(timer)
  }, [toast.id, remove])

  const isSuccess = toast.type === 'success'

  return (
    <div
      className="pointer-events-auto flex items-start gap-3 rounded-md px-4 py-3 shadow-lg min-w-[260px] max-w-[320px] animate-slide-in"
      style={{ backgroundColor: isSuccess ? '#4CAF50' : '#e53e3e' }}
    >
      <span className="mt-0.5 text-white text-lg">{isSuccess ? '✔' : '✖'}</span>
      <div className="flex-1">
        <p className="text-white font-bold text-sm">{isSuccess ? 'Sucesso' : 'Erro'}</p>
        <p className="text-white text-xs mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={() => remove(toast.id)}
        className="text-white text-lg leading-none opacity-80 hover:opacity-100 cursor-pointer"
      >
        ×
      </button>
    </div>
  )
}

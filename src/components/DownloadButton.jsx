import React, { useState } from 'react'
import { downloadFile } from '../config/supabase'
import { useToastContext } from '../hooks/ToastContext'
import { enqueueDownload } from '../hooks/useDownloadQueue'

export default function DownloadButton({ label = 'Baixar Documento', fileKey, filename, large = false }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const addToast = useToastContext()

  async function handleClick() {
    if (!fileKey) return
    setLoading(true)
    setError(null)
    try {
      await enqueueDownload(() => downloadFile(fileKey, filename))
      addToast('Download realizado com sucesso!', 'success')
    } catch (err) {
      setError('Arquivo indisponível')
      addToast('Arquivo indisponível. Tente novamente.', 'error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-0.5">
      <button
        onClick={handleClick}
        disabled={loading || !fileKey || !!error}
        className={`mt-2 flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-gray-900 font-semibold font-sans rounded-lg transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${large ? 'text-[13px]' : 'text-[11px]'}`}
        style={{ border: large ? '2px solid #1a202c' : '1.5px solid #1a202c', width: large ? 172 : 140, height: large ? 36 : 28, boxShadow: large ? '0 2px 6px rgba(0,0,0,0.18)' : 'none' }}
      >
        <svg
          className={`${large ? 'w-4 h-4' : 'w-3.5 h-3.5'} flex-shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {loading ? 'Baixando...' : label}
      </button>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </div>
  )
}

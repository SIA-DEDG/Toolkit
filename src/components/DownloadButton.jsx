import React, { useState } from 'react'
import { downloadFile } from '../config/minio'

export default function DownloadButton({ label = 'Baixar Documento', fileKey, filename }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleClick() {
    if (!fileKey) return
    setLoading(true)
    setError(null)
    try {
      await downloadFile(fileKey, filename)
    } catch (err) {
      setError('Arquivo indisponível')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={handleClick}
        disabled={loading || !fileKey}
        className="mt-2 flex items-center justify-center gap-1.5 bg-[#BEE3F8] hover:bg-[#2B6CB0] text-[#2A4365] hover:text-white text-[11px] font-semibold font-sans rounded-full shadow-sm transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ width: 140, height: 28 }}
      >
        <svg
          className="w-3.5 h-3.5 flex-shrink-0"
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

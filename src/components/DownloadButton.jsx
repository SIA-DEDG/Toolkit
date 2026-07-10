import { useState } from 'react'
import { downloadFile } from '../config/supabase'
import { useToastContext } from '../hooks/ToastContext'
import { enqueueDownload } from '../hooks/useDownloadQueue'

// Clareia uma cor hex misturando com branco pelo fator amount
function lightenHex(hex, amount = 0.25) {
  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)
  const lighten = (channel) => Math.round(channel + (255 - channel) * amount)
  return `rgb(${lighten(red)}, ${lighten(green)}, ${lighten(blue)})`
}

// Botão que baixa um arquivo do Supabase Storage e exibe feedback de toast
export default function DownloadButton({ label = 'Baixar Documento', fileKey, filename, large = false, color }) {
  const [loading, setLoading] = useState(false)
  const addToast = useToastContext()

  async function handleClick() {
    if (!fileKey) return
    setLoading(true)
    try {
      await enqueueDownload(() => downloadFile(fileKey, filename))
      addToast('Download realizado com sucesso!', 'success')
    } catch (err) {
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
        disabled={loading || !fileKey}
        className={[
          'mt-2 flex items-center justify-center gap-1.5',
          color
            ? 'text-white font-semibold font-sans border-transparent'
            : 'bg-white hover:bg-gray-100 text-ink-dark font-semibold font-sans border-ink-dark',
          'rounded-lg transition-colors duration-150 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          large
            ? 'text-[13px] w-[172px] h-9 border-2 shadow-[0_2px_6px_rgba(0,0,0,0.18)]'
            : 'text-[11px] w-[140px] h-7 border-[1.5px]',
        ].join(' ')}
        style={color ? { backgroundColor: lightenHex(color) } : undefined}
      >
        <svg
          className={`${large ? 'w-4 h-4' : 'w-3.5 h-3.5'} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {loading ? 'Baixando...' : label}
      </button>
    </div>
  )
}

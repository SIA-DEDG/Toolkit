import { useState } from 'react'
import { downloadFile } from '../config/supabase'
import { useToastContext } from '../hooks/ToastContext'
import { enqueueDownload } from '../hooks/useDownloadQueue'

/**
 * Botão de download de um arquivo do Supabase Storage. Passa pela fila global
 * (enqueueDownload) para não disparar vários de uma vez, mostra 'Baixando...'
 * enquanto espera e avisa o resultado por toast.
 *
 * @param {object} props
 * @param {string} [props.label='Baixar Documento'] - Texto do botão em repouso.
 * @param {string} [props.fileKey] - Caminho do arquivo no bucket. Sem ele o
 *   botão fica desabilitado, porque não há o que baixar.
 * @param {string} [props.filename] - Nome sugerido no salvamento.
 * @param {boolean} [props.large=false] - true usa o tamanho do rodapé do card;
 *   false, o tamanho menor das etapas.
 * @param {string} [props.color] - Cor '#rrggbb' da família, aplicada como
 *   realce somente no hover; em repouso, o botão permanece neutro.
 */
export default function DownloadButton({ label = 'Baixar Documento', fileKey, filename, large = false, color }) {
  const [loading, setLoading] = useState(false)
  const addToast = useToastContext()

  async function handleClick() {
    if (!fileKey) return
    setLoading(true)
    try {
      await enqueueDownload(() => downloadFile(fileKey, filename))
      addToast('Download realizado com sucesso!', 'success')
    } catch (error) {
      addToast('Arquivo indisponível. Tente novamente.', 'error')
      console.error(error)
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
          'mt-2 flex items-center justify-center gap-2.5',
          color
            ? 'download-button--colored font-semibold font-sans'
            : 'bg-surface hover:bg-surface-alt text-ink-dark font-semibold font-sans border-ink-dark',
          'rounded-lg transition-[color,background-color,border-color,box-shadow,transform] duration-150 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          large
            ? 'text-[13px] whitespace-nowrap px-4 h-9 border-2'
            : 'text-[11px] w-[140px] h-7 border-[1.5px]',
        ].join(' ')}
        style={color ? { '--download-color': color } : undefined}
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

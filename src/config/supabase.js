import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || 'toolkit-docs'

/**
 * Dispara o download de um arquivo do Supabase Storage no browser.
 * @param {string} fileKey - Caminho do arquivo no bucket (ex: "processos/contrato.pdf")
 * @param {string} [filename] - Nome do arquivo ao salvar (opcional)
 */
export async function downloadFile(fileKey, filename) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(fileKey, 60) // URL válida por 60 segundos

  if (error || !data?.signedUrl) {
    throw new Error(`Arquivo não encontrado: ${fileKey}`)
  }

  const a = document.createElement('a')
  a.href = data.signedUrl
  a.download = filename || fileKey.split('/').pop()
  document.body.appendChild(a)
  a.click()
  a.remove()
}

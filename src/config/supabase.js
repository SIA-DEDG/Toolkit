import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || 'toolkit-docs'

/**
 * Dispara o download de um arquivo do Supabase Storage no browser.
 * @param {string} fileKey - Caminho do arquivo no bucket (ex: "processos/contrato.pdf")
 * @param {string} [filename] - Nome do arquivo ao salvar (opcional)
 */
export async function downloadFile(fileKey, filename) {
  const { data, error } = await supabase.storage.from(BUCKET).download(fileKey)

  if (error) {
    throw new Error(`Arquivo não encontrado: ${fileKey}`)
  }

  const objectUrl = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename || fileKey.split('/').pop()
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
}

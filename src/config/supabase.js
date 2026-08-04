import { createClient } from '@supabase/supabase-js'

let supabase = null

try {
  supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  )
} catch {
  supabase = null
}

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || 'sia-arquivos'

/**
 * Lê o kill switch na tabela site_config (linha id = 1).
 *
 * Nunca lança: é fail-closed, então cliente ausente, erro de rede ou resposta
 * inesperada devolvem false e o site fica oculto.
 *
 * @returns {Promise<boolean>} true somente se a flag estiver explicitamente
 *   ligada no banco.
 */
export async function fetchSiteEnabled() {
  if (!supabase) return false

  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('enabled')
      .eq('id', 1)
      .single()

    if (error || !data) return false
    return data.enabled === true
  } catch {
    return false
  }
}

/**
 * Baixa um arquivo do Storage: monta a URL pública, confirma via HEAD que ele
 * existe e dispara o download com um <a download> temporário.
 *
 * @param {string} fileKey - Caminho do arquivo dentro do bucket,
 *   ex.: 'acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx'.
 * @param {string} [filename] - Nome sugerido no salvamento. Se omitido, usa o
 *   último segmento de `fileKey`.
 * @returns {Promise<void>} Resolve quando o download foi disparado — não espera
 *   o arquivo terminar de baixar.
 * @throws {Error} Se o cliente Supabase não subiu ou se o arquivo não existe.
 */
export async function downloadFile(fileKey, filename) {
  if (!supabase) throw new Error('Serviço de arquivos indisponível')

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileKey)

  const headResponse = await fetch(data.publicUrl, { method: 'HEAD' })
  if (!headResponse.ok) throw new Error(`Arquivo não encontrado: ${fileKey}`)

  const link = document.createElement('a')
  link.href = data.publicUrl
  link.download = filename || fileKey.split('/').pop()
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

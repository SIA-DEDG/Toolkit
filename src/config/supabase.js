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

// Consulta o kill switch do site. Fail-closed: qualquer erro, cliente ausente
// ou resposta inesperada mantém o site oculto.
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

// Obtém a URL pública do arquivo e aciona o download no browser
export async function downloadFile(fileKey, filename) {
  if (!supabase) throw new Error('Serviço de arquivos indisponível')

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileKey)

  const check = await fetch(data.publicUrl, { method: 'HEAD' })
  if (!check.ok) throw new Error(`Arquivo não encontrado: ${fileKey}`)

  const link = document.createElement('a')
  link.href = data.publicUrl
  link.download = filename || fileKey.split('/').pop()
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

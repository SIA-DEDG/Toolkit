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

export async function downloadFile(fileKey, filename) {
  if (!supabase) throw new Error('Serviço de arquivos indisponível')

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileKey)

  const check = await fetch(data.publicUrl, { method: 'HEAD' })
  if (!check.ok) throw new Error(`Arquivo não encontrado: ${fileKey}`)

  const a = document.createElement('a')
  a.href = data.publicUrl
  a.download = filename || fileKey.split('/').pop()
  document.body.appendChild(a)
  a.click()
  a.remove()
}

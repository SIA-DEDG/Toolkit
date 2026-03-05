const ENDPOINT = import.meta.env.VITE_MINIO_ENDPOINT || 'http://localhost:9000'
const BUCKET = import.meta.env.VITE_MINIO_BUCKET || 'toolkit-docs'

/**
 * Retorna a URL pública de download de um arquivo no MinIO.
 * @param {string} fileKey - Caminho do arquivo no bucket (ex: "processos/contrato.pdf")
 */
export function getFileUrl(fileKey) {
  return `${ENDPOINT}/${BUCKET}/${fileKey}`
}

/**
 * Dispara o download de um arquivo do MinIO no browser.
 * @param {string} fileKey - Caminho do arquivo no bucket
 * @param {string} [filename] - Nome do arquivo ao salvar (opcional)
 */
export async function downloadFile(fileKey, filename) {
  const url = getFileUrl(fileKey)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Arquivo não encontrado: ${fileKey}`)
  }

  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename || fileKey.split('/').pop()
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
}

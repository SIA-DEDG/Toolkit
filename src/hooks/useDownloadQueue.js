const DELAY_BETWEEN_DOWNLOADS_MS = 800

let queue = []
let running = false

// Consome a fila um download por vez, com uma pausa entre eles para o browser
// não bloquear downloads disparados em rajada. Sai quando a fila esvazia; a
// trava `running` garante que só existe um consumidor ativo.
async function processQueue() {
  if (running || queue.length === 0) return
  running = true

  while (queue.length > 0) {
    const { task, resolve, reject } = queue.shift()
    try {
      const result = await task()
      resolve(result)
    } catch (error) {
      reject(error)
    }

    if (queue.length > 0) {
      await new Promise(resolveDelay => setTimeout(resolveDelay, DELAY_BETWEEN_DOWNLOADS_MS))
    }
  }

  running = false
}

/**
 * Enfileira um download e dispara o consumo da fila.
 *
 * @param {() => Promise<any>} task - Função que executa o download.
 * @returns {Promise<any>} Resolve com o retorno de `task`, ou rejeita com o erro
 *   dela — sempre referente a esta tarefa, não à fila como um todo.
 */
export function enqueueDownload(task) {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject })
    processQueue()
  })
}

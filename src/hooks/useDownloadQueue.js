let queue = []
let running = false

// Executa os downloads da fila sequencialmente com intervalo de 800ms entre eles
async function processQueue() {
  if (running || queue.length === 0) return
  running = true

  while (queue.length > 0) {
    const { task, resolve, reject } = queue.shift()
    try {
      const result = await task()
      resolve(result)
    } catch (err) {
      reject(err)
    }
    
    if (queue.length > 0) {
      await new Promise(r => setTimeout(r, 800))
    }
  }

  running = false
}

// Adiciona um download à fila e retorna uma Promise que resolve quando concluído
export function enqueueDownload(task) {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject })
    processQueue()
  })
}

import { useRef } from 'react'

// Fila global compartilhada entre todos os botões
let queue = []
let running = false

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
  }

  running = false
}

export function enqueueDownload(task) {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject })
    processQueue()
  })
}

import React, { useEffect, useState } from 'react'
import { ToastProvider } from './hooks/ToastContext'
import HomePage from './page/HomePage'
import AcordoPDIPage from './page/AcordoPDIPage'
import ConvenioPDIPage from './page/ConvenioPDIPage'
import EncomendaTecnologicaPage from './page/EncomendaTecnologicaPage'
import ContratacaoDiretaPage from './page/ContratacaoDiretaPage'
import ContratoTransferenciaTecnologiaPage from './page/ContratoTransferenciaTecnologiaPage'

const ROUTES = {
  '/': HomePage,
  '/acordo-pd&i': AcordoPDIPage,
  '/convenio-pd&i': ConvenioPDIPage,
  '/encomenda-tecnologica': EncomendaTecnologicaPage,
  '/contratacao-direta': ContratacaoDiretaPage,
  '/contrato-transferencia-tecnologia': ContratoTransferenciaTecnologiaPage,
}

function getPath() {
  return window.location.pathname || '/'
}

export default function App() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const onPopState = () => setPath(getPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const Page = ROUTES[path] ?? HomePage
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  )
}

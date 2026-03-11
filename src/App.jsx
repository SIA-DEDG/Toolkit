import React, { useEffect, useState, Component } from 'react'
import { ToastProvider } from './hooks/ToastContext'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center', color: '#2A4365' }}>
          <h2>Algo deu errado.</h2>
          <p style={{ marginTop: 8, color: '#718096' }}>Recarregue a página para continuar.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 16, padding: '8px 20px', background: '#2B6CB0', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
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
    <ErrorBoundary>
      <ToastProvider>
        <Page />
      </ToastProvider>
    </ErrorBoundary>
  )
}

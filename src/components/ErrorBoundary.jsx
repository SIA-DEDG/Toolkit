import { Component } from 'react'

// Captura erros de renderização e exibe tela de fallback com opção de reload
export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-10 text-center text-ink-mid">
          <h2>Algo deu errado.</h2>
          <p className="mt-2 text-ink-muted">Recarregue a página para continuar.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-brand text-white border-none rounded-md cursor-pointer"
          >
            Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

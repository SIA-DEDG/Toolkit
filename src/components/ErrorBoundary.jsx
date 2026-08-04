import { Component } from 'react'

/**
 * Intercepta qualquer erro de renderização abaixo dele e troca a árvore quebrada
 * por uma tela de fallback com botão de recarregar, em vez de deixar a página em
 * branco. Precisa ser classe: React não tem equivalente em componente de função.
 *
 * Só pega erros de renderização — não captura erros de handlers de evento nem de
 * código assíncrono, que continuam precisando do próprio try/catch.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Árvore protegida pelo boundary.
 */
export class ErrorBoundary extends Component {
  state = { error: null }

  /**
   * @param {Error} error - Erro lançado por algum descendente.
   * @returns {{error: Error}} Novo state, que faz o boundary exibir o fallback.
   */
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

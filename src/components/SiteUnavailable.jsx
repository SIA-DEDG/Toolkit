// Tela de bloqueio mostrada no lugar do site quando o kill switch
// (site_config.enabled no Supabase) está desligado ou não pôde ser lido.
export function SiteUnavailable() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        <span className="inline-block text-xs tracking-widest uppercase text-ink-muted border border-ink-muted/30 rounded-full px-4 py-1.5">
          Sistema Indisponível
        </span>
        <h1 className="mt-7 text-3xl font-bold text-ink-mid">
          Sistema temporariamente indisponível
        </h1>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Este serviço encontra-se fora do ar no momento. Pedimos desculpas pelo
          transtorno e agradecemos a compreensão.
        </p>
      </div>
    </div>
  )
}

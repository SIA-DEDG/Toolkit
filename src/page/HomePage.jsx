import React from 'react'

const PAGES = [
  {
    href: '/acordo-pdi',
    title: 'Acordo PDI',
    description: 'Fluxo do processo de Acordo de Parceria para PDI',
  },
  {
    href: '/convenio-pdi',
    title: 'Convênio PDI',
    description: 'Fluxo do processo de Convênio para PDI',
  },
  {
    href: '/encomenda-tecnologica',
    title: 'Encomenda Tecnológica',
    description: 'Fluxo do processo de Encomenda Tecnológica',
  },
  {
    href: '/contratacao-direta',
    title: 'Contratação Direta',
    description: 'Fluxo do processo de Contratação Direta',
  },
  {
    href: '/contrato-transferencia-tecnologia',
    title: 'Contrato de Transferência de Tecnologia',
    description: 'Fluxo do processo de Contrato de Transferência de Tecnologia',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EBF8FF] flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#2A4365]">Toolkit SIA</h1>
        <p className="text-[#2A4365]/70 mt-2">Selecione um fluxo para visualizar</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {PAGES.map((page) => (
          <a
            key={page.href}
            href={page.href}
            onClick={(e) => {
              e.preventDefault()
              window.history.pushState({}, '', page.href)
              window.dispatchEvent(new PopStateEvent('popstate'))
            }}
            className="bg-white rounded-2xl shadow-md p-8 w-64 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-[#63B3ED]"
          >
            <h2 className="text-lg font-bold text-[#2A4365]">{page.title}</h2>
            <p className="text-sm text-[#2A4365]/70">{page.description}</p>
            <span className="mt-auto text-[#3182CE] text-sm font-medium">Ver fluxo →</span>
          </a>
        ))}
      </div>
    </div>
  )
}

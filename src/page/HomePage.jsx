import React from 'react'
import { FileText, Handshake, Cpu, ShoppingCart, RefreshCw } from 'lucide-react'
import FlowCard from '../components/FlowCard'

const flows = [
  {
    title: 'Acordo PD&I',
    description: 'Fluxo do processo de Acordo de Parceria para PDI',
    href: '/acordo-pd&i',
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: 'Convênio PD&I',
    description: 'Fluxo do processo de Convênio para PDI',
    href: '/convenio-pd&i',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Encomenda Tecnológica',
    description: 'Fluxo do processo de Encomenda Tecnológica',
    href: '/encomenda-tecnologica',
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    title: 'Contratação Direta',
    description: 'Fluxo do processo de Contratação Direta',
    href: '/contratacao-direta',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: 'Contrato de Transferência de Tecnologia',
    description: 'Fluxo do processo de Contrato de Transferência de Tecnologia',
    href: '/contrato-transferencia-tecnologia',
    icon: <RefreshCw className="h-5 w-5" />,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EBF8FF] flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#1a4f9e] to-[#2563c4] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">Toolkit SIA</h1>
        <p className="mt-3 text-base text-white/80">Selecione um fluxo para visualizar</p>
      </header>

      {/* Cards */}
      <main className="mx-auto w-full max-w-5xl px-6 -mt-8 pb-16">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {flows.slice(0, 4).map((flow) => (
            <FlowCard key={flow.title} {...flow} />
          ))}
        </div>
        <div className="mt-4 flex justify-start">
          <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]">
            <FlowCard {...flows[4]} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Toolkit SIA — Sistema de Inovação Aberta</p>
      </footer>
    </div>
  )
}

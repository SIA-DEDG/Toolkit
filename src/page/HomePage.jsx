import React, { useState } from 'react'
import { FileText, Lightbulb, Play, ArrowRight, ExternalLink, Handshake, Cpu, ShoppingCart, RefreshCw } from 'lucide-react'
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
  const [started, setStarted] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showFlows, setShowFlows] = useState(false)

  const handleSelect = (option) => {
    if (selected === option) {
      setSelected(null)
      setShowFlows(false)
    } else {
      setSelected(option)
      setShowFlows(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#EBF8FF] flex flex-col">
      {/* Hero */}
      <header className="bg-gradient-to-b from-[#1565C0] to-[#2979d4] py-16 px-6 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Ferramenta interativa
        </span>
        <h1 className="text-4xl font-bold text-white md:text-5xl">Toolkit de Inovação</h1>
        <p className="mt-4 text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
          O Toolkit de Inovação é uma ferramenta interativa que te guia na escolha do melhor
          caminho para inovar. Seja para encontrar o procedimento certo ou para entender os
          conceitos por trás da inovação, estamos aqui para te ajudar a dar o primeiro passo.
        </p>
      </header>

      {/* Flow Section */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 pb-16">
        <div className="w-full max-w-3xl flex flex-col items-center">

          {/* Comece aqui button */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-10 py-8 flex flex-col items-center gap-6 w-full max-w-xl">
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              Explore as possibilidades de inovação e descubra o melhor caminho
              para transformar suas ideias em realidade. Utilize esta ferramenta para
              navegar pelos procedimentos disponíveis.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0d9ddb] hover:bg-[#0b8bc4] text-white font-semibold text-base shadow-md transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              Iniciar
            </button>
          </div>

          {/* Tree connector */}
          <div className="flex flex-col items-center w-full">
            {/* Vertical line down from button */}
            {started && <div className="w-px h-8 bg-gray-300" />}

            {/* Horizontal bar */}
            {started && (
              <div className="relative w-[55%] h-px bg-gray-300">
                <div className="absolute left-0 top-0 w-px h-5 bg-gray-300" />
                <div className="absolute right-0 top-0 w-px h-5 bg-gray-300" />
              </div>
            )}

            {/* Two cards */}
            <div className={`grid grid-cols-2 gap-4 w-full mt-5 transition-all duration-300 ${started ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}>
              {/* Card 1 - Procedimentos */}
              <button
                onClick={() => handleSelect('procedimentos')}
                className={`rounded-2xl border-2 p-6 text-left flex flex-col items-center gap-3 transition-all cursor-pointer
                  ${selected === 'procedimentos'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                  ${selected === 'procedimentos' ? 'bg-blue-600' : 'bg-blue-500'}`}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-800 text-center leading-snug">
                  Sabe qual procedimento e documento quer utilizar para inovação?
                </p>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>

              {/* Card 2 - Inovação */}
              <button
                onClick={() => handleSelect('inovacao')}
                className={`rounded-2xl border-2 p-6 text-left flex flex-col items-center gap-3 transition-all cursor-pointer
                  ${selected === 'inovacao'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                  ${selected === 'inovacao' ? 'bg-blue-600' : 'bg-[#5ab4d6]'}`}>
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-800 text-center leading-snug">
                  Quer entender qual seria a inovação?
                </p>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content panel */}
          {selected === 'inovacao' && (
            <div className="mt-6 w-full bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-gray-900">Entenda a Inovação</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Antes de começar, é importante entender os conceitos de inovação e como eles
                podem ser aplicados no seu contexto. O link abaixo contém materiais explicativos
                que vão te ajudar a identificar o tipo de inovação mais adequado para o seu projeto.
              </p>
              <a
                href="https://inovacpin.org/trilha/planejamento/etapa/8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0d9ddb] hover:bg-[#0b8bc4] text-white text-sm font-semibold transition-colors"
              >
                Acessar Material
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {selected === 'procedimentos' && !showFlows && (
            <div className="mt-6 w-full bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Procedimentos e Documentos</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Acesse os fluxos de inovação disponíveis. Aqui você encontra todos os
                procedimentos e documentos necessários para implementar sua inovação.
              </p>
              <button
                onClick={() => setShowFlows(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
              >
                Ver Fluxos
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {selected === 'procedimentos' && showFlows && (
            <div className="mt-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Procedimentos e Documentos</h2>
                </div>
                <button
                  onClick={() => setShowFlows(false)}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Voltar
                </button>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {flows.slice(0, 4).map((flow) => (
                  <FlowCard key={flow.title} {...flow} />
                ))}
              </div>
              <div className="mt-4 sm:w-[calc(50%-8px)]">
                <FlowCard {...flows[4]} />
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Toolkit SIA — Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação</p>
      </footer>
    </div>
  )
}

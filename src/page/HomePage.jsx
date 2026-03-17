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
      <header className="bg-[#EBF8FF] pt-14 pb-10 px-4 md:px-8 border-b border-blue-100">
        <div className="max-w-5xl mx-auto flex items-center gap-12">
          {/* Texto */}
          <div className="flex-1 md:flex-[2] min-w-0">
            <h1 className="text-5xl font-bold leading-tight mb-5">Toolkit de Inovação</h1>
            <p className="text-base text-gray-500 leading-relaxed">
              O Toolkit de Inovação é um conjunto de minutas de contratos, acordos e outros instrumentos
              jurídicos para a implementação do Marco Legal de Ciência, Tecnologia e Inovação no Piauí.
              Aqui você encontra materiais de apoio relacionados tanto a compras públicas de inovação
              quanto a outras alternativas legais, como atividades de pesquisa, desenvolvimento e inovação,
              sempre com o objetivo de aumentar a segurança jurídica na aplicação desses instrumentos.
              Baseados em exemplos reais e casos concretos, os modelos foram elaborados pela Secretaria de
              Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação (SIA) de maneira
              colaborativa e validados por XX.
            </p>
          </div>

          {/* Imagem */}
          <div className="hidden md:block md:flex-[1.5] min-w-0">
            <img
              src="/assets/home/hero-illustration.png"
              alt="Ilustração Toolkit de Inovação"
              className="w-full h-auto object-contain select-none"
              draggable={false}
              loading="eager"
            />
          </div>
        </div>
      </header>

      {/* Flow Section */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 pb-16">
        <div className="w-full max-w-3xl flex flex-col items-center">

          {/* Two cards */}
          <div className="grid grid-cols-2 gap-4 w-full">
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
                  Sabe qual procedimento e instrumento quer utilizar para inovação?
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
                  Quer compreender o contexto do desafio que 
                  se pretende solucionar e a decisão sobre a modalidade ou o 
                  instrumento mais adequado para a contratação?
                </p>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

          {/* Content panel */}
          {selected === 'inovacao' && (
            <div className="mt-6 w-full bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-gray-900">Entenda a Inovação</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Antes de acessar o fluxo de documentações é necessário entender a solução mais apropriada para 
                o seu desafio e qual o instrumento mais adequado para a contratação. O link abaixo da inovacpin 
                contém uma trilha de planejamento e um quiz para lhe direcionar em qual seria o instrumento de inovação.
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
                <h2 className="text-lg font-bold text-gray-900">Procedimentos e Intrumentos</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Acesse os fluxos de inovação disponíveis. Aqui você encontra todos os
                procedimentos e instrumentos necessários para implementar sua inovação.
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

import { useState, useCallback } from 'react'
import { ExternalLink, ArrowRight } from 'lucide-react'

import { INSTRUMENT_FLOWS } from '../data/instruments'
import { useIsMobile } from '../hooks/useIsMobile'
import { SectionBadge } from '../components/SectionBadge'
import { InstrumentFlowCard } from '../components/InstrumentFlowCard'
import { ScaledFlowchart } from '../components/flowchart/ScaledFlowchart'

const HERO_BANNER_SRC = 'https://www.figma.com/api/mcp/asset/29bd93f3-7cdc-4145-96a7-cc8a6fddefbe'

const RED = 'rgba(168,37,14,0.6)'

const INSTRUMENT_PILLS = [
  { label: 'Acordo de PD&I',                                  color: '#08ba9c',        icon: '🤝', iconBg: 'rgba(47,255,220,0.2)' },
  { label: 'Convênio de PD&I',                                color: '#209828',        icon: '📋', iconBg: 'rgba(31,255,38,0.2)'  },
  { label: 'Pitches e Hackatons',                             color: RED,              icon: '💡', iconBg: 'rgba(255,64,31,0.2)'  },
  { label: 'PMI - Procedimento de Manifestação de Interesse', color: RED,              icon: '📌', iconBg: 'rgba(255,64,31,0.2)'  },
  { label: 'Diálogo Competitivo',                             color: RED,              icon: '💬', iconBg: 'rgba(255,64,31,0.2)'  },
  { label: 'ETEC - Encomenda Tecnológica',                    color: '#0e59a8',        icon: '🖥️', iconBg: 'rgba(219,175,0,0.2)'  },
  { label: 'CPSI - Contrato Público para Solução Inovadora',  color: RED,              icon: '🏗️', iconBg: 'rgba(14,89,168,0.2)'  },
  { label: 'Concurso Público de Inovação',                    color: RED,              icon: '📝', iconBg: 'rgba(14,89,168,0.2)'  },
  { label: 'Doação de Solução Inovadora',                     color: RED,              icon: '📨', iconBg: 'rgba(14,89,168,0.2)'  },
  { label: 'Contratação Direta',                              color: RED,              icon: '📇', iconBg: 'rgba(14,89,168,0.2)'  },
  { label: 'Contrato de Transferência',                       color: '#6a0ea8',        icon: '🔄', iconBg: 'rgba(206,136,253,0.2)'},
  { label: 'Licitação',                                       color: RED,              icon: '📄', iconBg: 'rgba(14,89,168,0.2)'  },
]

export default function HomePage() {
  const isMobile = useIsMobile()
  const [openIds, setOpenIds] = useState(new Set())

  const handleInstrumentClick = useCallback((id) => {
    setOpenIds(new Set([id]))
    setTimeout(() => {
      document.getElementById('passo-a-passo')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [])

  const handleToggle = useCallback((id) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return (
    <div className="bg-white w-full overflow-x-hidden">

      <div className="w-full overflow-hidden" style={{ height: 'clamp(140px, 16vw, 230px)' }}>
        <img
          src={HERO_BANNER_SRC}
          alt="Banner Toolkit de Inovação"
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="py-[clamp(28px,4vw,56px)] px-[clamp(20px,5vw,66px)] flex gap-[clamp(24px,4vw,56px)] flex-wrap items-start">
        <div className="intro-text-box flex-[1_1_320px]">
          <h1 className="font-semibold text-[clamp(20px,2.5vw,30px)] text-ink-mid m-0 leading-snug">
            Toolkit de Inovação
          </h1>
          <p className="font-light text-[clamp(13px,1.1vw,16px)] text-black text-justify leading-[1.7] m-0">
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

        <div className="flex-[1_1_320px] flex flex-wrap gap-[6px] content-start">
          {INSTRUMENT_PILLS.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-[7px] px-[8px] py-[9px] rounded-[10px]"
              style={{ backgroundColor: pill.color }}
            >
              <div
                className="flex items-center justify-center rounded-[4px] shrink-0 w-[22px] h-[22px] text-[14px]"
                style={{ backgroundColor: pill.iconBg }}
              >
                {pill.icon}
              </div>
              <span className="font-semibold text-[12px] text-white leading-snug">{pill.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="select-border-top-dashed select-border-bottom bg-brand-bg">
        <div className="max-w-[1440px] mx-auto py-[clamp(20px,3vw,40px)] px-[clamp(20px,5vw,66px)]">
        <SectionBadge>Triagem de Identificação</SectionBadge>

        <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-ink-mid my-[clamp(12px,2vw,20px)] mb-[clamp(16px,2.5vw,28px)]">
          Identificação
        </h2>

        <div className="flex gap-[clamp(16px,2vw,32px)] flex-wrap">
          <div className="flex-[1_1_260px] max-w-[600px] bg-brand rounded-lg p-[clamp(14px,2vw,20px)] flex flex-col gap-[clamp(8px,1.5vw,14px)]">
            <p className="font-semibold text-[clamp(11px,1vw,13px)] text-white text-justify m-0 leading-snug">
              Precisa entender a solução mais apropriada para o seu desafio e qual o instrumento mais adequado para a contratação?
            </p>
            <p className="font-light text-[clamp(10px,0.9vw,12px)] text-white/90 text-justify m-0 flex-1 leading-relaxed">
              O link abaixo da inovacpin contém uma trilha de planejamento e um quiz para lhe direcionar em qual seria o instrumento de inovação.
            </p>
            <a
              href="https://inovacpin.org/trilha/planejamento/etapa/8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 no-underline bg-brand-mid rounded-[10px] h-[34px] text-white"
              style={{ width: 'clamp(130px, 12vw, 160px)' }}
            >
              <span className="font-medium text-[13px]">Acessar Material</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <div className="flex-[1_1_260px] max-w-[600px] bg-brand rounded-lg p-[clamp(14px,2vw,20px)] flex flex-col gap-[clamp(8px,1.5vw,14px)]">
            <p className="font-semibold text-[clamp(11px,1vw,13px)] text-white text-justify m-0 leading-snug">
              Sabe qual procedimento e instrumento quer utilizar para inovação?
            </p>
            <p className="font-light text-[clamp(10px,0.9vw,12px)] text-white/90 text-justify m-0 flex-1 leading-relaxed">
              Esta trilha contém os instrumentos do Toolkit para inovação. O uso dos instrumentos é independente, permitindo a escolha da solução mais adequada para o problema identificado.
            </p>
            <button
              className="flex items-center justify-center gap-1.5 bg-brand-mid border-none rounded-[10px] h-[34px] text-white cursor-pointer"
              style={{ width: 'clamp(130px, 12vw, 160px)' }}
              onClick={() => document.getElementById('trilha-de-instrumentos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="font-medium text-[13px]">Siga a Trilha</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Trilha de Instrumentos — renderizada apenas no desktop; em mobile o fluxograma SVG não escala bem */}
      {!isMobile && (
        <section id="trilha-de-instrumentos" className="p-0">
          <ScaledFlowchart onInstrumentClick={handleInstrumentClick} />
        </section>
      )}

      <section
        id="passo-a-passo"
        className="select-border-bottom-dashed select-border-top bg-brand-bg py-[clamp(20px,3vw,40px)] px-[clamp(20px,4vw,40px)] pb-[clamp(32px,4vw,48px)]"
      >
        <SectionBadge>Fluxos de Internos</SectionBadge>

        <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-ink-mid my-[clamp(12px,2vw,20px)] mb-[clamp(6px,1vw,10px)]">
          Passo a passo de cada instrumento
        </h2>

        <p className="font-light text-[clamp(14px,1.4vw,18px)] text-ink-mid mb-[clamp(20px,3vw,32px)] mt-0">
          Selecione um Instrumento e explore seu fluxo
        </p>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {INSTRUMENT_FLOWS.map((flow) => (
              <InstrumentFlowCard key={flow.id} {...flow} openIds={openIds} onToggle={handleToggle} />
            ))}
          </div>
        ) : (
          <>
              <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[clamp(14px,2vw,20px)] mb-[clamp(14px,2vw,20px)] items-start">
              {INSTRUMENT_FLOWS.slice(0, 3).map((flow) => (
                <InstrumentFlowCard key={flow.id} {...flow} openIds={openIds} onToggle={handleToggle} />
              ))}
            </div>

            {/* 2ª linha com 2 cards centralizada para manter simetria visual com a 1ª linha de 3 */}
            <div className="max-w-[810px] mx-auto grid grid-cols-2 gap-[clamp(14px,2vw,20px)] items-start">
              {INSTRUMENT_FLOWS.slice(3).map((flow) => (
                <InstrumentFlowCard key={flow.id} {...flow} openIds={openIds} onToggle={handleToggle} />
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="text-center py-[clamp(20px,3vw,32px)] px-4 text-[clamp(11px,1vw,14px)] text-gray-400 bg-white">
        © {new Date().getFullYear()} Toolkit SIA — Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação
      </footer>

    </div>
  )
}

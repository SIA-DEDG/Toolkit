import { useState, useCallback } from 'react'
import { ExternalLink, ArrowRight } from 'lucide-react'

import { INSTRUMENT_FLOWS } from '../data/instruments'
import { useIsMobile } from '../hooks/useIsMobile'
import { SectionBadge } from '../components/SectionBadge'
import { InstrumentFlowCard } from '../components/InstrumentFlowCard'
import { ScaledFlowchartDecision } from '../components/flowchart/ScaledFlowchartDecision'

const HERO_BANNER_SRC = '/assets/home/banner.png'
const SCROLL_DELAY_MS = 50

const COLOR_OFF_TRACK = 'rgb(190,91,74)'

const INSTRUMENT_PILLS = [
  { label: 'Acordo de PD&I', color: '#08ba9c', icon: '🤝', iconBg: 'rgba(47,255,220,0.2)' },
  { label: 'Convênio de PD&I', color: '#209828', icon: '📋', iconBg: 'rgba(31,255,38,0.2)' },
  { label: 'Pitches e Hackatons', color: '#00A27F', icon: '💡', iconBg: 'rgba(255,255,255,0.2)' },
  { label: 'PMI - Procedimento de Manifestação de Interesse', color: '#e65100', icon: '📌', iconBg: 'rgba(255,255,255,0.2)' },
  { label: 'Diálogo Competitivo', color: '#006064', icon: '💬', iconBg: 'rgba(255,255,255,0.2)' },
  { label: 'ETEC - Encomenda Tecnológica', color: '#0e59a8', icon: '🖥️', iconBg: 'rgba(219,175,0,0.2)' },
  { label: 'CPSI - Contrato Público para Solução Inovadora', color: '#c21d00', icon: '🏗️', iconBg: 'rgba(255,255,255,0.2)' },
  { label: 'Concurso Público de Inovação', color: '#880e4f', icon: '📝', iconBg: 'rgba(255,255,255,0.2)' },
  { label: 'Doação de Solução Inovadora', color: '#1b5e20', icon: '📨', iconBg: 'rgba(255,255,255,0.2)' },
  { label: 'Contratação Direta', color: '#dbaf00', icon: '📇', iconBg: 'rgba(14,89,168,0.2)' },
  { label: 'Contrato de Transferência', color: '#6a0ea8', icon: '🔄', iconBg: 'rgba(206,136,253,0.2)' },
  { label: 'Licitação', color: '#37474f', icon: '📄', iconBg: 'rgba(255,255,255,0.2)' },
]

// Rola suavemente até um elemento pelo id
function scrollToSection(id, delay = 0) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, delay)
}

// Banner de topo com imagem de capa
function HeroBanner() {
  return (
    <div className="w-full overflow-hidden" style={{ height: 'clamp(140px, 16vw, 230px)' }}>
      <img
        src={HERO_BANNER_SRC}
        alt="Banner Toolkit de Inovação"
        className="w-full h-full object-cover block"
      />
    </div>
  )
}

// Pílula colorida com ícone e label de instrumento
function InstrumentPill({ label, color, icon, iconBg }) {
  return (
    <div
      className="flex items-center gap-[7px] px-[8px] py-[9px] rounded-[10px]"
      style={{ backgroundColor: color }}
    >
      <div
        className="flex items-center justify-center rounded-[4px] shrink-0 w-[22px] h-[22px] text-[14px]"
        style={{ backgroundColor: iconBg }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <span className="font-semibold text-[12px] text-white leading-snug">{label}</span>
    </div>
  )
}

// Seção de introdução com texto institucional e grade de pílulas de instrumentos
function IntroSection() {
  return (
    <div className="py-[clamp(28px,4vw,56px)] px-[clamp(20px,5vw,66px)] flex gap-[clamp(24px,4vw,56px)] flex-wrap items-center">
      <div className="flex-[1_1_320px]">
        <h1 className="font-semibold text-[clamp(20px,2.5vw,30px)] text-ink-mid m-0 leading-snug">
          Toolkit de Inovação
        </h1>
        <p className="font-light text-[clamp(13px,1.1vw,16px)] text-black text-justify leading-[1.7] m-0">
          O Toolkit de Inovação reúne modelos de contratos,
          acordos e outros instrumentos jurídicos voltados à
          implementação do Marco Legal de Ciência, Tecnologia e Inovação
          no Estado do Piauí. <br />
          A trilha disponibiliza materiais de apoio que
          abrangem desde compras públicas de inovação até outras
          alternativas legais, como iniciativas de pesquisa,
          desenvolvimento e inovação (PD&I), com foco em ampliar a
          segurança jurídica e facilitar a aplicação desses instrumentos
          na prática.<br />
          Desenvolvidos a partir de experiências reais e casos concretos,
          os modelos foram elaborados de forma colaborativa pela
          Secretaria de Inteligência Artificial, Economia Digital,
          Ciência, Tecnologia e Inovação (SIA) e pela
          Procuradoria-Geral do Estado (PGE).<br />
        </p>
      </div>

      <div className="flex-[1_1_320px] flex flex-wrap gap-[6px] content-start justify-start">
        {INSTRUMENT_PILLS.map((pill) => (
          <InstrumentPill key={pill.label} {...pill} />
        ))}
      </div>
    </div>
  )
}

// Card de chamada à ação com título, descrição e botão
function IdentificationCard({ title, description, action }) {
  return (
    <div className="flex-[1_1_260px] max-w-[600px] bg-brand rounded-lg p-[clamp(14px,2vw,20px)] flex flex-col gap-[clamp(8px,1.5vw,14px)]">
      <p className="font-semibold text-[clamp(11px,1vw,13px)] text-white text-justify m-0 leading-snug"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="font-light text-[clamp(10px,0.9vw,12px)] text-white/90 text-justify m-0 flex-1 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {action}
    </div>
  )
}

const ACTION_BUTTON_CLASS =
  'flex items-center justify-center gap-1.5 bg-brand-mid rounded-[10px] h-[34px] text-white'
const ACTION_BUTTON_STYLE = { width: 'clamp(130px, 12vw, 160px)' }

// Seção de triagem com dois cards de identificação de instrumento
function IdentificationSection() {
  return (
    <section className="select-border-top-dashed select-border-bottom bg-brand-bg">
      <div className="max-w-[1440px] mx-auto py-[clamp(20px,3vw,40px)] px-[clamp(20px,5vw,66px)]">
        <SectionBadge>Triagem de Identificação</SectionBadge>

        <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-ink-mid my-[clamp(12px,2vw,20px)] mb-[clamp(16px,2.5vw,28px)]">
          Identificação
        </h2>

        <div className="flex gap-[clamp(16px,2vw,32px)] flex-wrap">
          <IdentificationCard
            title="Precisa <span class='font-extrabold'>entender</span> a solução mais apropriada para o seu desafio e qual o instrumento mais adequado?"
            description="Acesse o link da <strong>CPIN</strong> que contém uma trilha de planejamento e um quiz para lhe direcionar em qual seria o instrumento de inovação."
            action={
              <a
                href="https://inovacpin.org/trilha/planejamento/etapa/8"
                target="_blank"
                rel="noopener noreferrer"
                className={`no-underline ${ACTION_BUTTON_CLASS}`}
                style={ACTION_BUTTON_STYLE}
              >
                <span className="font-medium text-[13px]">Acesse o Material</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            }
          />

          <IdentificationCard
            title="Você já sabe qual instrumento usar para implementar sua inovação?"
            description="Esta trilha contém os instrumentos do Toolkit para inovação. O uso dos instrumentos é independente, permitindo a escolha da solução mais adequada para o problema identificado."
            action={
              <button
                className={`border-none cursor-pointer ${ACTION_BUTTON_CLASS}`}
                style={ACTION_BUTTON_STYLE}
                onClick={() => scrollToSection('trilha-de-instrumentos')}
              >
                <span className="font-medium text-[13px]">Siga a Trilha</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </button>
            }
          />
        </div>
      </div>
    </section>
  )
}

// Grade de cards de instrumentos em layout desktop dividida em duas linhas
function DesktopFlowGrid({ openIds, onToggle }) {
  const firstRow = INSTRUMENT_FLOWS.slice(0, 3)
  const remaining = INSTRUMENT_FLOWS.slice(3)

  return (
    <>
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[clamp(14px,2vw,20px)] mb-[clamp(14px,2vw,20px)] items-start">
        {firstRow.map((flow) => (
          <InstrumentFlowCard key={flow.id} {...flow} openIds={openIds} onToggle={onToggle} />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[clamp(14px,2vw,20px)] items-start">
        {remaining.map((flow) => (
          <InstrumentFlowCard key={flow.id} {...flow} openIds={openIds} onToggle={onToggle} />
        ))}
      </div>
    </>
  )
}

// Seção com o passo a passo expandível de cada instrumento
function StepByStepSection({ isMobile, openIds, onToggle }) {
  return (
    <section
      id="passo-a-passo"
      className="select-border-bottom-dashed select-border-top bg-brand-bg py-[clamp(20px,3vw,40px)] px-[clamp(20px,4vw,40px)] pb-[clamp(32px,4vw,48px)]"
    >
      <SectionBadge>Fluxos de Internos</SectionBadge>

      <h2 className="font-semibold text-2xl text-ink-mid m-0 leading-snug">
        Passo a passo de cada instrumento
      </h2>

      <p className="font-light text-sm text-ink-mid mb-[clamp(20px,3vw,32px)] mt-0">
        Selecione um Instrumento e explore seu fluxo
      </p>

      {isMobile ? (
        <div className="flex flex-col gap-4">
          {INSTRUMENT_FLOWS.map((flow) => (
            <InstrumentFlowCard key={flow.id} {...flow} openIds={openIds} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <DesktopFlowGrid openIds={openIds} onToggle={onToggle} />
      )}
    </section>
  )
}

// Rodapé com copyright institucional
function PageFooter() {
  return (
    <footer className="text-center py-[clamp(20px,3vw,32px)] px-4 text-[clamp(11px,1vw,14px)] text-gray-400 bg-white">
      © {new Date().getFullYear()} Toolkit SIA — Secretaria de Inteligência Artificial,
      Economia Digital, Ciência, Tecnologia e Inovação
    </footer>
  )
}

// Página principal que compõe todas as seções e gerencia o estado de abertura dos cards
export default function HomePage() {
  const isMobile = useIsMobile()
  const [openIds, setOpenIds] = useState(new Set())

  const handleInstrumentClick = useCallback((id) => {
    setOpenIds(new Set([id]))
    scrollToSection('passo-a-passo', SCROLL_DELAY_MS)
  }, [])

  const handleToggle = useCallback((id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return (
    <div className="bg-white w-full overflow-x-clip">
      <HeroBanner />
      <IntroSection />
      <IdentificationSection />

      {!isMobile && (
        <section id="trilha-de-instrumentos" className="p-0">
          <ScaledFlowchartDecision onInstrumentClick={handleInstrumentClick} />
        </section>
      )}

      <StepByStepSection isMobile={isMobile} openIds={openIds} onToggle={handleToggle} />
      <PageFooter />
    </div>
  )
}

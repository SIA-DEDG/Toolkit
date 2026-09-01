import { useState, useCallback, useEffect, useRef } from 'react'
import { ExternalLink, ArrowRight, ArrowUp, Check, Workflow, ChevronDown } from 'lucide-react'
import { INSTRUMENT_FLOWS } from '../data/instruments'
import { useIsMobile } from '../hooks/useIsMobile'
import { SectionBadge } from '../components/SectionBadge'
import { InstrumentFlowCard } from '../components/InstrumentFlowCard'
import { ScaledFlowchartDecision } from '../components/flowchart/ScaledFlowchartDecision'
import { INSTRUMENTS } from '../components/flowchart/TrilhaFlowchartDecision'

// Espera um tick antes de rolar, para o card já ter expandido e o destino estar
// na posição final.
const SCROLL_DELAY_MS = 50

// Escala geral da página (1 = tamanho original do Figma). Mexa aqui para
// encolher/aumentar tudo de uma vez, menos o cabeçalho institucional.
const PAGE_ZOOM = 0.85
const ZOOMED_PAGE_GUTTER = 'clamp(18.82px, 3.27vw, 47.06px)'

// Grupos de instrumentos exibidos como colunas coloridas na introdução.
// A ordem do array é a ordem das colunas na tela (esquerda -> direita) e
// `keys` referencia o catálogo INSTRUMENTS.
const TOOLKIT_GROUPS = [
  {
    name: 'Contratação pública',
    color: '#0e9ca6',
    tint: 'rgba(14,156,166,0.16)',
    keys: ['licitacao', 'etec', 'cpsi', 'direta', 'doacao', 'transferencia'],
  },
  {
    name: 'Parceria e P&D',
    color: '#6561f7',
    tint: 'rgba(101,97,247,0.16)',
    keys: ['convenio', 'acordo'],
  },
  {
    name: 'Exploração de mercado',
    color: '#a6640e',
    tint: 'rgba(166,100,14,0.16)',
    keys: ['pmi', 'dialogo', 'pitchHackathon', 'concurso'],
  },
]

// Contadores flutuantes desenhados por cima das colunas de grupos.
// Se um instrumento novo entrar no toolkit, atualize os números aqui.
const TOOLKIT_STATS = [
  { value: '03', label: 'Grupos' },
  { value: '12', label: 'Instrumentos' },
]

/**
 * Rola suavemente até o elemento com esse id. Não faz nada se o id não existir.
 *
 * @param {string} id - Id do elemento de destino, ex.: 'passo-a-passo'.
 * @param {number} [delay=0] - Espera em ms antes de rolar, para o React
 *   re-renderizar e o destino já estar na posição final.
 */
function scrollToSection(id, delay = 0) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, delay)
}

const HEADER_NAV_ITEMS = [
  { label: 'Sobre o Toolkit de inovação', target: 'sobre-o-toolkit' },
  { label: 'Identificação', target: 'identificacao' },
  { label: 'Trilha de Instrumentos', target: 'trilha-de-instrumentos' },
  { label: 'Fluxo Internos dos Instrumentos', target: 'passo-a-passo' },
]

// Cabeçalho do Toolkit conforme o componente do Figma: seletor de portal,
// controles de acessibilidade, logo e navegação por âncoras da própria página.
function GovHeader() {
  const [activeSection, setActiveSection] = useState(HEADER_NAV_ITEMS[0].target)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [toolkitMenuOpen, setToolkitMenuOpen] = useState(false)
  const toolkitMenuRef = useRef(null)

  const handleNavigation = useCallback((target) => {
    scrollToSection(target)
  }, [])

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    let frameId = null

    const updateCurrentSection = () => {
      frameId = null
      const readingLine = Math.min(220, window.innerHeight * 0.35)
      let currentSection = HEADER_NAV_ITEMS[0].target

      HEADER_NAV_ITEMS.forEach((item) => {
        const section = document.getElementById(item.target)
        if (section?.getBoundingClientRect().top <= readingLine) {
          currentSection = item.target
        }
      })

      setActiveSection(currentSection)
      setShowBackToTop(window.scrollY > 320)
    }

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateCurrentSection)
    }

    updateCurrentSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    if (!toolkitMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (!toolkitMenuRef.current?.contains(event.target)) setToolkitMenuOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setToolkitMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toolkitMenuOpen])

  return (
    <>
      <header className="w-full select-none">
        <div className="min-h-[72px] bg-[#eef6ff] py-4">
          <div className="w-full px-[var(--page-gutter)] flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center min-w-0 max-w-full">
          <span className="h-5 border-l border-[#cbd5e1] shrink-0" aria-hidden="true" />
          <span className="h-10 px-4 inline-flex items-center text-[14px] font-semibold text-[#404040] whitespace-nowrap">
            Site SIA
          </span>
          <span className="h-5 border-l border-[#cbd5e1] shrink-0" aria-hidden="true" />
          <div ref={toolkitMenuRef} className="relative min-w-0 mx-2">
            <button
              type="button"
              onClick={() => setToolkitMenuOpen((open) => !open)}
              aria-expanded={toolkitMenuOpen}
              aria-haspopup="menu"
              className="h-10 max-w-[calc(100vw-150px)] px-4 inline-flex items-center gap-2 rounded-[10px] border-none bg-[#034ea2] text-[#dee6ff] text-[14px] font-semibold cursor-pointer"
            >
              <span className="truncate">Toolkit de Compras Públicas de Inovação</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${toolkitMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {toolkitMenuOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-2 z-[90] w-[min(360px,calc(100vw-32px))] rounded-[10px] border border-[#dbe5f0] bg-[#fdfeff] p-1.5 shadow-xl"
              >
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked="true"
                  onClick={() => setToolkitMenuOpen(false)}
                  className="w-full px-3 py-2.5 rounded-[8px] border-none bg-[#eef6ff] flex items-center gap-3 text-left text-[13px] font-semibold text-[#034ea2] cursor-pointer"
                >
                  <span className="flex-1">Toolkit de Compras Públicas de Inovação</span>
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          <span className="h-5 border-l border-[#cbd5e1] shrink-0" aria-hidden="true" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {['A-', 'A+'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="w-8 h-8 rounded-[4px] bg-[#fdfeff] border-none shadow-[0_4px_2px_rgba(0,0,0,0.1)] flex items-center justify-center text-[14px] font-normal tracking-[0.4px] text-[#262626] cursor-pointer"
                  aria-label={label === 'A-' ? 'Diminuir fonte' : 'Aumentar fonte'}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[87px] bg-[#fdfeff] py-3">
          <div className="w-full px-[var(--page-gutter)] flex items-center">
            <img
              src="/assets/shared/logo.svg"
              alt="Toolkit de Compras Públicas de Inovação"
              className="w-[146px] h-[61px] object-fill"
            />
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-[70] bg-[#034ea2] overflow-x-auto no-scrollbar select-none shadow-sm" aria-label="Navegação pelas seções da página">
        <ul className="min-w-max min-h-[56px] px-[var(--page-gutter)] flex items-stretch justify-center gap-2 m-0 list-none">
          {HEADER_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.target
            return (
              <li key={item.target} className="flex">
                <button
                  type="button"
                  onClick={() => handleNavigation(item.target)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`h-14 px-4 border-x-0 border-t-0 cursor-pointer whitespace-nowrap text-[14px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#023d83] border-b-[3px] border-[#e1edfa] text-[#e1edfa]'
                      : 'bg-transparent border-b-[3px] border-transparent text-[#d1d1d1] hover:text-[#a5bdff] hover:bg-[#023d83]/40'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTop}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          className="fixed right-5 bottom-24 z-[80] w-11 h-11 rounded-full border border-[#e1edfa] bg-[#034ea2] text-[#f5f5f5] shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </>
  )
}

/**
 * Coluna pastel de um grupo, listando os instrumentos que pertencem a ele.
 *
 * @param {object} props
 * @param {{name: string, color: string, tint: string, keys: string[]}} props.group -
 *   Um item de TOOLKIT_GROUPS. `keys` referencia o catálogo INSTRUMENTS.
 * @param {string} [props.className] - Classes de dimensionamento. O componente
 *   não define o próprio tamanho de propósito: o desktop passa largura fixa e o
 *   mobile, fluida.
 */
function GroupColumn({ group, className = 'w-full min-w-0' }) {
  return (
    <div
      className={`self-start rounded-[8px] px-4 py-5 flex flex-col gap-4 ${className}`}
      style={{ background: group.tint }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: group.color }} />
        <span className="font-semibold text-[13px] leading-tight" style={{ color: group.color }}>
          {group.name}
        </span>
      </div>

      <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
        {group.keys.map((key) => {
          const instrument = INSTRUMENTS[key]
          const Icon = instrument.icon
          return (
            <li key={key} className="flex items-start gap-2">
              <Icon className="w-4 h-4 shrink-0 mt-[1px]" style={{ color: group.color }} aria-hidden="true" />
              <span className="text-[13px] font-medium text-ink-mid leading-snug">{instrument.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Cartãozinho azul de número mais rótulo, ex.: "12 / Instrumentos".
 *
 * @param {object} props
 * @param {{value: string, label: string}} props.stat - Um item de TOOLKIT_STATS.
 * @param {string} [props.className=''] - Classes extras de posicionamento.
 */
function StatCard({ stat, className = '' }) {
  return (
    <div className={`w-[115px] shrink-0 rounded-[10px] bg-[#c4deff] drop-shadow-[2px_2px_2.5px_rgba(0,0,0,0.25)] pt-[11px] pb-[13px] px-2 flex flex-col items-center gap-[5px] ${className}`}>
      <span className="font-semibold text-[30px] leading-none text-[#2a4365]">{stat.value}</span>
      <span className="w-full text-center text-[14px] font-light text-black leading-tight">{stat.label}</span>
    </div>
  )
}

// Vitrine dos três grupos, com dois layouts distintos.
// No desktop, as colunas fluidas ficam lado a lado e os
// cartões "03" e "12" são posicionados em absoluto, saltando das quinas das
// colunas das pontas. Como flutuam, não consomem espaço na linha e as três
// colunas dividem toda a largura disponível. No mobile, tudo empilha em unidades
// fluidas.
function HowToCard() {
  return (
    <div className="w-full min-w-0 md:pb-[52px] xl:flex-[1_1_893px] xl:max-w-[1250px] relative">
      <div className="hidden md:block relative px-[98px]">
        <div className="grid grid-cols-3 gap-[clamp(16px,1.6vw,28px)] items-start">
          {TOOLKIT_GROUPS.map((group, index) => (
            <div key={group.name} className="relative min-w-0">
              <GroupColumn group={group} />

              {group.name === 'Contratação pública' && (
                <div className="absolute left-[-89px] bottom-[-52px] z-10">
                  <StatCard stat={TOOLKIT_STATS[0]} />
                </div>
              )}

              {index === TOOLKIT_GROUPS.length - 1 && (
                <div className="absolute right-[-89px] top-[-33px] z-10">
                  <StatCard stat={TOOLKIT_STATS[1]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        <div className="flex gap-3 justify-center">
          <StatCard stat={TOOLKIT_STATS[0]} />
          <StatCard stat={TOOLKIT_STATS[1]} />
        </div>

        {/* Duas colunas: o primeiro grupo (o mais alto) fica sozinho à esquerda e
            os demais empilham à direita, encaixando no espaço que sobra em vez
            de ficar um card solto embaixo. */}
        <div className="grid grid-cols-2 gap-3 items-start">
          <GroupColumn group={TOOLKIT_GROUPS[0]} className="w-full" />
          <div className="flex flex-col gap-3">
            {TOOLKIT_GROUPS.slice(1).map((group) => (
              <GroupColumn key={group.name} group={group} className="w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Primeira dobra da página: texto de apresentação do toolkit à esquerda e a
// vitrine dos grupos à direita.
function IntroSection() {
  return (
    <section id="sobre-o-toolkit" className="w-full py-[var(--section-spacing)] px-[var(--page-gutter)] flex gap-[clamp(24px,4vw,56px)] xl:gap-x-[clamp(40px,4vw,120px)] flex-wrap items-start justify-between [&>*:only-child]:mx-auto">
      <div className="flex-[1_1_360px] xl:flex-[999_1_360px] max-w-[620px] xl:max-w-[1050px] xl:self-stretch flex flex-col gap-[35px]">
        <h1 className="font-semibold text-[clamp(22px,2.5vw,30px)] text-ink-mid m-0 leading-tight">
          Toolkit de Compras Públicas
        </h1>
        <div className="flex flex-col gap-4 xl:flex-1 xl:justify-between">
          <p className="font-normal text-[clamp(13px,1.1vw,16px)] text-ink-dark leading-[1.35] m-0 text-justify">
            O Toolkit de Compras Públicas reúne modelos de contratos, acordos e outros instrumentos jurídicos para apoiar a implementação do Marco Legal de Ciência, Tecnologia e Inovação no Piauí.
          </p>
          <p className="font-normal text-[clamp(13px,1.1vw,16px)] text-ink-dark leading-[1.35] m-0 text-justify">
            A ferramenta foi criada para fortalecer as compras públicas de inovação e orientar o uso de alternativas legais voltadas a atividades de pesquisa, desenvolvimento e inovação, contribuindo para mais segurança jurídica na aplicação desses instrumentos.
          </p>
          <p className="font-normal text-[clamp(13px,1.1vw,16px)] text-ink-dark leading-[1.35] m-0 text-justify">
            Os modelos foram elaborados pela Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação (SIA) e pela Procuradoria Geral do Estado (PGE).
          </p>
        </div>
      </div>

      <HowToCard />
    </section>
  )
}

/**
 * Card translúcido de um caminho de triagem, sobre a faixa azul.
 *
 * Atenção: `title` e `description` passam por dangerouslySetInnerHTML para
 * aceitar marcação simples. Use apenas texto definido aqui no código — nunca
 * passe conteúdo vindo do usuário ou de uma API, sob risco de XSS.
 *
 * @param {object} props
 * @param {string} props.title - Pergunta em destaque. Renderizada como HTML.
 * @param {string} props.description - Texto de apoio. Renderizado como HTML.
 * @param {React.ReactNode} props.action - Botão ou link do rodapé do card.
 */
function IdentificationCard({ title, description, action }) {
  return (
    <div className="w-full min-w-0 bg-white/20 rounded-lg p-3 flex flex-col gap-3">
      <p
        className="font-semibold text-[16px] text-[#F5F5F5] text-justify m-0 leading-snug min-h-[2.75em]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="font-medium text-[14px] text-[#e6e6e6] text-justify m-0 leading-snug"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex justify-end mt-auto pt-1">
        {action}
      </div>
    </div>
  )
}

const GRADIENT_BTN_CLASS =
  'inline-flex items-center justify-center gap-1.5 rounded-full h-[31px] px-4 text-[#F5F5F5] font-medium text-[14px] no-underline border-none cursor-pointer'
const GRADIENT_BTN_STYLE = { background: 'linear-gradient(90deg, #042d63 0%, #0e50a6 80%)' }

// Faixa azul de triagem com os dois caminhos de entrada: rolar para a trilha
// interna (quem já sabe o que quer) ou abrir o quiz externo da inovacpin.
function IdentificationSection() {
  return (
    <section
      id="identificacao"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(99deg, #0e50a6 39%, #042d63 96%)' }}
    >
      {/* Brilho decorativo */}
      <div
        className="pointer-events-none absolute -left-40 top-0 w-[543px] h-[435px] opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(101,97,247,0.45) 0%, rgba(101,97,247,0) 70%)' }}
        aria-hidden="true"
      />

      <div className="relative w-full py-[var(--section-spacing)] px-[var(--page-gutter)]">
        <div className="inline-flex items-center gap-1.5 bg-brand-light rounded-full h-[28px] pl-2 pr-2.5">
          <Workflow className="w-5 h-5 text-ink-mid shrink-0" />
          <span className="font-medium text-[14px] text-ink-mid">Triagem de Identificação</span>
        </div>

        <h2 className="font-semibold text-[clamp(20px,2vw,24px)] text-white mt-4 mb-6">
          Identificação
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(20px,2.2vw,40px)] lg:[&>*:only-child]:col-span-2 lg:[&>*:only-child]:w-full lg:[&>*:only-child]:max-w-[600px] lg:[&>*:only-child]:justify-self-center">
          <IdentificationCard
            title="Sabe qual procedimento e instrumento quer utilizar para inovação?"
            description="Esta trilha contém os instrumentos do Toolkit para inovação. O uso dos instrumentos é independente, permitindo a escolha da solução mais adequada para o problema identificado."
            action={
              <button
                className={GRADIENT_BTN_CLASS}
                style={GRADIENT_BTN_STYLE}
                onClick={() => scrollToSection('trilha-de-instrumentos')}
              >
                Siga a Trilha
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </button>
            }
          />

          <IdentificationCard
            title="Precisa entender a solução mais apropriada para o seu desafio e qual o instrumento mais adequado para a contratação?"
            description="O link abaixo da inovacpin contém uma trilha de planejamento e um quiz para lhe direcionar em qual seria o instrumento de inovação."
            action={
              <a
                href="https://inovacpin.org/trilha/planejamento/etapa/8"
                target="_blank"
                rel="noopener noreferrer"
                className={GRADIENT_BTN_CLASS}
                style={GRADIENT_BTN_STYLE}
              >
                Acessar Material
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            }
          />
        </div>
      </div>
    </section>
  )
}

/**
 * Grade de cards de instrumento no desktop, quebrada em duas grades de 3 colunas
 * (os 3 primeiros e o resto) para os cards expandidos não deixarem buraco no
 * final da linha.
 *
 * @param {object} props
 * @param {Set<string>} props.openIds - Ids com o passo a passo aberto.
 * @param {(id: string) => void} props.onToggle - Alterna um card pelo id.
 */
function DesktopFlowGrid({ openIds, onToggle }) {
  const firstRow = INSTRUMENT_FLOWS.slice(0, 3)
  const remaining = INSTRUMENT_FLOWS.slice(3)

  return (
    <>
      <div className="w-full grid grid-cols-3 gap-[clamp(14px,2vw,28px)] mb-[clamp(14px,2vw,28px)] items-start">
        {firstRow.map((flow) => (
          <InstrumentFlowCard
            key={flow.id}
            {...flow}
            openIds={openIds}
            onToggle={onToggle}
            warningMessage={flow.id === 'acordo-pd&i' ? 'Minutas sujeitas a correção no SEI' : 'Documento sendo validado pela PGE'}
          />
        ))}
      </div>

      <div className="w-full grid grid-cols-3 gap-[clamp(14px,2vw,28px)] items-start">
        {remaining.map((flow) => (
          <InstrumentFlowCard
            key={flow.id}
            {...flow}
            openIds={openIds}
            onToggle={onToggle}
            warningMessage={flow.id === 'acordo-pd&i' ? 'Minutas sujeitas a correção no SEI' : 'Documento sendo validado pela PGE'}
          />
        ))}
      </div>
    </>
  )
}

// Borda ondulada que faz a transição para o fundo azul da seção de passo a
// passo. O path é decorativo e preenchido com a cor de fundo da própria seção.
function WavyTopEdge() {
  return (
    <svg
      viewBox="0 0 1440 50"
      preserveAspectRatio="none"
      className="w-full h-[36px] md:h-[44px] block"
      aria-hidden="true"
    >
      <path
        d="M0,25
           C 24,9 48,37 72,21
           C 96,5 120,33 144,17
           C 168,1 192,29 216,13
           C 240,33 264,1 288,21
           C 312,37 336,5 360,25
           C 384,9 408,37 432,17
           C 456,1 480,29 504,13
           C 528,33 552,1 576,21
           C 600,37 624,5 648,25
           C 672,9 696,33 720,17
           C 744,1 768,29 792,13
           C 816,33 840,1 864,21
           C 888,37 912,5 936,25
           C 960,9 984,33 1008,17
           C 1032,1 1056,29 1080,13
           C 1104,33 1128,1 1152,21
           C 1176,37 1200,5 1224,25
           C 1248,9 1272,33 1296,17
           C 1320,1 1344,29 1368,13
           C 1392,33 1416,1 1440,21
           L1440,50 L0,50 Z"
        fill="rgb(var(--brand-bg))"
      />
    </svg>
  )
}

/**
 * Seção "Passo a passo": lista empilhada no mobile, grade de 3 colunas no
 * desktop. É o alvo do scroll quando alguém clica num instrumento da trilha.
 *
 * O aviso vermelho só é passado no desktop — no mobile os cards não recebem
 * `warningMessage`, então o aviso do rodapé não aparece lá.
 *
 * @param {object} props
 * @param {boolean} props.isMobile - Escolhe entre lista empilhada e grade.
 * @param {Set<string>} props.openIds - Ids com o passo a passo aberto.
 * @param {(id: string) => void} props.onToggle - Alterna um card pelo id.
 */
function StepByStepSection({ isMobile, openIds, onToggle }) {
  return (
    <>
      <WavyTopEdge />
      <section
        id="passo-a-passo"
        className="bg-brand-bg py-[clamp(20px,3vw,40px)] pb-[clamp(32px,4vw,48px)] -mt-[1px] relative"
      >
        <div className="w-full px-[var(--page-gutter)]">
          <SectionBadge>Fluxos Internos dos Instrumentos</SectionBadge>

          <h2 className="font-semibold text-2xl text-ink-mid m-0 mt-3 leading-snug">
            Passo a passo de cada instrumento
          </h2>

          <p className="font-normal text-sm text-ink-mid mb-[clamp(20px,3vw,32px)] mt-1">
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
        </div>
      </section>
    </>
  )
}

// Rodapé com o copyright da SIA (o ano é calculado na renderização).
function PageFooter() {
  return (
    <footer className="text-center py-[clamp(20px,3vw,32px)] px-[var(--page-gutter)] text-[clamp(11px,1vw,14px)] text-gray-400 bg-[var(--page-bg)]">
      © {new Date().getFullYear()} Toolkit SIA - Secretaria de Inteligência Artificial,
      Economia Digital, Ciência, Tecnologia e Inovação
    </footer>
  )
}

// Página principal. Monta as seções na ordem e é o dono do estado `openIds` —
// o conjunto de ids de instrumento com o passo a passo aberto.
// Existem duas formas de abrir um card, com comportamentos diferentes de
// propósito: clicar num instrumento na trilha fecha todos os outros e rola até
// a seção; clicar no cabeçalho de um card só alterna aquele, então dá para
// deixar vários abertos e comparar.
export default function HomePage() {
  const isMobile = useIsMobile()
  const [openIds, setOpenIds] = useState(new Set())

  // Vindo da trilha ou do menu de grupos: deixa só este aberto e rola até ele.
  const handleInstrumentClick = useCallback((id) => {
    setOpenIds(new Set([id]))
    scrollToSection('passo-a-passo', SCROLL_DELAY_MS)
  }, [])

  // Vindo do cabeçalho do próprio card: abre/fecha sem mexer nos demais.
  const handleToggle = useCallback((id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="bg-[var(--page-bg)] w-full overflow-x-clip">
      {/* O header fica fora do wrapper de zoom, em tamanho original */}
      <GovHeader />

      <div style={{ zoom: PAGE_ZOOM, '--page-gutter': ZOOMED_PAGE_GUTTER }}>
        <IntroSection />
        <IdentificationSection />

        <section id="trilha-de-instrumentos" className="p-0 bg-[var(--page-bg)]">
          <div className="w-full">
            <ScaledFlowchartDecision onInstrumentClick={handleInstrumentClick} />
          </div>
        </section>

        <StepByStepSection isMobile={isMobile} openIds={openIds} onToggle={handleToggle} />
        <PageFooter />
      </div>
    </div>
  )
}

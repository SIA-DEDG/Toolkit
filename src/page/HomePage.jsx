import { useState, useCallback } from 'react'
import { ExternalLink, ArrowRight, Workflow, Search, ChevronDown, Contrast } from 'lucide-react'
import { INSTRUMENT_FLOWS } from '../data/instruments'
import { useIsMobile } from '../hooks/useIsMobile'
import { SectionBadge } from '../components/SectionBadge'
import { InstrumentFlowCard } from '../components/InstrumentFlowCard'
import { ScaledFlowchartDecision } from '../components/flowchart/ScaledFlowchartDecision'
import { INSTRUMENTS } from '../components/flowchart/TrilhaFlowchartDecision'

const SCROLL_DELAY_MS = 50

// Escala geral da página (1 = tamanho original do Figma). Ajuste para encolher/aumentar tudo.
const PAGE_ZOOM = 0.85

// Grupos de instrumentos exibidos como colunas coloridas na introdução (layout do Figma).
// Ordem das colunas (esquerda -> direita): Contratação, Parceria, Exploração.
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

// Métricas exibidas sobre a borda esquerda do card "Como usar este toolkit"
const TOOLKIT_STATS = [
  { value: '03', label: 'Grupos' },
  { value: '12', label: 'Instrumentos' },
]

// Rola suavemente até a seção indicada pelo id, com atraso opcional para aguardar re-renders
function scrollToSection(id, delay = 0) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, delay)
}

// Itens do menu institucional (barra azul do header)
const NAV_ITEMS = [
  { label: 'Início' },
  { label: 'Institucional', caret: true },
  { label: 'Notícias' },
  { label: 'Transparência', caret: true },
  { label: 'Relatórios', caret: true },
  { label: 'Links e Downloads', caret: true },
  { label: 'Fale Conosco' },
]

// Bandeiras (SVG simplificado — evita emoji, que no Windows não renderiza bandeira)
const FlagBR = () => (
  <svg width="22" height="15" viewBox="0 0 28 20" className="rounded-[2px]" aria-hidden="true">
    <rect width="28" height="20" fill="#009c3b" /><path d="M14 2l11 8-11 8L3 10z" fill="#ffdf00" /><circle cx="14" cy="10" r="4" fill="#002776" />
  </svg>
)
const FlagUS = () => (
  <svg width="22" height="15" viewBox="0 0 28 20" className="rounded-[2px]" aria-hidden="true">
    <rect width="28" height="20" fill="#fff" />
    <g fill="#b22234"><rect width="28" height="2.86" /><rect y="5.71" width="28" height="2.86" /><rect y="11.43" width="28" height="2.86" /><rect y="17.14" width="28" height="2.86" /></g>
    <rect width="12" height="11.43" fill="#3c3b6e" />
  </svg>
)
const FlagES = () => (
  <svg width="22" height="15" viewBox="0 0 28 20" className="rounded-[2px]" aria-hidden="true">
    <rect width="28" height="20" fill="#c60b1e" /><rect y="5" width="28" height="10" fill="#ffc400" />
  </svg>
)

// Cabeçalho institucional replicando o Figma, porém sem a logo do governo (período eleitoral)
function GovHeader() {
  return (
    <header className="w-full select-none">
      {/* Faixa de acessibilidade e idiomas */}
      <div className="bg-[#ececec] px-[clamp(16px,4vw,64px)] py-1.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md bg-white border border-black/15 flex items-center justify-center cursor-pointer" aria-label="Alternar contraste">
            <Contrast className="w-4 h-4 text-black" />
          </button>
          <button className="h-8 px-2.5 rounded-md bg-white border border-black/15 text-[13px] font-semibold text-black cursor-pointer" aria-label="Diminuir fonte">A-</button>
          <button className="h-8 px-2.5 rounded-md bg-white border border-black/15 text-[13px] font-semibold text-black cursor-pointer" aria-label="Aumentar fonte">A+</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#4a5568] whitespace-nowrap">
            Portal da transparência <span className="text-[#a0aec0]">|</span> Governo
          </span>
          <div className="flex items-center gap-1.5">
            <FlagUS /><FlagBR /><FlagES />
          </div>
        </div>
      </div>

      {/* Faixa branca: nome da secretaria, busca e login */}
      <div className="bg-white px-[clamp(16px,4vw,64px)] py-4 flex items-center justify-between gap-[clamp(16px,3vw,40px)] flex-wrap">
        <div className="text-[10px] font-bold leading-[1.35] text-[#1a3a6b] uppercase max-w-[230px] tracking-wide">
          Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação
          <span className="text-brand"> - SIA</span>
        </div>

        <div className="flex-1 min-w-[220px] max-w-[520px] flex items-stretch h-[46px] rounded-md border border-black/20 overflow-hidden">
          <input
            type="search"
            placeholder="Qual serviço você procura?"
            className="flex-1 min-w-0 px-4 text-[14px] text-ink-mid outline-none bg-white"
          />
          <button className="w-[70px] shrink-0 bg-[#0e8a12] flex items-center justify-center cursor-pointer" aria-label="Buscar">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        <button className="h-[46px] px-5 rounded-md bg-brand text-white font-semibold text-[15px] whitespace-nowrap cursor-pointer">
          Login Gov.Pi Cidadão
        </button>
      </div>

      {/* Barra de navegação */}
      <nav className="bg-brand">
        <ul className="flex items-center justify-center gap-[clamp(12px,2.5vw,44px)] flex-wrap px-4 min-h-[50px] py-2 m-0 list-none">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <span className="flex items-center gap-1 text-white text-[15px] font-medium cursor-pointer whitespace-nowrap hover:text-white/80 transition-colors">
                {item.label}
                {item.caret && <ChevronDown className="w-4 h-4" aria-hidden="true" />}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

// Coluna pastel de um grupo com a lista dos seus instrumentos (layout do Figma).
// O sizing vem do chamador: fixo (w-[179px]) no desktop, fluido no mobile.
function GroupColumn({ group, className = 'flex-1 min-w-[160px] max-w-[200px]' }) {
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
          const inst = INSTRUMENTS[key]
          const Icon = inst.icon
          return (
            <li key={key} className="flex items-start gap-2">
              <Icon className="w-4 h-4 shrink-0 mt-[1px]" style={{ color: group.color }} aria-hidden="true" />
              <span className="text-[13px] font-medium text-ink-mid leading-snug">{inst.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Pequeno cartão de métrica (ex.: "12 Instrumentos")
function StatCard({ stat, className = '' }) {
  return (
    <div className={`w-[115px] shrink-0 rounded-[10px] bg-[#c4deff] drop-shadow-[2px_2px_2.5px_rgba(0,0,0,0.25)] pt-[11px] pb-[13px] px-2 flex flex-col items-center gap-[5px] ${className}`}>
      <span className="font-semibold text-[30px] leading-none text-ink-mid">{stat.value}</span>
      <span className="w-full text-center text-[14px] font-light text-black leading-tight">{stat.label}</span>
    </div>
  )
}

// Vitrine dos grupos de instrumentos: colunas coloridas com os cartões "03" e "12"
// flutuando por cima (posição absoluta), como no Figma. Por serem flutuantes, não
// ocupam espaço na linha — as três colunas cabem sem quebrar.
function HowToCard() {
  return (
    <div className="w-full md:w-[893px] md:flex-none relative">
      {/* Desktop: composição de geometria fixa do Figma (caixas 220px, gap 23px,
          vão esquerdo 98px + direito 89px). Os cartões são ancorados às colunas de
          ponta — 03 na base da 1ª, 12 no topo da última — sobrepondo só a faixa de
          padding (17px esq / 26px dir), independente da ordem e da altura das caixas. */}
      <div className="hidden md:block relative pl-[98px]">
        <div className="flex gap-[23px] items-start">
          {TOOLKIT_GROUPS.map((group, index) => (
            <div key={group.name} className="relative">
              <GroupColumn group={group} className="w-[220px] flex-none" />

              {/* "03 Grupos": saltando da quina inferior-esquerda da coluna
                  "Contratação pública" (espelhando o "12" no topo-direito) */}
              {group.name === 'Contratação pública' && (
                <div className="absolute left-[-89px] bottom-[-52px] z-10">
                  <StatCard stat={TOOLKIT_STATS[0]} />
                </div>
              )}

              {/* "12 Instrumentos": encostado no topo-direito da última coluna */}
              {index === TOOLKIT_GROUPS.length - 1 && (
                <div className="absolute right-[-89px] top-[-33px] z-10">
                  <StatCard stat={TOOLKIT_STATS[1]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: empilhado e fluido, sem px fixo — não estoura o overflow-x-clip */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="flex gap-3 justify-center">
          <StatCard stat={TOOLKIT_STATS[0]} />
          <StatCard stat={TOOLKIT_STATS[1]} />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {TOOLKIT_GROUPS.map((group) => (
            <GroupColumn key={group.name} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Texto institucional do toolkit à esquerda e card "Como usar" à direita
function IntroSection() {
  return (
    <div className="max-w-[1440px] mx-auto py-[clamp(28px,4vw,56px)] px-[clamp(10px,1vw,66px)] flex gap-[clamp(24px,4vw,56px)] flex-wrap items-start">
      <div className="flex-[1_1_360px] max-w-[560px] flex flex-col gap-[35px]">
        <h1 className="font-semibold text-[clamp(22px,2.5vw,30px)] text-ink-mid m-0 leading-tight">
          Toolkit de Compras Públicas
        </h1>
        <p className="font-normal text-[clamp(13px,1.1vw,16px)] text-black leading-[1.35] m-0 text-justify">
          O Toolkit de Compras Públicas reúne modelos de contratos, acordos e outros instrumentos jurídicos para apoiar a implementação do Marco Legal de Ciência, Tecnologia e Inovação no Piauí.
          <br />
          <br />
          A ferramenta foi criada para fortalecer as compras públicas de inovação e orientar o uso de alternativas legais voltadas a atividades de pesquisa, desenvolvimento e inovação, contribuindo para mais segurança jurídica na aplicação desses instrumentos.
          <br />
          <br />
          Os modelos foram elaborados pela Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação (SIA) e pela Procuradoria Geral do Estado (PGE).
        </p>
      </div>

      <HowToCard />
    </div>
  )
}

// Card de triagem translúcido sobre a faixa azul da seção de identificação
function IdentificationCard({ title, description, action }) {
  return (
    <div className="flex-1 min-w-[300px] bg-white/20 rounded-lg p-3 flex flex-col gap-3">
      <p
        className="font-semibold text-[16px] text-white text-justify m-0 leading-snug min-h-[2.75em]"
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
  'inline-flex items-center justify-center gap-1.5 rounded-full h-[31px] px-4 text-white font-medium text-[14px] no-underline border-none cursor-pointer'
const GRADIENT_BTN_STYLE = { background: 'linear-gradient(90deg, #042d63 0%, #0e50a6 80%)' }

// Seção de triagem: faixa azul com dois caminhos (quiz externo da CPIN ou trilha interna)
function IdentificationSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(99deg, #0e50a6 39%, #042d63 96%)' }}
    >
      {/* Brilho decorativo */}
      <div
        className="pointer-events-none absolute -left-40 top-0 w-[543px] h-[435px] opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(101,97,247,0.45) 0%, rgba(101,97,247,0) 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto py-[clamp(28px,4vw,56px)] px-[clamp(10px,1vw,66px)]">
        <div className="inline-flex items-center gap-1.5 bg-brand-light rounded-full h-[28px] pl-2 pr-2.5">
          <Workflow className="w-5 h-5 text-ink-mid shrink-0" />
          <span className="font-medium text-[14px] text-ink-mid">Triagem de Identificação</span>
        </div>

        <h2 className="font-semibold text-[clamp(20px,2vw,24px)] text-white mt-4 mb-6">
          Identificação
        </h2>

        <div className="flex gap-[clamp(20px,4vw,70px)] flex-wrap">
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

// Grid desktop de cards de instrumentos em duas linhas para evitar espaço vazio no final
function DesktopFlowGrid({ openIds, onToggle }) {
  const firstRow = INSTRUMENT_FLOWS.slice(0, 3)
  const remaining = INSTRUMENT_FLOWS.slice(3)

  return (
    <>
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[clamp(14px,2vw,20px)] mb-[clamp(14px,2vw,20px)] items-start">
        {firstRow.map((flow) => (
          <InstrumentFlowCard
            key={flow.id}
            {...flow}
            openIds={openIds}
            onToggle={onToggle}
            msg={flow.id === 'acordo-pd&i' ? 'Minutas sujeitas a correção no SEI' : 'Documento sendo validado pela PGE'}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[clamp(14px,2vw,20px)] items-start">
        {remaining.map((flow) => (
          <InstrumentFlowCard 
          key={flow.id} 
          {...flow} 
          openIds={openIds} 
          onToggle={onToggle} 
          msg={flow.id === 'acordo-pd&i' ? 'Minutas sujeitas a correção no SEI' : 'Documento sendo validado pela PGE'}  
        />
        ))}
      </div>
    </>
  )
}

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
        fill="#E3EFFF"
      />
    </svg>
  )
}

// Seção expandível com o passo a passo de cada instrumento, responsiva para mobile e desktop
function StepByStepSection({ isMobile, openIds, onToggle }) {
  return (
    <>
      <WavyTopEdge />
      <section
        id="passo-a-passo"
        className="bg-brand-bg py-[clamp(20px,3vw,40px)] pb-[clamp(32px,4vw,48px)] -mt-[1px] relative"
      >
        <div className="max-w-[1440px] mx-auto px-[clamp(10px,1vw,66px)]">
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

// Rodapé com copyright da SIA
function PageFooter() {
  return (
    <footer className="text-center py-[clamp(20px,3vw,32px)] px-4 text-[clamp(11px,1vw,14px)] text-gray-400 bg-white">
      © {new Date().getFullYear()} Toolkit SIA - Secretaria de Inteligência Artificial,
      Economia Digital, Ciência, Tecnologia e Inovação
    </footer>
  )
}

// Página principal: compõe todas as seções e gerencia qual card de instrumento está aberto
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
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="bg-white w-full overflow-x-clip">
      {/* Header em tamanho original (fora do zoom da página) */}
      <GovHeader />

      {/* Restante da página com a escala reduzida */}
      <div style={{ zoom: PAGE_ZOOM }}>
        <IntroSection />
        <IdentificationSection />

        <section id="trilha-de-instrumentos" className="p-0 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <ScaledFlowchartDecision onInstrumentClick={handleInstrumentClick} />
          </div>
        </section>

        <StepByStepSection isMobile={isMobile} openIds={openIds} onToggle={handleToggle} />
        <PageFooter />
      </div>
    </div>
  )
}
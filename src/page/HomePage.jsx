import { Handshake, Cpu, ShoppingCart, RefreshCw, Workflow, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import DownloadButton from '../components/DownloadButton'

const heroBannerSrc = 'https://www.figma.com/api/mcp/asset/29bd93f3-7cdc-4145-96a7-cc8a6fddefbe'

// ── Instrument flow data ────────────────────────────────────────────────────

const INSTRUMENT_FLOWS = [
  {
    id: 'encomenda-tecnologica',
    title: 'Encomenda Tecnológica',
    subtitle: 'Lei nº 10.973/2004 · Instrumento A',
    href: '/encomenda-tecnologica',
    accentColor: '#e05252',
    icon: Cpu,
    cards: [
      { title: 'Necessidade do órgão', description: 'Identificação do problema que requer solução tecnológica inédita.' },
      { title: 'Formalização da Demanda', description: 'Abertura de processo via SEI e manifestação técnica do NIT.', fileKey: 'encomenda-tecnologica/1. Documento_Formalizacao_Demanda_PDI.docx', downloadLabel: 'Manifestação NIT' },
      { title: 'Plano de Trabalho', description: 'Definição do plano e bases do acordo com a instituição parceira.', fileKey: 'encomenda-tecnologica/Modelo_Plano_de_Trabalho_PDI.docx' },
      { title: 'Acordo / Contrato', description: 'Autorização pela Comissão de Gestão — CGFR.', fileKey: 'encomenda-tecnologica/5. Minuta_Contrato_Transferencia_Tecnologia.docx' },
      { title: 'Autorizações', description: 'SEAD · SEFAZ · PGE', downloadLabel: 'Baixar Documentos' },
    ],
  },
  {
    id: 'acordo-pd&i',
    title: 'Acordo de Parceria PD&I',
    subtitle: 'Sem repasse financeiro · Instrumento B',
    href: '/acordo-pd&i',
    accentColor: '#7c3aed',
    icon: Handshake,
    cards: [
      { title: 'Necessidade do órgão', description: 'Identificação de necessidade sem repasse de recurso público.' },
      { title: 'Formalização da Demanda', description: 'Abertura de processo SEI pelos gabinetes do órgão e da instituição.' },
      { title: 'Plano de Trabalho', description: 'Elaboração conjunta com cronograma e entregas definidas.', fileKey: 'acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx' },
      { title: 'Assinatura do Acordo', description: 'Assinatura pelas partes e registro no SEI.', fileKey: 'acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx' },
    ],
  },
  {
    id: 'convenio-pd&i',
    title: 'Convênio de PD&I',
    subtitle: 'Com repasse financeiro · Instrumento C',
    href: '/convenio-pd&i',
    accentColor: '#3b82f6',
    icon: Handshake,
    cards: [
      { title: 'Manifestação Técnica / NIT', description: 'Enquadramento jurídico da parceria com análise de titularidade da PI.', fileKey: 'convenio-pd&i/Manifestacao_Tecnica_PDI.docx' },
      { title: 'Formalização da Demanda', description: 'Processo SEI com todos os participantes e documentação base.' },
      { title: 'Plano de Trabalho', description: 'Cronograma, metas e plano de trabalho do acordo.', fileKey: 'convenio-pd&i/Modelo_Plano_de_Trabalho_PDI.docx' },
      { title: 'Autorização CGFR', description: 'Autorização com participação financeira do ente público.', fileKey: 'convenio-pd&i/Planilha_Custos_Operacionais_PDI.xlsx' },
      { title: 'Autorizações', description: 'SEAD · SEFAZ · PGE — verificação de mudança de fase.', downloadLabel: 'Baixar Documentos' },
    ],
  },
  {
    id: 'contratacao-direta',
    title: 'Contratação Direta',
    subtitle: 'Dispensa / Inexigibilidade · Instrumento D',
    href: '/contratacao-direta',
    accentColor: '#16a34a',
    icon: ShoppingCart,
    cards: [
      { title: 'Justificativa técnica', description: 'Elaboração da justificativa de dispensa ou inexigibilidade.' },
      { title: 'Pesquisa de preços', description: 'Levantamento de valores de mercado ou cotação junto às ICTs.' },
      { title: 'Instrução do processo SEI', description: 'Montagem do processo com todos os documentos exigidos.', fileKey: 'contratacao-direta/6. Termo_de_Referencia.docx' },
      { title: 'Autorização e assinatura', description: 'Assinatura pelo ordenador de despesa e publicação no Diário Oficial.' },
    ],
  },
  {
    id: 'contrato-transferencia-tecnologia',
    title: 'Transferência Tecnológica',
    subtitle: 'Know-how interno · Instrumento E',
    href: '/contrato-transferencia-tecnologia',
    accentColor: '#ea580c',
    icon: RefreshCw,
    cards: [
      { title: 'Identificação do know-how', description: 'Mapeamento da tecnologia e do detentor do conhecimento técnico.' },
      { title: 'Acordo de confidencialidade', description: 'Assinatura de NDA e definição dos termos de proteção da PI.', downloadLabel: 'Modelo NDA' },
      { title: 'Contrato de transferência', description: 'Formalização com cláusulas de sublicença, royalties e prazos.', fileKey: 'contrato-transferencia-tecnologia/5. Minuta_Contrato_Transferencia_Tecnologia.docx' },
      { title: 'Capacitação e implementação', description: 'Execução do plano de capacitação e integração da tecnologia.' },
    ],
  },
]

// ── Shared components ────────────────────────────────────────────────────────

function SectionBadge({ children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#bee3f8', borderRadius: 20, height: 30, padding: '0 10px' }}>
      <Workflow style={{ width: 18, height: 18, color: '#2a4365', flexShrink: 0 }} />
      <span style={{ fontWeight: 500, fontSize: 13, color: '#2a4365' }}>{children}</span>
    </div>
  )
}

function navigate(href) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

// ── InstrumentFlowCard ───────────────────────────────────────────────────────

function StepItem({ card, accentColor, isLast }) {
  const hasDownload = !!(card.fileKey || card.downloadLabel)
  return (
    <div style={{ display: 'flex', gap: 10, padding: '0 16px' }}>
      {/* Timeline column: dot + vertical line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 10, flexShrink: 0, paddingTop: 14 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
        {!isLast && (
          <div style={{ width: 2, flex: 1, background: accentColor, opacity: 0.25, marginTop: 4 }} />
        )}
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 0', paddingBottom: isLast ? 10 : 16 }}>
        <span style={{ fontWeight: 600, fontSize: 12, color: '#1a202c', lineHeight: 1.4, textAlign: 'left' }}>{card.title}</span>
        {card.description && (
          <span style={{ fontWeight: 400, fontSize: 11, color: '#718096', lineHeight: 1.5, textAlign: 'left' }}>{card.description}</span>
        )}
        {hasDownload && (
          <div style={{ marginTop: 2 }}>
            <DownloadButton fileKey={card.fileKey} label={card.downloadLabel || 'Baixar Documento'} />
          </div>
        )}
      </div>
    </div>
  )
}

function InstrumentFlowCard({ accentColor, icon: Icon, title, subtitle, href, cards }) {
  const [collapsed, setCollapsed] = useState(false)
  const iconBg = 'rgba(255,255,255,0.25)'

  return (
    <div style={{
      background: 'white',
      borderRadius: 12,
      boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
    }}>
      {/* Colored header */}
      <div style={{ background: accentColor, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ background: iconBg, padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon style={{ width: 18, height: 18, color: 'white' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: 'white', margin: 0, lineHeight: 1.3, textAlign: 'left' }}>{title}</p>
          <p style={{ fontWeight: 400, fontSize: 10, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.4, textAlign: 'left' }}>{subtitle}</p>
        </div>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 6, padding: '3px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          title={collapsed ? 'Expandir' : 'Compactar'}
        >
          {collapsed
            ? <ChevronDown style={{ width: 14, height: 14, color: 'white' }} />
            : <ChevronUp   style={{ width: 14, height: 14, color: 'white' }} />
          }
        </button>
      </div>

      {/* Steps list — hidden when collapsed */}
      {!collapsed && (
        <>
          <div style={{ overflowY: 'auto', maxHeight: 360 }}>
            {cards.map((card, i) => (
              <StepItem key={i} card={card} accentColor={accentColor} isLast={i === cards.length - 1} />
            ))}
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #e8f0fe', padding: '8px 14px', display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={() => navigate(href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12, color: accentColor, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
            >
              Ver fluxo completo <span>→</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── InstrumentCard (used inside the flowchart) ───────────────────────────────

function InstrumentCard({ accentColor, iconBg, Icon, title, description, width = 201, height = 134 }) {
  return (
    <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 4px 4px rgba(0,0,0,0.25)', width, height, overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ height: 6, background: accentColor, borderRadius: '10px 10px 0 0' }} />
      <div style={{ padding: '6px 13px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontWeight: 500, fontSize: 9, color: 'black', margin: 0, lineHeight: 'normal', letterSpacing: '0.05em' }}>INSTRUMENTO</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ background: iconBg, padding: 3, borderRadius: 4, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon style={{ width: 16, height: 16 }} />
          </div>
          <p style={{ fontWeight: 600, fontSize: 14, color: accentColor, lineHeight: 'normal', margin: 0 }}>{title}</p>
          <p style={{ fontWeight: 300, fontSize: 10, color: 'black', lineHeight: 1.4, margin: 0 }}>{description}</p>
        </div>
      </div>
    </div>
  )
}

function DecisionBox({ width, height, text, bg = '#d9d9d9' }) {
  return (
    <div style={{ background: bg, borderRadius: 8, width, height, padding: 8, display: 'flex', alignItems: 'center' }}>
      <p style={{ fontWeight: 600, fontSize: 12, color: 'black', lineHeight: 1.3, margin: 0 }}>{text}</p>
    </div>
  )
}

// line: 'right' | 'left' | 'up'
function StepCircle({ number, color, line = 'right' }) {
  const circle = (
    <div style={{ position: 'relative', width: 50, height: 50, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #bee3f8', background: 'white' }} />
      <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: `2px solid ${color}` }} />
      <span style={{ position: 'relative', fontWeight: 600, fontSize: 20, color, lineHeight: 1 }}>{number}</span>
    </div>
  )
  const connectorWidth  = line === 'up' ? 2 : line === 'left' ? 16 : 31
  const connectorHeight = line === 'up' ? 31 : 2
  const connector = <div style={{ width: connectorWidth, height: connectorHeight, background: color, opacity: 0.5, flexShrink: 0 }} />
  if (line === 'right') return <div style={{ display: 'flex', alignItems: 'center' }}>{circle}{connector}</div>
  if (line === 'left')  return <div style={{ display: 'flex', alignItems: 'center' }}>{connector}{circle}</div>
  if (line === 'up')    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{connector}{circle}</div>
  return circle
}

// ── TrilhaFlowchart ──────────────────────────────────────────────────────────

function TrilhaFlowchart() {
  return (
    <div style={{ position: 'relative', width: 1440, height: 820, overflow: 'visible' }}>

      {/* Header — top left */}
      <div style={{ position: 'absolute', left: 43, top: 20, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionBadge>Trilha de Instrumentos</SectionBadge>
        <h2 style={{ fontWeight: 600, fontSize: 24, color: '#2a4365', margin: 0, lineHeight: 1.25 }}>
          Trilha de Instrumentos
        </h2>
        <p style={{ fontWeight: 400, fontSize: 14, color: '#2a4365', margin: 0 }}>
          Descrição da etapa de identificação
        </p>
      </div>

      {/* Curved snake path */}
      <svg
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 1440 766"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="
            M 1051 0
            L 1051 255
            A 50 50 0 0 1 1001 305
            L 430 305
            A 50 50 0 0 0 380 355
            L 380 490
            A 50 50 0 0 0 430 540
            L 770 540
            A 50 50 0 0 1 820 590
            L 820 820
          "
          stroke="#E3EFFF"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Row 1: Convênio · Haverá repasse · Acordo */}
      <div style={{ position: 'absolute', left: 710, top: 74, zIndex: 1 }}>
        <InstrumentCard accentColor="#209828" iconBg="rgba(32,152,40,0.2)" Icon={Handshake} title="Convênio" description="(Falta o texto)" />
      </div>

      <div style={{ position: 'absolute', left: 930, top: 100, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 12, color: '#0e59a8', marginLeft: 47, marginBottom: 2 }}>Sim</span>
        <StepCircle number="1" color="#209828" line="right" />
      </div>

      <div style={{ position: 'absolute', left: 1010, top: 97, zIndex: 1 }}>
        <DecisionBox width={80} height={80} text="Haverá repasse de recursos públicos" bg="#E3EFFF" />
      </div>

      <div style={{ position: 'absolute', left: 1090, top: 100, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ fontSize: 12, color: '#0e59a8', marginRight: 47, marginBottom: 2 }}>Não</span>
        <StepCircle number="2" color="#a8250e" line="left" />
      </div>

      <div style={{ position: 'absolute', left: 1190, top: 74, zIndex: 1 }}>
        <InstrumentCard accentColor="#a8250e" iconBg="rgba(168,37,14,0.2)" Icon={Handshake} title="Acordo" description="(Falta o texto)" />
      </div>

      {/* Row 2: Existe Risco · Há possibilidade · Contratação Direta */}
      <div style={{ position: 'absolute', left: 795, top: 346, zIndex: 1 }}>
        <StepCircle number="3" color="#0e59a8" line="up" />
      </div>

      <div style={{ position: 'absolute', left: 770, top: 291, zIndex: 1 }}>
        <DecisionBox width={96} height={69} text="Existe Risco Tecnológico?" bg="#E3EFFF" />
      </div>

      <div style={{ position: 'absolute', left: 244, top: 307, zIndex: 1 }}>
        <StepCircle number="4" color="#dbaf00" line="right" />
      </div>

      <div style={{ position: 'absolute', left: 325, top: 288, zIndex: 1 }}>
        <DecisionBox width={117} height={80} text="Há possibilidade de contratação Direta?" bg="#E3EFFF" />
      </div>

      <div style={{ position: 'absolute', left: 29, top: 290, zIndex: 1 }}>
        <InstrumentCard accentColor="#dbaf00" iconBg="rgba(219,175,0,0.2)" Icon={ShoppingCart} title="Contratação Direta" description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico" height={151} />
      </div>

      <div style={{ position: 'absolute', left: 859, top: 376, zIndex: 1 }}>
        <InstrumentCard accentColor="#0e59a8" iconBg="rgba(14,89,168,0.2)" Icon={Cpu} title="Encomenda Tecnológica" description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico" height={151} />
      </div>

      {/* Vertical: Não sei · Transferência */}
      <div style={{ position: 'absolute', left: 563, top: 539, zIndex: 1 }}>
        <DecisionBox width={80} height={80} text="Não sei qual a pergunta" bg="#E3EFFF" />
      </div>

      <div style={{ position: 'absolute', left: 578, top: 619, zIndex: 1 }}>
        <StepCircle number="5" color="#6a0ea8" line="up" />
      </div>

      <div style={{ position: 'absolute', left: 366, top: 650, zIndex: 1 }}>
        <InstrumentCard accentColor="#6a0ea8" iconBg="rgba(106,14,168,0.2)" Icon={RefreshCw} title="Transferência Tecnológica não patenteada" description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico" width={204} height={151} />
      </div>
    </div>
  )
}

const FLOWCHART_WIDTH  = 1440
const FLOWCHART_HEIGHT = 820

function ScaledFlowchart() {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setScale(Math.min(1, w / FLOWCHART_WIDTH))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', height: FLOWCHART_HEIGHT * scale }}>
      <div style={{ width: FLOWCHART_WIDTH, transformOrigin: 'top left', transform: `scale(${scale})` }}>
        <TrilhaFlowchart />
      </div>
    </div>
  )
}

// ── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: 'white', width: '100%', overflowX: 'hidden' }}>

      {/* Hero image */}
      <div style={{ width: '100%', height: 'clamp(140px, 16vw, 230px)', overflow: 'hidden' }}>
        <img
          src={heroBannerSrc}
          alt="Banner Toolkit de Inovação"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Intro text */}
      <div style={{ padding: 'clamp(28px, 4vw, 56px) clamp(20px, 5vw, 66px)' }}>
        <div className="intro-text-box">
          <h1 style={{ fontWeight: 600, fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#2a4365', margin: 0, lineHeight: 1.25 }}>
            Toolkit de Inovação
          </h1>
          <p style={{ fontWeight: 300, fontSize: 'clamp(13px, 1.1vw, 16px)', color: 'black', textAlign: 'justify', lineHeight: 1.7, margin: 0 }}>
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
      </div>

      {/* Identificação section */}
      <section style={{ background: '#e3efff', padding: 'clamp(20px, 3vw, 40px) clamp(20px, 5vw, 66px)' }}>
        <SectionBadge>Triagem de Identificação</SectionBadge>

        <h2 style={{ fontWeight: 600, fontSize: 'clamp(18px, 2vw, 24px)', color: '#2a4365', margin: 'clamp(12px, 2vw, 20px) 0 clamp(16px, 2.5vw, 28px)' }}>
          Identificação
        </h2>

        <div style={{ display: 'flex', gap: 'clamp(16px, 2vw, 32px)', flexWrap: 'wrap' }}>
          {/* Card 1 */}
          <div style={{ flex: '1 1 260px', maxWidth: 600, background: '#0e59a8', borderRadius: 8, padding: 'clamp(14px, 2vw, 20px)', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 14px)' }}>
            <p style={{ fontWeight: 600, fontSize: 'clamp(11px, 1vw, 13px)', color: 'white', textAlign: 'justify', margin: 0, lineHeight: 1.4 }}>
              Sabe qual procedimento e instrumento quer utilizar para inovação?
            </p>
            <p style={{ fontWeight: 300, fontSize: 'clamp(10px, 0.9vw, 12px)', color: '#e6e6e6', textAlign: 'justify', margin: 0, flex: 1, lineHeight: 1.5 }}>
              Na trilha possuem 5 instrumentos independentes e ...........
            </p>
            <button
              style={{ width: 'clamp(130px, 12vw, 160px)', height: 34, background: '#116ed0', borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={() => document.getElementById('trilha-de-instrumentos').scrollIntoView({ behavior: 'smooth' })}
            >
              <span style={{ fontWeight: 500, fontSize: 13, color: 'white' }}>Siga a Trilha</span>
              <ExternalLink style={{ width: 14, height: 14, color: 'white', flexShrink: 0 }} />
            </button>
          </div>

          {/* Card 2 */}
          <div style={{ flex: '1 1 260px', maxWidth: 600, background: '#0e59a8', borderRadius: 8, padding: 'clamp(14px, 2vw, 20px)', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 14px)' }}>
            <p style={{ fontWeight: 600, fontSize: 'clamp(11px, 1vw, 13px)', color: 'white', textAlign: 'justify', margin: 0, lineHeight: 1.4 }}>
              Precisa entender a solução mais apropriada para o seu desafio e qual o instrumento mais adequado para a contratação?
            </p>
            <p style={{ fontWeight: 300, fontSize: 'clamp(10px, 0.9vw, 12px)', color: '#e6e6e6', textAlign: 'justify', margin: 0, flex: 1, lineHeight: 1.5 }}>
              O link abaixo da inovacpin contém uma trilha de planejamento e um quiz para lhe direcionar em qual seria o instrumento de inovação.
            </p>
            <a
              href="https://inovacpin.org/trilha/planejamento/etapa/8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 'clamp(130px, 12vw, 160px)', height: 34, background: '#116ed0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none' }}
            >
              <span style={{ fontWeight: 500, fontSize: 13, color: 'white' }}>Acessar Material</span>
              <ExternalLink style={{ width: 14, height: 14, color: 'white', flexShrink: 0 }} />
            </a>
          </div>
        </div>
      </section>

      {/* Trilha de Instrumentos */}
      <section id="trilha-de-instrumentos" style={{ padding: 0 }}>
        <ScaledFlowchart />
      </section>

      {/* Passo a passo section */}
      <section id="passo-a-passo" style={{ background: '#f0f4f8', padding: 'clamp(20px, 3vw, 40px) clamp(20px, 4vw, 40px) clamp(32px, 4vw, 48px)' }}>
        <SectionBadge>Fluxos de Internos</SectionBadge>

        <h2 style={{ fontWeight: 600, fontSize: 'clamp(18px, 2vw, 24px)', color: '#2a4365', margin: 'clamp(12px, 2vw, 20px) 0 clamp(6px, 1vw, 10px)' }}>
          Passo a passo de cada instrumento
        </h2>

        <p style={{ fontWeight: 300, fontSize: 'clamp(14px, 1.4vw, 18px)', color: '#2a4365', margin: '0 0 clamp(20px, 3vw, 32px)' }}>
          Selecione um Instrumento e explore seu fluxo
        </p>

        {/* First row: 3 cards */}
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(14px, 2vw, 20px)', marginBottom: 'clamp(14px, 2vw, 20px)', alignItems: 'start' }}>
          {INSTRUMENT_FLOWS.slice(0, 3).map((flow) => (
            <InstrumentFlowCard key={flow.id} {...flow} />
          ))}
        </div>

        {/* Second row: 2 cards centered */}
        <div style={{ maxWidth: 810, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(14px, 2vw, 20px)', alignItems: 'start' }}>
          {INSTRUMENT_FLOWS.slice(3).map((flow) => (
            <InstrumentFlowCard key={flow.id} {...flow} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: 'clamp(20px, 3vw, 32px) 16px', fontSize: 'clamp(11px, 1vw, 14px)', color: '#9ca3af', background: 'white' }}>
        © {new Date().getFullYear()} Toolkit SIA — Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação
      </footer>

    </div>
  )
}

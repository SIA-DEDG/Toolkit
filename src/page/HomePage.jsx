import { Handshake, Cpu, ShoppingCart, RefreshCw, Workflow, ExternalLink } from 'lucide-react'
import FlowCard from '../components/FlowCard'

const heroBannerSrc = 'https://www.figma.com/api/mcp/asset/29bd93f3-7cdc-4145-96a7-cc8a6fddefbe'

const flows = [
  { title: 'Encomenda Tecnológica', description: 'Fluxo do processo de Encomenda Tecnológica', href: '/encomenda-tecnologica', icon: <Cpu className="h-5 w-5" /> },
  { title: 'Acordo PD&I', description: 'Fluxo do processo de Acordo de Parceria para PDI', href: '/acordo-pd&i', icon: <Handshake className="h-5 w-5" /> },
  { title: 'Convênio PD&I', description: 'Fluxo do processo de Convênio para PDI', href: '/convenio-pd&i', icon: <Handshake className="h-5 w-5" /> },
  { title: 'Contratação Direta', description: 'Fluxo do processo de Contratação Direta', href: '/contratacao-direta', icon: <ShoppingCart className="h-5 w-5" /> },
  { title: 'Contrato de Transferência de Tecnologia', description: 'Fluxo do processo de Contrato de Transferência de Tecnologia', href: '/contrato-transferencia-tecnologia', icon: <RefreshCw className="h-5 w-5" /> },
]

function SectionBadge({ children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#bee3f8', borderRadius: 20, height: 30, padding: '0 10px' }}>
      <Workflow style={{ width: 18, height: 18, color: '#2a4365', flexShrink: 0 }} />
      <span style={{ fontWeight: 500, fontSize: 13, color: '#2a4365' }}>{children}</span>
    </div>
  )
}

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
      <p style={{ fontWeight: 600, fontSize: 12, color: '#0e59a8', lineHeight: 1.3, margin: 0 }}>{text}</p>
    </div>
  )
}

// line: 'right' | 'left' | 'up' — connector line direction
function StepCircle({ number, color, line = 'right' }) {
  const circle = (
    <div style={{ position: 'relative', width: 50, height: 50, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #bee3f8', background: 'white' }} />
      <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: `2px solid ${color}` }} />
      <span style={{ position: 'relative', fontWeight: 600, fontSize: 20, color, lineHeight: 1 }}>{number}</span>
    </div>
  )
  const connector = <div style={{ width: line === 'up' ? 2 : 31, height: line === 'up' ? 31 : 2, background: color, opacity: 0.5, flexShrink: 0 }} />
  if (line === 'right') return <div style={{ display: 'flex', alignItems: 'center' }}>{circle}{connector}</div>
  if (line === 'left')  return <div style={{ display: 'flex', alignItems: 'center' }}>{connector}{circle}</div>
  if (line === 'up')    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{connector}{circle}</div>
  return circle
}

function TrilhaFlowchart() {
  return (
    <div style={{ position: 'relative', width: 1440, height: 766, overflow: 'visible' }}>

      {/* Header text — top left */}
      <div style={{ position: 'absolute', left: 43, top: 20, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionBadge>Trilha de Instrumentos</SectionBadge>
        <h2 style={{ fontWeight: 600, fontSize: 24, color: '#2a4365', margin: 0, lineHeight: 1.25 }}>
          Trilha de Instrumentos
        </h2>
        <p style={{ fontWeight: 400, fontSize: 14, color: '#2a4365', margin: 0 }}>
          Descrição da etapa de identificação
        </p>
      </div>

      {/* Curved snake path SVG */}
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
            L 1051 145
            L 1187.5 145
            A 62.5 62.5 0 0 1 1187.5 270
            L 312.5 270
            A 62.5 62.5 0 0 0 312.5 395
            L 505.5 395
            A 62.5 62.5 0 0 1 568 457.5
            L 568 766
          "
          stroke="#bee3f8"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Row 1: Convênio · Haverá repasse · Acordo ──────────────────── */}

      <div style={{ position: 'absolute', left: 697, top: 74, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#209828"
          iconBg="rgba(32,152,40,0.2)"
          Icon={Handshake}
          title="Convênio"
          description="(Falta o texto)"
        />
      </div>

      <div style={{ position: 'absolute', left: 912, top: 117, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 12, color: '#0e59a8', marginLeft: 58, marginBottom: 2 }}>Sim</span>
        <StepCircle number="1" color="#209828" line="right" />
      </div>

      <div style={{ position: 'absolute', left: 1004, top: 97, zIndex: 1 }}>
        <DecisionBox width={80} height={80} text="Haverá repasse de recursos públicos" bg="#e3e3e3" />
      </div>

      <div style={{ position: 'absolute', left: 1093, top: 117, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ fontSize: 12, color: '#0e59a8', marginRight: 58, marginBottom: 2 }}>Não</span>
        <StepCircle number="3" color="#a8250e" line="left" />
      </div>

      <div style={{ position: 'absolute', left: 1188, top: 74, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#a8250e"
          iconBg="rgba(168,37,14,0.2)"
          Icon={Handshake}
          title="Acordo"
          description="(Falta o texto)"
        />
      </div>

      {/* ── Row 2: Existe Risco · Há possibilidade · Contratação Direta ── */}

      <div style={{ position: 'absolute', left: 795, top: 346, zIndex: 1 }}>
        <StepCircle number="3" color="#0e59a8" line="up" />
      </div>

      <div style={{ position: 'absolute', left: 770, top: 280, zIndex: 1 }}>
        <DecisionBox width={96} height={69} text="Existe Risco Tecnológico?" />
      </div>

      <div style={{ position: 'absolute', left: 244, top: 307, zIndex: 1 }}>
        <StepCircle number="4" color="#dbaf00" line="right" />
      </div>

      <div style={{ position: 'absolute', left: 325, top: 292, zIndex: 1 }}>
        <DecisionBox width={117} height={80} text="Há possibilidade de contratação Direta?" />
      </div>

      <div style={{ position: 'absolute', left: 29, top: 211, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#dbaf00"
          iconBg="rgba(219,175,0,0.2)"
          Icon={ShoppingCart}
          title="Contratação Direta"
          description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico"
          height={151}
        />
      </div>

      <div style={{ position: 'absolute', left: 859, top: 286, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#0e59a8"
          iconBg="rgba(14,89,168,0.2)"
          Icon={Cpu}
          title="Encomenda Tecnológica"
          description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico"
          height={151}
        />
      </div>

      {/* ── Vertical: Não sei · Transferência ───────────────────────────── */}

      <div style={{ position: 'absolute', left: 563, top: 412, zIndex: 1 }}>
        <DecisionBox width={80} height={80} text="Não sei qual a pergunta" />
      </div>

      <div style={{ position: 'absolute', left: 578, top: 490, zIndex: 1 }}>
        <StepCircle number="5" color="#6a0ea8" line="up" />
      </div>

      <div style={{ position: 'absolute', left: 366, top: 509, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#6a0ea8"
          iconBg="rgba(106,14,168,0.2)"
          Icon={RefreshCw}
          title="Transferência Tecnológica não patenteada"
          description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico"
          width={204}
          height={151}
        />
      </div>

      <div style={{ position: 'absolute', left: 43, top: 136, background: '#d9d9d9', width: 91, height: 38, borderRadius: 4, padding: '4px 6px', zIndex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 12, color: 'black', margin: 0 }}>5</p>
        <p style={{ fontWeight: 600, fontSize: 12, color: 'black', margin: 0 }}>Instrumentos</p>
      </div>

    </div>
  )
}

export default function HomePage() {
  return (
    <div style={{ background: 'white', width: '100%', overflowX: 'hidden' }}>

      {/* ── Hero image ─────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: 'clamp(140px, 16vw, 230px)', overflow: 'hidden' }}>
        <img
          src={heroBannerSrc}
          alt="Banner Toolkit de Inovação"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── Intro text ───────────────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(28px, 4vw, 56px) clamp(20px, 5vw, 66px)' }}>
        <div style={{
          width: '50%',
          minWidth: 280,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(14px, 2vw, 20px)',
          borderRight: '2px dashed #90cdf4',
          paddingRight: 'clamp(20px, 3vw, 48px)',
        }}>
          <h1 style={{
            fontWeight: 600,
            fontSize: 'clamp(20px, 2.5vw, 30px)',
            color: '#2a4365',
            margin: 0,
            lineHeight: 1.25,
          }}>
            Toolkit de Inovação
          </h1>
          <p style={{
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.1vw, 16px)',
            color: 'black',
            textAlign: 'justify',
            lineHeight: 1.7,
            margin: 0,
          }}>
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

      {/* ── Identificação section ───────────────────────────────────────── */}
      <section style={{ background: '#e3efff', padding: 'clamp(20px, 3vw, 40px) clamp(20px, 5vw, 66px)' }}>
        <SectionBadge>Triagem de Identificação</SectionBadge>

        <h2 style={{
          fontWeight: 600,
          fontSize: 'clamp(18px, 2vw, 24px)',
          color: '#2a4365',
          margin: 'clamp(12px, 2vw, 20px) 0 clamp(16px, 2.5vw, 28px)',
        }}>
          Identificação
        </h2>

        <div style={{ display: 'flex', gap: 'clamp(16px, 2vw, 32px)', flexWrap: 'wrap' }}>
          {/* Card 1 */}
          <div style={{
            flex: '1 1 260px',
            maxWidth: 600,
            background: '#0e59a8',
            borderRadius: 8,
            padding: 'clamp(14px, 2vw, 20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 1.5vw, 14px)',
          }}>
            <p style={{ fontWeight: 600, fontSize: 'clamp(11px, 1vw, 13px)', color: 'white', textAlign: 'justify', margin: 0, lineHeight: 1.4 }}>
              Sabe qual procedimento e instrumento quer utilizar para inovação?
            </p>
            <p style={{ fontWeight: 300, fontSize: 'clamp(10px, 0.9vw, 12px)', color: '#e6e6e6', textAlign: 'justify', margin: 0, flex: 1, lineHeight: 1.5 }}>
              Na trilha possuem 5 instrumentos independentes e ...........
            </p>
            <button
              style={{ width: 'clamp(130px, 12vw, 160px)', height: 34, background: '#116ed0', borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')) }}
            >
              <span style={{ fontWeight: 500, fontSize: 13, color: 'white' }}>Siga a Trilha</span>
              <ExternalLink style={{ width: 14, height: 14, color: 'white', flexShrink: 0 }} />
            </button>
          </div>

          {/* Card 2 */}
          <div style={{
            flex: '1 1 260px',
            maxWidth: 600,
            background: '#0e59a8',
            borderRadius: 8,
            padding: 'clamp(14px, 2vw, 20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 1.5vw, 14px)',
          }}>
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

      {/* ── Trilha de Instrumentos section ──────────────────────────────── */}
      <section style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <TrilhaFlowchart />
        </div>
      </section>

      {/* ── Passo a passo section ────────────────────────────────────────── */}
      <section style={{ background: '#e3efff', padding: 'clamp(20px, 3vw, 40px) clamp(20px, 4vw, 40px) clamp(32px, 4vw, 48px)' }}>
        <SectionBadge>Fluxos de Internos</SectionBadge>

        <h2 style={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: 'clamp(18px, 2vw, 24px)',
          color: '#2a4365',
          margin: 'clamp(12px, 2vw, 20px) 0 clamp(6px, 1vw, 10px)',
        }}>
          Passo a passo de cada instrumento
        </h2>

        <p style={{
          textAlign: 'center',
          fontWeight: 300,
          fontSize: 'clamp(14px, 1.4vw, 18px)',
          color: '#2a4365',
          margin: '0 0 clamp(20px, 3vw, 32px)',
        }}>
          Selecione um Instrumento e explore seu fluxo
        </p>

        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'clamp(14px, 2vw, 24px)',
        }}>
          {flows.map((flow) => (
            <FlowCard key={flow.title} {...flow} />
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ textAlign: 'center', padding: 'clamp(20px, 3vw, 32px) 16px', fontSize: 'clamp(11px, 1vw, 14px)', color: '#9ca3af', background: 'white' }}>
        © {new Date().getFullYear()} Toolkit SIA — Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação
      </footer>

    </div>
  )
}

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
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#bee3f8', borderRadius: 20, height: 28, padding: '0 8px' }}>
      <Workflow style={{ width: 20, height: 20, color: '#2a4365' }} />
      <span style={{ fontWeight: 500, fontSize: 12, color: '#2a4365' }}>{children}</span>
    </div>
  )
}

function InstrumentCard({ accentColor, iconBg, Icon, title, description, width = 201, minHeight = 134 }) {
  return (
    <div style={{ background: 'white', borderRadius: 10, boxShadow: '0px 4px 4px rgba(0,0,0,0.25)', width, minHeight }}>
      <div style={{ height: 6, background: accentColor, borderRadius: '10px 10px 0 0' }} />
      <div style={{ padding: '12px 13px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontWeight: 500, fontSize: 9, color: 'black', margin: 0 }}>INSTRUMENTO</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ background: iconBg, padding: 3, borderRadius: 4, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ width: 16, height: 16 }} />
          </div>
          <p style={{ fontWeight: 600, fontSize: 14, color: accentColor, lineHeight: 1.2, margin: 0 }}>{title}</p>
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

function StepCircle({ number, color }) {
  return (
    <div style={{ position: 'relative', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #bee3f8', background: 'white' }} />
      <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: `2px solid ${color}` }} />
      <span style={{ position: 'relative', fontWeight: 600, fontSize: 20, color, lineHeight: 1 }}>{number}</span>
    </div>
  )
}

function TrilhaFlowchart() {
  // All positions are section-relative (figma_y - 909)
  return (
    <div style={{ position: 'relative', width: 1440, height: 766, overflow: 'visible' }}>

      {/* Curved snake path SVG */}
      <svg
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 1440 766"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/*
          Snake path traced from Figma imgRectangle16 coordinates:
          - Row 1 (y=145): horizontal right from "5 Instrumentos" box → Acordo
          - Right U-turn at x=1440
          - Row 2 (y=270): horizontal left → Existe Risco → Há possibilidade
          - Left U-turn at x=205
          - Diagonal curve toward center-right
          - Vertical down through Não sei → Transferência
        */}
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

      {/* Convênio card: x=697, y=74 */}
      <div style={{ position: 'absolute', left: 697, top: 74, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#209828"
          iconBg="rgba(32,152,40,0.2)"
          Icon={Handshake}
          title="Convênio"
          description="(Falta o texto)"
        />
      </div>

      {/* Step node 1 – Sim (green): x=912, y=120 */}
      <div style={{ position: 'absolute', left: 912, top: 120, display: 'flex', alignItems: 'center', gap: 4, zIndex: 1 }}>
        <StepCircle number="1" color="#209828" />
        <span style={{ fontSize: 12, color: '#0e59a8' }}>Sim</span>
      </div>

      {/* Decision box "Haverá repasse": x=1004, y=97 */}
      <div style={{ position: 'absolute', left: 1004, top: 97, zIndex: 1 }}>
        <DecisionBox width={80} height={80} text="Haverá repasse de recursos públicos" bg="#e3e3e3" />
      </div>

      {/* Step node 3 – Não (red): x=1093, y=120 */}
      <div style={{ position: 'absolute', left: 1093, top: 120, display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: 4, zIndex: 1 }}>
        <StepCircle number="3" color="#a8250e" />
        <span style={{ fontSize: 12, color: '#0e59a8' }}>Não</span>
      </div>

      {/* Acordo card: x=1188, y=74 */}
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

      {/* Step node 3 – down (blue): x=795, y=349 */}
      <div style={{ position: 'absolute', left: 795, top: 349, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 1 }}>
        <StepCircle number="3" color="#0e59a8" />
      </div>

      {/* Decision box "Existe Risco?": x=770, y=280 */}
      <div style={{ position: 'absolute', left: 770, top: 280, zIndex: 1 }}>
        <DecisionBox width={96} height={69} text="Existe Risco Tecnológico?" />
      </div>

      {/* Step node 4 – right (yellow): x=244, y=310 */}
      <div style={{ position: 'absolute', left: 244, top: 310, display: 'flex', alignItems: 'center', gap: 4, zIndex: 1 }}>
        <StepCircle number="4" color="#dbaf00" />
      </div>

      {/* Decision box "Há possibilidade?": x=325, y=292 */}
      <div style={{ position: 'absolute', left: 325, top: 292, zIndex: 1 }}>
        <DecisionBox width={117} height={80} text="Há possibilidade de contratação Direta?" />
      </div>

      {/* Contratação Direta card: x=29, y=302 */}
      <div style={{ position: 'absolute', left: 29, top: 302, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#dbaf00"
          iconBg="rgba(219,175,0,0.2)"
          Icon={ShoppingCart}
          title="Contratação Direta"
          description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico"
        />
      </div>

      {/* Encomenda Tecnológica card: x=859, y=377 */}
      <div style={{ position: 'absolute', left: 859, top: 377, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#0e59a8"
          iconBg="rgba(14,89,168,0.2)"
          Icon={Cpu}
          title="Encomenda Tecnológica"
          description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico"
        />
      </div>

      {/* ── Row 3: Não sei · Transferência ──────────────────────────────── */}

      {/* Decision box "Não sei qual?": x=563, y=503 */}
      <div style={{ position: 'absolute', left: 563, top: 503, zIndex: 1 }}>
        <DecisionBox width={80} height={80} text="Não sei qual a pergunta" />
      </div>

      {/* Step node 5 – down (purple): x=578, y=580 */}
      <div style={{ position: 'absolute', left: 578, top: 580, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 1 }}>
        <StepCircle number="5" color="#6a0ea8" />
      </div>

      {/* Transferência Tecnológica card: x=366, y=600 */}
      <div style={{ position: 'absolute', left: 366, top: 600, zIndex: 1 }}>
        <InstrumentCard
          accentColor="#6a0ea8"
          iconBg="rgba(106,14,168,0.2)"
          Icon={RefreshCw}
          title="Transferência Tecnológica não patendeada"
          description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico"
          width={204}
        />
      </div>

      {/* "5 Instrumentos" label box: x=43, y=136 */}
      <div style={{ position: 'absolute', left: 43, top: 136, background: '#d9d9d9', width: 91, height: 38, borderRadius: 4, padding: '4px 6px', zIndex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 12, color: 'black', margin: 0 }}>5</p>
        <p style={{ fontWeight: 600, fontSize: 12, color: 'black', margin: 0 }}>Instrumentos</p>
      </div>

    </div>
  )
}

export default function HomePage() {
  return (
    <div style={{ background: 'white', minWidth: 1440 }}>

      {/* ── Hero image ─────────────────────────────────────────────────── */}
      <div style={{ width: 1440, height: 230, overflow: 'hidden' }}>
        <img
          src={heroBannerSrc}
          alt="Banner Toolkit de Inovação"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── Intro text (y 230–562 = 332px) ─────────────────────────────── */}
      <div style={{ width: 1440, height: 332, position: 'relative' }}>
        {/* Title: figma top=272 → relative=42 */}
        <h1 style={{
          position: 'absolute', top: 42, left: 206 - 140,
          width: 281, textAlign: 'center',
          fontWeight: 600, fontSize: 30, color: '#2a4365', margin: 0,
        }}>
          Toolkit de Inovação
        </h1>
        {/* Description: figma top=332 → relative=102 */}
        <p style={{
          position: 'absolute', top: 102, left: 66,
          width: 524, fontSize: 16, fontWeight: 300,
          color: 'black', textAlign: 'justify', lineHeight: 1.6, margin: 0,
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

      {/* ── Identificação section (y 562–909 = 347px, bg #e3efff) ──────── */}
      <div style={{ width: 1440, height: 347, background: '#e3efff', position: 'relative' }}>
        {/* Badge: figma top=588 → relative=26 */}
        <div style={{ position: 'absolute', top: 26, left: 40 }}>
          <SectionBadge>Triagem de Identificação</SectionBadge>
        </div>

        {/* Title "Identificação": figma top=631 → relative=69 */}
        <h2 style={{
          position: 'absolute', top: 69, left: 116 - 76,
          width: 153, textAlign: 'center',
          fontWeight: 600, fontSize: 24, color: '#2a4365', margin: 0,
        }}>
          Identificação
        </h2>

        {/* Card 1 – "Sabe qual procedimento": figma left=101, top=680 → relative top=118 */}
        <div style={{
          position: 'absolute', left: 101, top: 118,
          width: 600, height: 166,
          background: '#0e59a8', borderRadius: 8,
          padding: 12, display: 'flex', flexDirection: 'column', gap: 11,
        }}>
          <p style={{ fontWeight: 600, fontSize: 12, color: 'white', textAlign: 'justify', margin: 0 }}>
            Sabe qual procedimento e instrumento quer utilizar para inovação?
          </p>
          <p style={{ fontWeight: 300, fontSize: 11, color: '#e6e6e6', textAlign: 'justify', margin: 0, flex: 1 }}>
            Na trilha possuem 5 instrumentos independentes e ...........
          </p>
          <button
            style={{ width: 146, height: 31, background: '#116ed0', borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
            onClick={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')) }}
          >
            <span style={{ fontWeight: 500, fontSize: 12, color: 'white' }}>Siga a Trilha</span>
            <ExternalLink style={{ width: 14, height: 14, color: 'white' }} />
          </button>
        </div>

        {/* Card 2 – "Precisa entender": figma left=751, top=680 → relative top=118 */}
        <div style={{
          position: 'absolute', left: 751, top: 118,
          width: 600, height: 166,
          background: '#0e59a8', borderRadius: 8,
          padding: 12, display: 'flex', flexDirection: 'column', gap: 11,
        }}>
          <p style={{ fontWeight: 600, fontSize: 12, color: 'white', textAlign: 'justify', margin: 0 }}>
            Precisa entender a solução mais apropriada para o seu desafio e qual o instrumento mais adequado para a contratação?
          </p>
          <p style={{ fontWeight: 300, fontSize: 11, color: '#e6e6e6', textAlign: 'justify', margin: 0, flex: 1 }}>
            O link abaixo da inovacpin contém uma trilha de planejamento e um quiz para lhe direcionar em qual seria o instrumento de inovação.
          </p>
          <a
            href="https://inovacpin.org/trilha/planejamento/etapa/8"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 146, height: 31, background: '#116ed0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, textDecoration: 'none' }}
          >
            <span style={{ fontWeight: 500, fontSize: 12, color: 'white' }}>Acessar Material</span>
            <ExternalLink style={{ width: 14, height: 14, color: 'white' }} />
          </a>
        </div>
      </div>

      {/* ── Trilha de Instrumentos section (y 909–1670 = 761px) ─────────── */}
      <div style={{ width: 1440, position: 'relative' }}>
        {/* Badge: figma top=943 → relative=34 */}
        <div style={{ position: 'absolute', top: 34, left: 40, zIndex: 2 }}>
          <SectionBadge>Trilha de Instrumentos</SectionBadge>
        </div>

        {/* Title: figma top=986 → relative=77 */}
        <h2 style={{
          position: 'absolute', top: 77, left: 206 - 131,
          width: 262, textAlign: 'center',
          fontWeight: 600, fontSize: 24, color: '#2a4365', margin: 0, zIndex: 2,
        }}>
          Trilha de Instrumentos
        </h2>

        {/* Subtitle: figma top=1020 → relative=111 */}
        <p style={{
          position: 'absolute', top: 111, left: 159 - 119,
          width: 238, textAlign: 'center',
          fontWeight: 400, fontSize: 14, color: '#2a4365', margin: 0, zIndex: 2,
        }}>
          Descrição da etapa de identificação
        </p>

        {/* Flowchart */}
        <TrilhaFlowchart />
      </div>

      {/* ── Passo a passo section (bg #e3efff) ─────────────────────────── */}
      <div style={{ background: '#e3efff', width: 1440, paddingBottom: 48 }}>
        <div style={{ paddingTop: 28, paddingLeft: 40 }}>
          <SectionBadge>Fluxos de Internos</SectionBadge>
        </div>

        <h2 style={{ textAlign: 'center', fontWeight: 600, fontSize: 24, color: '#2a4365', margin: '16px 0 8px' }}>
          Passo a passo de cada instrumento
        </h2>
        <p style={{ textAlign: 'center', fontWeight: 300, fontSize: 18, color: '#2a4365', margin: '0 0 32px' }}>
          Selecione um Instrumento e explore seu fluxo
        </p>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '0 40px' }}>
          {flows.map((flow) => (
            <FlowCard key={flow.title} {...flow} />
          ))}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ textAlign: 'center', padding: '32px 0', fontSize: 14, color: '#9ca3af', background: 'white' }}>
        © {new Date().getFullYear()} Toolkit SIA — Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação
      </footer>

    </div>
  )
}

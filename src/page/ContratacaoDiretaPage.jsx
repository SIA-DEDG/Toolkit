import React, { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeDiamond, NodeTriangle } from '../components/ProcessNode'
import FlowNavBar from '../components/FlowNavBar'
import SnakePath from '../components/SnakePath'
import MobileFlowHeader from '../components/MobileFlowHeader'

// paddingTop de cada coluna para alinhar o nó com a cobra
// padrão: MID=206, BAIXO=243, CIMA=176, FIM=204
const NODE_TOP = [186, 223, 156, 223, 156, 223, 156, 223, 156, 223, 156, 223, 156, 184]

const COLS      = 14
const COL_WIDTH = 185

// Conteúdo de cada etapa para o layout mobile
const CARDS = [
  { title: 'Início', text: 'Necessidade do órgão desenvolver uma pesquisa', download: false },
  { title: 'Formalização da Demanda', text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true, fileKey: 'contratacao-direta/1. Documento_Formalizacao_Demanda_PDI.docx' },
  { title: 'Declaração de Inexistência de Ata de Preço', text: 'Declaração de inexistência de Ata de Registro de Preços gerenciados pela SEAD/PI que contemple o objeto pretendido.', download: true, fileKey: 'contratacao-direta/2. Declaracao_Inexistencia_ARP_SEAD_PI.docx' },
  { title: 'Estudo Técnico Preliminar', text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true, fileKey: 'contratacao-direta/3. Estudo Preliminar_Encomenda_Tecnologica.docx' },
  { title: 'Mapa de Risco', text: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.', download: true, fileKey: 'contratacao-direta/4. Mapa_de_Riscos_Contratacao.docx' },
  { title: 'Pesquisa de Preço', text: 'Pesquisa de preço do mercado de produtos ou soluções da demanda', download: false },
  { title: 'Autorizações', accordion: true, accordionItems: [
    { number: '1', title: 'Análise Técnico-Operacional da SEAD', description: '' },
    { number: '2', title: 'Autorização do Conselho de Transformação Digital', description: '' },
  ], download: true },
  { title: 'Termo de Referência ou Projeto Básico', text: 'O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros', download: true, fileKey: 'contratacao-direta/6. Termo_de_Referencia.docx' },
  { title: 'Autorizações', accordion: true, accordionItems: [
    { number: '1', title: 'Aprovação do ETP e do mapa de Risco (se houver)', description: '' },
    { number: '2', title: 'Aprovação do Orçamento estimado', description: '' },
    { number: '3', title: 'Aprovação do Termo de Referência', description: '' },
    { number: '4', title: 'Autorização de Contratação da CGFR', description: '' },
  ], download: true },
  { title: 'Minuta do Contrato', text: 'Minuta de Contrato ou instrumento equivalente', download: true, fileKey: 'contratacao-direta/7. Proposta_Comercial_ETEC_Modelo.docx' },
  { title: 'Autorizações', accordion: true, accordionItems: [
    { number: '1', title: 'Análise Prévia da CGE', description: '' },
    { number: '2', title: 'Parecer PGE', description: '' },
    { number: '3', title: 'Autorização do Secretário da SEAD', description: '' },
    { number: '4', title: 'Parecer SEFAZ', description: '' },
    { number: '5', title: 'Análise Final do Procedimento pelo controle interno do órgão', description: '' },
  ], download: true },
  { title: 'Indicação do Fiscal do Contrato ou Comissão', text: 'Minuta de Contrato ou instrumento equivalente', download: false },
  { title: 'Publicação no DOE', text: 'Publicação do contrato pela SEGOV no Diário Oficial do Estado do Piauí', download: false },
  { title: 'Comunicação TCE', text: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato', download: false },
]

function CardTitle({ children }) {
  return <p className="font-bold text-[12px] text-[#2A4365] mb-1 leading-tight">{children}</p>
}
function CardBody({ children }) {
  return <p className="text-[10.5px] leading-snug text-[#2A4365]/90">{children}</p>
}

function AccordionItem({ number, title, description }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        className="flex items-center gap-1 w-full text-left cursor-pointer bg-transparent border-0 p-0"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[10.5px] font-bold text-[#2A4365]">{number}–</span>
        <span className="text-[10.5px] text-[#2A4365] flex-1">{title}</span>
        <svg
          className={`w-3 h-3 text-[#2A4365] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {open && description && (
        <p className="text-[9.5px] text-[#2A4365]/75 leading-snug pl-3 mt-0.5">{description}</p>
      )}
    </div>
  )
}

const StageCol = React.forwardRef(function StageCol({ index, children, extra }, ref) {
  const topPx = NODE_TOP[index]
  return (
    <div ref={ref} className="flex flex-col items-center relative" style={{ paddingTop: topPx }}>
      {children}
      {extra && <div className="mt-3">{extra}</div>}
    </div>
  )
})

const GRID = {
  display: 'grid',
  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
}

const ABOVE_ANCHOR = {
  bottom: 'calc(100% - 163px)',
  left: '50%',
  transform: 'translateX(-50%)',
}

function useIsMobile() {
  const mq = window.matchMedia('(max-width: 767px)')
  const [isMobile, setIsMobile] = useState(() => mq.matches)
  useEffect(() => {
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

function Navbar() {
  return (
    <nav className="bg-[#2C5282] h-11 flex items-center px-6 border-b border-white/10" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30 }}>
      <button
        className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-90 transition-opacity font-sans"
        onClick={() => {
          window.history.pushState({}, '', '/')
          window.dispatchEvent(new PopStateEvent('popstate'))
        }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Voltar ao Painel
      </button>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[#90CDF4] px-8 py-3 flex items-center gap-8 border-t border-white/10 flex-shrink-0">
      <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
        <NodeCircle /><span>Início</span>
      </div>
      <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
        <NodeDiamond /><span>Etapas</span>
      </div>
      <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
        <NodeTriangle /><span>Fim</span>
      </div>
    </footer>
  )
}

function MobileLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div style={{ height: 44, flexShrink: 0 }} />
      <MobileFlowHeader />
      <div className="flow-gradient flex-1 py-6 px-4">
        <div className="relative">
          <div
            className="absolute bottom-0 w-[3px] bg-[#2B6CB0]"
            style={{ left: 'calc(50% - 1.5px)', top: '14px' }}
          />
          {CARDS.map((card, i) => {
            const isLeft = i % 2 === 0
            const isFirst = i === 0
            const hasContent = card.title || card.text || card.download || card.accordion
            return (
              <div key={i} className="mb-6">
                <div className="flex items-center relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#2B6CB0]"
                    style={isLeft ? { right: 'calc(50% + 8px)', left: 0 } : { left: 'calc(50% + 8px)', right: 0 }}
                  />
                  <div className="flex-1" />
                  <div className="flex-shrink-0 w-6 flex justify-center relative z-10">
                    {isFirst ? <NodeCircle /> : <NodeDiamond />}
                  </div>
                  <div className="flex-1" />
                </div>
                {hasContent && (
                  <div className="flex mt-2 relative z-[1]">
                    <div className="flex-1 pr-3 min-w-0">
                      {isLeft && (
                        <div className="bg-white rounded-lg px-2.5 py-2 shadow-sm">
                          {card.title && <p className="font-bold text-[12px] text-[#2A4365] mb-1 leading-tight text-right">{card.title}</p>}
                          {card.text && <p className="text-[11px] leading-snug text-[#2A4365]/90 mb-1.5 text-right">{card.text}</p>}
                          {card.accordion && (
                            <div className="process-card bg-white/70 rounded-xl p-2.5 space-y-1 mb-1.5">
                              {card.accordionItems.map((item, k) => (
                                <AccordionItem key={k} number={item.number} title={item.title} description={item.description} />
                              ))}
                            </div>
                          )}
                          {card.download && <div className="flex justify-end"><DownloadButton fileKey={card.fileKey} /></div>}
                          {card.note && (
                            <div className="border-2 border-dashed border-[#2A4365]/60 rounded-lg bg-white/70 px-2.5 py-2 mt-2">
                              <p className="text-[9.5px] text-[#2A4365]/80 leading-snug">{card.note}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 w-6" />
                    <div className="flex-1 pl-3 min-w-0">
                      {!isLeft && (
                        <div className="bg-white rounded-lg px-2.5 py-2 shadow-sm">
                          {card.title && <p className="font-bold text-[12px] text-[#2A4365] mb-1 leading-tight">{card.title}</p>}
                          {card.text && <p className="text-[11px] leading-snug text-[#2A4365]/90 mb-1.5">{card.text}</p>}
                          {card.accordion && (
                            <div className="process-card bg-white/70 rounded-xl p-2.5 space-y-1 mb-1.5">
                              {card.accordionItems.map((item, k) => (
                                <AccordionItem key={k} number={item.number} title={item.title} description={item.description} />
                              ))}
                            </div>
                          )}
                          {card.download && <DownloadButton fileKey={card.fileKey} />}
                          {card.note && (
                            <div className="border-2 border-dashed border-[#2A4365]/60 rounded-lg bg-white/70 px-2.5 py-2 mt-2">
                              <p className="text-[9.5px] text-[#2A4365]/80 leading-snug">{card.note}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          <div className="flex justify-center relative z-10 pt-1">
            <div style={{ width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '16px solid #2B6CB0' }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function DesktopLayout() {
  const [extraTop, setExtraTop] = useState(0)
  const ref2  = useRef(null)
  const ref4  = useRef(null)
  const ref6  = useRef(null)
  const ref8  = useRef(null)
  const ref10 = useRef(null)
  const ref12 = useRef(null)
  const refs  = [ref2, ref4, ref6, ref8, ref10, ref12]

  useEffect(() => {
    const recalculate = () => {
      const heights = refs.map(r => r.current?.offsetHeight ?? 0)
      const overflow = Math.max(0, Math.max(...heights) - 163) + 8
      setExtraTop(overflow)
    }
    recalculate()
    const observer = new ResizeObserver(recalculate)
    refs.forEach(r => { if (r.current) observer.observe(r.current) })
    return () => observer.disconnect()
  }, [])


  return (
    <div className="min-h-screen flex flex-col" style={{ minWidth: COLS * COL_WIDTH }}>

      {/* ── Navbar ── */}
      <nav className="bg-[#2C5282] h-11 flex items-center px-6 border-b border-white/10" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30 }}>
        <button
          className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-90 transition-opacity font-sans"
          onClick={() => {
            window.history.pushState({}, '', '/')
            window.dispatchEvent(new PopStateEvent('popstate'))
          }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Voltar ao Painel
        </button>
      </nav>
      <div style={{ height: 44, flexShrink: 0 }} />

      <FlowNavBar />

      {/* ── Área da cobra + cards ── */}
      <div className="flow-gradient pt-5 flex-1">
        <div className="relative" style={{ ...GRID, minHeight: 450, paddingTop: extraTop }}>

          {/* cobra */}
          <div className="absolute inset-0 pointer-events-none" style={{ gridColumn: '1 / -1' }}>
            <SnakePath extraTop={extraTop} cols={COLS} colWidth={COL_WIDTH} />
          </div>

          {/* Col 0 – Início */}
          <StageCol index={0}>
            <NodeCircle />
            <ProcessCard position="below" showNode={false}>
              <CardTitle>Início</CardTitle>
              <CardBody>Necessidade do órgão desenvolver uma pesquisa</CardBody>
            </ProcessCard>
          </StageCol>

          {/* Col 1 – Formalização da Demanda (abaixo) */}
          <StageCol index={1}>
            <ProcessCard position="below">
              <CardTitle>Formalização da Demanda</CardTitle>
              <CardBody>Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;</CardBody>
              <DownloadButton fileKey="contratacao-direta/1. Documento_Formalizacao_Demanda_PDI.docx" />
            </ProcessCard>
          </StageCol>

          {/* Col 2 – Declaração de Inexistência de Ata de Preço (acima) */}
          <StageCol index={2}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Declaração de Inexistência de Ata de Preço</CardTitle>
                <CardBody>Declaração de inexistência de Ata de Registro de Preços gerenciados pela SEAD/PI que contemple o objeto pretendido.</CardBody>
                <DownloadButton fileKey="contratacao-direta/2. Declaracao_Inexistencia_ARP_SEAD_PI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 3 – Estudo Técnico Preliminar (abaixo) */}
          <StageCol index={3}>
            <ProcessCard position="below">
              <CardTitle>Estudo Técnico Preliminar</CardTitle>
              <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
              <DownloadButton fileKey="contratacao-direta/3. Estudo Preliminar_Encomenda_Tecnologica.docx" />
            </ProcessCard>
          </StageCol>

          {/* Col 4 – Mapa de Risco (acima) */}
          <StageCol index={4}>
            <div ref={ref4} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Mapa de Risco</CardTitle>
                <CardBody>Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.</CardBody>
                <DownloadButton fileKey="contratacao-direta/4. Mapa_de_Riscos_Contratacao.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 5 – Pesquisa de Preço (abaixo) */}
          <StageCol index={5}>
            <ProcessCard position="below">
              <CardTitle>Pesquisa de Preço</CardTitle>
              <CardBody>Pesquisa de preço do mercado de produtos ou soluções da demanda</CardBody>
            </ProcessCard>
          </StageCol>

          {/* Col 6 – Autorizações (acima, accordion) */}
          <StageCol index={6}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Análise Técnico-Operacional da SEAD" description="" />
                  <AccordionItem number="2" title="Autorização do Conselho de Transformação Digital" description="" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 7 – Termo de Referência ou Projeto Básico (abaixo) */}
          <StageCol index={7}>
            <ProcessCard position="below">
              <CardTitle>Termo de Referência ou Projeto Básico</CardTitle>
              <CardBody>O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros</CardBody>
              <DownloadButton fileKey="contratacao-direta/6. Termo_de_Referencia.docx" />
            </ProcessCard>
          </StageCol>

          {/* Col 8 – Autorizações (acima, accordion) */}
          <StageCol index={8}>
            <div ref={ref8} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Aprovação do ETP e do mapa de Risco (se houver)" description="" />
                  <AccordionItem number="2" title="Aprovação do Orçamento estimado" description="" />
                  <AccordionItem number="3" title="Aprovação do Termo de Referência" description="" />
                  <AccordionItem number="4" title="Autorização de Contratação da CGFR" description="" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 9 – Minuta do Contrato (abaixo) */}
          <StageCol index={9}>
            <ProcessCard position="below">
              <CardTitle>Minuta do Contrato</CardTitle>
              <CardBody>Minuta de Contrato ou instrumento equivalente</CardBody>
              <DownloadButton fileKey="contratacao-direta/7. Proposta_Comercial_ETEC_Modelo.docx" />
            </ProcessCard>
          </StageCol>

          {/* Col 10 – Autorizações (acima, accordion) */}
          <StageCol index={10}>
            <div ref={ref10} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Análise Prévia da CGE" description="" />
                  <AccordionItem number="2" title="Parecer PGE" description="" />
                  <AccordionItem number="3" title="Autorização do Secretário da SEAD" description="" />
                  <AccordionItem number="4" title="Parecer SEFAZ" description="" />
                  <AccordionItem number="5" title="Análise Final do Procedimento pelo controle interno do órgão" description="" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 11 – Indicação do Fiscal do Contrato ou Comissão (abaixo) */}
          <StageCol index={11}>
            <ProcessCard position="below">
              <CardTitle>Indicação do Fiscal do Contrato ou Comissão</CardTitle>
              <CardBody>Minuta de Contrato ou instrumento equivalente</CardBody>
            </ProcessCard>
          </StageCol>

          {/* Col 12 – Publicação no DOE (acima) */}
          <StageCol index={12}>
            <div ref={ref12} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Publicação no DOE</CardTitle>
                <CardBody>Publicação do contrato pela SEGOV no Diário Oficial do Estado do Piauí</CardBody>
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 13 – Comunicação TCE (triângulo + abaixo) */}
          <StageCol index={13}>
            <NodeTriangle />
          </StageCol>

        </div>
        <div className="h-8" />
      </div>

      {/* ── Rodapé ── */}
      <footer className="bg-[#90CDF4] px-8 py-3 flex items-center gap-8 border-t border-white/10">
        <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
          <NodeCircle /><span>Início</span>
        </div>
        <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
          <NodeDiamond /><span>Etapas</span>
        </div>
        <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
          <NodeTriangle /><span>Fim</span>
        </div>
      </footer>

    </div>
  )
}

export default function ContratacaoDiretaPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

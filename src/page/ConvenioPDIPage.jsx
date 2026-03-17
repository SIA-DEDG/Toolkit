import React, { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeDiamond, NodeTriangle } from '../components/ProcessNode'
import FlowNavBar from '../components/FlowNavBar'
import SnakePath from '../components/SnakePath'
import MobileFlowHeader from '../components/MobileFlowHeader'

const STAGES = [
  { label: 'Início' , img: '/assets/convenio-pdi/research-paper.png'},
  { label: 'Formalização\nda Demanda', img: '/assets/convenio-pdi/documents.png' },
  { label: 'Manifestação\nTécnica ou NIT', img: '/assets/convenio-pdi/lawyer.png' },
  { label: 'Edital de\nChamamento' },
  { label: 'Plano de\nTrabalho', img: '/assets/convenio-pdi/schedule.png' },
  { label: 'Minuta do\nConvênio' },
  { label: 'Planilha Demonstrativa\nde Custo', img: '/assets/convenio-pdi/spreadsheets.png' },
  { label: 'Autorização\nCGFR', img: '/assets/convenio-pdi/consent.png' },
  { label: 'Documentações', img: '/assets/convenio-pdi/transfer-files.png' },
  { label: 'Análises', img: '/assets/convenio-pdi/analysis.png' },
  { label: 'Indicação do Gestor\ndo Convênio', img: '/assets/convenio-pdi/live-collaboration.png' },
  { label: 'Publicação\nno DOE', img: '/assets/convenio-pdi/publish-article.png' },
  { label: 'Registro da Publicação\ndo Convênio (SIGRP)', img: '/assets/convenio-pdi/online-article.png' },
]

// paddingTop de cada coluna para alinhar o nó com a cobra
// padrão: MID=206, BAIXO=243, CIMA=176, FIM=204
const NODE_TOP = [186, 223, 156, 223, 156, 223, 156, 223, 156, 223, 156, 223, 184]

const COLS      = 13
const COL_WIDTH = 185

// Conteúdo de cada etapa para o layout mobile
const CARDS = [
  { text: 'Necessidade do órgão desenvolver uma pesquisa', download: false },
  { text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true, fileKey: 'convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx' },
  { text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true, fileKey: 'convenio-pd&i/Manifestacao_Tecnica_PDI.docx' },
  { text: 'Minuta do Edital de chamamento', download: true },
  { text: 'Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio', download: true, fileKey: 'convenio-pd&i/Modelo_Plano_de_Trabalho_PDI.docx' },
  { text: 'Minuta do Convênio para Pesquisa, Desenvolvimento e Inovação', download: true, fileKey: 'convenio-pd&i/Minuta_Convênio_Parceria_PDI.docx' },
  { text: 'Planilha demonstrativa dos custos operacionais incorridos na execução das atividades', download: true, fileKey: 'convenio-pd&i/Planilha_Custos_Operacionais_PDI.xlsx' },
  { text: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR', download: true },
  { accordion: true, accordionItems: [
    { number: '1', title: 'Parceiro privado', description: '' },
    { number: '2', title: 'Parceiro público', description: '' },
    { number: '3', title: 'Fundação de Apoio', description: '' },
  ], download: true },
  { accordion: true, accordionItems: [
    { number: '1', title: 'Análise Prévia CGE', description: '' },
    { number: '2', title: 'Parecer PGE', description: '' },
    { number: '3', title: 'Autorização do Secretário da SEAD', description: '' },
    { number: '4', title: 'Parecer SEFAZ', description: '' },
  ], download: true },
  { text: 'Indicação do gestor do convênio PD&I', download: true },
  { text: 'Publicação no Diário Oficial do Estado do Piauí pela SEGOV', download: false },
  { text: 'Registro da publicação do convênio no SIGRP', download: false },
]

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
          {STAGES.map((stage, i) => {
            const card = CARDS[i]
            const isLeft = i % 2 === 0
            const isFirst = i === 0
            const hasContent = card.text || card.download || card.accordion
            return (
              <div key={i} className="mb-6">
                <div className="flex items-center relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#2B6CB0]"
                    style={isLeft ? { right: 'calc(50% + 8px)', left: 0 } : { left: 'calc(50% + 8px)', right: 0 }}
                  />
                  <div className="flex-1 flex justify-end pr-3 min-w-0 relative z-[1]">
                    {isLeft && (
                      <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-sm text-right w-full">
                        {stage.label.split('\n').map((line, j) => (
                          <div key={j} className="text-[#2A4365] font-bold text-[12px] leading-tight">{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-6 flex justify-center relative z-10">
                    {isFirst ? <NodeCircle /> : <NodeDiamond />}
                  </div>
                  <div className="flex-1 flex justify-start pl-3 min-w-0 relative z-[1]">
                    {!isLeft && (
                      <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-sm w-full">
                        {stage.label.split('\n').map((line, j) => (
                          <div key={j} className="text-[#2A4365] font-bold text-[12px] leading-tight">{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {hasContent && (
                  <div className="flex mt-2 relative z-[1]">
                    <div className="flex-1 pr-3 min-w-0">
                      {isLeft && (
                        <div>
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
                        <div>
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
  const refs  = [ref2, ref4, ref6, ref8, ref10]

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

          {/* Col 0 – Início (círculo + card abaixo) */}
          <StageCol index={0}>
            <NodeCircle />
            <ProcessCard position="below" showNode={false}>
              <CardBody>Necessidade do órgão desenvolver uma pesquisa</CardBody>
            </ProcessCard>
          </StageCol>

          {/* Col 1 – Formalização da Demanda (abaixo) */}
          <StageCol index={1}>
            <ProcessCard position="below">
              <CardBody>Formalização da Demanda via SEI  gabinete do órgão e instituição da parceria;</CardBody>
              <DownloadButton fileKey="convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx" />
            </ProcessCard>
          </StageCol>

          {/* Col 2 – Manifestação Técnica ou NIT (acima) */}
          <StageCol index={2}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
                <DownloadButton fileKey="convenio-pd&i/Manifestacao_Tecnica_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 3 – Edital de Chamamento (abaixo) */}
          <StageCol index={3}>
            <ProcessCard position="below">
              <CardBody>Minuta do Edital de chamamento</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          {/* Col 4 – Plano de Trabalho (acima) */}
          <StageCol index={4}>
            <div ref={ref4} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardBody>⁠Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio</CardBody>
                <DownloadButton fileKey="convenio-pd&i/Modelo_Plano_de_Trabalho_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 5 – Minuta do Convênio (abaixo) */}
          <StageCol index={5}>
            <ProcessCard position="below">
              <CardBody>Minuta do Convênio para Pesquisa, Desenvolvimento e Inovação</CardBody>
              <DownloadButton fileKey="convenio-pd&i/Minuta_Convênio_Parceria_PDI.docx" />
            </ProcessCard>
          </StageCol>

          {/* Col 6 – Planilha Demonstrativa de Custo (acima) */}
          <StageCol index={6}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardBody>Planilha demonstrativa dos custos operacionais incorridos na execução das atividades</CardBody>
                <DownloadButton fileKey="convenio-pd&i/Planilha_Custos_Operacionais_PDI.xlsx" />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 7 – Autorização CGFR (abaixo) */}
          <StageCol index={7}>
            <ProcessCard position="below">
              <CardBody>Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          {/* Col 8 – Documentações (acima, accordion) */}
          <StageCol index={8}>
            <div ref={ref8} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Parceiro privado" description="Descrição placeholder item 1" />
                  <AccordionItem number="2" title="Parceiro público" description="Descrição placeholder item 2" />
                  <AccordionItem number="3" title="Fundação de Apoio" description="Descrição placeholder item 3" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 9 – Análises (abaixo, accordion) */}
          <StageCol index={9}>
            <ProcessCard position="below">
              <div className="space-y-1 mb-1">
                <AccordionItem number="1" title="Análise Prévia CGE" description="Descrição placeholder item 1" />
                <AccordionItem number="2" title="Parecer PGE" description="Descrição placeholder item 2" />
                <AccordionItem number="3" title="Autorização do Secretário da SEAD" description="Descrição placeholder item 3" />
                <AccordionItem number="4" title="Parecer SEFAZ" description="Descrição placeholder item 4" />
              </div>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          {/* Col 10 – Indicação do Gestor do Convênio (acima) */}
          <StageCol index={10}>
            <div ref={ref10} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardBody>Indicação do gestor do convênio PD&I</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 11 – Publicação no DOE (abaixo) */}
          <StageCol index={11}>
            <ProcessCard position="below">
              <CardBody>⁠Publicação no Diário Oficial do Estado do Piauí pela SEGOV</CardBody>
            </ProcessCard>
          </StageCol>

          {/* Col 12 – Registro da Publicação do Convênio / SIGRP (triângulo + abaixo) */}
          <StageCol index={12}>
            <NodeTriangle />
            <ProcessCard position="below" showNode={false}>
              <CardBody>Registro da publicação do convênio no SIGRP</CardBody>
            </ProcessCard>
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

export default function ConvenioPDIPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

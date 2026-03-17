import React, { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeDiamond, NodeTriangle } from '../components/ProcessNode'
import FlowNavBar from '../components/FlowNavBar'
import SnakePath from '../components/SnakePath'
import MobileFlowHeader from '../components/MobileFlowHeader'

const STAGES = [
  { label: 'Início', img: '/assets/acordo-pdi/cuate.png' },
  { label: 'Formalização\nda Demanda', img: '/assets/acordo-pdi/documentos.png' },
  { label: 'Manifestação\nTécnica ou NIT', img: '/assets/acordo-pdi/lawyer.png' },
  { label: 'Plano de\nTrabalho', img: '/assets/acordo-pdi/schedule.png' },
  { label: 'Acordo de\nParceria', img: '/assets/acordo-pdi/ageement.png' },
  { label: 'Autorização da\nContratação (CGFR)', img: '/assets/acordo-pdi/consent.png' },
  { label: 'Autorizações', img: '/assets/acordo-pdi/sent-massage.png' },
  { label: 'Indicação do\nGestor no Acordo', img: '/assets/acordo-pdi/business-deal.png' },
  { label: 'Publicação\nno DOE', img: '/assets/acordo-pdi/publish-article.png' },
]

const NODE_TOP = [186, 223, 156, 223, 156, 223, 156, 223, 184]
const COL_WIDTH = 185

// Conteúdo de cada etapa para o layout mobile
const CARDS = [
  { text: 'Necessidade do órgão desenvolver uma pesquisa', download: false },
  { text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true, fileKey: 'acordo-pd&i/Documento_Formalizacao_Demanda_PDI.docx' },
  { text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true, fileKey: 'acordo-pd&i/Manifestacao_Tecnica_PDI.docx' },
  { text: 'Plano de trabalho do acordo entre as instituições contendo a descrição das atividades, objetivos e metas do acordo', download: true, fileKey: 'acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx' },
  { text: 'Documento do Acordo de parceria firmado', download: true, fileKey: 'acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx' },
  { text: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados (CGFR). Caso haja recurso financeiro do ente público: Convênio. Caso contrário: Acordo.', download: true, fileKey: 'acordo-pd&i/Planilha_Custos_Operacionais_PDI.xlsx' },
  {
    accordion: true, accordionItems: [
      { number: '1', title: 'Autorização do Secretário da SEAD', description: 'Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA' },
      { number: '2', title: 'Autorização da SEFAZ', description: 'Secretaria de Estado da Fazenda devido a repasses de recursos' },
      { number: '3', title: 'Autorização da PGE', description: 'Procuradoria Geral do Estado para verificação' },
    ], download: true, fileKey: 'acordo-pd&i/Lista de Verificação - Acordo PD&I.docx'
  },
  { text: 'Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI', download: true },
  { text: 'Publicação no Diário Oficial do Estado do Piauí', download: false },
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
  const aboveRef2 = useRef(null)
  const aboveRef4 = useRef(null)
  const aboveRef6 = useRef(null)

  useEffect(() => {
    const refs = [aboveRef2, aboveRef4, aboveRef6]

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
    <div className="min-h-screen flex flex-col" style={{ minWidth: 9 * COL_WIDTH }}>
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

      <div className="flow-gradient pt-5 flex-1">

        <div className="relative grid grid-cols-9" style={{ minHeight: 450, paddingTop: extraTop }}>

          <div className="absolute inset-0 pointer-events-none" style={{ gridColumn: '1 / -1' }}>
            <SnakePath extraTop={extraTop} colWidth={COL_WIDTH} />
          </div>

          <StageCol index={0}>
            <NodeCircle />
            <ProcessCard position="below" width={148} showNode={false}>
              <CardBody>
                Necessidade do órgão desenvolver uma pesquisa
              </CardBody>
            </ProcessCard>
          </StageCol>

          <StageCol index={1}>
            <ProcessCard position="below" width={168}>
              <CardTitle>Formalização da Demanda</CardTitle>
              <CardBody>
                Formalização da Demanda via SEI  gabinete do órgão e instituição da parceria;
              </CardBody>
              <DownloadButton fileKey="acordo-pd&i/Documento_Formalizacao_Demanda_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol index={2}>
            <div ref={aboveRef2} className="absolute flex flex-col items-center" style={{ bottom: 'calc(100% - 163px)', left: '50%', transform: 'translateX(-50%)' }}>
              <ProcessCard position="above" width={172}>
                <CardBody>
                  Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados
                </CardBody>
                <DownloadButton fileKey={"acordo-pd&i/Manifestacao_Tecnica_PDI.docx"} />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol index={3}>
            <ProcessCard position="below" width={168}>
              <CardBody>
                Plano de trabalho do acordo entre as instituições contendo a descrição das atividades, objetivos e metas do acordo
              </CardBody>
              <DownloadButton fileKey="acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol index={4}>
            <div ref={aboveRef4} className="absolute flex flex-col items-center" style={{ bottom: 'calc(100% - 163px)', left: '50%', transform: 'translateX(-50%)' }}>
              <ProcessCard position="above" width={178}>
                <CardBody>
                  Documento do Acordo de parceria firmado
                </CardBody>
                <DownloadButton fileKey="acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol index={5}>
            <div className="flex flex-col items-center">
              <div className="w-[3px] bg-[#2B6CB0] h-10 flex-shrink-0" />
              {/* <div className="border-2 border-dashed border-[#2A4365] rounded-lg bg-white/80 px-3 py-1.5 text-[12px] font-bold text-[#2A4365] whitespace-nowrap shadow">
                Possui Recurso?
              </div> */}

              {/* <svg width="332" height="24" viewBox="0 0 332 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 flex-shrink-0">
                <line x1="166" y1="0" x2="166" y2="12" stroke="#2A4365" strokeWidth="2" />
                <line x1="80" y1="12" x2="252" y2="12" stroke="#2A4365" strokeWidth="2" />
                <line x1="80" y1="12" x2="80" y2="24" stroke="#2A4365" strokeWidth="2" />
                <line x1="252" y1="12" x2="252" y2="24" stroke="#2A4365" strokeWidth="2" />
              </svg> */}

              <div className="flex gap-3">
                {/* <div className="flex flex-col items-center">
                  <NodeDiamond />
                  <span className="text-[11px] font-bold text-[#2A4365] mb-1">Sim</span>
                  <div className="process-card p-2.5 text-[#2A4365] text-right rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg cursor-pointer" style={{ width: 160 }}>
                    <p className="font-bold text-[11px] text-[#2A4365] mb-1">Convênio</p>
                    <p className="text-[10px] text-[#2A4365]/90 leading-snug">
                      Acordo de Parceria para Pesquisa, Desenvolvimento e Inovação (PD&I) é um instrumento jurídico que formaliza a colaboração técnica entre instituições públicas e parceiros, visando criar tecnologias, produtos ou processos inovadores. Regido pela Lei de Inovação (Lei 10.973/2004)
                    </p>
                    <DownloadButton fileKey="acordo-pd&i/Planilha_Custos_Operacionais_PDI.xlsx" />
                  </div>
                </div> */}

                <div className="flex flex-col items-center">
                  <NodeDiamond />
                  <div className="process-card p-2.5 text-[#2A4365] text-left rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg cursor-pointer" style={{ width: 160 }}>
                    <p className="font-bold text-[11px] text-[#2A4365] mb-1">Acordo</p>
                    <p className="text-[10px] text-[#2A4365]/90 leading-snug">
                      ⁠Autorização da contratação pela comissão de Gestão financeira e Gestão de resultados- CGFR *quando houver participação de recursos financeiro do ente público no projeto
                    </p>
                    <DownloadButton />
                  </div>
                </div>
              </div>
            </div>
          </StageCol>

          <StageCol index={6}>
            <div ref={aboveRef6} className="absolute flex flex-col items-center" style={{ bottom: 'calc(100% - 163px)', left: '50%', transform: 'translateX(-50%)' }}>
              <ProcessCard position="above" width={190}>
                <div className="space-y-1 mb-1">
                  <AccordionItem
                    number="1"
                    title="Autorização do Secretário da SEAD"
                    description="Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA"
                  />
                  <AccordionItem
                    number="2"
                    title="Autorização da SEFAZ"
                    description="Secretaria de Estado da Fazenda devido a repasses de recursos"
                  />
                  <AccordionItem
                    number="3"
                    title="Autorização da PGE"
                    description="Procuradoria Geral do Estado para verificação"
                  />
                </div>
                <DownloadButton fileKey="acordo-pd&i/Lista de Verificação - Acordo PD&I.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol index={7}>
            <ProcessCard position="below" width={168}>
              <CardBody>
                Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI
              </CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol index={8}>
            <NodeTriangle />
            <ProcessCard position="below" width={155} showNode={false}>
              <CardTitle>Publicação no DOE</CardTitle>
              <CardBody>
                Publicação no Diário Oficial do Estado do Piauí
              </CardBody>
            </ProcessCard>
          </StageCol>

        </div>

        <div className="h-8" />
      </div>

      <footer className="bg-[#90CDF4] px-8 py-3 flex items-center gap-8 border-t border-white/10">
        <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
          <NodeCircle />
          <span>Início</span>
        </div>
        <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
          <NodeDiamond />
          <span>Etapas</span>
        </div>
        <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
          <NodeTriangle />
          <span>Fim</span>
        </div>
      </footer>

    </div>
  )
}

export default function AcordoPDIPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

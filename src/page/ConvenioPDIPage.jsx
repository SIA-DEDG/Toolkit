import React, { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeDiamond, NodeTriangle } from '../components/ProcessNode'
import SnakePath from '../components/SnakePath'

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
// padrão: MID=206, BAIXO=255, CIMA=164
const NODE_TOP = [206, 255, 164, 255, 164, 255, 164, 255, 164, 255, 164, 255, 204]

const COLS      = 13
const COL_WIDTH = 140

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

function StageCol({ index, children }) {
  return (
    <div className="flex flex-col items-center relative" style={{ paddingTop: NODE_TOP[index] }}>
      {children}
    </div>
  )
}

const GRID = {
  display: 'grid',
  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
}

const ABOVE_ANCHOR = {
  bottom: 'calc(100% - 171px)',
  left: '50%',
  transform: 'translateX(-50%)',
}

export default function ConvenioPDIPage() {
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
      const overflow = Math.max(0, Math.max(...heights) - 171) + 8
      setExtraTop(overflow)
    }
    recalculate()
    const observer = new ResizeObserver(recalculate)
    refs.forEach(r => { if (r.current) observer.observe(r.current) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen select-none" style={{ minWidth: COLS * COL_WIDTH }}>

      {/* ── Navbar ── */}
      <nav className="bg-[#2C5282] h-11 flex items-center px-6 border-b border-white/10">
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

      {/* ── Header ── */}
      <header className="bg-gradient-to-b from-[#90CDF4] to-[#63B3ED]">
        <div className="px-8 pt-4 pb-3">
          <div className="inline-flex items-center gap-2 bg-[#BEE3F8] rounded-lg px-3 py-1.5 mb-3">
            <svg className="w-3.5 h-3.5 text-[#2A4365]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="text-[#2A4365] text-[11px] font-semibold">Fluxo de Processo</span>
          </div>
          <h1 className="text-[#2A4365] text-[24px] font-bold leading-tight">CONVÊNIO DE PD&I</h1>
        </div>

        {/* imagens */}
        <div style={GRID} className="pt-2 pb-4 px-0">
          {STAGES.map((s, i) => (
            <div key={i} className="flex justify-center items-end pb-1 min-h-[6rem]">
              {s.img ? (
                <img src={s.img} alt={s.label} className="h-24 object-contain" draggable={false} />
              ) : null}
            </div>
          ))}
        </div>

        {/* caixas brancas com nome das etapas */}
        <div style={{ ...GRID, columnGap: 2 }}>
          {STAGES.map((s, i) => (
            <div key={i} className="flex justify-center">
              <div className="bg-white w-full min-w-0 h-14 flex flex-col items-center justify-center px-2 box-border">
                {s.label.split('\n').map((line, j) => (
                  <div key={j} className="text-[#2A4365] font-bold text-[11.5px] leading-tight text-center">{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ── Área da cobra + cards ── */}
      <div className="flow-gradient pt-5">
        <div className="relative" style={{ ...GRID, minHeight: 520, paddingTop: extraTop }}>

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
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          {/* Col 2 – Manifestação Técnica ou NIT (acima) */}
          <StageCol index={2}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
                <DownloadButton />
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
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          {/* Col 5 – Minuta do Convênio (abaixo) */}
          <StageCol index={5}>
            <ProcessCard position="below">
              <CardBody>Minuta do Convênio para Pesquisa, Desenvolvimento e Inovação</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          {/* Col 6 – Planilha Demonstrativa de Custo (acima) */}
          <StageCol index={6}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardBody>Planilha demonstrativa dos custos operacionais incorridos na execução das atividades</CardBody>
                <DownloadButton />
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

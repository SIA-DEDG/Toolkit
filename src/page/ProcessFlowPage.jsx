import React, { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeDiamond, NodeTriangle } from '../components/ProcessNode'
import SnakePath from '../components/SnakePath'

const STAGES = [
  { label: 'Início',                             img: '/assets/cuate.png' },
  { label: 'Formalização\nda Demanda',           img: '/assets/documentos.png' },
  { label: 'Manifestação\nTécnica ou NIT',       img: '/assets/lawyer.png' },
  { label: 'Plano de\nTrabalho',                 img: '/assets/schedule.png' },
  { label: 'Acordo de\nParceria',                img: '/assets/ageement.png' },
  { label: 'Autorização da\nContratação (CGFR)', img: '/assets/consent.png' },
  { label: 'Autorizações',                       img: '/assets/sent-massage.png' },
  { label: 'Indicação do\nGestor no Acordo',     img: '/assets/business-deal.png' },
  { label: 'Publicação\nno DOE',                 img: '/assets/publish-article.png' },
]

const NODE_TOP = [206, 255, 164, 255, 164, 255, 164, 255, 204]

function CardTitle({ children }) {
  return <p className="font-bold text-[12px] text-[#2A4365] mb-1 leading-tight">{children}</p>
}
function CardBody({ children }) {
  return <p className="text-[10.5px] leading-snug text-[#2A4365]/90">{children}</p>
}

function StageCol({ index, children, extra }) {
  const topPx = NODE_TOP[index]

  return (
    <div className="flex flex-col items-center relative" style={{ paddingTop: topPx }}>
      {children}
      {extra && <div className="mt-3">{extra}</div>}
    </div>
  )
}

export default function ProcessFlowPage() {
  const [extraTop, setExtraTop] = useState(0)
  const aboveRef2 = useRef(null)
  const aboveRef4 = useRef(null)
  const aboveRef6 = useRef(null)

  useEffect(() => {
    const heights = [aboveRef2, aboveRef4, aboveRef6].map(r => r.current?.offsetHeight ?? 0)
    const overflow = Math.max(0, Math.max(...heights) - 171) + 8
    setExtraTop(overflow)
  }, [])

  return (
    <div className="min-h-screen select-none" style={{ minWidth: 1260 }}>
      <nav className="bg-[#2C5282] h-11 flex items-center px-6 border-b border-white/10">
        <button className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-90 transition-opacity font-sans">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Voltar ao Painel
        </button>
      </nav>

      <header className="bg-gradient-to-b from-[#90CDF4] to-[#63B3ED]">
        <div className="px-8 pt-4 pb-3">
          <div className="inline-flex items-center gap-2 bg-[#BEE3F8] rounded-lg px-3 py-1.5 mb-3">
            <svg className="w-3.5 h-3.5 text-[#2A4365]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="text-[#2A4365] text-[11px] font-semibold">Fluxo de Processo</span>
          </div>
          <h1 className="text-[#2A4365] text-[24px] font-bold leading-tight">(Nome da Trajetória)</h1>
        </div>
        <div className="grid grid-cols-9 pt-2 pb-4 px-0">
          {STAGES.map((s, i) => (
            <div key={i} className="flex justify-center items-end pb-1 min-h-[6rem]">
              {s.img ? (
                <img
                  src={s.img}
                  alt={s.label}
                  className="h-24 object-contain"
                  draggable={false}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 mt-0 mb-0 gap-x-0.5 px-0">
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

      <div className="flow-gradient pt-5">

        <div className="relative grid grid-cols-9" style={{ minHeight: 520, paddingTop: extraTop }}>

          <div className="absolute inset-0 pointer-events-none" style={{ gridColumn: '1 / -1' }}>
            <SnakePath extraTop={extraTop} />
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
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol index={2}>
            <div ref={aboveRef2} className="absolute flex flex-col items-center" style={{ bottom: 'calc(100% - 171px)', left: '50%', transform: 'translateX(-50%)' }}>
              <ProcessCard position="above" width={172}>
                <CardBody>
                  Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados
                </CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol index={3}>
            <ProcessCard position="below" width={168}>
              <CardBody>
                Plano de trabalho do acordo entre as instituições contendo a descrição das atividades, objetivos e metas do acordo
              </CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol index={4}>
            <div ref={aboveRef4} className="absolute flex flex-col items-center" style={{ bottom: 'calc(100% - 171px)', left: '50%', transform: 'translateX(-50%)' }}>
              <ProcessCard position="above" width={178}>
                <CardBody>
                  Documento do Acordo de parceria firmado
                </CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol index={5}>
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-[#2A4365] h-10 flex-shrink-0" />
              <div className="border-2 border-dashed border-[#2A4365] rounded-lg bg-white/80 px-3 py-1.5 text-[12px] font-bold text-[#2A4365] whitespace-nowrap shadow">
                Possui Recurso?
              </div>

              <svg width="308" height="24" viewBox="0 0 308 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 flex-shrink-0">
                <line x1="154" y1="0" x2="154" y2="12" stroke="#2A4365" strokeWidth="2" />
                <line x1="74" y1="12" x2="234" y2="12" stroke="#2A4365" strokeWidth="2" />
                <line x1="74" y1="12" x2="74" y2="24" stroke="#2A4365" strokeWidth="2" />
                <line x1="234" y1="12" x2="234" y2="24" stroke="#2A4365" strokeWidth="2" />
              </svg>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <NodeDiamond />
                  <span className="text-[11px] font-bold text-[#2A4365] mb-1">Sim</span>
                  <div className="process-card p-2.5 text-[#2A4365] text-center rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg cursor-pointer" style={{ width: 148 }}>
                    <p className="font-bold text-[11px] text-[#2A4365] mb-1">Convênio</p>
                    <p className="text-[10px] text-[#2A4365]/90 leading-snug">
                      Acordo de Parceria para Pesquisa, Desenvolvimento e Inovação (PD&I) é um instrumento jurídico que formaliza a colaboração técnica entre instituições públicas e parceiros, visando criar tecnologias, produtos ou processos inovadores. Regido pela Lei de Inovação (Lei 10.973/2004)
                    </p>
                    <DownloadButton />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <NodeDiamond />
                  <span className="text-[11px] font-bold text-[#2A4365] mb-1">Não</span>
                  <div className="process-card p-2.5 text-[#2A4365] text-center rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg cursor-pointer" style={{ width: 148 }}>
                    <div className="inline-flex items-center gap-1 bg-[#2A4365]/10 border border-[#2A4365]/30 rounded-full px-2 py-0.5 mb-1">
                      <div className="w-2 h-2 rounded-full border border-[#2A4365]" />
                      <span className="text-[9.5px] font-bold text-[#2A4365]">Continue no Fluxo</span>
                    </div>
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
            <div ref={aboveRef6} className="absolute flex flex-col items-center" style={{ bottom: 'calc(100% - 171px)', left: '50%', transform: 'translateX(-50%)' }}>
              <ProcessCard position="above" width={190}>
                <div className="space-y-1 mb-1">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10.5px] font-bold text-[#2A4365]">1–</span>
                      <span className="text-[10.5px] text-[#2A4365]">Autorização do Secretário da SEAD</span>
                      <span className="text-[#2A4365] font-bold text-[11px]">∨</span>
                    </div>
                    <p className="text-[9.5px] text-[#2A4365]/75 leading-snug pl-3">
                      Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&amp;I *verificar mudança para SIA
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10.5px] font-bold text-[#2A4365]">2–</span>
                    <span className="text-[10.5px] text-[#2A4365]">Autorização da SEFAZ</span>
                    <span className="text-[#2A4365] font-bold text-[11px]">›</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10.5px] font-bold text-[#2A4365]">3–</span>
                    <span className="text-[10.5px] text-[#2A4365]">Autorização da PGE</span>
                    <span className="text-[#2A4365] font-bold text-[11px]">›</span>
                  </div>
                </div>
                <DownloadButton />
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

import { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeDiamond, NodeTriangle } from '../components/ProcessNode'
import FlowNavBar from '../components/FlowNavBar'
import SnakePath, { ABOVE_ANCHOR } from '../components/SnakePath'
import BackNavbar from '../components/BackNavbar'
import FlowFooter from '../components/FlowFooter'
import StageCol from '../components/StageCol'
import AccordionItem from '../components/AccordionItem'
import { CardTitle, CardBody } from '../components/CardParts'
import MobileFlowLayout from '../components/MobileFlowLayout'
import { useIsMobile } from '../hooks/useIsMobile'

const NODE_TOP = [186, 223, 156, 223, 156, 223, 156, 223, 184]
const COLS      = 9
const COL_WIDTH = 185

const CARDS = [
  { title: 'Início', text: 'Necessidade do órgão desenvolver uma pesquisa', download: false },
  { title: 'Formalização da Demanda', text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true, fileKey: 'acordo-pd&i/Documento_Formalizacao_Demanda_PDI.docx' },
  { title: 'Manifestação Técnica ou NIT', text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true, fileKey: 'acordo-pd&i/Manifestacao_Tecnica_PDI.docx' },
  { title: 'Plano de Trabalho', text: 'Plano de trabalho do acordo entre as instituições contendo a descrição das atividades, objetivos e metas do acordo', download: true, fileKey: 'acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx' },
  { title: 'Acordo de Parceria', text: 'Documento do Acordo de parceria firmado', download: true, fileKey: 'acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx' },
  { title: 'Autorização da Contratação (CGFR)', text: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados (CGFR). Caso haja recurso financeiro do ente público: Convênio. Caso contrário: Acordo.', download: true, fileKey: 'acordo-pd&i/Planilha_Custos_Operacionais_PDI.xlsx' },
  {
    title: 'Autorizações', accordion: true, accordionItems: [
      { number: '1', title: 'Autorização do Secretário da SEAD', description: 'Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA' },
      { number: '2', title: 'Autorização da SEFAZ', description: 'Secretaria de Estado da Fazenda devido a repasses de recursos' },
      { number: '3', title: 'Autorização da PGE', description: 'Procuradoria Geral do Estado para verificação' },
    ], download: true, fileKey: 'acordo-pd&i/Lista de Verificação - Acordo PD&I.docx'
  },
  { title: 'Indicação do Gestor no Acordo', text: 'Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI', download: true },
  { title: 'Publicação no DOE', text: 'Publicação no Diário Oficial do Estado do Piauí', download: false },
]

const GRID = {
  display: 'grid',
  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
}

function DesktopLayout() {
  const [extraTop, setExtraTop] = useState(0)
  const ref2 = useRef(null)
  const ref4 = useRef(null)
  const ref6 = useRef(null)
  const refs = [ref2, ref4, ref6]

  useEffect(() => {
    const recalculate = () => {
      const heights = refs.map(r => r.current?.offsetHeight ?? 0)
      setExtraTop(Math.max(0, Math.max(...heights) - 163) + 8)
    }
    recalculate()
    const observer = new ResizeObserver(recalculate)
    refs.forEach(r => { if (r.current) observer.observe(r.current) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ minWidth: COLS * COL_WIDTH }}>
      <BackNavbar />
      <div style={{ height: 44, flexShrink: 0 }} />
      <FlowNavBar />

      <div className="flow-gradient pt-5 flex-1">
        <div className="relative" style={{ ...GRID, minHeight: 450, paddingTop: extraTop }}>
          <div className="absolute inset-0 pointer-events-none" style={{ gridColumn: '1 / -1' }}>
            <SnakePath extraTop={extraTop} cols={COLS} colWidth={COL_WIDTH} />
          </div>

          <StageCol paddingTop={NODE_TOP[0]}>
            <NodeCircle />
            <ProcessCard position="below" showNode={false}>
              <CardTitle>Início</CardTitle>
              <CardBody>Necessidade do órgão desenvolver uma pesquisa</CardBody>
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[1]}>
            <ProcessCard position="below">
              <CardTitle>Formalização da Demanda</CardTitle>
              <CardBody>Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;</CardBody>
              <DownloadButton fileKey="acordo-pd&i/Documento_Formalizacao_Demanda_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[2]}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Manifestação Técnica ou NIT</CardTitle>
                <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
                <DownloadButton fileKey="acordo-pd&i/Manifestacao_Tecnica_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[3]}>
            <ProcessCard position="below">
              <CardTitle>Plano de Trabalho</CardTitle>
              <CardBody>Plano de trabalho do acordo entre as instituições contendo a descrição das atividades, objetivos e metas do acordo</CardBody>
              <DownloadButton fileKey="acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[4]}>
            <div ref={ref4} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Acordo de Parceria</CardTitle>
                <CardBody>Documento do Acordo de parceria firmado</CardBody>
                <DownloadButton fileKey="acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[5]}>
            <div className="flex flex-col items-center">
              <div className="w-[3px] bg-[#2B6CB0] h-10 flex-shrink-0" />
              <div className="flex gap-3">
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

          <StageCol paddingTop={NODE_TOP[6]}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Autorização do Secretário da SEAD" description="Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA" />
                  <AccordionItem number="2" title="Autorização da SEFAZ" description="Secretaria de Estado da Fazenda devido a repasses de recursos" />
                  <AccordionItem number="3" title="Autorização da PGE" description="Procuradoria Geral do Estado para verificação" />
                </div>
                <DownloadButton fileKey="acordo-pd&i/Lista de Verificação - Acordo PD&I.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[7]}>
            <ProcessCard position="below">
              <CardTitle>Indicação do Gestor no Acordo</CardTitle>
              <CardBody>Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[8]}>
            <NodeTriangle />
            <ProcessCard position="below" showNode={false}>
              <CardTitle>Publicação no DOE</CardTitle>
              <CardBody>Publicação no Diário Oficial do Estado do Piauí</CardBody>
            </ProcessCard>
          </StageCol>
        </div>
        <div className="h-8" />
      </div>

      <FlowFooter />
    </div>
  )
}

export default function AcordoPDIPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileFlowLayout cards={CARDS} /> : <DesktopLayout />
}

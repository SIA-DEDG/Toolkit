import { useEffect, useRef, useState } from 'react'
import DownloadButton from '../components/DownloadButton'
import ProcessCard from '../components/ProcessCard'
import { NodeCircle, NodeTriangle } from '../components/ProcessNode'
import FlowNavBar from '../components/FlowNavBar'
import SnakePath, { ABOVE_ANCHOR } from '../components/SnakePath'
import BackNavbar from '../components/BackNavbar'
import FlowFooter from '../components/FlowFooter'
import StageCol from '../components/StageCol'
import AccordionItem from '../components/AccordionItem'
import { CardTitle, CardBody } from '../components/CardParts'
import MobileFlowLayout from '../components/MobileFlowLayout'
import { useIsMobile } from '../hooks/useIsMobile'

const NODE_TOP = [186, 223, 156, 223, 156, 223, 156, 223, 156, 223, 156, 223, 156, 184]
const COLS      = 14
const COL_WIDTH = 185

const CARDS = [
  { title: 'Início', text: 'Necessidade do órgão desenvolver uma pesquisa', download: false },
  { title: 'Formalização da Demanda', text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true },
  { title: 'Estudo Técnico Preliminar', text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true },
  { title: 'Mapa de Risco', text: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.', download: true },
  { title: 'Termo de Referência', text: 'O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros', download: true },
  { title: 'Aprovações', text: 'Aprovação do ETP e do mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado', download: true },
  { title: 'Exame e parecer Técnico do NIT', text: 'Exame e parecer técnico do Núcleo de Inovação Tecnológica – NIT', download: false, note: 'Caso a contratação preveja cláusula de exclusividade, informar se houve a manifestação de outros potenciais parceiros tecnológicos em site eletrônico oficial da ICT e se foram atendidos os §§ 1º, 4º, art. 75 do Decreto n. 10.534 / Decreto 23.676/PI' },
  { title: 'Habilitação da ICT ou Empresa', text: null, download: false },
  { title: 'Plano de Trabalho', text: 'Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio', download: true },
  { title: 'Minuta do Contrato', text: null, download: true },
  { title: 'Autorizações', accordion: true, accordionItems: [
    { number: '1', title: 'Autorização da CGE', description: '' },
    { number: '2', title: 'Autorização da PGE', description: '' },
    { number: '3', title: 'Autorização do Secretário da SEAD', description: '' },
    { number: '4', title: 'Autorização da SEFAZ', description: '' },
  ], download: true },
  { title: 'Indicação do Fiscal do Contrato ou Comissão', text: null, download: false },
  { title: 'Publicação no DOE', text: 'Publicação no Diário Oficial do Estado do Piauí', download: false },
  { title: 'Comunicação TCE', text: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato', download: false },
]

const GRID = {
  display: 'grid',
  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
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
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[2]}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Estudo Técnico Preliminar</CardTitle>
                <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[3]}>
            <ProcessCard position="below">
              <CardTitle>Mapa de Risco</CardTitle>
              <CardBody>Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[4]}>
            <div ref={ref4} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Termo de Referência</CardTitle>
                <CardBody>O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[5]}>
            <ProcessCard position="below">
              <CardTitle>Aprovações</CardTitle>
              <CardBody>Aprovação do ETP e do mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[6]}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Exame e parecer Técnico do NIT</CardTitle>
                <CardBody>Exame e parecer técnico do Núcleo de Inovação Tecnológica – NIT</CardBody>
              </ProcessCard>
            </div>
            <div className="flex flex-col items-center mt-16" style={{ width: 160 }}>
              <div className="border-2 border-dashed border-[#2A4365]/60 rounded-lg bg-white/70 px-2.5 py-2">
                <p className="text-[9.5px] text-[#2A4365]/80 leading-snug">
                  Caso a contratação preveja cláusula de exclusividade, informar se houve a manifestação de outros potenciais parceiros tecnológicos em site eletrônico oficial da ICT e se foram atendidos os §§ 1º, 4º, art. 75 do Decreto n. 10.534 / Decreto 23.676/PI
                </p>
              </div>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[7]} />

          <StageCol paddingTop={NODE_TOP[8]}>
            <div ref={ref8} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Plano de Trabalho</CardTitle>
                <CardBody>Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[9]}>
            <ProcessCard position="below">
              <CardTitle>Minuta do Contrato</CardTitle>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[10]}>
            <div ref={ref10} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Autorização da CGE" description="" />
                  <AccordionItem number="2" title="Autorização da PGE" description="" />
                  <AccordionItem number="3" title="Autorização do Secretário da SEAD" description="" />
                  <AccordionItem number="4" title="Autorização da SEFAZ" description="" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[11]}>
            <ProcessCard position="below">
              <CardTitle>Indicação do Fiscal do Contrato ou Comissão</CardTitle>
              <CardBody></CardBody>
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[12]}>
            <div ref={ref12} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Publicação no DOE</CardTitle>
                <CardBody>Publicação no Diário Oficial do Estado do Piauí</CardBody>
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[13]}>
            <NodeTriangle />
          </StageCol>
        </div>
        <div className="h-8" />
      </div>

      <FlowFooter />
    </div>
  )
}

export default function ContratoTransferenciaTecnologiaPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileFlowLayout cards={CARDS} /> : <DesktopLayout />
}

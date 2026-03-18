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
  { title: 'Formalização da Demanda', text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true, fileKey: 'encomenda-tecnologica/1. Documento_Formalizacao_Demanda_PDI.docx' },
  { title: 'Estudo Técnico Preliminar', text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true, fileKey: 'encomenda-tecnologica/2. Estudo Preliminar_Encomenda_Tecnologica.docx' },
  { title: 'Mapa de Risco', text: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.', download: true, fileKey: 'encomenda-tecnologica/3. Mapa_de_Riscos_Contratacao.docx' },
  { title: 'Manifestação de Interesse', text: 'Manifestação de interesse, quando for o caso (art. 27, §4°, do Decreto Federal n. 9.283/2018);', download: true },
  { title: 'Termo de Referência', text: 'Minuta do Termo de Referência (art. 72, I, da Lei n. 14.133/2021; art. 17, V, do Decreto Estadual n. 21.872/2023);', download: true, fileKey: 'encomenda-tecnologica/4. Termo_de_Referencia_PDI.docx' },
  { title: 'Autorizações', accordion: true, accordionItems: [
    { number: '1', title: 'Aprovação do ETP, Mapa de Risco e Termo de Referência', description: 'Aprovação do ETP e do Mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado' },
    { number: '2', title: 'Análise Técnico Operacional da SEAD', description: '' },
    { number: '3', title: 'Autorização do Conselho de Transformação Digital', description: '' },
  ], download: true },
  { title: 'Proposta e Documentação do Fornecedor', text: 'Minuta da Proposta comercial do fornecedor; acompanhada de justificativa para a precificação da ETEC;', download: true, fileKey: 'encomenda-tecnologica/Modelo_Plano_de_Trabalho_PDI.docx' },
  { title: 'Autorização da Contratação pela CGFR', text: 'Minuta da Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR', download: true },
  { title: 'Minuta do Contrato', text: 'Minuta do contrato para celebração Encomenda Tecnológica', download: true, fileKey: 'encomenda-tecnologica/5. Minuta_Contrato_Transferencia_Tecnologia.docx' },
  { title: 'Autorizações', accordion: true, accordionItems: [
    { number: '1', title: 'Análise prévia da CGE', description: '' },
    { number: '2', title: 'Parecer PGE', description: '' },
    { number: '3', title: 'Autorização do Secretário da SEAD', description: '' },
    { number: '4', title: 'Parecer SEFAZ', description: '' },
    { number: '5', title: 'Análise Final pelo controle final do órgão', description: '' },
  ], download: true },
  { title: 'Indicação do Fiscal do Contrato ou Comissão', text: 'Indicação do fiscal do contrato ou comissão equivalente, preferencialmente, do setor que receberá o bem ou serviço', download: false },
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
              <DownloadButton fileKey="encomenda-tecnologica/1. Documento_Formalizacao_Demanda_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[2]}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Estudo Técnico Preliminar</CardTitle>
                <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
                <DownloadButton fileKey="encomenda-tecnologica/2. Estudo Preliminar_Encomenda_Tecnologica.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[3]}>
            <ProcessCard position="below">
              <CardTitle>Mapa de Risco</CardTitle>
              <CardBody>Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.</CardBody>
              <DownloadButton fileKey="encomenda-tecnologica/3. Mapa_de_Riscos_Contratacao.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[4]}>
            <div ref={ref4} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Manifestação de Interesse</CardTitle>
                <CardBody>Manifestação de interesse, quando for o caso (art. 27, §4°, do Decreto Federal n. 9.283/2018);</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[5]}>
            <ProcessCard position="below">
              <CardTitle>Termo de Referência</CardTitle>
              <CardBody>Minuta do Termo de Referência (art. 72, I, da Lei n. 14.133/2021; art. 17, V, do Decreto Estadual n. 21.872/2023);</CardBody>
              <DownloadButton fileKey="encomenda-tecnologica/4. Termo_de_Referencia_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[6]}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Aprovação do ETP, Mapa de Risco e Termo de Referência" description="Aprovação do ETP e do Mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado" />
                  <AccordionItem number="2" title="Análise Técnico Operacional da SEAD" description="" />
                  <AccordionItem number="3" title="Autorização do Conselho de Transformação Digital" description="" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[7]}>
            <ProcessCard position="below">
              <CardTitle>Proposta e Documentação do Fornecedor</CardTitle>
              <CardBody>Minuta da Proposta comercial do fornecedor; acompanhada de justificativa para a precificação da ETEC;</CardBody>
              <DownloadButton fileKey="encomenda-tecnologica/Modelo_Plano_de_Trabalho_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[8]}>
            <div ref={ref8} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorização da Contratação pela CGFR</CardTitle>
                <CardBody>Minuta da Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[9]}>
            <ProcessCard position="below">
              <CardTitle>Minuta do Contrato</CardTitle>
              <CardBody>Minuta do contrato para celebração Encomenda Tecnológica</CardBody>
              <DownloadButton fileKey="encomenda-tecnologica/5. Minuta_Contrato_Transferencia_Tecnologia.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[10]}>
            <div ref={ref10} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Autorizações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Análise prévia da CGE" description="" />
                  <AccordionItem number="2" title="Parecer PGE" description="" />
                  <AccordionItem number="3" title="Autorização do Secretário da SEAD" description="" />
                  <AccordionItem number="4" title="Parecer SEFAZ" description="" />
                  <AccordionItem number="5" title="Análise Final pelo controle final do órgão" description="" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[11]}>
            <ProcessCard position="below">
              <CardTitle>Indicação do Fiscal do Contrato ou Comissão</CardTitle>
              <CardBody>Indicação do fiscal do contrato ou comissão equivalente, preferencialmente, do setor que receberá o bem ou serviço</CardBody>
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
            <ProcessCard position="below" showNode={false}>
              <CardTitle>Comunicação TCE</CardTitle>
              <CardBody>Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato</CardBody>
            </ProcessCard>
          </StageCol>
        </div>
        <div className="h-8" />
      </div>

      <FlowFooter />
    </div>
  )
}

export default function EncomendaTecnologicaPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileFlowLayout cards={CARDS} /> : <DesktopLayout />
}

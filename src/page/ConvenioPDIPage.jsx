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

const NODE_TOP = [186, 223, 156, 223, 156, 223, 156, 223, 156, 223, 156, 223, 184]
const COLS      = 13
const COL_WIDTH = 185

const CARDS = [
  { title: 'Início', text: 'Necessidade do órgão desenvolver uma pesquisa', download: false },
  { title: 'Formalização da Demanda', text: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria;', download: true, fileKey: 'convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx' },
  { title: 'Manifestação Técnica ou NIT', text: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', download: true, fileKey: 'convenio-pd&i/Manifestacao_Tecnica_PDI.docx' },
  { title: 'Edital de Chamamento', text: 'Minuta do Edital de chamamento', download: true },
  { title: 'Plano de Trabalho', text: 'Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio', download: true, fileKey: 'convenio-pd&i/Modelo_Plano_de_Trabalho_PDI.docx' },
  { title: 'Minuta do Convênio', text: 'Minuta do Convênio para Pesquisa, Desenvolvimento e Inovação', download: true, fileKey: 'convenio-pd&i/Minuta_Convênio_Parceria_PDI.docx' },
  { title: 'Planilha Demonstrativa de Custo', text: 'Planilha demonstrativa dos custos operacionais incorridos na execução das atividades', download: true, fileKey: 'convenio-pd&i/Planilha_Custos_Operacionais_PDI.xlsx' },
  { title: 'Autorização CGFR', text: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR', download: true },
  { title: 'Documentações', accordion: true, accordionItems: [
    { number: '1', title: 'Parceiro privado', description: '' },
    { number: '2', title: 'Parceiro público', description: '' },
    { number: '3', title: 'Fundação de Apoio', description: '' },
  ], download: true },
  { title: 'Análises', accordion: true, accordionItems: [
    { number: '1', title: 'Análise Prévia CGE', description: '' },
    { number: '2', title: 'Parecer PGE', description: '' },
    { number: '3', title: 'Autorização do Secretário da SEAD', description: '' },
    { number: '4', title: 'Parecer SEFAZ', description: '' },
  ], download: true },
  { title: 'Indicação do Gestor do Convênio', text: 'Indicação do gestor do convênio PD&I', download: true },
  { title: 'Publicação no DOE', text: 'Publicação no Diário Oficial do Estado do Piauí pela SEGOV', download: false },
  { title: 'Registro da Publicação do Convênio (SIGRP)', text: 'Registro da publicação do convênio no SIGRP', download: false },
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
  const refs  = [ref2, ref4, ref6, ref8, ref10]

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
              <DownloadButton fileKey="convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[2]}>
            <div ref={ref2} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Manifestação Técnica ou NIT</CardTitle>
                <CardBody>Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados</CardBody>
                <DownloadButton fileKey="convenio-pd&i/Manifestacao_Tecnica_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[3]}>
            <ProcessCard position="below">
              <CardTitle>Edital de Chamamento</CardTitle>
              <CardBody>Minuta do Edital de chamamento</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[4]}>
            <div ref={ref4} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Plano de Trabalho</CardTitle>
                <CardBody>⁠Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio</CardBody>
                <DownloadButton fileKey="convenio-pd&i/Modelo_Plano_de_Trabalho_PDI.docx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[5]}>
            <ProcessCard position="below">
              <CardTitle>Minuta do Convênio</CardTitle>
              <CardBody>Minuta do Convênio para Pesquisa, Desenvolvimento e Inovação</CardBody>
              <DownloadButton fileKey="convenio-pd&i/Minuta_Convênio_Parceria_PDI.docx" />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[6]}>
            <div ref={ref6} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Planilha Demonstrativa de Custo</CardTitle>
                <CardBody>Planilha demonstrativa dos custos operacionais incorridos na execução das atividades</CardBody>
                <DownloadButton fileKey="convenio-pd&i/Planilha_Custos_Operacionais_PDI.xlsx" />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[7]}>
            <ProcessCard position="below">
              <CardTitle>Autorização CGFR</CardTitle>
              <CardBody>Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR</CardBody>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[8]}>
            <div ref={ref8} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Documentações</CardTitle>
                <div className="space-y-1 mb-1">
                  <AccordionItem number="1" title="Parceiro privado" description="Descrição placeholder item 1" />
                  <AccordionItem number="2" title="Parceiro público" description="Descrição placeholder item 2" />
                  <AccordionItem number="3" title="Fundação de Apoio" description="Descrição placeholder item 3" />
                </div>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[9]}>
            <ProcessCard position="below">
              <CardTitle>Análises</CardTitle>
              <div className="space-y-1 mb-1">
                <AccordionItem number="1" title="Análise Prévia CGE" description="Descrição placeholder item 1" />
                <AccordionItem number="2" title="Parecer PGE" description="Descrição placeholder item 2" />
                <AccordionItem number="3" title="Autorização do Secretário da SEAD" description="Descrição placeholder item 3" />
                <AccordionItem number="4" title="Parecer SEFAZ" description="Descrição placeholder item 4" />
              </div>
              <DownloadButton />
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[10]}>
            <div ref={ref10} className="absolute flex flex-col items-center" style={ABOVE_ANCHOR}>
              <ProcessCard position="above">
                <CardTitle>Indicação do Gestor do Convênio</CardTitle>
                <CardBody>Indicação do gestor do convênio PD&I</CardBody>
                <DownloadButton />
              </ProcessCard>
            </div>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[11]}>
            <ProcessCard position="below">
              <CardTitle>Publicação no DOE</CardTitle>
              <CardBody>⁠Publicação no Diário Oficial do Estado do Piauí pela SEGOV</CardBody>
            </ProcessCard>
          </StageCol>

          <StageCol paddingTop={NODE_TOP[12]}>
            <NodeTriangle />
            <ProcessCard position="below" showNode={false}>
              <CardTitle>Registro da Publicação do Convênio (SIGRP)</CardTitle>
              <CardBody>Registro da publicação do convênio no SIGRP</CardBody>
            </ProcessCard>
          </StageCol>
        </div>
        <div className="h-8" />
      </div>

      <FlowFooter />
    </div>
  )
}

export default function ConvenioPDIPage() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileFlowLayout cards={CARDS} /> : <DesktopLayout />
}

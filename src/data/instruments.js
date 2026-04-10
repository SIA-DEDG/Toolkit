export const INSTRUMENT_FLOWS = [
  {
    id: 'acordo-pd&i',
    title: 'Acordo de Parceria PD&I',
    subtitle: 'Sem repasse financeiro · Instrumento 1',
    href: '/acordo-pd&i',
    accentColor: '#08ba9c',
    icon: '🤝',
    downloadKey: 'acordo-pd&i/relatorio_acordo_pd&i.pdf',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria',
        fileKey: 'acordo-pd&i/Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Manifestação Técnica ou NIT',
        description: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados',
        fileKey: 'acordo-pd&i/Manifestacao_Tecnica_PDI.docx'
      },
      {
        title: 'Plano de Trabalho',
        description: 'Plano de trabalho do acordo entre as instituições contendo a descrição das atividades, objetivos e metas do acordo',
        fileKey: 'acordo-pd&i/Modelo_Plano_de_Trabalho_PDI.docx'
      },
      {
        title: 'Planilha de Custos Operacionais',
        description: 'Planilha demonstrativa dos custos operacionais incorridos na execução das atividades, quando houver participação de recurso financeiro do ente público no projeto de pesquisa.',
        fileKey: 'acordo-pd&i/Planilha_Custos_Operacionais_PDI.xlsx'
      },
      {
        title: 'Autorização da Contratação (CGFR)',
        description: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados (CGFR). Caso haja recurso financeiro do ente público: Convênio. Caso contrário: Acordo.'
      },
      {
        title: 'Acordo de Parceria',
        description: 'Documento do Acordo de Parceria Firmado (Privado, Público, Fundação de Apoio)',
        fileKey: 'acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Análise prévia da CGE', 
            description: 'Análise prévia da Controladoria Geral do Estado (CGE) em contratações de grandes valores e complexidade' },
          { number: '2', 
            title: 'Autorização da PGE', 
            description: 'Procuradoria Geral do Estado para verificação' },
          { number: '3', title: 'Autorização do Secretário da SEAD', 
            description: 'Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA' },
          { number: '4', title: 'Autorização da SEFAZ', 
            description: 'Secretaria de Estado da Fazenda devido a repasses de recursos' },
        ],
      },
      { title: 'Indicação do Gestor no Acordo', description: 'Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI' },
      { title: 'Publicação no DOE', description: 'Publicação no Diário Oficial do Estado do Piauí' },
    ],
  },
  {
    id: 'convenio-pd&i',
    title: 'Convênio de PD&I',
    subtitle: 'Com repasse financeiro · Instrumento 2',
    href: '/convenio-pd&i',
    accentColor: '#209828',
    icon: '📋',
    downloadKey: 'convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria',
        fileKey: 'convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Manifestação Técnica ou NIT',
        description: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados', fileKey: 'convenio-pd&i/Manifestacao_Tecnica_PDI.docx'
      },
      {
        title: 'Edital de Chamamento',
        description: 'Minuta do Edital de chamamento'
      },
      {
        title: 'Plano de Trabalho',
        description: 'Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio',
        fileKey: 'convenio-pd&i/Modelo_Plano_de_Trabalho_PDI.docx'
      },
      {
        title: 'Minuta do Convênio',
        description: 'Minuta do Convênio para Pesquisa, Desenvolvimento e Inovação',
        fileKey: 'convenio-pd&i/Minuta_Convenio_Parceria_PDI.docx'
      },
      {
        title: 'Planilha Demonstrativa de Custo',
        description: 'Planilha demonstrativa dos custos operacionais incorridos na execução das atividades',
        fileKey: 'convenio-pd&i/Planilha_Custos_Operacionais_PDI.xlsx'
      },
      {
        title: 'Autorização CGFR',
        description: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR'
      },
      {
        title: 'Documentações',
        subitems: [
          { number: '1', title: 'Parceiro privado' },
          { number: '2', title: 'Parceiro público' },
          { number: '3', title: 'Fundação de Apoio' },
        ],
      },
      {
        title: 'Análises',
        subitems: [
          { number: '1', title: 'Análise Prévia CGE' },
          { number: '2', title: 'Parecer PGE' },
          { number: '3', title: 'Autorização do Secretário da SEAD' },
          { number: '4', title: 'Parecer SEFAZ' },
        ],
      },
      {
        title: 'Indicação do Gestor do Convênio',
        description: 'Indicação do gestor do convênio PD&I'
      },
      {
        title: 'Publicação no DOE',
        description: 'Publicação no Diário Oficial do Estado do Piauí pela SEGOV'
      },
      {
        title: 'Registro da Publicação do Convênio (SIGRP)',
        description: 'Registro da publicação do convênio no SIGRP'
      },
    ],
  },
  {
    id: 'encomenda-tecnologica',
    title: 'Encomenda Tecnológica',
    subtitle: 'Lei nº 10.973/2004 · Instrumento 3',
    href: '/encomenda-tecnologica',
    accentColor: '#0e59a8',
    icon: '🖥️',
    downloadKey: 'encomenda-tecnologica/1. Documento_Formalizacao_Demanda_PDI.docx',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria',
        fileKey: 'encomenda-tecnologica/1. Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Estudo Técnico Preliminar',
        description: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados',
        fileKey: 'encomenda-tecnologica/2. Estudo Preliminar_Encomenda_Tecnologica.docx'
      },
      {
        title: 'Mapa de Risco',
        description: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.',
        fileKey: 'encomenda-tecnologica/3. Mapa_de_Riscos_Contratacao.docx'
      },
      {
        title: 'Manifestação de Interesse',
        description: 'Manifestação de interesse, quando for o caso (art. 27, §4°, do Decreto Federal n. 9.283/2018)'
      },
      {
        title: 'Termo de Referência',
        description: 'Minuta do Termo de Referência (art. 72, I, da Lei n. 14.133/2021; art. 17, V, do Decreto Estadual n. 21.872/2023)',
        fileKey: 'encomenda-tecnologica/4. Termo_de_Referencia_PDI.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Aprovação do ETP, Mapa de Risco e Termo de Referência', description: 'Aprovação do ETP e do Mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado' },
          { number: '2', title: 'Análise Técnico Operacional da SEAD' },
          { number: '3', title: 'Autorização do Conselho de Transformação Digital' },
        ],
      },
      {
        title: 'Proposta e Documentação do Fornecedor',
        description: 'Minuta da Proposta comercial do fornecedor; acompanhada de justificativa para a precificação da ETEC'
      },
      {
        title: 'Autorização da Contratação pela CGFR',
        description: 'Minuta da Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR'
      },
      {
        title: 'Minuta do Contrato',
        description: 'Minuta do contrato para celebração Encomenda Tecnológica',
        fileKey: 'encomenda-tecnologica/5. Minuta_Contrato_Transferencia_Tecnologia.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Análise prévia da CGE' },
          { number: '2', title: 'Parecer PGE' },
          { number: '3', title: 'Autorização do Secretário da SEAD' },
          { number: '4', title: 'Parecer SEFAZ' },
          { number: '5', title: 'Análise Final pelo controle final do órgão' },
        ],
      },
      {
        title: 'Indicação do Fiscal do Contrato ou Comissão',
        description: 'Indicação do fiscal do contrato ou comissão equivalente, preferencialmente, do setor que receberá o bem ou serviço'
      },
      {
        title: 'Publicação no DOE',
        description: 'Publicação no Diário Oficial do Estado do Piauí'
      },
      {
        title: 'Comunicação TCE',
        description: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato'
      },
    ],
  },
  {
    id: 'contratacao-direta',
    title: 'Contratação Direta',
    subtitle: 'Dispensa / Inexigibilidade · Instrumento 4',
    href: '/contratacao-direta',
    accentColor: '#dbaf00',
    icon: '📇',
    downloadKey: 'contratacao-direta/1. Documento_Formalizacao_Demanda_PDI.docx',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria',
        fileKey: 'contratacao-direta/1. Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Declaração de Inexistência de Ata de Preço',
        description: 'Declaração de inexistência de Ata de Registro de Preços gerenciados pela SEAD/PI que contemple o objeto pretendido.',
        fileKey: 'contratacao-direta/2. Declaracao_Inexistencia_ARP_SEAD_PI.docx'
      },
      {
        title: 'Estudo Técnico Preliminar',
        description: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados',
        fileKey: 'contratacao-direta/3. Estudo Preliminar_Encomenda_Tecnologica.docx'
      },
      {
        title: 'Mapa de Risco',
        description: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.',
        fileKey: 'contratacao-direta/4. Mapa_de_Riscos_Contratacao.docx'
      },
      {
        title: 'Pesquisa de Preço',
        description: 'Pesquisa de preço do mercado de produtos ou soluções da demanda'
      },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Análise Técnico-Operacional da SEAD' },
          { number: '2', title: 'Autorização do Conselho de Transformação Digital' },
        ],
      },
      {
        title: 'Termo de Referência ou Projeto Básico',
        description: 'O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros',
        fileKey: 'contratacao-direta/6. Termo_de_Referencia.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Aprovação do ETP e do mapa de Risco (se houver)' },
          { number: '2', title: 'Aprovação do Orçamento estimado' },
          { number: '3', title: 'Aprovação do Termo de Referência' },
          { number: '4', title: 'Autorização de Contratação da CGFR' },
        ],
      },
      { title: 'Minuta do Contrato', description: 'Minuta de Contrato ou instrumento equivalente', fileKey: 'contratacao-direta/7. Proposta_Comercial_ETEC_Modelo.docx' },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Análise Prévia da CGE' },
          { number: '2', title: 'Parecer PGE' },
          { number: '3', title: 'Autorização do Secretário da SEAD' },
          { number: '4', title: 'Parecer SEFAZ' },
          { number: '5', title: 'Análise Final do Procedimento pelo controle interno do órgão' },
        ],
      },
      {
        title: 'Indicação do Fiscal do Contrato ou Comissão',
        description: 'Minuta de Contrato ou instrumento equivalente'
      },
      {
        title: 'Publicação no DOE',
        description: 'Publicação do contrato pela SEGOV no Diário Oficial do Estado do Piauí'
      },
      {
        title: 'Comunicação TCE',
        description: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato'
      },
    ],
  },
  {
    id: 'contrato-transferencia-tecnologia',
    title: 'Transferência Tecnológica',
    subtitle: 'Know-how interno · Instrumento 5',
    href: '/contrato-transferencia-tecnologia',
    accentColor: '#6a0ea8',
    icon: '🔄',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Formalização da Demanda via SEI gabinete do órgão e instituição da parceria'
      },
      {
        title: 'Estudo Técnico Preliminar',
        description: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados'
      },
      {
        title: 'Mapa de Risco',
        description: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.'
      },
      {
        title: 'Termo de Referência',
        description: 'O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros'
      },
      {
        title: 'Aprovações',
        description: 'Aprovação do ETP e do mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado'
      },
      {
        title: 'Exame e Parecer Técnico do NIT',
        description: 'Exame e parecer técnico do Núcleo de Inovação Tecnológica – NIT',
        note: 'Caso a contratação preveja cláusula de exclusividade, informar se houve a manifestação de outros potenciais parceiros tecnológicos em site eletrônico oficial da ICT e se foram atendidos os §§ 1º, 4º, art. 75 do Decreto n. 10.534 / Decreto 23.676/PI'
      },
      { title: 'Habilitação da ICT ou Empresa' },
      {
        title: 'Plano de Trabalho',
        description: 'Plano de trabalho do convênio entre as instituições contendo a descrição das atividades, objetivos e metas do convênio'
      },
      { title: 'Minuta do Contrato' },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Autorização da CGE' },
          { number: '2', title: 'Autorização da PGE' },
          { number: '3', title: 'Autorização do Secretário da SEAD' },
          { number: '4', title: 'Autorização da SEFAZ' },
        ],
      },
      { title: 'Indicação do Fiscal do Contrato ou Comissão' },
      {
        title: 'Publicação no DOE',
        description: 'Publicação no Diário Oficial do Estado do Piauí'
      },
      {
        title: 'Comunicação TCE',
        description: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato'
      },
    ],
  },
]

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
        description: 'Registrar a demanda no SEI, com envio pelo gabinete do órgão e formalização da parceria.',
        fileKey: 'acordo-pd&i/Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Manifestação Técnica ou do NIT',
        description: 'Análise técnica da parceria, indicando como ela se enquadra na Lei de Inovação, quem será dono da propriedade intelectual e como os resultados serão compartilhados.',
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
        title: 'Acordo de Parceria',
        description: 'Documento do acordo de parceria firmado com a instituição envolvida.',
        fileKey: 'acordo-pd&i/Minuta_Acordo_Parceria_PDI.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          {
            number: '1', title: 'Análise prévia da CGE',
            description: 'Análise prévia da Controladoria Geral do Estado (CGE) em contratações de grandes valores e complexidade'
          },
          {
            number: '2',
            title: 'Autorização da PGE',
            description: 'Procuradoria Geral do Estado para verificação'
          },
          {
            number: '3', title: 'Autorização do Secretário da SEAD',
            description: 'Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA'
          },
          {
            number: '4', title: 'Autorização da SEFAZ',
            description: 'Secretaria de Estado da Fazenda devido a repasses de recursos'
          },
        ],
      },
      { title: 'Indicação do Gestor no Acordo', 
        description: 'Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI' },
      { title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)', 
        description: 'Publicação no Diário Oficial do Estado do Piauí' },
    ],
  },
  {
    id: 'convenio-pd&i',
    title: 'Convênio de PD&I',
    subtitle: 'Com repasse financeiro · Instrumento 2',
    href: '/convenio-pd&i',
    accentColor: '#209828',
    icon: '📋',
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Registrar a demanda no SEI, com envio pelo gabinete do órgão e formalização da parceria.',
        fileKey: 'convenio-pd&i/Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Manifestação Técnica ou do NIT',
        description: 'Análise técnica da parceria, indicando como ela se enquadra na Lei de Inovação, quem será dono da propriedade intelectual e como os resultados serão compartilhados.', 
        fileKey: 'convenio-pd&i/Manifestacao_Tecnica_PDI.docx'
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
        title: 'Autorização do Órgão Interessado',
        description: 'Autorização para celebração do convênio pela autoridade competente do órgão interessado'
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
        title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
        description: 'Publicação do contrato pela SEGOV no Diário Oficial do Estado do Piauí'
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
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Registrar a demanda no SEI, com envio pelo gabinete do órgão e formalização da parceria.',
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
        title: 'Ato de formação do Comitê Técnico de Especialistas',
        description: 'O comitê de especialistas é facultativo. Se o contratante tiver capacidade técnica suficiente, não precisará constituir esse comitê.'
      },
      {
        title: 'Manifestação de Interesse',
        description: 'Manifestação de interesse, quando for o caso (art. 27, §4°, do Decreto Federal n. 9.283/2018)'
      },
      {
        title: 'Termo de Referência',
        description: 'O termo deve apenas descrever as necessidades da Administração a fim de permitir que os interessados identifiquem a natureza do problema técnico existente e a visão global do produto, serviço ou processo inovador, sem a necessidade de detalhar previamente todas as especificações técnicas do objeto (art. 27, § 3º, do Decreto Federal nº 9.283/2018).',
        fileKey: 'encomenda-tecnologica/4. Termo_de_Referencia_PDI.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          {
            number: '1', title: 'Aprovação do ETP, Mapa de Risco e Termo de Referência',
            description: 'Aprovação do ETP e do Mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado'
          },
          {
            number: '2', title: 'Análise Técnico Operacional da SEAD',
            description: 'Caso se trate de contratação de soluções de Tecnologia da Informação e Comunicação – TIC (Art. 17, III, “f”, da Lei Estadual n. 7.884/2022);'
          },
          {
            number: '3', title: 'Transformação Digital, Economia Digital, Inteligência Artificial e Inovação',
            description: 'Caso se trate de contratação de soluções digitais (Art. 2º, II, da Lei n. 7.990/2023);'
          },
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
        title: 'Habilitação completa do fornecedor',
        description: 'Habilitação jurídica, Qualificação técnica e econômico-financeira, Regularidade fiscal, social e trabalhista e Prova de que o fornecedor  não tenha sido declarado inidôneo ou suspenso no âmbito da União ou da Administração Estadual.'
      },
      {
        title: 'Documentos de Justificativas',
        subitems: [
          { dote: true, title: 'Justificativa acerca da necessidade de contratação pelo órgão solicitante;' },
          { dote: true, title: 'Descrição fundamentada da situação que justifica a contratação direta, indicando o fundamento legal (arts. 74 e 75 da Lei n. 14.133/2021);' },
          { dote: true, title: 'Razões que motivaram a escolha do fornecedor;' },
          { dote: true, title: 'Justificativa fundamentada quanto ao preço proposto, precedida de pesquisa de preços no mercado, se possível;' },
        ]
      },
      {
        title: 'Nota de Reserva',
        description: '(art. 72, IV, Lei n. 14.133/2021; art. 52, Decreto Estadual n. 21.872/2023);'
      },
      {
        title: 'Autorização para a celebração de contrato através de contratação direta pela autoridade competente do órgão interessado',
        description: '(art. 72, VIII, Lei n. 14.133/2021; art. 17, VIII, e 53, do Decreto Estadual n. 21.872/2023);'
      },
      {
        title: 'Declaração de utilização das minutas padronizadas da PGE, quando houver'
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
        title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
        description: 'Publicação do contrato pela SEGOV no Diário Oficial do Estado do Piauí'
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
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Registrar a demanda no SEI, com envio pelo gabinete do órgão e formalização da parceria.',
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
          {
            number: '1', title: 'Análise Técnico-Operacional da SEAD',
            description: 'Caso se trate de contratação de soluções de Tecnologia da Informação e Comunicação – TIC (Art. 17, III, “f”, da Lei Estadual n. 7.884/2022);'
          },
          {
            number: '2', title: 'Autorização do Conselho de Transformação Digital, Economia Digital, Inteligência Artificial e Inovação',
            description: 'Caso se trate de contratação de soluções digitais (Art. 2º, II, da Lei n. 7.990/2023);'
          },
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
          { number: '3', title: 'Aprovação do Termo de Referência pela autoridade competente do órgão interessado (art. 18 do Decreto Estadual n. 21.872/2023)' },
          { number: '4', title: 'Autorização de Contratação da CGFR' },
        ],
      },
      {
        title: 'Declaração de exclusividade expedida pela entidade competente',
        description: 'No caso de inexigibilidade de licitação em razão de produtor, empresa ou representante comercial exclusivos (art. 74, § 1º, Lei n. 14.133/2021);'
      },
      {
        title: 'Habilitação completa do fornecedor',
        description: 'Habilitação jurídica, Qualificação técnica e econômico-financeira, Regularidade fiscal, social e trabalhista e Prova de que a contratada não tenha sido declarado inidôneo ou suspenso no âmbito da União ou da Administração Estadual'
      },
      {
        title: 'Documentos de Justificativas',
        subitems: [
          { dote: true, title: 'Justificativa acerca da necessidade de contratação pelo órgão solicitante;' },
          { dote: true, title: 'Descrição fundamentada da situação que justifica a contratação direta, indicando o fundamento legal (arts. 74 e 75 da Lei n. 14.133/2021);' },
          { dote: true, title: 'Razões que motivaram a escolha do fornecedor;' },
          { dote: true, title: 'Justificativa fundamentada quanto ao preço proposto, precedida de pesquisa de preços no mercado, se possível.' }
        ]
      },
      {
        title: 'Nota de Reserva',
        description: '(art. 72, IV, Lei n. 14.133/2021; art. 52, Decreto Estadual n. 21.872/2023);'
      },
      {
        title: 'Autorização para a celebração de contrato através de contratação direta pela autoridade competente do órgão interessado',
        description: '(art. 72, VIII, Lei n. 14.133/2021; art. 17, VIII, e 53, do Decreto Estadual n. 21.872/2023);'
      },
      {
        title: 'Declaração de utilização das minutas padronizadas da PGE',
      },
      {
        title: 'Minuta do Contrato ou instrumento equivalente',
        description: 'Minuta de Contrato ou instrumento equivalente',
      },
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
        title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
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
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão desenvolver uma pesquisa'
      },
      {
        title: 'Formalização da Demanda',
        description: 'Registrar a demanda no SEI, com envio pelo gabinete do órgão e formalização da parceria.',
        fileKey: 'contrato-transferencia-tecnologia/1. Documento_Formalizacao_Demanda_PDI.docx'
      },
      {
        title: 'Estudo Técnico Preliminar',
        description: 'Manifestação técnica enquadramento jurídico da parceria proposta no âmbito da lei federal n. 10.973/2004 (Lei de inovação) com análise da titularidade da propriedade intelectual gerada e participação dos resultados',
        fileKey: 'contrato-transferencia-tecnologia/2. Estudo Preliminar_Encomenda_Tecnologica.docx'
      },
      {
        title: 'Mapa de Risco',
        description: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual.',
        fileKey: 'contrato-transferencia-tecnologia/3. Mapa_de_Riscos_Contratacao.docx'
      },
      {
        title: 'Termo de Referência',
        description: 'O Termo de Referência (TR) ou projeto básico contendo a justificativa, a necessidade da administração, o objeto, prazos, custos estimados, entre outros',
        fileKey: 'contrato-transferencia-tecnologia/4. Termo_de_Referencia_PDI.docx'
      },
      {
        title: 'Aprovações',
        description: 'Aprovação do ETP e do mapa de riscos, se houver, e do termo de referência pela autoridade competente do órgão interessado'
      },
      {
        title: 'Exame e Parecer Técnico do NIT',
        description: 'Exame e parecer técnico do Núcleo de Inovação Tecnológica – NIT',
      },
      {
        note: 'Caso a contratação preveja cláusula de exclusividade, informar se houve a publicação prévia de extrato de oferta tecnológica em sítio eletrônico oficial da ICT e se foram atendidos os §§ 1º, 4º, 6º, 7º e 8º do art. 12 do Decreto nº 9.283/18;'
      },
      {
        title: 'Habilitação da ICT ou Empresa',
        description: 'Habilitação jurídica, Qualificação técnica e econômico-financeira, Regularidade fiscal, social e trabalhista e Prova de que a empresa ou ICT privada não tenha sido declarada inidônea ou suspensa no âmbito da União ou da Administração Estadual'
      },
      {
        title: 'Documento Fundação de Apoio quando houver interveniência'
      },
      {
        title: 'Documentos de Justificativas',
        subitems: [
          { dote: true, title: 'Justificativa acerca da necessidade de contratação pelo órgão solicitante;' },
          { dote: true, title: 'Descrição fundamentada da situação que justifica a contratação direta, indicando o fundamento legal (arts. 74 e 75, da Lei n. 14.133/2021);' },
          { dote: true, title: 'Razões que motivaram a escolha da empresa ou ICT privada;' },
          { dote: true, title: 'Justificativa fundamentada quanto ao preço proposto, precedida de pesquisa de preços no mercado, se possível.' }
        ]
      },
      {
        title: 'Autorização para a celebração de contrato através de contratação direta pela autoridade competente do órgão interessado',
        description: '(art. 72, VIII, Lei n. 14.133/2021; art. 17, VIII, e 53, do Decreto Estadual n. 21.872/2023);'
      },
      {
        title: 'Plano de Trabalho',
        fileKey: 'contrato-transferencia-tecnologia/Modelo_Plano_de_Trabalho_PDI.docx'
      },
      { title: 'Minuta do Contrato',
        fileKey: 'contrato-transferencia-tecnologia/5. Minuta_Contrato_Transferencia_Tecnologia.docx'
      },
      {
        title: 'Autorizações',
        subitems: [
          { number: '1', title: 'Autorização da CGE' },
          { number: '2', title: 'Autorização da PGE' },
          { number: '3', title: 'Autorização do Secretário da SEAD' },
        ],
      },
      {
        title: 'Indicação do Fiscal do Contrato ou Comissão equivalente',
        description: 'preferencialmente, do setor que receberá o bem ou serviço (art. 117 c/c 7º da Lei n. 14.133/2021; arts. 65 a 67 do Decreto Estadual n. 21.872/2023);'
      },
      {
        title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
        description: 'Publicação no Diário Oficial do Estado do Piauí'
      },
      {
        title: 'Comunicação TCE',
        description: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE até 10 dias após o ato'
      },
    ],
  },
  {
    id: 'pitch-hackton',
    title: 'Pitches e Hackatons',
    subtitle: 'Pitches e Hackatons · Instrumento 6',
    href: '/pitch-hackton',
    accentColor: 'rgb(0, 162, 127)',
    icon: '💡',
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Identificação de necessidade pública passível de solução inovadora por meio de pitch ou hackathon'
      },
      {
        title: 'Documento de Formalização da Demanda (DFD simplificado)',
        description: 'Baseado no DFD e justificativa do modelo PD&I',
        fileKey: 'pitches_e_hackatons/01_DFD_Simplificado_Revisado.docx',
        subitems: [
          { dote: true, title: 'Problema público claro (ex: violência, pobreza, saúde)' },
          { dote: true, title: 'Justificativa de uso de inovação (não solução pronta)' },
          { dote: true, title: 'Indicação de abordagem exploratória (pitch/hackathon)' },
        ]
      },
      {
        title: 'Enquadramento Jurídico',
        subitems: [
          { dote: true, title: 'CPSI (Lei 14.133/21, art. 75, IV / contratação por inovação)' },
          { dote: true, title: 'Lei de Inovação (Lei 10.973/2004)' },
          { dote: true, title: 'Sandbox regulatório (se aplicável)' },
          { dote: true, title: 'Acordo de cooperação (quando não há pagamento)' },
        ]
      },
      {
        title: 'Manifestação do NIT / Área Técnica',
        subitems: [
          { dote: true, title: 'Validação do problema' },
          { dote: true, title: 'Indicação de viabilidade técnica' },
          { dote: true, title: 'Risco tecnológico' },
        ]
      },
      {
        title: 'Plano de Trabalho do Hackathon / Pitch',
        description: 'Equivalente ao "Plano de Trabalho" do PD&I — define escopo, objetivos e cronograma do evento',
        fileKey: 'pitches_e_hackatons/02_Plano_de_Trabalho_PDI_Revisado.docx'
      },
      {
        title: 'Termo de Referência Simplificado / Regulamento',
        subitems: [
          { dote: true, title: 'Objetivo do desafio' },
          { dote: true, title: 'Escopo do problema' },
          { dote: true, title: 'Entregáveis esperados (protótipo, MVP, modelo)' },
          { dote: true, title: 'Metodologia (design thinking, dados, IA, etc.)' },
          { dote: true, title: 'Possibilidade de contratação futura' },
          { dote: true, title: 'Acesso a dados ou infraestrutura' },
        ]
      },
      {
        title: 'Cronograma (pitch → hackathon → teste)',
        fileKey: 'pitches_e_hackatons/03_Cronograma_Revisado.docx'
      },
      {
        title: 'Critérios de Avaliação',
        fileKey: 'pitches_e_hackatons/04_Criterios_de_Avaliacao_Revisado.docx'
      },
      {
        title: 'Plano de Execução',
        fileKey: 'pitches_e_hackatons/05_Plano_de_Execucao_Revisado.docx'
      },
      {
        title: 'Etapas do Hackathon / Pitch',
        subitems: [
          { number: '1', title: 'Inscrição' },
          { number: '2', title: 'Seleção' },
          { number: '3', title: 'Pitch' },
          { number: '4', title: 'Hackathon' },
          { number: '5', title: 'Demo Day' },
          { number: '6', title: 'Definição de incentivos' },
          { number: '7', title: 'Premiação (financeira ou não)' },
        ]
      },
    ]
  }
]

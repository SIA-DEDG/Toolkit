export const INSTRUMENT_FLOWS = [
  {
    id: 'acordo-pd&i',
    title: 'Acordo de Parceria PD&I',
    subtitle: 'Sem repasse financeiro · Instrumento 1',
    href: '/acordo-pd&i',
    accentColor: '#08ba9c',
    icon: '🤝',
    downloadKey: 'acordo-pd&i/Guia Explicativo Acordo PD&I.pdf',
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
            number: '1',
            title: 'Autorização da PGE',
            description: 'Procuradoria Geral do Estado para verificação'
          },
          {
            number: '2', title: 'Autorização do Secretário da SEAD',
            description: 'Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA'
          },
          {
            number: '3', title: 'Autorização da SEFAZ',
            description: 'Secretaria de Estado da Fazenda devido a repasses de recursos'
          },
        ],
      },
      {
        title: 'Indicação do Gestor no Acordo',
        description: 'Indicação do gestor do ente público sobre quem será o gestor do acordo via SEI'
      },
      {
        title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
        description: 'Publicação no Diário Oficial do Estado do Piauí'
      },
    ],
  },
  {
    id: 'convenio-pd&i',
    title: 'Convênio de PD&I',
    subtitle: 'Com repasse financeiro · Instrumento 2',
    href: '/convenio-pd&i',
    accentColor: '#209828',
    icon: '📋',
    downloadKey: 'convenio-pd&i/Guia Explicativo Convenio PD&I.pdf',
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
          {
            number: '1',
            title: 'Autorização da PGE',
            description: 'Procuradoria Geral do Estado para verificação'
          },
          {
            number: '2', title: 'Autorização do Secretário da SEAD',
            description: 'Autorização do secretário da SEAD (secretário responsável pelas compras públicas) sobre o acordo de PD&I *verificar mudança para SIA'
          },
          {
            number: '3', title: 'Autorização da SEFAZ',
            description: 'Secretaria de Estado da Fazenda devido a repasses de recursos'
          },
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
    downloadKey: 'contratacao-direta/Guia Explicativo de Contratacao Direta.pdf',
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
          {
            number: '1',
            title: 'Autorização da CGE',
            description: 'Controladoria-Geral do Estado do Piauí'
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
      {
        title: 'Minuta do Contrato',
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
    accentColor: '#00A27F',
    icon: '💡',
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Identificação de necessidade pública passível de solução inovadora por meio de pitch ou hackathon'
      },
      {
        title: 'Estruturação da Demanda (FASE PRÉ-HACKATHON)',
        description: 'Baseado no DFD (Documento de Formalização de Demanda) e justificativa do modelo PD&I',
        fileKey: 'pitches_e_hackatons/01_DFD_Simplificado_Revisado.docx',
        subitems: [
          { dote: true, title: 'Definição de problema público claro (ex: violência, pobreza, saúde)' },
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
  },
  {
    id: 'contrato-publico',
    title: 'CPSI - Contrato Público para Solução Inovadora',
    subtitle: 'CPSI - Contrato Público para Solução Inovadora · Instrumento 7',
    href: '/contrato-publico',
    accentColor: '#c21d00',
    icon: '🏗️',
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão solucionar um problema público por meio de solução inovadora'
      },
      {
        title: 'Documento de Formalização da Demanda',
        description: 'Documento que evidencie e detalhe a necessidade administrativa, o problema público a ser solucionado e a justificativa para utilização do CPSI (art. 18, I, da Lei nº 14.133/2021 c/c art. 12 da LC nº 182/2021)'
      },
      {
        title: 'Estudo Técnico Preliminar – ETP',
        description: 'Obrigatório em razão da natureza do CPSI (art. 18, II, Lei n. 14.133/2021; art. 17, II, do Decreto Estadual n. 21.872/2023)',
        subitems: [
          { dote: true, title: 'Caracterização do problema público a ser solucionado' },
          { dote: true, title: 'Demonstração da insuficiência ou inadequação das soluções disponíveis no mercado' },
          { dote: true, title: 'Análise da necessidade de desenvolvimento de solução inovadora' },
          { dote: true, title: 'Identificação da existência de risco tecnológico, quando houver' },
          { dote: true, title: 'Justificativa técnica para adoção do CPSI' },
          { dote: true, title: 'Demonstração da viabilidade da contratação e dos resultados esperados' },
        ]
      },
      {
        title: 'Mapa de Riscos',
        description: 'Identificação, análise e tratamento dos riscos técnicos, operacionais, financeiros e de insucesso tecnológico inerentes ao desenvolvimento da solução inovadora (art. 18, X, da Lei n. 14.133/2021; art. 17, III, e 31, do Decreto Estadual n. 21.872/2023)'
      },
      {
        title: 'Designação da Comissão Especial de Avaliação',
        description: 'Comissão integrada por, no mínimo, 3 pessoas de reputação ilibada e reconhecido conhecimento no assunto, das quais 1 servidor público do órgão contratante e 1 professor de instituição pública de educação superior na área relacionada (art. 13, § 3º, da LC 182/2021)'
      },
      {
        title: 'Termo de Referência ou Documento Técnico de Desafio',
        description: 'Descrição funcional do problema público a ser resolvido, dos resultados esperados e dos parâmetros mínimos de desempenho, sem prévia definição exaustiva da solução técnica (art. 12 da LC nº 182/2021)'
      },
      {
        title: 'Pesquisa de Preços',
        description: 'Pesquisas de preços e justificativa da estimativa de custos da contratação, observando a natureza experimental da contratação e a possibilidade de remuneração compatível com o desenvolvimento da solução inovadora'
      },
      {
        title: 'Autorizações Tecnológicas',
        subitems: [
          {
            number: '1',
            title: 'Análise Técnico-Operacional da SEAD',
            description: 'Caso se trate de contratação de soluções de Tecnologia da Informação e Comunicação – TIC (Art. 17, III, "f", da Lei Estadual n. 7.884/2022)'
          },
          {
            number: '2',
            title: 'Autorização do Conselho de Transformação Digital, Economia Digital, IA e Inovação',
            description: 'Caso se trate de contratação de soluções digitais (Art. 2º, II, da Lei n. 7.990/2023)'
          },
        ]
      },
      {
        title: 'Justificativas',
        subitems: [
          { dote: true, title: 'Adoção do CPSI como regime jurídico aplicável' },
          { dote: true, title: 'Eventual dispensa parcial de documentos de habilitação (art. 13, § 8º, da LC 182/2021)' },
          { dote: true, title: 'Critérios de julgamento adotados' },
          { dote: true, title: 'Exigências de qualificação técnica' },
          { dote: true, title: 'Regras pertinentes à participação de empresas em consórcio, quando admitida' },
          { dote: true, title: 'Exigência ou não de prestação de garantia contratual' },
        ]
      },
      {
        title: 'Aprovação pela Autoridade Competente do Órgão',
        description: 'Aprovação do ETP, do mapa de riscos, da estimativa de custos e do termo de referência pela autoridade competente do órgão interessado (art. 18 do Decreto Estadual nº 21.872/2023)'
      },
      {
        title: 'Autorização de Abertura do Procedimento Licitatório',
        description: '(art. 17, VIII, e 53, do Decreto Estadual n. 21.872/2023)'
      },
      {
        title: 'Autorização da CGFR',
        description: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR (art. 3º, II, do Decreto Estadual n. 21.908/2023)'
      },
      {
        title: 'Nota de Reserva',
        description: '(art. 72, IV, Lei n. 14.133/2021; art. 52, Decreto Estadual n. 21.872/2023)'
      },
      {
        title: 'Declaração de Utilização das Minutas Padronizadas da PGE',
        description: 'Quando houver minutas padronizadas da PGE aplicáveis ao CPSI'
      },
      {
        title: 'Minuta de Edital de Chamamento Público'
      },
      {
        title: 'Minuta do Contrato Público para Solução Inovadora – CPSI',
        description: 'Nos termos do art. 13 da LC nº 182/2021, poderá haver seleção de mais de uma proposta, devendo ser formalizado contrato individual para cada solução selecionada'
      },
      {
        title: 'Análise Prévia da CGE',
        description: 'Recomendada em contratações de grande vulto e acentuada complexidade, ou com dúvidas acerca da adequação da pesquisa de preços (Despacho PGE n. 760/2023)'
      },
      {
        title: 'Autorizações',
        subitems: [
          {
            number: '1',
            title: 'Parecer PGE',
            description: 'Procuradoria Geral do Estado para verificação (art. 53, § 4º, Lei n. 14.133/2021; art. 69 do Decreto Estadual n. 21.872/2023)'
          },
          {
            number: '2',
            title: 'Autorização do Secretário da SEAD',
            description: 'Autorização do secretário da SEAD para a contratação (art. 17, III, XV e XIX, da Lei Estadual n. 7.884/2022)'
          },
        ]
      },
      {
        title: 'Publicação do Edital de Chamamento',
        description: '(art. 13, § 2º, da Lei Complementar 182/2021)'
      },
      {
        title: 'Comunicação de Abertura ao TCE',
        description: 'Comunicação ao Tribunal de Contas do Estado do Piauí até o dia útil imediatamente posterior ao da última publicação do aviso de licitação (art. 6º, Instrução Normativa nº 06/2017 - TCE/PI)'
      },
      {
        title: 'Atas, Relatórios e Deliberações do Certame',
        description: 'Atas, relatórios e deliberações ocorridas durante o certame, incluindo possível negociação com os selecionados acerca de condições econômicas mais vantajosas e critérios de remuneração'
      },
      {
        title: 'Análise Final pelo Controle Interno do Órgão',
        description: '(Art. 13 da Instrução Normativa nº 05/2017, do Tribunal de Contas do Estado do Piauí)'
      },
      {
        title: 'Homologação e Formalização da Seleção',
        description: 'Atos de homologação e formalização da seleção da(s) solução(ões) escolhida(s) e respectivas publicações'
      },
      {
        title: 'Parecer SEFAZ e Autorização de Reserva Orçamentária – ARO',
        description: 'Nos casos especificados no Decreto Estadual 17.084/2017 (art. 3º, parágrafo único, do Decreto Estadual n. 21.908/2023)'
      },
      {
        title: 'Indicação do Fiscal do Contrato ou Comissão Equivalente',
        description: 'Preferencialmente, do setor que receberá o bem ou serviço (art. 117 c/c 7º da Lei n. 14.133/2021; arts. 65 a 67 do Decreto Estadual n. 21.872/2023)'
      },
      {
        title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
        description: 'Publicação do contrato CPSI pela SEGOV (art. 72, parágrafo único, c/c art. 94 da Lei n. 14.133/2021; art. 8º, do Decreto Estadual nº 17.084/2017)'
      },
      {
        title: 'Comunicações ao TCE',
        subitems: [
          {
            number: '1',
            title: 'Comunicação de Encerramento do Procedimento Licitatório',
            description: 'Em até 10 dias úteis após a homologação, ainda que parcial (art. 7º, Instrução Normativa nº 06/2017 - TCE/PI)'
          },
          {
            number: '2',
            title: 'Comunicação de Assinatura do Contrato',
            description: 'Em até 10 dias úteis após o ato (art. 11, Instrução Normativa nº 06/2017 – TCE/PI)'
          },
        ]
      },
      {
        title: 'Ordem de Serviço',
        description: 'Devidamente ratificada pelo Secretário de Governo ou por agente delegado, e publicada no Diário Oficial do Estado (art. 1º do Decreto Estadual n. 23.644/2025)'
      },
    ]
  },
  {
    id: 'pmi',
    title: 'PMI - Procedimento de Manifestação de Interesse',
    subtitle: 'Procedimento de Manifestação de Interesse · Instrumento 8',
    href: '/pmi',
    accentColor: '#e65100',
    icon: '🔍',
    downloadKey: '',
    cards: [],
  },
  {
    id: 'dialogo-competitivo',
    title: 'Diálogo Competitivo',
    subtitle: 'Diálogo Competitivo · Instrumento 9',
    href: '/dialogo-competitivo',
    accentColor: '#006064',
    icon: '💬',
    downloadKey: '',
    cards: [],
  },
  {
    id: 'concurso-publico-inovacao',
    title: 'Concurso Público de Inovação',
    subtitle: 'Concurso Público de Inovação · Instrumento 10',
    href: '/concurso-publico-inovacao',
    accentColor: '#880e4f',
    icon: '🏆',
    downloadKey: '',
    cards: [],
  },
  {
    id: 'doacao-solucao-inovadora',
    title: 'Doação de Solução Inovadora',
    subtitle: 'Doação de Solução Inovadora · Instrumento 11',
    href: '/doacao-solucao-inovadora',
    accentColor: '#1b5e20',
    icon: '🎁',
    downloadKey: '',
    cards: [],
  },
  {
    id: 'licitacao',
    title: 'Licitação',
    subtitle: 'Licitação · Instrumento 12',
    href: '/licitacao',
    accentColor: '#37474f',
    icon: '📑',
    downloadKey: '',
    cards: [],
  },
]

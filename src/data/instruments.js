export const INSTRUMENT_FLOWS = [
  {
    id: 'acordo-pd&i',
    title: 'Acordo de Parceria PD&I',
    subtitle: 'Sem repasse financeiro · Instrumento 1',
    href: '/acordo-pd&i',
    accentColor: '#08ba9c',
    icon: '🤝',
    downloadKey: 'acordo-pd&i/Guia Explicativo Acordo PD&I-1.pdf',
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
    downloadKey: 'encomenda-tecnologica/Guia Explicativo Encomenda Tecnologica.pdf',
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
    downloadKey: 'transferencia-tecnologia/Guia Explicativo Transferencia Tecnologica nao patendeada.pdf',
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
    downloadKey: 'pitches_e_hackatons/Guia Explicativo Pitches e Hackatons.pdf',
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
    downloadKey: 'contrato-publico-solucao-inovadora/Guia Explicativo de Contrato Publico de Solucao Inovadora.pdf',
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
    downloadKey: 'procedimento-de-manifestacao-de-interesse/Guia Explicativo de PMI.pdf',
    cards: [
      {
        "title": "Início",
        "description": "Necessidade do órgão de obter estudos, levantamentos, investigações, projetos ou soluções inovadoras voltados à estruturação de futuras contratações ou decisões administrativas relevantes"
      },
      {
        "title": "Documento de Formalização da Demanda – DFD",
        "description": "Documento que evidencie e detalhe a necessidade administrativa, o problema público identificado e os objetivos institucionais pretendidos (art. 18, I, da Lei nº 14.133/2021 c/c art. 81 da Lei nº 14.133/2021)"
      },
      {
        "title": "Estudo Técnico Preliminar – ETP",
        "description": "Obrigatório em razão da natureza exploratória e preparatória do PMI (art. 18, II, da Lei nº 14.133/2021; art. 17, II, do Decreto Estadual nº 21.872/2023)",
        "subitems": [
          { "number": "1", "title": "Caracterização do problema público ou da necessidade administrativa a ser solucionada" },
          { "number": "2", "title": "Demonstração da insuficiência de informações técnicas disponíveis internamente na Administração" },
          { "number": "3", "title": "Análise da necessidade de prospecção de soluções existentes no mercado" },
          { "number": "4", "title": "Justificativa técnica para utilização do Procedimento de Manifestação de Interesse – PMI" },
          { "number": "5", "title": "Demonstração da utilidade dos estudos pretendidos para subsidiar futura contratação ou decisão administrativa" },
          { "number": "6", "title": "Identificação da existência de aspectos inovadores, tecnológicos, operacionais ou de elevada complexidade técnica, quando houver" },
          { "number": "7", "title": "Demonstração dos resultados esperados com os estudos, levantamentos, investigações ou projetos pretendidos" }
        ]
      },
      {
        "title": "Mapa de Riscos",
        "description": "Identificação, análise e tratamento dos riscos técnicos, operacionais, jurídicos, informacionais e relacionados à utilização dos estudos produzidos, à confidencialidade das informações e à eventual futura contratação (art. 18, X, da Lei nº 14.133/2021; art. 17, III, e art. 31 do Decreto Estadual nº 21.872/2023)"
      },
      {
        "title": "Designação de comissão técnica, equipe de apoio ou grupo de trabalho",
        "description": "Responsável pela condução do PMI e avaliação dos estudos apresentados. Recomenda-se composição multidisciplinar compatível com a complexidade do objeto, especialmente em procedimentos relacionados à inovação, tecnologia da informação, engenharia, transformação digital ou soluções especializadas"
      },
      {
        "title": "Termo de Referência, Documento Técnico de Desafio ou documento equivalente",
        "subitems": [
          { "number": "1", "title": "Descrição funcional do problema público ou da necessidade administrativa" },
          { "number": "2", "title": "Delimitação do objeto do PMI" },
          { "number": "3", "title": "Resultados esperados" },
          { "number": "4", "title": "Escopo dos estudos, levantamentos, investigações ou projetos pretendidos" },
          { "number": "5", "title": "Premissas técnicas mínimas, quando necessárias" },
          { "number": "6", "title": "Critérios objetivos de avaliação dos estudos" },
          { "number": "7", "title": "Critérios de eventual ressarcimento" },
          { "number": "8", "title": "Regras relativas à propriedade intelectual, confidencialidade e aproveitamento dos estudos" }
        ]
      },
      {
        "title": "Aprovação do ETP, mapa de riscos e Termo de Referência",
        "description": "Aprovação pela autoridade competente do órgão interessado (art. 18 do Decreto Estadual nº 21.872/2023)"
      },
      {
        "title": "Autorização de abertura do PMI",
        "description": "Autorização pela autoridade competente para abertura do Procedimento de Manifestação de Interesse"
      },
      {
        "title": "Autorizações Tecnológicas",
        "subitems": [
          {
            "number": "1",
            "title": "Análise técnico-operacional da SEAD",
            "description": "Caso o PMI envolva soluções de Tecnologia da Informação e Comunicação – TIC (art. 17, III, \"f\", da Lei Estadual nº 7.884/2022)"
          },
          {
            "number": "2",
            "title": "Autorização do Conselho de Transformação Digital, Economia Digital, IA e Inovação",
            "description": "Caso o PMI envolva soluções digitais, softwares, aplicativos ou transformação digital, nos termos da legislação estadual pertinente"
          }
        ]
      },
      {
        "title": "Declaração de utilização das minutas padronizadas da PGE",
        "description": "Quando houver minutas padronizadas da PGE aplicáveis ao procedimento"
      },
      {
        "title": "Minuta de Edital de Chamamento Público do PMI",
        "description": "Minuta do edital de chamamento público com os requisitos mínimos legais para chamamento dos interessados"
      },
      {
        "title": "Minuta de Termo de Autorização",
        "description": "Quando houver autorização formal individualizada para realização dos estudos"
      },
      {
        "title": "Análise prévia pela Controladoria-Geral do Estado – CGE",
        "description": "Recomendada em contratações de grande vulto e acentuada complexidade, ou com dúvidas acerca da adequação da pesquisa de preços (Despacho PGE n. 760/2023)"
      },
      {
        "title": "Parecer da PGE",
        "description": "Procuradoria Geral do Estado para verificação (art. 53, § 4º, Lei n. 14.133/2021; art. 69 do Decreto Estadual n. 21.872/2023)"
      },
      {
        "title": "Autorização do Secretário da SEAD para a contratação",
        "description": "art. 17, III, XV e XIX, da Lei Estadual n. 7.884/2022"
      },
      {
        "title": "Publicação do Edital de Chamamento",
        "description": "Publicação do edital de chamamento público do PMI"
      },
      {
        "title": "Cadastro eletrônico do PMI no Sistema Licitações Web",
        "description": "art. 5º, § 3º, III, da Instrução Normativa nº 02/2026 - TCE/PI"
      },
      {
        "title": "Ata, relatório ou documento equivalente de avaliação técnica",
        "description": "Documento contendo a avaliação técnica dos estudos, levantamentos, investigações ou projetos apresentados"
      },
      {
        "title": "Parecer técnico fundamentado acerca da adequação e suficiência dos estudos",
        "subitems": [
          { "number": "1", "title": "Análise da aderência dos estudos às necessidades da Administração" },
          { "number": "2", "title": "Avaliação das premissas técnicas adotadas" },
          { "number": "3", "title": "Análise comparativa entre as soluções apresentadas, quando houver pluralidade de estudos" },
          { "number": "4", "title": "Manifestação acerca da viabilidade, economicidade e utilidade dos estudos" },
          { "number": "5", "title": "Conclusão quanto ao aproveitamento integral, parcial ou não aproveitamento dos estudos" }
        ]
      },
      {
        "title": "Decisão administrativa fundamentada sobre o aproveitamento dos estudos",
        "description": "Decisão acerca do aproveitamento dos estudos apresentados e da eventual realização de contratação subsequente"
      },
      {
        "title": "Registro da finalização do PMI no Sistema Licitações Web",
        "description": "Inclusive nos casos de encerramento sem aproveitamento dos estudos, suspensão, revogação ou anulação do procedimento (IN TCE/PI nº 02/2026)"
      }
    ],
  },
  {
    id: 'dialogo-competitivo',
    title: 'Diálogo Competitivo',
    subtitle: 'Diálogo Competitivo · Instrumento 9',
    href: '/dialogo-competitivo',
    accentColor: '#006064',
    icon: '💬',
    downloadKey: '',
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão caracterizada por elevada complexidade técnica, operacional, tecnológica, jurídica ou econômico-financeira, especialmente em contratações relacionadas à inovação, transformação digital, inteligência artificial, soluções de TIC, infraestrutura tecnológica, cidades inteligentes e modernização de serviços públicos (art. 6º, XLII, e art. 32 da Lei nº 14.133/2021).'
      },
      {
        title: 'Documento de Formalização da Demanda – DFD',
        description: 'Documento que evidencie e detalhe a necessidade administrativa, o problema público identificado, os objetivos institucionais pretendidos e a complexidade da contratação (art. 18, I, c/c art. 32 da Lei nº 14.133/2021; art. 17, I, do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Estudo Técnico Preliminar simplificado',
        description: 'Contendo a descrição da necessidade administrativa e a justificativa da adoção do diálogo competitivo (art. 18, II, da Lei nº 14.133/2021; art. 17, II, do Decreto Estadual nº 21.872/2023; art. 11 da IN SEGES/MGI nº 512/2025).'
      },
      {
        title: 'Mapa de Riscos Inicial',
        description: 'Contendo a identificação, análise e tratamento dos riscos técnicos, operacionais, tecnológicos, concorrenciais, econômicos, jurídicos e relacionados à confidencialidade das informações (art. 18, X, da Lei nº 14.133/2021; art. 17, III, e art. 31 do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Pesquisa de Mercado e Estudos Setoriais',
        description: 'Pesquisa de mercado, benchmarking, estudos setoriais ou documentos equivalentes que demonstrem a existência de múltiplas soluções possíveis para atendimento da necessidade administrativa.'
      },
      {
        title: 'Designação da Comissão de Contratação',
        description: 'Designação da comissão de contratação responsável pela condução do diálogo competitivo, bem como de assessores técnicos, consultores ou especialistas externos, quando houver (art. 32, XI, da Lei nº 14.133/2021).'
      },
      {
        title: 'Documentação Técnica Preliminar',
        description: 'Termo de Referência preliminar, anteprojeto, documento técnico de necessidades ou documento equivalente preliminar.'
      },
      {
        title: 'Aprovações da Fase Preparatória',
        subitems: [
          {
            number: '1',
            title: 'Aprovação do ETP simplificado, do mapa de riscos inicial e dos documentos técnicos preliminares pela autoridade competente',
            description: '(art. 18 do Decreto Estadual nº 21.872/2023)'
          },
          {
            number: '2',
            title: 'Autorização de abertura do Procedimento de Pré-Seleção pela autoridade competente'
          },
        ],
      },
      {
        title: 'Declaração de utilização das minutas padronizadas da PGE',
        description: 'Quando houver.'
      },
      {
        title: 'Minuta do Edital de Pré-Seleção',
        description: 'Minuta do edital de pré-seleção dos participantes.'
      },
      {
        title: 'Parecer da PGE – Fase de Pré-Seleção',
        description: 'Parecer da PGE acerca do cabimento do diálogo competitivo, da regularidade da fase preparatória e da minuta do edital de pré-seleção dos participantes (art. 53 da Lei nº 14.133/2021; art. 20 da IN SEGES/MGI nº 512/2025).'
      },
      {
        title: 'Publicação do Aviso do Edital de Pré-Seleção',
        description: 'Publicação do aviso do edital de pré-seleção (art. 54 da Lei nº 14.133/2021; art. 93 do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Termos de Confidencialidade',
        description: 'Termos de confidencialidade ou cláusulas equivalentes aplicáveis à comissão de contratação, assessores técnicos e participantes. A Administração Pública não poderá revelar aos demais participantes as soluções propostas ou informações sigilosas sem consentimento do interessado (art. 32, §1º, VIII, da Lei nº 14.133/2021).'
      },
      {
        title: 'Documentação da Fase de Diálogo',
        description: 'Atas, gravações, registros audiovisuais, relatórios técnicos e deliberações produzidas durante a fase de diálogo. Recomenda-se a gravação audiovisual das sessões para reforço da transparência, da rastreabilidade e da segurança jurídica do procedimento.'
      },
      {
        title: 'Relatório Técnico Conclusivo da Comissão de Contratação',
        description: 'Relatório contendo as soluções avaliadas, os fundamentos da solução selecionada e a justificativa do encerramento da fase de diálogo (arts. 47 a 50 da IN SEGES/MGI nº 512/2025). A fase competitiva somente será iniciada se a comissão decidir pela continuidade do processo (art. 42, I, da IN SEGES/MGI nº 512/2025).'
      },
      {
        title: 'ETP Complementar e Documentação Técnica Definitiva',
        description: 'Estudo Técnico Preliminar complementar e consolidação do Termo de Referência, Projeto Básico, anteprojeto ou documento técnico definitivo, previamente à fase competitiva, após encerramento da fase de diálogo, contendo a definição da solução apta a atender à necessidade administrativa e os requisitos técnicos, operacionais, jurídicos e econômico-financeiros da contratação (art. 11, §1º, da IN SEGES/MGI nº 512/2025).'
      },
      {
        title: 'Matriz de Alocação de Riscos Contratual',
        description: 'Quando cabível, elaborada após a consolidação da solução decorrente da fase de diálogo (arts. 22 e 103 da Lei nº 14.133/2021; arts. 33 e 34 do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Pesquisa de Preços Consolidada',
        description: 'Pesquisa de preços consolidada ou justificativa da estimativa definitiva do valor da contratação, elaborada após a consolidação da solução decorrente da fase de diálogo (art. 23 da Lei nº 14.133/2021; arts. 43 a 51 do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Autorizações Tecnológicas',
        subitems: [
          {
            number: '1',
            title: 'Análise técnico-operacional da SEAD',
            description: 'Caso se trate de contratação relacionada à Tecnologia da Informação e Comunicação – TIC (art. 17, III, "f", da Lei Estadual nº 7.884/2022).'
          },
          {
            number: '2',
            title: 'Autorização do Conselho de Transformação Digital, Economia Digital, Inteligência Artificial e Inovação',
            description: 'Caso se trate de soluções digitais (art. 2º, II, da Lei Estadual nº 7.990/2023).'
          },
        ],
      },
      {
        title: 'Autorização da CGFR',
        description: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR (art. 3º, II, do Decreto Estadual nº 21.908/2023).'
      },
      {
        title: 'Nota de Reserva',
        description: '(arts. 17, VII, e 52 do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Declaração de utilização das minutas padronizadas da PGE',
        description: 'Quando houver.'
      },
      {
        title: 'Minuta do Edital da Fase Competitiva, Contrato e Anexos',
        description: 'Minuta do edital da fase competitiva, acompanhada de minuta de contrato e demais anexos (art. 18, V e VI, da Lei n. 14.133/2021; art. 17, X e XI, do Decreto Estadual n. 21.872/2023).'
      },
      {
        title: 'Análise Prévia pela Controladoria-Geral do Estado',
        description: 'Recomendada em contratações de grande vulto e acentuada complexidade, bem como em casos de dúvidas acerca da adequação da pesquisa de preços. O gestor deve justificar nos autos em caso de renúncia à consulta (Despacho PGE n. 760/2023, processo SEI 00012.000487/2023-96).'
      },
      {
        title: 'Parecer da PGE – Fase Competitiva',
        description: 'Parecer da Procuradoria-Geral do Estado (art. 53, §4º, Lei n. 14.133/2021; art. 69 do Decreto Estadual n. 21.872/2023; art. 53 da IN SEGES/MGI nº 512/2025).'
      },
      {
        title: 'Autorização de Abertura de Licitação pelo Secretário da SEAD',
        description: 'Autorização de abertura da licitação pelo Secretário da SEAD (Art. 17, III, XV e XIX, da Lei Estadual n. 7.884/2022).'
      },
      {
        title: 'Publicação do Aviso do Edital da Fase Competitiva',
        description: 'Publicação do aviso do edital (art. 54 da Lei n. 14.133/2021; art. 93 do Decreto Estadual n. 21.872/2023; art. 54 da IN SEGES/MGI nº 512/2025).'
      },
      {
        title: 'Cadastro da Fase Competitiva no Sistema Licitações Web',
        description: 'Cadastro da fase competitiva no Sistema Licitações Web, com disponibilização do edital e respectivos anexos, observado o prazo do art. 6º, §7º, da Instrução Normativa TCE-PI nº 02/2026.'
      },
      {
        title: 'Atas e Relatórios de Julgamento',
        description: 'Atas e relatórios de julgamento da fase competitiva final.'
      },
      {
        title: 'Análise Final pelo Controle Interno do Órgão',
        description: 'Análise final do procedimento pelo controle interno do órgão (Art. 13 da Instrução Normativa nº 05/2017, do Tribunal de Contas do Estado do Piauí).'
      },
      {
        title: 'Adjudicação e Homologação',
        description: 'Atos de adjudicação e homologação e respectivas publicações.'
      },
      {
        title: 'Registro no Sistema Licitações Web',
        description: 'Registro das informações relativas à homologação da fase competitiva no Sistema Licitações Web, observado o prazo do art. 8º da Instrução Normativa TCE-PI nº 02/2026.'
      },
      {
        title: 'Parecer SEFAZ e Autorização de Reserva Orçamentária – ARO',
        description: 'Nos casos especificados no Decreto Estadual 17.084/2017. A manifestação específica da SEFAZ poderá ser dispensada em casos que não ultrapassem o valor de alçada definido pela CGFR (art. 3º, parágrafo único, do Decreto Estadual n. 21.908/2023).'
      },
      {
        title: 'Indicação do Gestor e do Fiscal do Contrato',
        description: 'Indicação do gestor e do fiscal do contrato ou comissão equivalente, preferencialmente do setor que receberá o bem ou serviço (art. 117 da Lei n. 14.133/2021; arts. 65 a 67 do Decreto Estadual n. 21.872/2023).'
      },
      {
        title: 'Publicação do Contrato',
        description: 'Publicação do contrato no Diário Oficial do Estado do Piauí (art. 94 da Lei n. 14.133/2021; art. 8º do Decreto Estadual nº 17.084/2017).'
      },
      {
        title: 'Cadastro do Contrato no Sistema Contratos Web',
        description: 'Cadastro do contrato e respectivos documentos no Sistema Contratos Web, observado o prazo do art. 11 da Instrução Normativa TCE-PI nº 02/2026.'
      },
      {
        title: 'Registro da Publicação do Resumo do Instrumento Contratual',
        description: 'Registro da publicação do resumo do instrumento contratual no Sistema Contratos Web (art. 11, §1º, da Instrução Normativa TCE-PI nº 02/2026).'
      },
      {
        title: 'Ordem de Serviço',
        description: 'Ordem de Serviço devidamente ratificada pelo Secretário de Governo ou agente delegado, e publicada no Diário Oficial do Estado, quando aplicável (Decreto Estadual nº 23.644/2025). O descumprimento implica nulidade da ordem de serviço e bloqueio da unidade gestora no SIAFE-PI.'
      },
    ],
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
    cards: [
      {
        title: 'Início',
        description: 'Necessidade do órgão de incorporar solução tecnológica disponibilizada gratuitamente por pessoa física ou jurídica, tal como software, aplicativo, plataforma digital, sistema informatizado, modelo de inteligência artificial, equipamento tecnológico ou outra solução inovadora (art. 184 da Lei nº 14.133/2021; Decreto Federal nº 9.764/2019).'
      },
      {
        title: 'Documento de Formalização da Demanda – DFD',
        description: 'Documento que evidencie e detalhe a necessidade administrativa, os objetivos institucionais pretendidos e a conveniência do recebimento da doação (art. 18, I, da Lei nº 14.133/2021).'
      },
      {
        title: 'Estudo Técnico Preliminar – ETP',
        description: '(art. 18, II, da Lei nº 14.133/2021; art. 17, II, do Decreto Estadual nº 21.872/2023), contendo no mínimo:',
        subitems: [
          { number: '1', title: 'Caracterização da necessidade administrativa' },
          { number: '2', title: 'Demonstração da utilidade pública da solução ofertada' },
          { number: '3', title: 'Análise da aderência da solução aos objetivos institucionais' },
          { number: '4', title: 'Avaliação dos impactos operacionais decorrentes da utilização da solução, incluindo avaliação do risco de aprisionamento tecnológico (lock-in) e garantia de portabilidade dos dados' },
          { number: '5', title: 'Análise dos custos diretos e indiretos eventualmente associados à implantação, utilização, manutenção ou evolução da solução' },
          { number: '6', title: 'Demonstração da vantajosidade do recebimento da doação' },
          { number: '7', title: 'Demonstração dos resultados esperados com a utilização do objeto doado' },
        ]
      },
      {
        title: 'Mapa de Riscos',
        description: 'Contendo a identificação, análise e tratamento dos riscos operacionais, tecnológicos, jurídicos, reputacionais e relacionados à continuidade da solução (art. 18, X, da Lei nº 14.133/2021; art. 17, III, e art. 31 do Decreto Estadual nº 21.872/2023). Atenção especial aos riscos de dependência tecnológica, segurança da informação, proteção de dados pessoais e propriedade intelectual.'
      },
      {
        title: 'Designação da Comissão Técnica',
        description: 'Designação da comissão técnica, equipe de apoio ou grupo de trabalho responsável pela condução do procedimento e avaliação das propostas apresentadas. Recomenda-se composição multidisciplinar compatível com a complexidade do objeto da doação.'
      },
      {
        title: 'Termo de Referência ou Documento Técnico de Desafio',
        description: 'Documento contendo:',
        subitems: [
          { number: '1', title: 'Descrição funcional da necessidade administrativa' },
          { number: '2', title: 'Delimitação do objeto pretendido' },
          { number: '3', title: 'Resultados esperados' },
          { number: '4', title: 'Requisitos mínimos para aceitação da solução' },
          { number: '5', title: 'Critérios objetivos de avaliação das propostas' },
          { number: '6', title: 'Condições de utilização da solução pela Administração' },
          { number: '7', title: 'Regras relativas à propriedade intelectual, confidencialidade, proteção de dados pessoais e aproveitamento da solução, quando aplicáveis' },
        ]
      },
      {
        title: 'Aprovação do ETP, do Mapa de Riscos e do Termo de Referência',
        description: 'Aprovação pela autoridade competente do órgão interessado (art. 18 do Decreto Estadual nº 21.872/2023).'
      },
      {
        title: 'Autorização de Abertura do Processo de Seleção',
        description: 'Autorização de abertura do processo de seleção de solução pela autoridade competente.'
      },
      {
        title: 'Autorizações Tecnológicas',
        subitems: [
          {
            number: '1',
            title: 'Análise técnico-operacional da SEAD',
            description: 'Quando a doação envolver soluções de Tecnologia da Informação e Comunicação – TIC (art. 17, III, "f", da Lei Estadual nº 7.884/2022).'
          },
          {
            number: '2',
            title: 'Autorização do Conselho de Transformação Digital, Economia Digital, Inteligência Artificial e Inovação',
            description: 'Quando a doação envolver soluções digitais, softwares, aplicativos ou transformação digital (Art. 2º, II, da Lei n. 7.990/2023).'
          },
        ],
      },
      {
        title: 'Declaração de utilização das minutas padronizadas da PGE',
        description: 'Quando houver.'
      },
      {
        title: 'Minuta de Edital de Chamamento Público ou Manifestação de Interesse',
        description: 'E respectivos anexos, inclusive minuta de contrato ou termo de doação, conforme o caso. Doações sem ônus: chamamento público ou manifestação de interesse. Doações com ônus ou encargo: manifestação de interesse (art. 6º do Decreto Federal n. 9.764/2019).'
      },
      {
        title: 'Análise Prévia pela Controladoria-Geral do Estado',
        description: 'Recomendada em contratações de grande vulto e acentuada complexidade, bem como em casos de dúvidas acerca da adequação da pesquisa de preços. O gestor deve justificar nos autos em caso de renúncia à consulta (Despacho PGE n. 760/2023, processo SEI 00012.000487/2023-96).'
      },
      {
        title: 'Parecer da PGE',
        description: '(art. 53, §4º, Lei n. 14.133/2021; art. 69 do Decreto Estadual n. 21.872/2023).'
      },
      {
        title: 'Autorização do Secretário da SEAD',
        description: 'Autorização para o procedimento (art. 17, III, XV e XIX, da Lei Estadual n. 7.884/2022).'
      },
      {
        title: 'Publicação do Edital de Chamamento ou Manifestação de Interesse',
        description: 'Publicação do edital de chamamento público ou da manifestação de interesse.'
      },
      {
        title: 'Cadastro Eletrônico da Seleção no Sistema Licitações Web',
        description: '(art. 5º, §1º, da Instrução Normativa nº 02/2026 - TCE/PI).'
      },
      {
        title: 'Ata, Relatório ou Documento Equivalente',
        description: 'Documento contendo a avaliação das propostas apresentadas.'
      },
      {
        title: 'Parecer Técnico Fundamentado acerca da Proposta Selecionada',
        description: 'Contendo no mínimo:',
        subitems: [
          { number: '1', title: 'Análise da aderência da proposta às necessidades da Administração' },
          { number: '2', title: 'Avaliação da viabilidade técnica da solução' },
          { number: '3', title: 'Análise das condições de utilização da solução' },
          { number: '4', title: 'Avaliação dos impactos operacionais decorrentes da implementação' },
          { number: '5', title: 'Manifestação acerca da conveniência e oportunidade da aceitação da doação' },
        ]
      },
      {
        title: 'Decisão Administrativa Fundamentada',
        description: 'Decisão administrativa fundamentada acerca da seleção da proposta e da aceitação da doação.'
      },
      {
        title: 'Análise Final pelo Controle Interno do Órgão',
        description: '(Art. 13 da Instrução Normativa nº 05/2017, do Tribunal de Contas do Estado do Piauí).'
      },
      {
        title: 'Registro no Sistema Licitações Web',
        description: 'Registro das informações relativas à homologação no Sistema Licitações Web, observado o prazo do art. 8º da Instrução Normativa TCE-PI nº 02/2026.'
      },
      {
        title: 'Indicação do Gestor e do Fiscal',
        description: 'Indicação do gestor e do fiscal do contrato de doação ou comissão equivalente, preferencialmente do setor que receberá o bem ou serviço, quando for o caso de contrato de doação (art. 117 da Lei n. 14.133/2021; arts. 65 a 67 do Decreto Estadual n. 21.872/2023). A formalização ocorre por contrato de doação (com encargo) ou por termo de doação (sem encargo), nos termos dos arts. 20 e 21 do Decreto Federal nº 9.764/2019.'
      },
      {
        title: 'Publicação do Contrato ou Termo de Doação',
        description: '(art. 94 da Lei n. 14.133/2021; art. 8º do Decreto Estadual nº 17.084/2017; art. 20, §2º, Decreto Federal n. 9.764/2019).'
      },
      {
        title: 'Cadastro do Contrato ou Termo de Doação no Sistema Contratos Web',
        description: 'Cadastro e respectivos documentos no Sistema Contratos Web, observado o prazo do art. 11 da Instrução Normativa TCE-PI nº 02/2026.'
      },
      {
        title: 'Registro da Publicação do Resumo do Instrumento',
        description: 'Registro da publicação do resumo do instrumento contratual ou do termo de doação no Sistema Contratos Web (art. 11, §1º, da Instrução Normativa TCE-PI nº 02/2026).'
      },
    ],
  },
  {
    id: 'licitacao',
    title: 'Licitação',
    subtitle: 'Pregão Eletrônico (Bens e Serviços Comuns – sem SRP) · Instrumento 12',
    href: '/licitacao',
    accentColor: '#37474f',
    icon: '📑',
    downloadKey: 'licitacao/Guia Explicativo de Licitacao.pdf',
    cards: [
    {
      title: 'Início',
      description: 'Necessidade administrativa de contratação de bens ou serviços comuns mediante Pregão Eletrônico, nos termos da Lei nº 14.133/2021 (sem Sistema de Registro de Preços).'
    },
    {
      title: 'Documento de Formalização da Demanda – DFD',
      description: 'Documento que evidencie e detalhe a necessidade administrativa do objeto a ser contratado (art. 18, I, da Lei nº 14.133/2021; art. 17, I, do Decreto Estadual nº 21.872/2023).',
      subitems: [
        { dote: true, title: 'Descrição da necessidade que se pretende atender por meio da aquisição do bem ou serviço, com manifestação acerca da natureza comum do objeto (art. 6º, XLI, da Lei nº 14.133/2021);' },
        { dote: true, title: 'Estimativa de quantitativo do objeto a ser contratado, justificada conforme o Plano Anual de Contratações, se houver, ou no quantitativo contratado em exercícios anteriores;' },
        { dote: true, title: 'Justificativa simplificada da necessidade da contratação, inclusive com demonstração da sua previsão no Plano Anual de Contratações, quando houver;' },
        { dote: true, title: 'Previsão de data em que deve ser iniciada a prestação dos serviços ou realizado o fornecimento dos bens.' },
      ],
    },
    {
      title: 'Declaração da SEAD acerca de ARP',
      description: 'Declaração da Secretaria de Administração acerca da existência de Ata de Registro de Preços vigente ou de intenção de registro de preços em andamento (art. 40 do Decreto Estadual nº 21.938/2023). Dispensada nas hipóteses do Decreto Estadual nº 21.909/2023.'
    },
    {
      title: 'Estudo Técnico Preliminar – ETP',
      description: 'Estudo Técnico Preliminar que demonstre a viabilidade da contratação e fundamente a solução escolhida (art. 18, II, Lei nº 14.133/2021; art. 17, II, do Decreto Estadual nº 21.872/2023). Facultado nas hipóteses dos incisos I, II, VII e VIII do art. 75 e do §7º do art. 90 da Lei nº 14.133/2021; dispensado na hipótese do inciso III do art. 75 e em prorrogações de contratos contínuos. Poderá ainda ser dispensado quando o valor estimado for de até 10 vezes os limites dos incisos I e II do art. 75 da Lei nº 14.133/2021.',
      fileKey: 'licitacao/ETP_SIA-PI_Modelo.pdf'
    },
    {
      title: 'Mapa de Riscos',
      description: 'Planejamento que identifica, analisa e propõe o tratamento de eventos que possam comprometer a licitação ou a execução contratual (art. 18, X, da Lei nº 14.133/2021; arts. 17, III, e 31 do Decreto Estadual nº 21.872/2023).',
      fileKey: 'licitacao/Mapa_Riscos_Pregao_Eletronico_SIA-PI.pdf'
    },
    {
      title: 'Termo de Referência – TR',
      description: 'Termo de Referência elaborado conforme arts. 35 a 38 do Decreto Estadual nº 21.872/2023 (art. 18, I e II, da Lei nº 14.133/2021; art. 17, V, do Decreto Estadual nº 21.872/2023). Deverá contemplar as exigências de práticas e/ou critérios de sustentabilidade, conforme Decreto Estadual nº 23.891/2025.'
    },
    {
      title: 'Pesquisa de Preços',
      description: 'Pesquisa de preços com metodologia documentada (art. 18, IV, da Lei nº 14.133/2021; art. 17, VI, e arts. 43 a 51 do Decreto Estadual nº 21.872/2023).'
    },
    {
      title: 'Autorizações Tecnológicas',
      subitems: [
        {
          number: '1',
          title: 'Análise Técnico-Operacional da SEAD',
          description: 'Caso se trate de contratação de soluções de Tecnologia da Informação e Comunicação – TIC (Art. 17, III, “f”, da Lei Estadual nº 7.884/2022). TIC abrange hardware, serviços de TI, softwares e aplicativos (Anexo II da IN SGD/ME nº 94/2022).'
        },
        {
          number: '2',
          title: 'Autorização do Conselho de Transformação Digital, Economia Digital, IA e Inovação',
          description: 'Caso se trate de contratação de soluções digitais – serviços de TIC, softwares e aplicativos (Art. 2º, II e V, da Lei nº 7.990/2023).'
        },
      ],
    },
    {
      title: 'Justificativas',
      subitems: [
        { dote: true, title: 'Adoção de orçamento sigiloso, quando for o caso (art. 24 da Lei nº 14.133/2021; arts. 51 e 91 do Decreto Estadual nº 21.872/2023);' },
        { dote: true, title: 'Adoção de pregão presencial, se for o caso (art. 17, §2º, da Lei nº 14.133/2021; art. 187 do Decreto Estadual nº 21.872/2023);' },
        { dote: true, title: 'Inversão entre as fases de habilitação e de apresentação de propostas e lances e de julgamento, se for o caso (art. 17, §1º, da Lei nº 14.133/2021; art. 87, §1º, do Decreto Estadual nº 21.872/2023);' },
        { dote: true, title: 'Exigências de qualificação técnica (parcelas de maior relevância técnica ou valor significativo) e de qualificação econômico-financeira;' },
        { dote: true, title: 'Justificativa das regras pertinentes à participação de empresas em consórcio (art. 15 da Lei nº 14.133/2021);' },
        { dote: true, title: 'Justificativa das regras pertinentes à participação de cooperativas (art. 16 da Lei nº 14.133/2021).' },
      ],
    },
    {
      title: 'Aprovação pela Autoridade Competente do Órgão',
      description: 'Aprovação do ETP e do Mapa de Riscos (se houver), do orçamento estimado e do Termo de Referência pela autoridade competente do órgão interessado (art. 18 do Decreto Estadual nº 21.872/2023). A aprovação e a autorização de abertura podem constar no mesmo documento.'
    },
    {
      title: 'Autorização de Abertura do Procedimento Licitatório',
      description: 'Autorização de abertura do procedimento licitatório pela autoridade competente do órgão interessado (art. 17, VIII, e 53 do Decreto Estadual nº 21.872/2023).'
    },
    {
      title: 'Autorização da CGFR',
      description: 'Autorização da contratação pela Comissão de Gestão Financeira e Gestão por Resultados – CGFR (art. 3º, II, do Decreto Estadual nº 21.908/2023). Dispensada em casos que não ultrapassem o valor de alçada definido pela CGFR.'
    },
    {
      title: 'Nota de Reserva',
      description: 'Nota de Reserva orçamentária (arts. 17, VII, e 52 do Decreto Estadual nº 21.872/2023).'
    },
    {
      title: 'Designação de Pregoeiro e Equipe de Apoio',
      description: 'Designação formal do pregoeiro e da equipe de apoio (art. 17, IX, do Decreto Estadual nº 21.872/2023).'
    },
    {
      title: 'Matriz de Riscos',
      description: 'Matriz de Riscos, quando for o caso (arts. 17, III, 33 e 34 do Decreto Estadual nº 21.872/2023). Obrigatória nas contratações cujo valor estimado superar 2% do limite do art. 6º, XXII, da Lei nº 14.133/2021, e quando a natureza do processo envolver riscos relevantes que possam ocasionar desequilíbrio econômico-financeiro do contrato.'
    },
    {
      title: 'Declaração de Utilização das Minutas Padronizadas da PGE',
      description: 'Declaração de utilização das minutas padronizadas de edital e contrato da PGE.'
    },
    {
      title: 'Minutas do Edital, Contrato e Anexos',
      description: 'Minutas do edital, do contrato e respectivos anexos (art. 18, V e VI, da Lei nº 14.133/2021; art. 17, X e XI, do Decreto Estadual nº 21.872/2023). O contrato pode ser substituído por nota de empenho acompanhada de autorização de compra ou ordem de serviço (art. 95, I, da Lei nº 14.133/2021), sendo obrigatória, em qualquer caso, a publicação do extrato.'
    },
    {
      title: 'Análise Prévia da CGE',
      description: 'Análise prévia pela Controladoria-Geral do Estado, recomendada em contratações de grande vulto e acentuada complexidade, ou em casos de dúvidas acerca da adequação da pesquisa de preços (Despacho PGE nº 760/2023, SEI nº 00012.000487/2023-96).'
    },
    {
      title: 'Parecer PGE',
      description: 'Parecer da Procuradoria-Geral do Estado (art. 53, §4º, da Lei nº 14.133/2021; art. 69 do Decreto Estadual nº 21.872/2023).'
    },
    {
      title: 'Autorização de Abertura de Licitação pelo Secretário da SEAD',
      description: 'Autorização do Secretário da SEAD para abertura da licitação (Art. 17, III, XV e XIX, da Lei Estadual nº 7.884/2022).'
    },
    {
      title: 'Publicação do Aviso do Edital',
      description: 'Publicação do aviso do edital no Diário Oficial do Estado do Piauí (DOE-PI), no Portal Nacional de Contratações Públicas (PNCP) e no sítio eletrônico oficial do órgão (art. 54 da Lei nº 14.133/2021; art. 93 do Decreto Estadual nº 21.872/2023).',
      fileKey: 'licitacao/Aviso_Licitacao_Pregao_Eletronico_SIA-PI.pdf'
    },
    {
      title: 'Comunicação de Abertura ao TCE',
      description: 'Comunicação de abertura do procedimento licitatório ao Tribunal de Contas do Estado do Piauí até o dia útil imediatamente posterior ao da última publicação do aviso de licitação (art. 6º, Instrução Normativa nº 06/2017 - TCE/PI).'
    },
    {
      title: 'Atas, Relatórios e Deliberações do Pregoeiro',
      description: 'Atas, relatórios e deliberações do Pregoeiro e equipe de apoio durante a condução do certame.'
    },
    {
      title: 'Análise Final pelo Controle Interno do Órgão',
      description: 'Análise final do procedimento pelo controle interno do órgão (Art. 13 da Instrução Normativa nº 05/2017, do Tribunal de Contas do Estado do Piauí).'
    },
    {
      title: 'Adjudicação e Homologação',
      description: 'Atos de adjudicação do objeto da licitação e de homologação, com as respectivas publicações.'
    },
    {
      title: 'Parecer SEFAZ e Autorização de Reserva Orçamentária – ARO',
      description: 'Parecer SEFAZ, nos casos especificados no Decreto Estadual nº 17.084/2017, e/ou Autorização de Reserva Orçamentária – ARO. A manifestação específica da SEFAZ poderá ser dispensada em casos que não ultrapassem o valor de alçada definido pela CGFR (art. 3º, parágrafo único, do Decreto Estadual nº 21.908/2023).'
    },
    {
      title: 'Indicação do Gestor e do Fiscal do Contrato ou Comissão Equivalente',
      description: 'Indicação do gestor e do fiscal do contrato ou comissão equivalente, preferencialmente do setor que receberá o bem ou serviço (art. 117 da Lei nº 14.133/2021; arts. 65 a 67 do Decreto Estadual nº 21.872/2023).'
    },
    {
      title: 'Publicação no Diário Oficial do Estado do Piauí (DOE) e no PNCP (Portal Nacional de Contratações Públicas)',
      description: 'Publicação do contrato (art. 94 da Lei nº 14.133/2021; art. 8º do Decreto Estadual nº 17.084/2017). A publicação do extrato no PNCP e no DOE-PI é condição de eficácia do contrato.'
    },
    {
      title: 'Comunicações ao TCE',
      subitems: [
        {
          number: '1',
          title: 'Comunicação de Encerramento do Procedimento Licitatório',
          description: 'Em até 10 (dez) dias úteis após a homologação, ainda que parcial, relacionada a cada procedimento licitatório (art. 7º, Instrução Normativa nº 06/2017 - TCE/PI).'
        },
        {
          number: '2',
          title: 'Comunicação de Assinatura do Contrato',
          description: 'Comunicação de assinatura do contrato ou documento substitutivo ao TCE em até 10 (dez) dias úteis após o ato (art. 11, Instrução Normativa nº 06/2017 – TCE/PI).'
        },
      ],
    },
    {
      title: 'Ordem de Serviço',
      description: 'Ordem de Serviço devidamente ratificada pelo Secretário de Governo ou por agente delegado, e publicada no Diário Oficial do Estado (art. 1º do Decreto Estadual nº 23.644/2025). O descumprimento implica nulidade da ordem de serviço e bloqueio da unidade gestora no SIAFE-PI (parágrafo único).'
    },
  ],
  },
]

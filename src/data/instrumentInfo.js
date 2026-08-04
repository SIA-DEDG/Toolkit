// Texto explicativo longo de cada instrumento, exibido no modal que abre pelo
// botão de informação no card do "Passo a passo".
//
// A chave é o `id` do instrumento em INSTRUMENT_FLOWS (instruments.js) — os dois
// arquivos precisam usar exatamente o mesmo id, senão o botão não aparece.
//
// Formato de cada entrada:
//   title       - Nome do instrumento no cabeçalho do modal.
//   legalBasis  - Texto da linha "Base Legal", sem o rótulo (ele já vem no modal).
//   paragraphs  - Corpo do texto, na ordem de leitura. Cada item pode ser:
//                   'texto'                  -> parágrafo comum;
//                   { term: '...', text: '...' } -> item de lista com rótulo em
//                   negrito, para trechos como "Risco Tecnológico: ...".
//
// Entradas com `paragraphs` vazio são consideradas pendentes: o botão de
// informação simplesmente não é renderizado naquele card, sem quebrar nada.

export const INSTRUMENT_INFO = {
  'acordo-pd&i': {
    title: 'Acordo para Pesquisa, Desenvolvimento e Inovação – PD&I',
    legalBasis: 'art. 9º da Lei n. 10.973/2004; arts. 35 a 37 do Decreto Federal n. 9.283/2018; art. 8º da Lei Estadual n. 7.511/2021. A aplicação da Lei n. 14.13/2021 ocorre de forma subsidiária.',
    paragraphs: [
      'O Acordo de Parceria para Pesquisa, Desenvolvimento e Inovação (PD&I) é um instrumento jurídico estabelecido pela Lei de Inovação (Lei nº 10.973/2004) e regulamentado pelo Decreto Federal nº 9.283/2018. No âmbito estadual encontra-se previsto no art. 8º da Lei Estadual n. 7.511/2021.',
      'Este acordo facilita a cooperação entre Instituições Científicas, Tecnológicas e de Inovação (ICTs) e outras instituições públicas ou privadas para a realização de atividades conjuntas de pesquisa científica, desenvolvimento tecnológico e inovação.',
      'Caracteriza-se pela ausência de transferência de recursos financeiros públicos ao parceiro privado, distinguindo-se dos convênios de PD&I quanto a tal ponto. O objetivo principal é agregar conhecimento, recursos humanos, financeiros e materiais, bem como a infraestrutura necessária para a execução dos projetos.',
      'Também pode ser utilizado quando houver transferência de recursos financeiros do parceiro privado para o público, facultada a intermediação por Fundação de Apoio (§§ 6º e 7º do Artigo 35 do Decreto nº 9.283/18).',
      'A Advocacia Geral da União (AGU), por meio de parecer emitido pela Câmara Permanente de Ciência, Tecnologia e Inovação da Procuradoria Geral Federal, consolidou o entendimento de que os acordos de parceria para PD&I são regidos diretamente pela Lei de Inovação e pelo Decreto Federal nº 9.283/2018. Esse parecer reforça a autonomia e especificidade da legislação de Ciência, Tecnologia e Inovação (CT&I) no Brasil, destacando a importância desses instrumentos para a promoção da inovação colaborativa.',
    ],
  },

  'convenio-pd&i': {
    title: 'Convênio para Pesquisa, Desenvolvimento e Inovação – PD&I',
    legalBasis: 'art. 9º-A da Lei n. 10.973/2004; arts. 38 a 45 do Decreto Federal n. 9.283/2018; art. 9º da Lei Estadual n. 7.511/2021. A aplicação da Lei n. 14.133/2021 ocorre de forma subsidiária.',
    paragraphs: [
      'O Convênio de Parceria para Pesquisa, Desenvolvimento e Inovação - PD&I - é um instrumento jurídico estabelecido pela Lei de Inovação (Lei nº 10.973/2004) e regulamentado pelo Decreto Federal nº 9.283/2018. No âmbito estadual encontra-se previsto no art. 9º da Lei Estadual n. 7.511/2021.',
      'Semelhante ao Acordo de Parceria para Pesquisa, Desenvolvimento e Inovação, facilita a cooperação entre Instituições Científicas, Tecnológicas e de Inovação (ICTs) e outras instituições públicas ou privadas para a realização de atividades conjuntas de pesquisa científica, desenvolvimento tecnológico e inovação.',
      'Os Convênios distinguem-se dos Acordos de PD&I por envolverem repasses financeiros; além disso, o ajuste poderá ser precedido de processo seletivo promovido pela concedente ou apresentação de proposta de projeto por iniciativa de ICT pública (art. 39 do Decreto Federal n. 9.283/2018). O objetivo principal é agregar conhecimento, recursos humanos, financeiros e materiais, bem como a infraestrutura necessária para a execução dos projetos.',
      'A Advocacia Geral da União (AGU), por meio de parecer emitido pela Câmara Permanente de Ciência, Tecnologia e Inovação da Procuradoria Geral Federal, consolidou o entendimento de que os convênios de parceria para PD&I são regidos diretamente pela Lei de Inovação e pelo Decreto Federal nº 9.283/2018. Esse parecer reforça a autonomia e especificidade da legislação de Ciência, Tecnologia e Inovação (CT&I) no Brasil, destacando a importância desses instrumentos para a promoção da inovação colaborativa.',
    ],
  },

  'encomenda-tecnologica': {
    title: 'Contrato de Encomenda Tecnológica',
    legalBasis: 'art. 75, V, da Lei n. 14.133/2021; arts. 19, §2º-A, V, e 20, da Lei n. 10.973/2004; arts. 27 a 33 do Decreto Federal n. 9.283/2018; art. 19 da Lei Estadual n. 7.511/2021.',
    paragraphs: [
      'A encomenda tecnológica é um instrumento jurídico utilizado pelo poder público para fomentar a inovação no setor produtivo, permitindo a contratação direta de atividades de pesquisa, desenvolvimento e inovação (PD&I) voltadas para a solução de problemas técnicos específicos ou para a obtenção de produtos, serviços ou processos inovadores.',
      'Características Principais:',
      { term: 'Redução de Assimetrias Informacionais', text: 'A encomenda tecnológica prioriza a descrição funcional do problema ao invés das especificações técnicas do objeto. Isso facilita a interação entre contratante e contratado, promovendo melhores práticas de inovação.' },
      { term: 'Planejamento e Estruturação', text: 'O procedimento inicia-se com a elaboração de estudos preliminares e de mapa de riscos, seguido pela instauração de chamamento público para manifestações de interesse de potenciais fornecedores. Essa etapa é importante para justificar o uso da Lei de Inovação perante os órgãos de controle e para prospectar tecnologias existentes e possíveis soluções alternativas.' },
      { term: 'Risco Tecnológico', text: 'A existência de risco tecnológico é um pressuposto necessário para a utilização da encomenda tecnológica. Este risco deriva da incerteza científica e do emprego inédito da tecnologia, sendo que o próprio atingimento da solução esperada não é certo.' },
      { term: 'Flexibilidade Contratual', text: 'A encomenda tecnológica permite que a seleção do contratado se oriente não pelo menor preço, mas pela maior probabilidade de alcançar o resultado pretendido, considerando fatores como competência técnica e qualidade do projeto apresentado.' },
      'Para a formalização do ajuste a licitação é dispensável, nos termos do art. 75, V, da Lei n. 14.133/2021, e art. 12, § 1º, do Decreto Federal n. 9.283/2018.',
    ],
  },

  'contrato-publico': {
    title: 'Contrato Público de Solução Inovadora (CPSI)',
    legalBasis: 'arts. 12 a 15 da Lei Complementar Federal nº 182/2021 (Marco Legal das Startups e do Empreendedorismo Inovador); aplicação subsidiária da Lei nº 14.133/2021.',
    paragraphs: [
      'O Contrato Público para Solução Inovadora – CPSI é instrumento jurídico destinado à contratação, pela Administração Pública, de pessoas físicas ou jurídicas, isoladamente ou em consórcio, para o teste de soluções inovadoras desenvolvidas ou a serem desenvolvidas, com ou sem risco tecnológico, visando à resolução de demandas públicas que exijam inovação.',
      'O instituto foi criado pelo Marco Legal das Startups (Lei Complementar nº 182/2021), por meio de procedimento especial de contratação pública, distinto das hipóteses de dispensa e inexigibilidade previstas na Lei nº 14.133/2021, caracterizando verdadeira licitação especial com regime jurídico próprio.',
      'Diferentemente das contratações tradicionais, o CPSI prioriza a identificação e resolução de um problema público, e não a prévia definição exaustiva do objeto contratual. O foco está na busca da solução mais adequada e inovadora, permitindo maior flexibilidade na definição técnica da solução, desde que observados os critérios objetivos de seleção previstos no edital.',
      'A seleção do contratado não se orienta necessariamente pelo menor preço, mas pela maior probabilidade de êxito da solução proposta, considerando aspectos como potencial inovador, viabilidade técnica, maturidade da solução, economicidade e capacidade de execução.',
      'Em razão da natureza própria do instituto, especialmente da necessidade de demonstração do problema público, da insuficiência das soluções disponíveis no mercado e da avaliação do risco tecnológico envolvido, o Estudo Técnico Preliminar e o Mapa de Riscos assumem caráter essencial, não se mostrando adequada sua dispensa, ainda que a contratação envolva valores reduzidos.',
      'Concluído o CPSI com êxito, a Administração poderá celebrar posteriormente contrato de fornecimento com o contratado, dispensada nova licitação, conforme procedimento administrativo próprio com instrução específica e observância dos limites e requisitos previstos no art. 14 da Lei Complementar nº 182/2021.',
    ],
  },

  'doacao-solucao-inovadora': {
    title: 'Doação de Solução Inovadora',
    legalBasis: 'art. 184 da Lei nº 14.133/2021; Decreto Federal nº 9.283/2018; Lei Estadual nº 7.511/2021; Decreto Federal nº 9.764/2019.',
    paragraphs: [
      'O recebimento de solução inovadora por doação constitui instrumento destinado a viabilizar a incorporação, pela Administração Pública, de soluções tecnológicas disponibilizadas gratuitamente por pessoas físicas ou jurídicas, tais como softwares, aplicativos, plataformas digitais, sistemas informatizados, modelos de inteligência artificial, equipamentos tecnológicos e outras soluções inovadoras.',
      'O instituto distingue-se das contratações públicas tradicionais por não envolver contraprestação financeira da Administração ao particular e diferencia-se dos instrumentos de pesquisa, desenvolvimento e inovação – PD&I e do Contrato Público para Solução Inovadora – CPSI por pressupor, em regra, a existência de solução já desenvolvida e apta à utilização ou avaliação pela Administração Pública.',
      'O recebimento da solução ocorrerá mediante chamamento público ou manifestação de interesse que assegure transparência, impessoalidade e observância do interesse público, especialmente quando houver pluralidade potencial de interessados ou quando a Administração pretender identificar a solução mais adequada para atendimento de determinada necessidade administrativa.',
      'A instrução processual deverá demonstrar a necessidade administrativa, os benefícios esperados, a viabilidade técnica da solução e a compatibilidade com as normas de segurança da informação, proteção de dados pessoais, propriedade intelectual, interoperabilidade e governança digital.',
      'A doação poderá ocorrer com ou sem encargos, desde que eventual encargo seja compatível com o interesse público e não implique burla ao regime jurídico das contratações públicas. O recebimento da solução inovadora não gera ao doador qualquer direito de preferência em futuras contratações nem obriga a Administração Pública a celebrar contratos posteriores.',
    ],
  },

  'contrato-transferencia-tecnologia': {
    title: 'Contrato de Transferência de Tecnologia não Patenteada, não Patenteável ou de Know-How',
    legalBasis: 'art. 75, IV, “d”, da Lei n. 14.133/2021; art. 6º da Lei n. 10.973/2004; arts. 11 e 12 do Decreto Federal n. 9.283/2018; arts. 6º e 7º da Lei Estadual n. 7.511/2021.',
    paragraphs: [
      'Contrato de Transferência de Tecnologia não patenteada, não patenteável ou de Know-How é o instrumento jurídico que estipula as condições para a aquisição de conhecimentos e de técnicas exclusivas não amparadas por direitos de propriedade industrial, depositados ou concedidos no Brasil, mais comumente designado por KNOW-HOW. O contrato deve compreender o conjunto de informações e dados técnicos que permitam a fabricação dos produtos e/ou processos. Incluem-se também nesta categoria os contratos de licença de uso de programas de computador, software, desde que prevista a abertura do código fonte (art. 11 da Lei nº 9.609/98).',
      'Nesse tipo de ajuste, CONTRATANTE é a empresa (entidade constituída sob qualquer forma jurídica para exploração de uma atividade econômica) ou entidade de natureza pública ou pessoa jurídica de direito privado sem fins lucrativos legalmente constituída sob as leis brasileiras, com sede e foro no País, que inclua em sua missão institucional ou em seu objetivo social ou estatutário a pesquisa básica ou aplicada de caráter científico ou tecnológico ou o desenvolvimento de novos produtos, serviços ou processos, signatária do contrato com a ICT pública.',
      'A CONTRATADA é a Instituição Científica, Tecnológica e de Inovação (ICT): órgão ou entidade da administração pública direta ou indireta (inciso V do art. 2º da Lei nº 10.973/04). A transferência de tecnologia ocorrerá da Contratada para a Contratante.',
      'Pode ainda ocorrer a interveniência de Fundação de Apoio no ajuste.',
      'Para a formalização do ajuste a licitação é dispensável, nos termos do art. 75, IV, “d”, da Lei n. 14.133/2021 e art. 12, § 1º, do Decreto Federal n. 9.283/2018.',
    ],
  },

  'pmi': {
    title: 'Procedimento de Manifestação de Interesse – PMI',
    legalBasis: 'art. 81 da Lei nº 14.133/2021.',
    paragraphs: [
      'O Procedimento de Manifestação de Interesse – PMI é instrumento auxiliar da Administração Pública destinado à obtenção, junto à iniciativa privada, de estudos, levantamentos, investigações, projetos e soluções inovadoras voltados à estruturação de futuras contratações ou decisões administrativas relevantes.',
      'Previsto no art. 81 da Lei nº 14.133/2021, o PMI não constitui modalidade licitatória nem implica contratação imediata, tratando-se de mecanismo de colaboração voltado à redução de assimetrias informacionais, à prospecção de soluções existentes no mercado e ao aperfeiçoamento do planejamento estatal.',
      'O procedimento poderá subsidiar diversas espécies de contratação pública, inclusive contratos administrativos comuns, soluções inovadoras, encomendas tecnológicas, contratos públicos de solução inovadora – CPSI, concessões e outros ajustes administrativos.',
      'A realização do PMI não gera direito de preferência em futura contratação, não obriga a Administração Pública a contratar e não assegura ressarcimento automático aos interessados, observando-se o disposto no art. 81, §2º, da Lei nº 14.133/2021. A eventual contratação decorrente dos estudos produzidos dependerá de procedimento administrativo próprio, observada a legislação aplicável.',
      'Conforme entendimento consolidado da Advocacia-Geral da União – AGU, o art. 81 da Lei nº 14.133/2021 possui aplicabilidade imediata, independentemente de regulamentação específica.',
    ],
  },

  'dialogo-competitivo': {
    title: 'Diálogo Competitivo',
    legalBasis: 'Art. 6º, XLII, e art. 32 da Lei nº 14.133/2021; Instrução Normativa SEGES/MGI nº 512/2025.',
    paragraphs: [
      'O diálogo competitivo é modalidade de licitação destinada às hipóteses em que a Administração Pública identifique necessidade administrativa caracterizada por elevada complexidade técnica, operacional, tecnológica, jurídica ou econômico-financeira, especialmente em contratações relacionadas à inovação, transformação digital, inteligência artificial, soluções de tecnologia da informação e comunicação – TIC, infraestrutura tecnológica, cidades inteligentes e modernização de serviços públicos.',
      'A modalidade poderá ser utilizada quando a Administração Pública não conseguir definir previamente, com precisão suficiente, a solução mais adequada para atendimento da necessidade administrativa, especialmente nos casos que demandem adaptação relevante de soluções existentes no mercado, desenvolvimento de solução inovadora ou definição de estrutura técnica, operacional, jurídica ou econômico-financeira ainda não suficientemente delimitada.',
      'Diferentemente das modalidades licitatórias tradicionais, o diálogo competitivo prioriza a construção colaborativa da solução antes da definição definitiva do objeto contratual. A Administração Pública estrutura o procedimento a partir do problema público identificado, dos resultados esperados e dos desafios técnicos envolvidos, promovendo interação qualificada com o mercado para identificação da alternativa mais adequada ao interesse público.',
      'Nos termos da Instrução Normativa SEGES/MGI nº 512/2025, o procedimento desenvolve-se em três fases sucessivas: pré-seleção, diálogo e competitiva. Na fase de pré-seleção, a Administração Pública estrutura a contratação e seleciona os participantes aptos a integrar os diálogos. Na fase de diálogo, são discutidas e desenvolvidas soluções capazes de atender à necessidade administrativa. Por fim, na fase competitiva, após a consolidação da solução e dos documentos técnicos pertinentes, os participantes apresentam suas propostas finais, que serão submetidas a julgamento e habilitação nos termos da legislação aplicável. A utilização do diálogo competitivo exige motivação robusta quanto ao enquadramento em uma das hipóteses previstas no art. 32 da Lei nº 14.133/2021, não sendo suficiente a mera alegação genérica de complexidade do objeto.',
    ],
  },

  'concurso-publico-inovacao': {
    title: 'Concurso Público de Inovação',
    legalBasis: 'arts. 218, 219, 219-A e 219-B da Constituição Federal; Lei Federal nº 10.973/2004 (Lei de Inovação); Lei Estadual nº 7.511/2021; art. 184 da Lei nº 14.133/2021.',
    paragraphs: [
      'O Concurso Público de Inovação constitui instrumento de inovação aberta destinado à identificação, seleção, reconhecimento e premiação de projetos técnicos, científicos, tecnológicos ou inovadores voltados à solução de problemas públicos, ao aperfeiçoamento de políticas públicas, à modernização administrativa e à geração de valor público.',
      'O instrumento poderá assumir diferentes formatos, tais como desafios tecnológicos, hackathons, concursos de pitch, maratonas de inovação, chamadas públicas para soluções inovadoras ou outras iniciativas voltadas à mobilização do ecossistema de inovação para enfrentamento de desafios de interesse público.',
      'Diferentemente da modalidade licitatória concurso prevista no art. 30 da Lei nº 14.133/2021, o Concurso Público de Inovação não possui como finalidade imediata a contratação de bens ou serviços pela Administração Pública. Seu objetivo principal consiste em fomentar a inovação, estimular a participação colaborativa da sociedade e identificar soluções com potencial de contribuir para a resolução de problemas públicos.',
      'A premiação poderá consistir em incentivos financeiros ou não financeiros, tais como valores em dinheiro, bolsas, mentorias, programas de incubação ou aceleração, capacitações, certificações, apoio técnico, reconhecimento institucional, participação em projetos-piloto ou outros benefícios compatíveis com os objetivos do concurso e com o interesse público.',
      'Poderão participar pessoas físicas, startups, empresas, instituições científicas, tecnológicas e de inovação – ICTs, universidades, centros de pesquisa, organizações da sociedade civil e demais agentes do ecossistema de inovação, conforme as regras estabelecidas no edital.',
      'A realização do concurso não gera direito subjetivo à contratação, à celebração de parceria ou à implementação da solução apresentada. Eventual contratação, desenvolvimento tecnológico, realização de projeto-piloto, celebração de parceria, transferência de tecnologia ou utilização de outro instrumento jurídico dependerá de procedimento próprio e da observância da legislação aplicável.',
    ],
  },

  // ---- Pendentes de conteúdo ----------------------------------------------

  'licitacao': {
    title: 'Licitação',
    legalBasis: '',
    paragraphs: [],
  },

  'contratacao-direta': {
    title: 'Contratação Direta',
    legalBasis: '',
    paragraphs: [],
  },

  'pitch-hackton': {
    title: 'Pitches e Hackatons',
    legalBasis: '',
    paragraphs: [],
  },
}

/**
 * Busca o texto explicativo de um instrumento.
 *
 * @param {string} id - Id do instrumento, o mesmo usado em INSTRUMENT_FLOWS.
 * @returns {{title: string, legalBasis: string, paragraphs: Array<string|{term: string, text: string}>}|null}
 *   A entrada correspondente, ou null se o instrumento não existe ou ainda está
 *   sem conteúdo escrito.
 */
export function getInstrumentInfo(id) {
  const info = INSTRUMENT_INFO[id]
  if (!info || info.paragraphs.length === 0) return null
  return info
}

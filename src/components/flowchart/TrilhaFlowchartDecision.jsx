import { InstrumentCard } from './InstrumentCard'
import { Handshake, NotepadText, Lightbulb, MessageCircle, Computer, Wrench, Package, ClipboardCheck, RefreshCw, FileText, Search, Trophy } from 'lucide-react'

const BRAND_BLUE = '#0e59a8'

// Cor de FUNDO das caixas de decisão de cada família (o texto por cima é branco).
// São hex fixos, em tom médio nos dois temas, para o branco continuar legível.
const FAMILY_BOX_BG = {
  parceria: '#6d28d9',
  contratacao: '#0e7490',
  mercado: '#b45309',
}

// Cor de TEXTO/realce e fundo do ícone dos cards de instrumento por família.
// accentColor vem de CSS variable porque clareia no tema escuro (ver index.css).
const FAMILY_CARD_STYLE = {
  parceria: { accentColor: 'rgb(var(--accent-a))', iconBg: 'rgba(109,40,217,0.15)' },
  contratacao: { accentColor: 'rgb(var(--accent-b))', iconBg: 'rgba(14,116,144,0.15)' },
  mercado: { accentColor: 'rgb(var(--accent-c))', iconBg: 'rgba(180,83,9,0.15)' },
}

const CARD_WIDTH = 188
const CARD_HEIGHT = 160

// Regras de espaçamento da árvore, em px.
const LABELED_GAP = 30    // respiro acima e abaixo de um rótulo de ramo
const PLAIN_GAP = 36      // respiro em ligações diretas, sem rótulo de ramo
const LABEL_HEIGHT = 34   // altura de referência do rótulo, usada no cálculo
const SIBLING_GAP = 40    // espaço horizontal entre nós irmãos
const CANVAS_PADDING = 24 // respiro nas bordas do canvas

const INSTRUMENTS_RAW = {
  convenio: { id: 'convenio-pd&i', family: 'parceria', icon: NotepadText, title: 'Convênio de PD&I', description: 'Com repasse financeiro — Art. 9º, Lei 10.973' },
  acordo: { id: 'acordo-pd&i', family: 'parceria', icon: Handshake, title: 'Acordo de Parceria PD&I', description: 'Sem repasse financeiro — Art. 9º, Lei 10.973' },
  licitacao: { id: 'licitacao', family: 'contratacao', icon: FileText, title: 'Licitação', description: 'Convencional — Lei 14.133/2021' },
  etec: { id: 'encomenda-tecnologica', family: 'contratacao', icon: Computer, title: 'Encomenda Tecnológica', description: 'Arts. 20 a 22, Lei 10.973' },
  cpsi: { id: 'contrato-publico', family: 'contratacao', icon: Wrench, title: 'Contrato Público para Solução Inovadora', description: 'Por fases competitivas — Arts. 49-51' },
  direta: { id: 'contratacao-direta', family: 'contratacao', icon: ClipboardCheck, title: 'Contratação Direta', description: 'Dispensa / Inexigibilidade — Arts. 72-75, Lei 14.133' },
  doacao: { id: 'doacao-solucao', family: 'contratacao', icon: Package, title: 'Doação de Solução Inovadora', description: 'Art. 14-A, Lei 10.973' },
  transferencia: { id: 'transferencia-tecnologia', family: 'contratacao', icon: RefreshCw, title: 'Transferência Tecnológica', description: 'Know-how interno — Arts. 6º e 37, Lei 10.973' },
  pmi: { id: 'pmi', family: 'mercado', icon: Search, title: 'Procedimento de Manifestação de Interesse', description: 'PMI — Art. 26, Lei 14.133' },
  dialogo: { id: 'dialogo-competitivo', family: 'mercado', icon: MessageCircle, title: 'Diálogo Competitivo', description: 'Art. 32, Lei 14.133/2021' },
  pitchHackathon: { id: 'pitch-hackton', family: 'mercado', icon: Lightbulb, title: 'Pitches e Hackathons', description: 'Apresentação e prototipagem de ideias' },
  concurso: { id: 'concurso-publico-inovacao', family: 'mercado', icon: Trophy, title: 'Concurso Público de Inovação', description: 'Formal com premiação — Art. 29, Lei 10.973' },
}

// Catálogo dos 12 instrumentos já com as cores da sua família aplicadas.
// É a fonte usada também pela HomePage e pelos menus de grupo.
export const INSTRUMENTS = Object.fromEntries(
  Object.entries(INSTRUMENTS_RAW).map(([key, instrument]) => [key, { ...instrument, ...FAMILY_CARD_STYLE[instrument.family] }])
)

/**
 * @typedef {object} BoxProps Aparência de uma caixa de decisão.
 * @property {number} width - Largura em px.
 * @property {number} height - Altura mínima em px.
 * @property {string} bg - Cor de fundo.
 * @property {string} text - Pergunta exibida.
 * @property {string} [subtitle] - Segunda linha, menor e mais clara.
 * @property {boolean} [pill] - true arredonda totalmente as pontas.
 */

/**
 * @typedef {object} TreeNode Um nó da árvore de decisão.
 * @property {'box'|'card'} type - 'card' é folha (um instrumento); 'box' é pergunta.
 * @property {string} key - Identificador único. Em cards, a chave em INSTRUMENTS.
 * @property {BoxProps} [boxProps] - Só em nós 'box'.
 * @property {'plain'|'labeled'} [connectMode] - 'labeled' abre espaço para o
 *   rótulo da resposta entre o pai e os filhos.
 * @property {TreeNode[]} [children] - Filhos, da esquerda para a direita.
 * @property {string[]} [labels] - Rótulo de cada ramo, na ordem de `children`.
 * @property {number} [laneWidth] - Força a faixa horizontal reservada ao nó, em
 *   vez de derivá-la da subárvore.
 * @property {number} [drop] - Empurra o nó para baixo, para não colidir com o irmão.
 */

/**
 * Cria uma folha da árvore, apontando para um instrumento do catálogo.
 *
 * @param {string} key - Chave em INSTRUMENTS.
 * @returns {TreeNode}
 */
const instrumentNode = (key) => ({ type: 'card', key })

/**
 * Cria um nó de pergunta.
 *
 * @param {string} key - Identificador único do nó.
 * @param {BoxProps} boxProps - Aparência da caixa desenhada.
 * @param {Partial<TreeNode>} [connection] - Filhos, rótulos e ajustes de layout.
 * @returns {TreeNode}
 */
const decisionNode = (key, boxProps, connection = {}) => ({ type: 'box', key, boxProps, connectMode: 'plain', ...connection })

// A árvore de decisão inteira, declarada de cima para baixo. A ordem dos
// `children` é a ordem da esquerda para a direita na tela, e cada posição de
// `labels` corresponde ao filho de mesmo índice.
const TREE = decisionNode('root', { width: 340, height: 42, bg: '#042d63', pill: true, text: 'Necessidade Institucional' }, {
  children: [
    decisionNode('objetivo', { width: 520, height: 60, bg: '#116ed0', text: 'O que a instituição precisa fazer?', subtitle: 'Ponto de partida da necessidade institucional' }, {
      connectMode: 'labeled',
      labels: ['Desenvolver', 'Adquirir / Contratar', 'Explorar mercado'],
      children: [
        decisionNode('repasseRecursos', { width: 400, height: 60, bg: FAMILY_BOX_BG.parceria, text: 'Haverá transferência ou repasse de recursos públicos para o parceiro?' }, {
          connectMode: 'labeled',
          labels: ['Sim — com repasse de recursos', 'Não — colaboração mútua'],
          children: [instrumentNode('convenio'), instrumentNode('acordo')],
        }),
        decisionNode('solucaoExiste', { width: 320, height: 46, bg: FAMILY_BOX_BG.contratacao, text: 'A solução já existe no mercado?' }, {
          connectMode: 'labeled',
          laneWidth: 380,
          drop: 290,
          labels: ['Sim — solução padronizada', 'Não — a desenvolver'],
          children: [
            instrumentNode('licitacao'),
            decisionNode('grauRisco', { width: 290, height: 50, bg: FAMILY_BOX_BG.contratacao, text: 'Qual o grau de risco técnico e maturidade?' }, {
              connectMode: 'labeled',
              laneWidth: 300,
              drop: 130,
              labels: ['Alto risco — solução inexiste', 'Risco moderado', 'Caso especial de doação'],
              children: [
                instrumentNode('etec'),
                instrumentNode('cpsi'),
                decisionNode('casoEspecial', { width: 220, height: 46, bg: FAMILY_BOX_BG.contratacao, text: 'Qual o caso especial?' }, {
                  connectMode: 'labeled',
                  labels: ['Contratação direta', 'Parceiro formal para P&D (gera contrato)', 'Constrói especificação técnica com mercado'],
                  children: [instrumentNode('direta'), instrumentNode('doacao'), instrumentNode('transferencia')],
                }),
              ],
            }),
          ],
        }),
        decisionNode('objetoDescoberta', { width: 320, height: 46, bg: FAMILY_BOX_BG.mercado, text: 'O que quer descobrir / mapear?' }, {
          connectMode: 'labeled',
          labels: ['Interesse do mercado para P&D', 'Solução técnica para problema', 'Ideias abertas e inovações'],
          children: [
            instrumentNode('pmi'),
            instrumentNode('dialogo'),
            decisionNode('formatoEvento', { width: 220, height: 46, bg: FAMILY_BOX_BG.mercado, text: 'Qual formato?' }, {
              connectMode: 'labeled',
              laneWidth: 250,
              drop: 120,
              labels: ['Apresentação e prototipagem', 'Formal com prêmio'],
              children: [instrumentNode('pitchHackathon'), instrumentNode('concurso')],
            }),
          ],
        }),
      ],
    }),
  ],
})

// --- Cálculo do layout (posições, rótulos e conectores) --------------------

/**
 * Dimensões do nó em si, ignorando os filhos: cards são fixos, caixas usam o que
 * declararam em boxProps.
 *
 * @param {TreeNode} node
 * @returns {number} Largura em px.
 */
const nodeOwnWidth = (node) => (node.type === 'card' ? CARD_WIDTH : node.boxProps.width)

/**
 * @param {TreeNode} node
 * @returns {number} Altura em px.
 */
const nodeOwnHeight = (node) => (node.type === 'card' ? CARD_HEIGHT : node.boxProps.height)

/**
 * Largura que a subárvore de um nó ocupa: o maior valor entre a largura do
 * próprio nó e a soma das faixas dos filhos, mais os vãos entre eles.
 *
 * @param {TreeNode} node
 * @returns {number} Largura em px.
 */
function subtreeWidth(node) {
  const ownWidth = nodeOwnWidth(node)
  const children = node.children
  if (!children || children.length === 0) return ownWidth
  const childrenWidth = children.reduce((sum, child) => sum + laneWidth(child), 0) + SIBLING_GAP * (children.length - 1)
  return Math.max(ownWidth, childrenWidth)
}

/**
 * Faixa horizontal reservada para um nó.
 *
 * @param {TreeNode} node
 * @returns {number} A largura da subárvore, ou o `laneWidth` declarado no nó
 *   quando ele quer apertar ou afastar um ramo manualmente.
 */
function laneWidth(node) {
  return node.laneWidth ?? subtreeWidth(node)
}

/**
 * Percorre a árvore e converte tudo em geometria absoluta.
 *
 * Cada nó é posicionado por centro horizontal e topo, os filhos são distribuídos
 * nas suas faixas a partir do centro do pai, e as ligações viram três segmentos:
 * pai para o barramento horizontal, o barramento em si, e barramento para cada
 * filho. No fim tudo é deslocado para o primeiro pixel visível ficar em
 * CANVAS_PADDING, já que a raiz começa em x = 0 e os ramos à esquerda ficam
 * com coordenada negativa.
 *
 * É puro e roda uma única vez, no import (ver LAYOUT abaixo) — a árvore é
 * estática, então não há motivo para recalcular a cada render.
 *
 * @param {TreeNode} tree - Raiz da árvore de decisão.
 * @returns {{
 *   boxes: Record<string, {centerX: number, top: number, width: number, height: number} & BoxProps>,
 *   cardPositions: Record<string, {centerX: number, top: number}>,
 *   labels: Array<{x: number, y: number, text: string}>,
 *   segments: string[],
 *   canvasWidth: number,
 *   canvasHeight: number
 * }} Caixas e cards já posicionados, rótulos dos ramos, os paths SVG dos
 *   conectores e o tamanho final do canvas. Coordenadas em px, prontas para uso
 *   direto no CSS. Em `boxes` e `cardPositions`, `centerX` é o centro
 *   horizontal, não a borda esquerda.
 */
function computeLayout(tree) {
  const boxes = {}
  const cardPositions = {}
  const labels = []
  const lines = []

  function layout(node, centerX, top) {
    const width = nodeOwnWidth(node)
    const height = nodeOwnHeight(node)

    if (node.type === 'card') cardPositions[node.key] = { centerX, top }
    else boxes[node.key] = { centerX, top, width, height, ...node.boxProps }

    const bottom = top + height
    const children = node.children
    if (!children || children.length === 0) return

    // Ramos rotulados abrem espaço para o rótulo entre o pai e os filhos;
    // ligações diretas só deixam metade do respiro até o barramento.
    const labeled = node.connectMode === 'labeled'
    const gap = labeled ? LABELED_GAP : PLAIN_GAP
    const labelTop = bottom + gap
    const busY = labeled ? labelTop + LABEL_HEIGHT / 2 : bottom + gap / 2
    const childTop = labeled ? labelTop + LABEL_HEIGHT + LABELED_GAP : bottom + gap

    const childLanes = children.map(laneWidth)
    const totalWidth = childLanes.reduce((sum, lane) => sum + lane, 0) + SIBLING_GAP * (children.length - 1)
    let left = centerX - totalWidth / 2

    const childCenters = []
    children.forEach((child, index) => {
      const lane = childLanes[index]
      const childCenterX = left + lane / 2
      childCenters.push(childCenterX)
      left += lane + SIBLING_GAP

      // `drop` empurra este ramo para baixo, para ele não colidir com o vizinho.
      const childTopY = childTop + (child.drop || 0)

      lines.push({ fromX: childCenterX, fromY: busY, toX: childCenterX, toY: childTopY })
      if (labeled) labels.push({ x: childCenterX, y: busY, text: node.labels[index] })

      layout(child, childCenterX, childTopY)
    })

    lines.push({ fromX: centerX, fromY: bottom, toX: centerX, toY: busY })
    if (childCenters.length > 1) {
      lines.push({ fromX: childCenters[0], fromY: busY, toX: childCenters[childCenters.length - 1], toY: busY })
    }
  }

  layout(tree, 0, 0)

  let minLeft = Infinity, maxRight = -Infinity, maxBottom = 0
  for (const box of Object.values(boxes)) {
    minLeft = Math.min(minLeft, box.centerX - box.width / 2)
    maxRight = Math.max(maxRight, box.centerX + box.width / 2)
    maxBottom = Math.max(maxBottom, box.top + box.height)
  }
  for (const position of Object.values(cardPositions)) {
    minLeft = Math.min(minLeft, position.centerX - CARD_WIDTH / 2)
    maxRight = Math.max(maxRight, position.centerX + CARD_WIDTH / 2)
    maxBottom = Math.max(maxBottom, position.top + CARD_HEIGHT)
  }

  const offsetX = CANVAS_PADDING - minLeft
  const offsetY = CANVAS_PADDING

  const shiftX = (value) => value + offsetX
  const shiftY = (value) => value + offsetY

  for (const box of Object.values(boxes)) { box.centerX = shiftX(box.centerX); box.top = shiftY(box.top) }
  for (const position of Object.values(cardPositions)) { position.centerX = shiftX(position.centerX); position.top = shiftY(position.top) }
  for (const label of labels) { label.x = shiftX(label.x); label.y = shiftY(label.y) }

  const segments = lines.map((line) => `M${shiftX(line.fromX)},${shiftY(line.fromY)} L${shiftX(line.toX)},${shiftY(line.toY)}`)

  return {
    boxes,
    cardPositions,
    labels,
    segments,
    canvasWidth: maxRight - minLeft + CANVAS_PADDING * 2,
    canvasHeight: maxBottom + CANVAS_PADDING * 2,
  }
}

const LAYOUT = computeLayout(TREE)

/**
 * Caixa de pergunta do fluxograma.
 *
 * @param {object} props
 * @param {string} props.text - Pergunta exibida.
 * @param {string} [props.subtitle] - Segunda linha, menor e mais clara.
 * @param {number} [props.width=160] - Largura em px.
 * @param {number} [props.height=65] - Altura mínima em px; cresce se o texto pedir.
 * @param {string} [props.bg=BRAND_BLUE] - Cor de fundo, normalmente a da família.
 * @param {string} [props.color='#fff'] - Cor do texto principal.
 * @param {boolean} [props.pill=false] - true arredonda totalmente as pontas;
 *   hoje só a raiz usa.
 */
function DecisionBox({ text, subtitle, width = 160, height = 65, bg = BRAND_BLUE, color = '#fff', pill = false }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width, minHeight: height, background: bg, padding: '8px 14px', borderRadius: pill ? 999 : 10 }}
    >
      <p className="m-0 text-center leading-snug" style={{ fontSize: 14, fontWeight: 600, color }}>
        {text}
      </p>
      {subtitle && (
        <p className="m-0 text-center leading-snug mt-1" style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/**
 * Etiqueta da resposta que leva a um ramo, ex.: "Sim — solução padronizada".
 *
 * @param {object} props
 * @param {number} props.x - Centro horizontal em px, no sistema do canvas.
 * @param {number} props.y - Centro vertical em px. A etiqueta é centrada nesse
 *   ponto, não ancorada pelo canto.
 * @param {string} props.text - Texto da resposta.
 */
function BranchLabel({ x, y, text }) {
  return (
    <div
      className="absolute z-[1] pointer-events-none flex items-center justify-center"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        maxWidth: 220,
        minHeight: LABEL_HEIGHT,
        width: 'max-content',
        background: 'rgb(var(--brand-light))',
        border: `1px solid ${BRAND_BLUE}`,
        borderRadius: 8,
        padding: '5px 13px',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.3,
        color: 'rgb(var(--ink-mid))',
        textAlign: 'center',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
      }}
    >
      {text}
    </div>
  )
}

/**
 * O layout guarda o centro horizontal; o CSS posiciona pela borda esquerda.
 *
 * @param {{centerX: number, width: number}} box - Caixa já posicionada.
 * @returns {number} Coordenada `left` em px.
 */
const boxLeft = (box) => box.centerX - box.width / 2

/**
 * @param {number} centerX - Centro horizontal do card em px.
 * @returns {number} Coordenada `left` em px.
 */
const cardLeft = (centerX) => centerX - CARD_WIDTH / 2

/**
 * Desenha a trilha inteira em tamanho nativo: um canvas de posicionamento
 * absoluto com os conectores em SVG ao fundo e, por cima, as caixas de decisão,
 * os rótulos dos ramos e os cards de instrumento.
 *
 * Consome o LAYOUT pré-calculado, então renderizar é barato — dá para montar
 * duas instâncias ao mesmo tempo, como a página faz com a trilha e a tela cheia.
 *
 * @param {object} props
 * @param {(id: string) => void} props.onInstrumentClick - Clique num card de
 *   instrumento. Recebe o `id` do instrumento, não a chave em INSTRUMENTS.
 * @param {React.ReactNode} [props.headerAction] - Controle encaixado no canto
 *   superior direito do canvas.
 */
export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const { boxes, cardPositions, labels, segments, canvasWidth, canvasHeight } = LAYOUT

  const cardAt = (key) => {
    const instrument = INSTRUMENTS[key]
    const { centerX, top } = cardPositions[key]
    return (
      <div key={key} style={{ position: 'absolute', left: cardLeft(centerX), top }} className="z-[1] relative">
        <InstrumentCard
          accentColor={instrument.accentColor}
          iconBg={instrument.iconBg}
          icon={instrument.icon}
          title={instrument.title}
          description={instrument.description}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          onClick={() => onInstrumentClick(instrument.id)}
        />
      </div>
    )
  }

  return (
    <div className="relative overflow-visible" style={{ width: canvasWidth, height: canvasHeight }}>
      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      <svg
        className="absolute inset-0 overflow-visible pointer-events-none z-0"
        width={canvasWidth} height={canvasHeight}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        fill="none"
        aria-hidden="true"
      >
        <g stroke={BRAND_BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {segments.map((pathData, index) => <path key={index} d={pathData} />)}
        </g>
      </svg>

      {labels.map((label, index) => (
        <BranchLabel key={index} x={label.x} y={label.y} text={label.text} />
      ))}

      {Object.entries(boxes).map(([key, box]) => (
        <div key={key} style={{ position: 'absolute', left: boxLeft(box), top: box.top }} className="z-[1] relative">
          <DecisionBox text={box.text} subtitle={box.subtitle} width={box.width} height={box.height} bg={box.bg} pill={box.pill} />
        </div>
      ))}

      {Object.keys(cardPositions).map(cardAt)}
    </div>
  )
}

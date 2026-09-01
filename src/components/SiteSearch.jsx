import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, FileText, MapPin, Search } from 'lucide-react'
import { INSTRUMENT_FLOWS } from '../data/instruments'
import { downloadFile } from '../config/supabase'
import { enqueueDownload } from '../hooks/useDownloadQueue'
import { useToastContext } from '../hooks/ToastContext'

const SECTION_RESULTS = [
  {
    id: 'section-sobre',
    type: 'section',
    title: 'Sobre o Toolkit de inovação',
    subtitle: 'Apresentação, grupos e instrumentos',
    target: 'sobre-o-toolkit',
  },
  {
    id: 'section-identificacao',
    type: 'section',
    title: 'Identificação',
    subtitle: 'Triagem e escolha do caminho de contratação',
    target: 'identificacao',
  },
  {
    id: 'section-trilha',
    type: 'section',
    title: 'Trilha de Instrumentos',
    subtitle: 'Fluxograma para identificar o instrumento adequado',
    target: 'trilha-de-instrumentos',
  },
  {
    id: 'section-fluxos',
    type: 'section',
    title: 'Fluxos Internos dos Instrumentos',
    subtitle: 'Etapas, modelos e guias para download',
    target: 'passo-a-passo',
  },
]

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function fileNameFromKey(fileKey) {
  return fileKey.split('/').pop()?.replace(/[_-]+/g, ' ') || fileKey
}

function collectStepText(step) {
  return [
    step.title,
    step.description,
    ...(step.subitems || []).flatMap((subitem) => [subitem.title, subitem.description]),
  ].filter(Boolean).join(' ')
}

function buildSearchIndex() {
  const results = [...SECTION_RESULTS]

  INSTRUMENT_FLOWS.forEach((flow) => {
    const stepsText = flow.cards.map(collectStepText).join(' ')

    results.push({
      id: `instrument-${flow.id}`,
      type: 'instrument',
      title: flow.title,
      subtitle: flow.subtitle,
      instrumentId: flow.id,
      keywords: stepsText,
    })

    if (flow.downloadKey) {
      results.push({
        id: `file-guide-${flow.id}`,
        type: 'file',
        title: `Guia explicativo — ${flow.title}`,
        subtitle: fileNameFromKey(flow.downloadKey),
        fileKey: flow.downloadKey,
        keywords: `${flow.title} ${flow.subtitle} guia download arquivo`,
      })
    }

    flow.cards.forEach((step, stepIndex) => {
      const stepText = collectStepText(step)

      results.push({
        id: `step-${flow.id}-${stepIndex}`,
        type: 'step',
        title: step.title,
        subtitle: `Etapa de ${flow.title}`,
        instrumentId: flow.id,
        keywords: stepText,
      })

      if (step.fileKey) {
        results.push({
          id: `file-${flow.id}-${stepIndex}`,
          type: 'file',
          title: step.title,
          subtitle: `${flow.title} · ${fileNameFromKey(step.fileKey)}`,
          fileKey: step.fileKey,
          keywords: `${stepText} ${flow.title} download arquivo modelo minuta documento`,
        })
      }
    })
  })

  return results.map((result) => {
    const searchable = normalizeText([
      result.title,
      result.subtitle,
      result.keywords,
      result.type,
    ].filter(Boolean).join(' '))

    return {
      ...result,
      normalizedTitle: normalizeText(result.title),
      searchable,
      tokens: [...new Set(searchable.split(' ').filter(Boolean))],
    }
  })
}

const SEARCH_INDEX = buildSearchIndex()
const TYPE_PRIORITY = { instrument: 4, section: 3, file: 2, step: 1 }
const TYPE_LABEL = { instrument: 'Instrumento', section: 'Seção', file: 'Download', step: 'Etapa' }

function editDistance(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)

  for (let row = 1; row <= a.length; row += 1) {
    const current = [row]
    for (let column = 1; column <= b.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (a[row - 1] === b[column - 1] ? 0 : 1),
      )
    }
    previous = current
  }

  return previous[b.length]
}

function tokenSimilarity(queryToken, candidateToken) {
  if (candidateToken === queryToken) return 1
  if (candidateToken.startsWith(queryToken)) return 0.94
  if (candidateToken.includes(queryToken)) return 0.86
  if (queryToken.length < 3) return 0
  return 1 - editDistance(queryToken, candidateToken) / Math.max(queryToken.length, candidateToken.length)
}

function scoreResult(query, result) {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return 0

  const queryTokens = normalizedQuery.split(' ').filter(Boolean)
  let score = TYPE_PRIORITY[result.type] || 0

  if (result.normalizedTitle === normalizedQuery) score += 160
  else if (result.normalizedTitle.startsWith(normalizedQuery)) score += 120
  else if (result.normalizedTitle.includes(normalizedQuery)) score += 95
  else if (result.searchable.includes(normalizedQuery)) score += 65

  for (const queryToken of queryTokens) {
    const bestMatch = result.tokens.reduce(
      (best, candidateToken) => Math.max(best, tokenSimilarity(queryToken, candidateToken)),
      0,
    )
    if (bestMatch < 0.48) return 0
    score += bestMatch * 32
  }

  return score
}

function ResultIcon({ type }) {
  if (type === 'file') return <Download className="w-4 h-4" aria-hidden="true" />
  if (type === 'section') return <MapPin className="w-4 h-4" aria-hidden="true" />
  return <FileText className="w-4 h-4" aria-hidden="true" />
}

export function SiteSearch({ onNavigateSection, onInstrumentSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [downloadingId, setDownloadingId] = useState(null)
  const rootRef = useRef(null)
  const addToast = useToastContext()

  const results = useMemo(() => {
    if (normalizeText(query).length < 2) return []
    return SEARCH_INDEX
      .map((result) => ({ result, score: scoreResult(query, result) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ result }) => result)
  }, [query])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const selectResult = async (result) => {
    setOpen(false)

    if (result.type === 'section') {
      onNavigateSection(result.target)
      return
    }

    if (result.type === 'instrument' || result.type === 'step') {
      onInstrumentSelect(result.instrumentId)
      return
    }

    setDownloadingId(result.id)
    try {
      await enqueueDownload(() => downloadFile(result.fileKey))
      addToast('Download realizado com sucesso!', 'success')
    } catch (error) {
      addToast('Arquivo indisponível. Tente novamente.', 'error')
      console.error(error)
    } finally {
      setDownloadingId(null)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!open || results.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      selectResult(results[activeIndex])
    }
  }

  return (
    <div ref={rootRef} className="relative w-full max-w-[320px] select-text">
      <div className={`min-h-10 w-full rounded-[4px] border bg-[#f9fcff] px-4 py-2 flex items-center gap-2 transition-colors ${open ? 'border-[#034ea2] ring-1 ring-[#034ea2]' : 'border-[#404040]'}`}>
        <Search className="w-5 h-5 shrink-0 text-[#404040]" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
            setOpen(Boolean(event.target.value))
          }}
          onFocus={() => setOpen(Boolean(query))}
          onKeyDown={handleKeyDown}
          placeholder="Buscar no Toolkit"
          aria-label="Buscar seções, instrumentos e arquivos"
          aria-expanded={open}
          aria-controls="site-search-results"
          aria-autocomplete="list"
          role="combobox"
          className="min-w-0 flex-1 border-none bg-transparent p-0 text-[14px] leading-5 tracking-[0.4px] text-[#262626] placeholder:text-[#666] outline-none"
        />
      </div>

      {open && (
        <div
          id="site-search-results"
          role="listbox"
          className="absolute left-0 top-full z-[95] mt-2 w-[min(420px,calc(100vw-32px))] max-h-[360px] overflow-y-auto rounded-lg border border-[#dbe5f0] bg-[#fdfeff] p-1.5 shadow-xl"
        >
          {results.length > 0 ? results.map((result, index) => (
            <button
              key={result.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              disabled={downloadingId === result.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectResult(result)}
              className={`w-full rounded-md border-none px-3 py-2.5 flex items-start gap-3 text-left cursor-pointer disabled:cursor-wait ${index === activeIndex ? 'bg-[#eef6ff]' : 'bg-transparent hover:bg-[#f7fafe]'}`}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#deecff] text-[#034ea2]">
                <ResultIcon type={result.type} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">
                  {downloadingId === result.id ? 'Baixando…' : TYPE_LABEL[result.type]}
                </span>
                <span className="block text-[13px] font-semibold leading-snug text-[#1e3a5f]">
                  {result.title}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-[#64748b]">
                  {result.subtitle}
                </span>
              </span>
            </button>
          )) : (
            <p className="m-0 px-3 py-4 text-center text-[13px] text-[#64748b]">
              Nenhum resultado encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

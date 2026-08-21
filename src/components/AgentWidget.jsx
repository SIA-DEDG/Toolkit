import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, User } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'

// Primeira fala do painel. `seed: true` marca que ela é só de boas-vindas e não
// deve ir junto no histórico enviado à API (ver handleSend).
const MENSAGEM_INICIAL = [
    {
        role: 'assistant',
        seed: true,
        content:
            'Olá! Pergunte sobre os instrumentos do Toolkit: quando usar cada um, ' +
            'base legal e passo a passo.',
    },
]

// Resposta simulada, só para a interface funcionar enquanto o back-end não
// existe. Quando a Edge Function estiver no ar, apague esta função e troque a
// chamada dentro de handleSend por askAgent().
function respostaFalsa(text) {
    return new Promise((resolve) => {
        setTimeout(
            () => resolve(`Recebi: "${text}".\n\nAinda não estou conectado à IA.`),
            800,
        )
    })
}

// Marca do Edson, desenhada em SVG para herdar a cor do texto por currentColor.
// Assim ela acompanha o tema claro/escuro sem media query própria — o mesmo
// motivo pelo qual as bandeiras da HomePage também são SVG inline.
function EdsonMark({ className = '' }) {
    return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                <path d="M13.44 5.46 A6 6 0 1 1 10.54 2.56" />
                <path d="M11.22 7.23 A3 3 0 1 1 9.77 5.78" />
                <path d="M14.2 2.3 L9.9 7.4" />
            </g>
            <circle cx="8.9" cy="8.9" r="1.2" fill="currentColor" />
        </svg>
    )
}

// Assistente flutuante do Toolkit: um botão redondo no canto inferior direito
// que abre um painel de conversa. Monte fora do wrapper de `zoom` da HomePage
// (hoje fica no App), senão o posicionamento `fixed` herda a escala.
//
// Este componente é o dono da conversa: `messages` mora aqui, e não no
// ChatPainel, porque o painel desmonta ao fechar e levaria o histórico junto.
export function AgentWidget() {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    const [messages, setMessages] = useState(MENSAGEM_INICIAL)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState(null)

    /**
     * Acrescenta a fala do usuário, pede a resposta e acrescenta o retorno.
     *
     * @param {string} text - Texto já sem espaços nas pontas.
     */
    async function handleSend(text) {
        if (sending) return

        const next = [...messages, { role: 'user', content: text }]
        setMessages(next)
        setSending(true)
        setError(null)

        // O histórico completo vai a cada chamada — a API da Anthropic não
        // guarda sessão. Só a saudação fica de fora: a API exige que o primeiro
        // item seja uma fala do usuário, senão devolve 400.
        const historico = next
            .filter((message) => !message.seed)
            .map(({ role, content }) => ({ role, content }))

        try {
            // TODO: trocar por `const reply = await askAgent(historico)`
            const reply = await respostaFalsa(text)
            setMessages([...next, { role: 'assistant', content: reply }])
        } catch {
            setError('Não consegui responder agora. Tente de novo.')
        } finally {
            setSending(false)
        }
    }

    if (!open) return <FabButton onClick={() => setOpen(true)} />
    return (
        <ChatPainel
            onClose={() => setOpen(false)}
            isMobile={isMobile}
            messages={messages}
            sending={sending}
            error={error}
            onSend={handleSend}
        />
    )
}

/**
 * Botão redondo que abre o assistente. Só desenha — quem controla a abertura
 * é o AgentWidget.
 *
 * @param {object} props
 * @param {() => void} props.onClick - Chamado no clique.
 */
function FabButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Abrir assistente"
            className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-brand-mid shadow-lg flex items-center justify-center cursor-pointer border-none transition-transform hover:scale-105"
        >
            <MessageCircle className="w-6 h-6 text-white" />
        </button>
    )
}

/**
 * Avatar redondo ao lado da bolha: a marca do Edson para o assistente, um
 * boneco genérico para quem escreve.
 *
 * @param {object} props
 * @param {boolean} props.isUser - Escolhe entre os dois avatares.
 */
function Avatar({ isUser }) {
    if (isUser) {
        return (
            <div className="shrink-0 w-7 h-7 rounded-full bg-surface-alt border flex items-center justify-center" style={{ borderColor: 'var(--hairline)' }}>
                <User className="w-4 h-4 text-ink-sub" aria-hidden="true" />
            </div>
        )
    }

    return (
        <div className="shrink-0 w-7 h-7 rounded-full bg-brand-deep flex items-center justify-center">
            <EdsonMark className="w-4 h-4 text-white" />
        </div>
    )
}

/**
 * Uma linha da conversa: avatar mais bolha. A fala do usuário inverte a ordem
 * com flex-row-reverse, o que joga a linha inteira para a direita sem precisar
 * de margem automática.
 *
 * O texto entra como conteúdo puro, nunca por dangerouslySetInnerHTML —
 * resposta de API é conteúdo não confiável.
 *
 * @param {object} props
 * @param {{role: string, content: string}} props.message - A fala a desenhar.
 */
function MessageRow({ message }) {
    const isUser = message.role === 'user'

    return (
        <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
            <Avatar isUser={isUser} />
            <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed whitespace-pre-wrap ${
                    isUser
                        ? 'bg-brand-mid text-white rounded-br-sm'
                        : 'bg-surface-alt text-ink-dark rounded-bl-sm'
                }`}
            >
                {message.content}
            </div>
        </div>
    )
}

/**
 * Painel da conversa. Tela cheia no mobile, cartão flutuante no desktop.
 *
 * @param {object} props
 * @param {() => void} props.onClose - Chamado ao pedir o fechamento.
 * @param {boolean} props.isMobile - Escolhe entre tela cheia e cartão.
 * @param {Array<{role: string, content: string}>} props.messages - Conversa na ordem de leitura.
 * @param {boolean} props.sending - true enquanto espera a resposta.
 * @param {string|null} props.error - Mensagem de falha, ou null.
 * @param {(text: string) => void} props.onSend - Recebe o texto digitado.
 */
function ChatPainel({ onClose, isMobile, messages, sending, error, onSend }) {
    const shell = isMobile
        ? 'inset-0'
        : 'bottom-5 right-5 w-[400px] h-[500px] max-h-[calc(100vh-40px)] rounded-xl'

    // O rascunho fica aqui de propósito: perder o que estava digitado ao fechar
    // o painel é aceitável, perder a conversa não.
    const [input, setInput] = useState('')
    const endRef = useRef(null)

    // Mantém a última mensagem visível conforme a conversa cresce.
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length, sending])

    function handleSubmit(event) {
        event.preventDefault()
        const text = input.trim()
        if (!text || sending) return
        setInput('')
        onSend(text)
    }

    return (
        <div
            className={`fixed z-[90] bg-surface shadow-2xl flex flex-col overflow-hidden ${shell}`}
            role="dialog"
            aria-label="Assistente do Toolkit"
        >
            <header className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 bg-brand-deep">
                <div className="flex items-center gap-2 min-w-0">
                    <EdsonMark className="w-5 h-5 text-white shrink-0" />
                    <span className="font-semibold text-[15px] text-white truncate">
                        Edson
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar"
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer border-none transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                {messages.map((message, index) => (
                    <MessageRow key={index} message={message} />
                ))}

                {sending && (
                    <div className="flex items-end gap-2">
                        <Avatar isUser={false} />
                        <div className="bg-surface-alt text-ink-muted rounded-2xl rounded-bl-sm px-3 py-2 text-[13px]">
                            Digitando…
                        </div>
                    </div>
                )}

                {error && (
                    <p className="m-0 text-[12px] text-[#e53e3e] leading-relaxed" role="alert">
                        {error}
                    </p>
                )}

                <div ref={endRef} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="shrink-0 flex items-center gap-2 px-3 py-3 border-t"
                style={{ borderColor: 'var(--hairline)' }}
            >
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Pergunte sobre os instrumentos…"
                    aria-label="Sua pergunta"
                    className="flex-1 min-w-0 h-10 px-3 rounded-lg bg-surface-alt text-[13px] text-ink-dark outline-none border"
                    style={{ borderColor: 'var(--hairline)' }}
                />

                <button
                    type="submit"
                    disabled={!input.trim() || sending}
                    aria-label="Enviar"
                    className="shrink-0 w-10 h-10 rounded-lg bg-brand-mid text-white flex items-center justify-center cursor-pointer border-none transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    )
}

import BackNavbar from './BackNavbar'
import FlowFooter from './FlowFooter'
import MobileFlowHeader from './MobileFlowHeader'
import AccordionItem from './AccordionItem'
import DownloadButton from './DownloadButton'
import { NodeCircle, NodeDiamond } from './ProcessNode'

function MobileCard({ card, alignRight }) {
  return (
    <div className="bg-white rounded-lg px-2.5 py-2 shadow-sm">
      {card.title && (
        <p className={`font-bold text-[12px] text-[#2A4365] mb-1 leading-tight ${alignRight ? 'text-right' : ''}`}>
          {card.title}
        </p>
      )}
      {card.text && (
        <p className={`text-[11px] leading-snug text-[#2A4365]/90 mb-1.5 ${alignRight ? 'text-right' : ''}`}>
          {card.text}
        </p>
      )}
      {card.accordion && card.accordionItems && (
        <div className="process-card bg-white/70 rounded-xl p-2.5 space-y-1 mb-1.5">
          {card.accordionItems.map((item, k) => (
            <AccordionItem key={k} {...item} />
          ))}
        </div>
      )}
      {card.download && alignRight && (
        <div className="flex justify-end">
          <DownloadButton fileKey={card.fileKey} />
        </div>
      )}
      {card.download && !alignRight && (
        <DownloadButton fileKey={card.fileKey} />
      )}
      {card.note && (
        <div className="border-2 border-dashed border-[#2A4365]/60 rounded-lg bg-white/70 px-2.5 py-2 mt-2">
          <p className="text-[9.5px] text-[#2A4365]/80 leading-snug">{card.note}</p>
        </div>
      )}
    </div>
  )
}

export default function MobileFlowLayout({ cards }) {
  return (
    <div className="min-h-screen flex flex-col">
      <BackNavbar />
      <div style={{ height: 44, flexShrink: 0 }} />
      <MobileFlowHeader />

      <div className="flow-gradient flex-1 py-6 px-4">
        <div className="relative">
          <div
            className="absolute bottom-0 w-[3px] bg-[#2B6CB0]"
            style={{ left: 'calc(50% - 1.5px)', top: '14px' }}
          />

          {cards.map((card, i) => {
            const isLeft = i % 2 === 0
            const isFirst = i === 0
            const hasContent = card.title || card.text || card.download || card.accordion
            return (
              <div key={i} className="mb-6">
                <div className="flex items-center relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#2B6CB0]"
                    style={isLeft ? { right: 'calc(50% + 8px)', left: 0 } : { left: 'calc(50% + 8px)', right: 0 }}
                  />
                  <div className="flex-1" />
                  <div className="flex-shrink-0 w-6 flex justify-center relative z-10">
                    {isFirst ? <NodeCircle /> : <NodeDiamond />}
                  </div>
                  <div className="flex-1" />
                </div>

                {hasContent && (
                  <div className="flex mt-2 relative z-[1]">
                    <div className="flex-1 pr-3 min-w-0">
                      {isLeft && <MobileCard card={card} alignRight />}
                    </div>
                    <div className="flex-shrink-0 w-6" />
                    <div className="flex-1 pl-3 min-w-0">
                      {!isLeft && <MobileCard card={card} alignRight={false} />}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <div className="flex justify-center relative z-10 pt-1">
            <div style={{ width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '16px solid #2B6CB0' }} />
          </div>
        </div>
      </div>

      <FlowFooter />
    </div>
  )
}

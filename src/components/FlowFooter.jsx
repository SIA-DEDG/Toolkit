import { NodeCircle, NodeDiamond, NodeTriangle } from './ProcessNode'

export default function FlowFooter() {
  return (
    <footer className="bg-[#90CDF4] px-8 py-3 flex items-center gap-8 border-t border-white/10 flex-shrink-0">
      <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
        <NodeCircle /><span>Início</span>
      </div>
      <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
        <NodeDiamond /><span>Etapas</span>
      </div>
      <div className="flex items-center gap-2 text-[#2A4365] text-[13px] font-medium">
        <NodeTriangle /><span>Fim</span>
      </div>
    </footer>
  )
}

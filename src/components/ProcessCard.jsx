import React from 'react'
import { NodeDiamond } from './ProcessNode'

export default function ProcessCard({ position = 'above', width = 168, showNode = true, children }) {
  const isAbove = position === 'above'

  return (
    <div className="flex flex-col items-center">
      {isAbove && (
        <>
          <div
            className="process-card p-2.5 text-[#2A4365] text-left rounded-xl transition-all duration-200 hover:bg-[#F4FAFE] hover:shadow-lg cursor-pointer"
            style={{ width: 'fit-content', minWidth: 155, maxWidth: 230 }}
          >
            {children}
          </div>
          {showNode && <NodeDiamond />}
          {showNode && <div className="w-[3px] bg-[#2B6CB0] h-7 flex-shrink-0" />}
        </>
      )}

      {!isAbove && (
        <>
          {showNode && <div className="w-[3px] bg-[#2B6CB0] h-7 flex-shrink-0" />}
          {showNode && <NodeDiamond />}
          <div
            className="process-card p-2.5 text-[#2A4365] text-left rounded-xl transition-all duration-200 hover:bg-[#F4FAFE] hover:shadow-lg cursor-pointer"
            style={{ width: 'fit-content', minWidth: 155, maxWidth: 230, marginTop: !showNode ? 32 : undefined }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

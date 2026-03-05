import React from 'react'
import { NodeDiamond } from './ProcessNode'

export default function ProcessCard({ position = 'above', width = 168, showNode = true, children }) {
  const isAbove = position === 'above'

  return (
    <div className="flex flex-col items-center">
      {isAbove && (
        <>
          <div
            className="process-card p-2.5 text-[#2A4365] text-left rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg cursor-pointer"
            style={{ width: 'fit-content', minWidth: 155, maxWidth: 230 }}
          >
            {children}
          </div>
          {showNode && <NodeDiamond />}
          <div className="w-0.5 bg-[#2A4365] h-10 flex-shrink-0" />
        </>
      )}

      {!isAbove && (
        <>
          <div className="w-0.5 bg-[#2A4365] h-10 flex-shrink-0" />
          {showNode && <NodeDiamond />}
          <div
            className="process-card p-2.5 text-[#2A4365] text-left rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg cursor-pointer"
            style={{ width: 'fit-content', minWidth: 155, maxWidth: 230 }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

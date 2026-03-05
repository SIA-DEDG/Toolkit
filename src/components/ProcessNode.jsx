import React from 'react'

export function NodeCircle() {
  return (
    <div className="w-4 h-4 rounded-full border-[3px] border-[#2B6CB0] bg-white flex-shrink-0 z-10" />
  )
}

export function NodeDiamond() {
  return (
    <div
      className="w-3.5 h-3.5 bg-[#2B6CB0] flex-shrink-0 z-10"
      style={{ transform: 'rotate(45deg)' }}
    />
  )
}

export function NodeTriangle() {
  return (
    <div
      className="flex-shrink-0 z-10"
      style={{
        width: 0,
        height: 0,
        borderTop: '9px solid transparent',
        borderBottom: '9px solid transparent',
        borderRight: '16px solid #2B6CB0',
      }}
    />
  )
}

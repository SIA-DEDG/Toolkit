import { useState } from 'react'

export default function AccordionItem({ number, title, description }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        className="flex items-center gap-1 w-full text-left cursor-pointer bg-transparent border-0 p-0"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[10.5px] font-bold text-[#2A4365]">{number}–</span>
        <span className="text-[10.5px] text-[#2A4365] flex-1">{title}</span>
        <svg
          className={`w-3 h-3 text-[#2A4365] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {open && description && (
        <p className="text-[9.5px] text-[#2A4365]/75 leading-snug pl-3 mt-0.5">{description}</p>
      )}
    </div>
  )
}

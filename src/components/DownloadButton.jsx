import React from 'react'

export default function DownloadButton({ label = 'Baixar Documento' }) {
  return (
    <button className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#BEE3F8] hover:bg-[#2B6CB0] text-[#2A4365] hover:text-white text-[11px] font-semibold font-sans rounded-full py-1.5 px-4 shadow-sm transition-colors duration-150 cursor-pointer">
      <svg
        className="w-3.5 h-3.5 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </button>
  )
}

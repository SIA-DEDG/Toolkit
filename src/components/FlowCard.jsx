import React from 'react'

export default function FlowCard({ title, description, href, icon }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
      }}
      className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border border-gray-100"
    >
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
          {icon}
        </div>
      )}
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-blue-500 flex-1">{description}</p>
      <span className="text-gray-800 text-sm font-medium flex items-center gap-1">
        Ver fluxo <span>→</span>
      </span>
    </a>
  )
}

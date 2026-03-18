export function CardTitle({ children }) {
  return <p className="font-bold text-[12px] text-[#2A4365] mb-1 leading-tight">{children}</p>
}

export function CardBody({ children }) {
  return <p className="text-[10.5px] leading-snug text-[#2A4365]/90">{children}</p>
}

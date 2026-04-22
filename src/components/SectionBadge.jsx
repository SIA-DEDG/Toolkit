import { Workflow } from 'lucide-react'

export function SectionBadge({ children }) {
  return (
    <div className="inline-flex w-fit items-center gap-1.5 bg-brand-light rounded-full h-[30px] px-2.5">
      <Workflow className="w-[18px] h-[18px] text-ink-mid shrink-0" />
      <span className="font-medium text-[13px] text-ink-mid">{children}</span>
    </div>
  )
}

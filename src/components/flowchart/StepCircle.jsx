export function StepCircle({ number, color, line = 'right' }) {
  const circle = (
    <div className="relative w-[50px] h-[50px] shrink-0 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-[3px] border-brand-light bg-white" />
      <div className="absolute inset-[5px] rounded-full border-2" style={{ borderColor: color }} />
      <span className="relative font-semibold text-xl leading-none" style={{ color }}>{number}</span>
    </div>
  )

  const connectorWidth  = line === 'up' ? 2  : 31
  const connectorHeight = line === 'up' ? 31 : 2
  const connector = (
    <div className="opacity-50 shrink-0" style={{ width: connectorWidth, height: connectorHeight, background: color }} />
  )

  if (line === 'right') return <div className="flex items-center">{circle}{connector}</div>
  if (line === 'left')  return <div className="flex items-center">{connector}{circle}</div>
  if (line === 'up')    return <div className="flex flex-col items-center">{connector}{circle}</div>
  return circle
}

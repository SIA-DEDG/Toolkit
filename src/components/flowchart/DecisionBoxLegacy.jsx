export function DecisionBoxLegacy({ width, height, text, bg = '#d9d9d9' }) {
  return (
    <div
      className="rounded-lg border-2 border-brand p-2 flex items-center"
      style={{ width, height, background: bg }}
    >
      <p className="font-semibold text-xs text-black leading-snug m-0">{text}</p>
    </div>
  )
}

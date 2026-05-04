// Figma reference: node 531:191 — bg=#0e59a8, h=31px, rounded-[5px], font-medium 12px white
// Height is fixed (50px) to keep all steps consistent when questions wrap to 2–3 lines.
const BRAND_BLUE = '#0e59a8'

export function DecisionBox({ width = 136, text }) {
  return (
    <div
      className="flex items-center justify-center rounded-[5px]"
      style={{ width, height: 50, background: BRAND_BLUE, padding: '6px 10px' }}
    >
      <p
        className="m-0 text-center leading-snug"
        style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}
      >
        {text}
      </p>
    </div>
  )
}

import { forwardRef } from 'react'

// paddingTop alinha o nó da coluna com o caminho da cobra (SnakePath).
// Passe NODE_TOP[index] como paddingTop em cada coluna.
const StageCol = forwardRef(function StageCol({ paddingTop, children, extra }, ref) {
  return (
    <div ref={ref} className="flex flex-col items-center relative" style={{ paddingTop }}>
      {children}
      {extra && <div className="mt-3">{extra}</div>}
    </div>
  )
})

export default StageCol

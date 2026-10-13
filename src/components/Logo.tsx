import { forwardRef } from 'react'
import { BIG, STROI, ROOF, WALLS } from '../data/logoPaths'

type Props = {
  className?: string
  /** Графитовая подложка, как на аватарке */
  plate?: boolean
  title?: string
}

/** Логотип BIG STROI. Классы частей используются анимацией заставки. */
const Logo = forwardRef<SVGSVGElement, Props>(function Logo(
  { className, plate = true, title = 'BIG STROI' },
  ref,
) {
  return (
    <svg ref={ref} className={className} viewBox="0 0 600 600" role="img" aria-label={title}>
      {plate && <rect className="logo-plate" width="600" height="600" rx="72" fill="#282828" />}
      <path className="logo-roof" d={ROOF} fill="none" stroke="#FFE01B" strokeWidth="48" />
      <path className="logo-walls" d={WALLS} fill="none" stroke="#FFE01B" strokeWidth="36" />
      <g fill="#fff">
        {BIG.map((g, i) => (
          <path key={`b${i}`} className="logo-big" d={g.d} />
        ))}
        {STROI.map((g, i) => (
          <path key={`s${i}`} className="logo-stroi" d={g.d} />
        ))}
      </g>
    </svg>
  )
})

export default Logo

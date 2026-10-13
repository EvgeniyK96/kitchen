import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { FACTS } from '../data/content'
import './Tape.css'

/** Факты о компании, напечатанные на жёлтой рулетке, которая едет при прокрутке. */
export default function Tape() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const track = root.current!.querySelector<HTMLElement>('.tape-track')!
      gsap.fromTo(
        track,
        { x: () => window.innerWidth * 0.15 },
        {
          x: () => -(track.scrollWidth - window.innerWidth * 0.85),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="tape" ref={root} aria-label="Коротко о компании">
      <div className="tape-band">
        <ul className="tape-track">
          {FACTS.map((f) => (
            <li key={f.value}>
              <b>{f.value}</b>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

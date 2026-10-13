import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useAutoplay } from '../lib/useAutoplay'
import { MACHINES, poster, video } from '../data/content'
import './Production.css'

const CLIPS = ['production-1', 'production-3', 'production-2']

export default function Production() {
  const root = useRef<HTMLElement>(null)
  useAutoplay(root)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const q = gsap.utils.selector(root)
      // ролики едут с разной скоростью
      q('.prod-clip').forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: [18, -6, 26][i] },
          {
            yPercent: [-14, 10, -20][i],
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
      // строки со станками прочерчиваются по очереди
      gsap.from(q('.prod-machines li'), {
        '--rule': 0,
        autoAlpha: 0,
        x: -20,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: q('.prod-machines')[0], start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section className="prod section on-dark" id="production" ref={root}>
      <div className="wrap prod-grid">
        <div className="prod-copy">
          <h2 className="display h2">Свой цех на 1000 м²</h2>
          <p className="lead">
            Раскрой, кромка, фрезеровка, покраска и сборка проходят у нас, а не у подрядчиков. Приезжайте на
            консультацию: покажем цех, материалы и разберём проект на большом экране.
          </p>
          <ul className="prod-machines">
            {MACHINES.map((m) => (
              <li key={m.name}>
                <b>{m.name}</b>
                <span>{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="prod-clips">
          {CLIPS.map((c) => (
            <div className="prod-clip" key={c}>
              <video src={video(c)} poster={poster(c)} muted loop playsInline preload="none" data-autoplay />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

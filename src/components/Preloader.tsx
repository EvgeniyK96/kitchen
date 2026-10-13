import { useRef } from 'react'
import Logo from './Logo'
import { gsap, Flip, useGSAP, prefersReducedMotion } from '../lib/gsap'
import './Preloader.css'

type Props = {
  /** Промис готовности: шрифты и первые кадры героя */
  ready: Promise<unknown>
  /** Куда «прилетает» логотип в конце */
  targetSelector: string
  onDone: () => void
}

export default function Preloader({ ready, targetSelector, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // селектор ищем во всём документе: внутри scope GSAP искал бы только в заставке
      const target = document.querySelector(targetSelector)
      const finish = () => {
        if (target) gsap.set(target, { autoAlpha: 1 })
        onDone()
      }

      if (prefersReducedMotion()) {
        let alive = true
        ready.then(() => {
          if (alive) gsap.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: finish })
        })
        return () => {
          alive = false
        }
      }

      if (target) gsap.set(target, { autoAlpha: 0 })
      const q = gsap.utils.selector(root)

      const intro = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
      intro
        .from(q('.logo-roof'), { drawSVG: '50% 50%', duration: 0.8 })
        .from(q('.logo-walls'), { drawSVG: '50% 50%', duration: 0.7 }, '-=0.35')
        .from(
          q('.logo-big'),
          { y: -260, autoAlpha: 0, duration: 0.7, ease: 'bounce.out', stagger: 0.09 },
          '-=0.4',
        )
        .from(
          q('.logo-stroi'),
          { x: -40, autoAlpha: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 },
          '-=0.35',
        )
        .from(q('.pre-dim line, .pre-dim path:not(.pre-dim-arrows)'), { drawSVG: '50% 50%', duration: 0.5, stagger: 0.05 }, '-=0.6')
        .from(q('.pre-dim-arrows'), { autoAlpha: 0, duration: 0.2 }, '-=0.15')
        .from(q('.pre-dim-label'), { autoAlpha: 0, duration: 0.2 }, '<')
        .from(q('.pre-dim-value'), { textContent: 0, snap: { textContent: 10 }, duration: 0.6, ease: 'power2.out' }, '<')

      let alive = true
      Promise.all([ready, new Promise((r) => intro.eventCallback('onComplete', r))]).then(() => {
        if (!alive) return
        const logo = q('.pre-logo')[0]
        const out = gsap.timeline({ onComplete: finish })
        out.to(q('.pre-dim, .pre-dim-label'), { autoAlpha: 0, duration: 0.25 })
        if (logo && target) {
          out.add(Flip.fit(logo, target, { duration: 0.9, ease: 'expo.inOut', absolute: true }) as gsap.core.Tween, 0.1)
        }
        out.to(q('.pre-bg'), { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, 0.2)
      })
      return () => {
        alive = false
      }
    },
    { scope: root },
  )

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre-bg" />
      <div className="pre-stage">
        <Logo className="pre-logo" plate={false} />
        <svg className="pre-dim" viewBox="0 0 300 40">
          <line x1="2" y1="6" x2="2" y2="30" />
          <line x1="298" y1="6" x2="298" y2="30" />
          <path d="M2 18 H298" />
          <path d="M2 18 l10 -5 v10 z M298 18 l-10 -5 v10 z" className="pre-dim-arrows" />
        </svg>
        <div className="pre-dim-label">
          <span className="pre-dim-value">600</span> мм
        </div>
      </div>
    </div>
  )
}

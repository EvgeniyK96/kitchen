import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { HERO_FRAMES, drawCover, loadHeroFrames } from '../lib/frames'
import { scrollToId } from '../lib/useLenis'
import { CONTACTS } from '../data/content'
import './Hero.css'

type Props = { started: boolean }

export default function Hero({ started }: Props) {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  // Перемотка кадров по прокрутке + размерные линии
  useGSAP(
    () => {
      const cv = canvas.current!
      const ctx = cv.getContext('2d')!
      const { images } = loadHeroFrames()
      const state = { frame: 0 }

      const render = () => {
        const w = cv.width
        const h = cv.height
        // если нужный кадр ещё не загрузился — показываем ближайший предыдущий
        for (let i = Math.round(state.frame); i >= 0; i--) {
          if (drawCover(ctx, images[i], w, h)) break
        }
      }
      const resize = () => {
        const r = cv.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        cv.width = Math.round(r.width * dpr)
        cv.height = Math.round(r.height * dpr)
        render()
      }
      resize()
      images[0].addEventListener('load', render, { once: true })
      window.addEventListener('resize', resize)

      const q = gsap.utils.selector(root)
      const width = { v: 0 }
      const height = { v: 0 }
      const wLabel = q('.hero-dim-w b')[0]
      const hLabel = q('.hero-dim-h b')[0]
      const fmt = (n: number) => Math.round(n / 10) * 10 + ''
      const printDims = () => {
        wLabel.textContent = fmt(width.v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        hLabel.textContent = fmt(height.v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }

      if (prefersReducedMotion()) {
        state.frame = HERO_FRAMES - 1
        width.v = 3600
        height.v = 2700
        printDims()
        render()
        return () => window.removeEventListener('resize', resize)
      }

      const build = (pin: Element, start: string, end: string) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: pin, start, end, pin: true, scrub: 0.5 },
        })
        tl.to(state, { frame: HERO_FRAMES - 1, snap: 'frame', duration: 1, onUpdate: render }, 0)
          .fromTo(q('.hero-rule.hero-dim-w'), { scaleX: 0 }, { scaleX: 1, duration: 0.35 }, 0.02)
          .fromTo(q('.hero-rule.hero-dim-h'), { scaleY: 0 }, { scaleY: 1, duration: 0.35 }, 0.1)
          .to(width, { v: 3600, duration: 0.45, onUpdate: printDims }, 0.02)
          .to(height, { v: 2700, duration: 0.45, onUpdate: printDims }, 0.1)
          .from(q('.hero-dim'), { autoAlpha: 0, duration: 0.05 }, 0)
          .to(q('.hero-cap-a'), { autoAlpha: 0, y: -10, duration: 0.08 }, 0.55)
          .from(q('.hero-cap-b'), { autoAlpha: 0, y: 10, duration: 0.08 }, 0.6)
          .to(q('.hero-scroll'), { autoAlpha: 0, duration: 0.1 }, 0)
      }

      const mm = gsap.matchMedia()
      // десктоп: закрепляем весь экран; мобильный: только рамку по центру экрана
      mm.add('(min-width: 861px)', () => build(root.current!, 'top top', '+=170%'))
      mm.add('(max-width: 860px)', () => build(q('.hero-frame')[0], 'center center', '+=140%'))

      return () => window.removeEventListener('resize', resize)
    },
    { scope: root },
  )

  // Появление заголовка после заставки
  useGSAP(
    () => {
      if (!started) return
      const q = gsap.utils.selector(root)
      if (prefersReducedMotion()) {
        gsap.set(q('.hero-reveal'), { autoAlpha: 1 })
        return
      }
      const split = SplitText.create(q('.hero-title'), { type: 'lines', mask: 'lines' })
      gsap.set(q('.hero-reveal'), { autoAlpha: 1 })
      const tl = gsap.timeline()
      tl.from(split.lines, { yPercent: 105, duration: 0.9, ease: 'expo.out', stagger: 0.08 })
        .from(q('.hero-fade'), { autoAlpha: 0, y: 16, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '-=0.5')
        .from(q('.hero-frame'), { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'expo.inOut' }, 0)
      ScrollTrigger.refresh()
      return () => split.revert()
    },
    { scope: root, dependencies: [started] },
  )

  return (
    <section className="hero on-dark" id="top" ref={root}>
      <div className="hero-grid wrap">
        <div className="hero-copy hero-reveal">
          <h1 className="hero-title display">Мебель по вашим размерам</h1>
          <p className="hero-fade lead">
            Кухни, гардеробные и корпусная мебель из собственного цеха в Астане. Замеряем, проектируем,
            производим и собираем сами — без посредников.
          </p>
          <div className="hero-fade hero-actions">
            <a
              className="btn btn--yellow"
              href="#order"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('order')
              }}
            >
              Записаться на бесплатный замер
            </a>
            <a className="btn btn--line" href={CONTACTS.whatsapp} target="_blank" rel="noopener">
              Прислать размеры в WhatsApp
            </a>
          </div>
        </div>

        <figure className="hero-frame hero-reveal">
          <canvas ref={canvas} className="hero-canvas" aria-label="Пустая комната превращается в готовую кухню" />

          <span className="hero-dim hero-dim-w hero-rule" aria-hidden="true" />
          <span className="hero-dim hero-dim-w hero-dim-label">
            <b>0</b> мм
          </span>
          <span className="hero-dim hero-dim-h hero-rule" aria-hidden="true" />
          <span className="hero-dim hero-dim-h hero-dim-label">
            <b>0</b> мм
          </span>

          <figcaption className="hero-cap">
            <span className="hero-cap-a">Листайте: так замер превращается в проект</span>
            <span className="hero-cap-b">Перед производством вы видите визуализацию своей кухни</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-scroll hero-fade" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

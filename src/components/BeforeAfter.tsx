import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { BEFORE_AFTER as BA, MEDIA } from '../data/content'
import { scrollToId } from '../lib/useLenis'
import './BeforeAfter.css'

export default function BeforeAfter() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add(
        {
          desktop: '(min-width: 861px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean }
          if (reduce) {
            gsap.set(q('.ba-after'), { clipPath: 'inset(0 0 0 0)' })
            gsap.set(q('.ba-handle'), { left: '0%' })
            return
          }
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: desktop ? root.current : q('.ba-frame')[0],
              start: desktop ? 'top top' : 'center center',
              end: '+=120%',
              pin: true,
              scrub: 0.5,
            },
          })
          tl.fromTo(q('.ba-after'), { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1 }, 0)
            .fromTo(q('.ba-handle'), { left: '100%' }, { left: '0%', duration: 1 }, 0)
            .to(q('.ba-tag-before'), { autoAlpha: 0, duration: 0.15 }, 0.75)
            .from(q('.ba-tag-after'), { autoAlpha: 0, duration: 0.15 }, 0.2)
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="ba on-dark" ref={root}>
      <div className="wrap ba-grid">
        <div className="ba-frame">
          <img className="ba-img" src={`${MEDIA}/ba/before.webp`} alt="Кухня до работ" loading="lazy" />
          <img className="ba-img ba-after" src={`${MEDIA}/ba/after.webp`} alt="Кухня после установки" loading="lazy" />
          <span className="ba-handle" aria-hidden="true" />
          <span className="ba-tag ba-tag-before">до</span>
          <span className="ba-tag ba-tag-after">после</span>
        </div>

        <div className="ba-copy">
          <h2 className="display h2">До и после</h2>
          <p className="ba-where">
            {BA.title}, {BA.address}
          </p>
          <p className="lead">{BA.text}</p>
          <dl className="ba-specs">
            {BA.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="ba-price">
            <b>{BA.price}</b>
            <span>стоимость проекта, предоплата 50 %</span>
          </p>
          <a
            className="btn btn--yellow"
            href="#order"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('order')
            }}
          >
            Хочу такую же
          </a>
        </div>
      </div>
    </section>
  )
}

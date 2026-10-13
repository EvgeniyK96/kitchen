import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { CONTACTS, STEPS } from '../data/content'
import './Steps.css'

export default function Steps() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      if (prefersReducedMotion()) {
        q('.step').forEach((s) => s.classList.add('is-on'))
        return
      }
      gsap.fromTo(
        q('.steps-line'),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: q('.steps-list')[0], start: 'top 65%', end: 'bottom 65%', scrub: true },
        },
      )
      q('.step').forEach((s) =>
        ScrollTrigger.create({ trigger: s, start: 'top 65%', toggleClass: 'is-on' }),
      )
    },
    { scope: root },
  )

  return (
    <section className="steps section" id="steps" ref={root}>
      <div className="wrap steps-grid">
        <div className="steps-head">
          <h2 className="display h2">Как мы работаем</h2>
          <p className="lead">Пять шагов от первого звонка до собранной мебели. Цена и сроки фиксируются в договоре.</p>
        </div>

        <div className="steps-list">
          <span className="steps-line" aria-hidden="true" />
          <ol className="steps-ol">
          {STEPS.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-text">{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>

      <div className="wrap">
        <div className="steps-quick">
          <div>
            <h3 className="steps-quick-title">Можно начать с одного сообщения</h3>
            <p>
              Пришлите размеры помещения, фото или пример, который нравится, и пожелания по цвету. Подготовим
              предварительный проект и расчёт стоимости.
            </p>
          </div>
          <a className="btn btn--yellow" href={CONTACTS.whatsapp} target="_blank" rel="noopener">
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

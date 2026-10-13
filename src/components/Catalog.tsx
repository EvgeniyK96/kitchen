import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { CATALOG, img, type Project } from '../data/content'
import { scrollToId } from '../lib/useLenis'
import './Catalog.css'

type Props = { onPick: (cat: Project['cat'] | 'all') => void }

export default function Catalog({ onPick }: Props) {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const moveRef = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  useGSAP(
    () => {
      const el = preview.current!
      moveRef.current = {
        x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' }),
      }
      const q = gsap.utils.selector(root)
      gsap.from(q('.cat-row'), {
        yPercent: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: q('.cat-list')[0], start: 'top 80%' },
      })
    },
    { scope: root },
  )

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const box = root.current!.getBoundingClientRect()
    moveRef.current?.x(e.clientX - box.left)
    moveRef.current?.y(e.clientY - box.top)
  }

  return (
    <section className="cat section" id="catalog" ref={root} onPointerMove={onMove}>
      <div className="wrap">
        <div className="cat-head">
          <h2 className="display h2">Что делаем</h2>
          <p className="lead">
            Корпусная мебель по вашим размерам для квартиры или дома: нестандартные ниши, высокие потолки,
            сложные конструкции.
          </p>
        </div>

        <ul className="cat-list" onPointerLeave={() => setActive(null)}>
          {CATALOG.map((c, i) => (
            <li key={c.title}>
              <a
                className={`cat-row${active === i ? ' is-active' : ''}`}
                href="#projects"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={(e) => {
                  e.preventDefault()
                  onPick(c.filter ?? 'all')
                  scrollToId('projects')
                }}
              >
                <img className="cat-thumb" src={img(c.image)} alt="" loading="lazy" />
                <span className="cat-title display">{c.title}</span>
                <span className="cat-note">{c.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`cat-preview${active !== null ? ' is-on' : ''}`} ref={preview} aria-hidden="true">
        {CATALOG.map((c, i) => (
          <img key={c.title} src={img(c.image)} alt="" className={active === i ? 'is-on' : ''} loading="lazy" />
        ))}
      </div>
    </section>
  )
}

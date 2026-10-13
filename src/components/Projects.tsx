import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { PROJECTS, img, type Project } from '../data/content'
import Lightbox from './Lightbox'
import './Projects.css'

export type Filter = Project['cat'] | 'all'

const FILTERS: [Filter, string][] = [
  ['all', 'Все'],
  ['kitchen', 'Кухни'],
  ['tv', 'ТВ-зоны'],
  ['bath', 'Санузлы и прачечные'],
  ['hall', 'Прихожие'],
]

type Props = { filter: Filter; onFilter: (f: Filter) => void }

export default function Projects({ filter, onFilter }: Props) {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Project | null>(null)
  const list = PROJECTS.filter((p) => filter === 'all' || p.cat === filter)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const track = q('.prj-track')[0] as HTMLElement
      const mm = gsap.matchMedia()

      // Горизонтальная прокрутка карточек на широких экранах
      mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: q('.prj-stage')[0],
            start: 'center center',
            end: () => `+=${distance()}`,
            pin: root.current,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        // лёгкий параллакс фото внутри карточек
        q('.prj-ph img').forEach((im) => {
          gsap.fromTo(im, { xPercent: -6 }, {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: q('.prj-stage')[0], start: 'center center', end: () => `+=${distance()}`, scrub: true },
          })
        })
      })

      gsap.from(q('.prj-card'), { autoAlpha: 0, y: 30, duration: 0.6, stagger: 0.05, ease: 'power2.out' })
      ScrollTrigger.refresh()
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  )

  return (
    <section className="prj section" id="projects" ref={root}>
      <div className="wrap prj-head">
        <h2 className="display h2">Проекты с ценами</h2>
        <p className="lead">Стоимость указана на момент заключения договора. Нажмите на проект, чтобы посмотреть все фото.</p>
        <div className="prj-filters" role="group" aria-label="Фильтр проектов">
          {FILTERS.map(([f, label]) => (
            <button key={f} className={`prj-chip${filter === f ? ' is-on' : ''}`} aria-pressed={filter === f} onClick={() => onFilter(f)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="prj-stage">
        <ul className="prj-track">
          {list.map((p) => (
            <li key={p.title} className="prj-card">
              <button className="prj-open" onClick={() => setOpen(p)} aria-label={`${p.title}: смотреть фото`}>
                <div className="prj-ph">
                  <img src={img(p.imgs[0])} alt="" loading="lazy" />
                  {p.price && <span className="prj-price">{p.price}</span>}
                  {p.imgs.length > 1 && <span className="prj-count">{p.imgs.length} фото</span>}
                </div>
              </button>
              <div className="prj-meta">
                <span className="prj-loc">{p.loc}</span>
                <h3 className="prj-title">{p.title}</h3>
                <p className="prj-mats">{p.mats.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {open && <Lightbox project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

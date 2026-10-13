import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { lockScroll } from '../lib/useLenis'
import { img, type Project } from '../data/content'
import './Lightbox.css'

type Props = { project: Project; onClose: () => void }

export default function Lightbox({ project, onClose }: Props) {
  const [i, setI] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const n = project.imgs.length

  useEffect(() => {
    lockScroll(true)
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
      if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [n, onClose])

  useGSAP(() => {
    gsap.from(root.current, { autoAlpha: 0, duration: 0.25 })
  }, { scope: root })

  useGSAP(() => {
    gsap.fromTo('.lb-img', { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' })
  }, { scope: root, dependencies: [i] })

  return createPortal(
    <div className="lb" ref={root} role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button ref={closeBtn} className="lb-btn lb-close" onClick={onClose} aria-label="Закрыть">
        ×
      </button>
      {n > 1 && (
        <>
          <button className="lb-btn lb-prev" onClick={() => setI((i - 1 + n) % n)} aria-label="Предыдущее фото">‹</button>
          <button className="lb-btn lb-next" onClick={() => setI((i + 1) % n)} aria-label="Следующее фото">›</button>
        </>
      )}
      <img className="lb-img" src={img(project.imgs[i])} alt={`${project.title}, фото ${i + 1}`} />
      <p className="lb-info">
        <b>{project.title}</b>, {project.loc}
        {project.price ? `, ${project.price}` : ''} · {i + 1} из {n}
      </p>
    </div>,
    document.body,
  )
}

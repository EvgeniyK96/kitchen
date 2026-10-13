import { useEffect, useState } from 'react'
import Logo from './Logo'
import { CONTACTS } from '../data/content'
import { scrollToId } from '../lib/useLenis'
import './Header.css'

const NAV = [
  ['catalog', 'Что делаем'],
  ['projects', 'Проекты и цены'],
  ['production', 'Производство'],
  ['steps', 'Как работаем'],
  ['reviews', 'Отзывы'],
  ['contacts', 'Контакты'],
] as const

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className={`hdr${solid ? ' hdr--solid' : ''}${open ? ' hdr--open' : ''}`}>
      <div className="hdr-in wrap">
        <a href="#top" className="hdr-brand" onClick={go('top')}>
          <Logo className="hdr-logo" />
          <span className="hdr-name">
            BIG STROI<small>мебель на заказ в Астане</small>
          </span>
        </a>

        <nav className="hdr-nav" aria-label="Разделы">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="hdr-phone" href={CONTACTS.phoneMainHref}>
          {CONTACTS.phoneMain}
        </a>
        <a className="btn btn--yellow hdr-cta" href="#order" onClick={go('order')}>
          Бесплатный замер
        </a>

        <button
          className="hdr-burger"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

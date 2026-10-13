import { useMemo, useState } from 'react'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import Tape from './components/Tape'
import Catalog from './components/Catalog'
import Projects, { type Filter } from './components/Projects'
import BeforeAfter from './components/BeforeAfter'
import Steps from './components/Steps'
import Production from './components/Production'
import Brands from './components/Brands'
import Reels from './components/Reels'
import Reviews from './components/Reviews'
import Order from './components/Order'
import Contacts from './components/Contacts'
import { loadHeroFrames } from './lib/frames'
import { lockScroll, useLenis } from './lib/useLenis'

export default function App() {
  const [started, setStarted] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')

  // Заставка ждёт шрифты и первый кадр первого экрана (но не дольше 4 секунд)
  const ready = useMemo(() => {
    lockScroll(true)
    const { firstReady } = loadHeroFrames()
    const timeout = new Promise((r) => setTimeout(r, 4000))
    return Promise.race([Promise.all([document.fonts.ready, firstReady]), timeout])
  }, [])

  useLenis(started)

  return (
    <>
      {!started && (
        <Preloader
          ready={ready}
          targetSelector=".hdr-logo"
          onDone={() => {
            lockScroll(false)
            setStarted(true)
          }}
        />
      )}
      <Header />
      <main>
        <Hero started={started} />
        <Tape />
        <Catalog onPick={setFilter} />
        <Projects filter={filter} onFilter={setFilter} />
        <BeforeAfter />
        <Steps />
        <Production />
        <Brands />
        <Reels />
        <Reviews />
        <Order />
      </main>
      <Contacts />
    </>
  )
}

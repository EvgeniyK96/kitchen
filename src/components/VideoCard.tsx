import { useRef, useState } from 'react'
import { poster, video } from '../data/content'

type Props = { src: string; caption: string; withSound?: boolean; className?: string }

/** Вертикальное видео: воспроизведение по нажатию, одно видео одновременно. */
export default function VideoCard({ src, caption, withSound = false, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = ref.current!
    if (v.paused) {
      document.querySelectorAll<HTMLVideoElement>('video[data-card]').forEach((o) => o !== v && o.pause())
      v.play()
    } else v.pause()
  }

  return (
    <figure className={`vcard ${className}${playing ? ' is-playing' : ''}`}>
      <video
        ref={ref}
        data-card
        src={video(src)}
        poster={poster(src)}
        muted={!withSound}
        loop={!withSound}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button className="vcard-btn" onClick={toggle} aria-label={playing ? `Пауза: ${caption}` : `Смотреть: ${caption}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {playing ? <path d="M7 5h3v14H7zM14 5h3v14h-3z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

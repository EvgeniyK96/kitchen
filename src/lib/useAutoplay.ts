import { useEffect, type RefObject } from 'react'

/** Запускает беззвучные видео внутри контейнера, только пока они на экране. */
export function useAutoplay(scope: RefObject<HTMLElement | null>, selector = 'video[data-autoplay]') {
  useEffect(() => {
    const videos = scope.current?.querySelectorAll<HTMLVideoElement>(selector)
    if (!videos?.length) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement
          if (e.isIntersecting) v.play().catch(() => {})
          else v.pause()
        }),
      { threshold: 0.25 },
    )
    videos.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [scope, selector])
}

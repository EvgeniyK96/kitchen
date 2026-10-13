/** Загрузка секвенции кадров для canvas-анимации первого экрана. */
export const HERO_FRAMES = 94
const frameUrl = (i: number) => `/media/seq/f${String(i + 1).padStart(3, '0')}.webp`

const images: HTMLImageElement[] = []
let firstReady: Promise<void> | null = null

export function loadHeroFrames() {
  if (firstReady) return { images, firstReady }
  for (let i = 0; i < HERO_FRAMES; i++) {
    const im = new Image()
    im.decoding = 'async'
    im.src = frameUrl(i)
    images.push(im)
  }
  const first = images[0]
  firstReady = new Promise<void>((resolve) => {
    if (first.complete) resolve()
    else {
      first.onload = () => resolve()
      first.onerror = () => resolve()
    }
  })
  return { images, firstReady }
}

/** Рисует кадр с обрезкой по принципу object-fit: cover. */
export function drawCover(ctx: CanvasRenderingContext2D, im: HTMLImageElement, w: number, h: number) {
  if (!im.complete || !im.naturalWidth) return false
  const s = Math.max(w / im.naturalWidth, h / im.naturalHeight)
  const dw = im.naturalWidth * s
  const dh = im.naturalHeight * s
  ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh)
  return true
}

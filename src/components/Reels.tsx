import { CONTACTS, REELS } from '../data/content'
import VideoCard from './VideoCard'
import './Reels.css'

export default function Reels() {
  return (
    <section className="reels section on-dark" aria-labelledby="reels-title">
      <div className="wrap reels-head">
        <h2 id="reels-title" className="display h2">Видео с объектов</h2>
        <a className="btn btn--line" href={CONTACTS.instagram} target="_blank" rel="noopener">
          Больше работ в Instagram
        </a>
      </div>
      <div className="reels-track">
        {REELS.map((r) => (
          <VideoCard key={r.src} src={r.src} caption={r.caption} className="reels-item" />
        ))}
      </div>
    </section>
  )
}

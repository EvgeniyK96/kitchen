import { CONTACTS, REVIEWS, VIDEO_REVIEWS } from '../data/content'
import VideoCard from './VideoCard'
import './Reviews.css'

export default function Reviews() {
  return (
    <section className="rev section" id="reviews">
      <div className="wrap">
        <div className="rev-head">
          <h2 className="display h2">Отзывы</h2>
          <a className="rev-src" href={CONTACTS.map} target="_blank" rel="noopener">
            Все отзывы на 2ГИС
          </a>
        </div>

        <div className="rev-grid">
          <div className="rev-videos">
            {VIDEO_REVIEWS.map((v) => (
              <VideoCard key={v.src} src={v.src} caption={v.caption} withSound />
            ))}
          </div>

          <ul className="rev-list">
            {REVIEWS.map((r) => (
              <li key={r.name} className="rev-item">
                <blockquote>
                  <p>{r.text}</p>
                </blockquote>
                <div className="rev-who">
                  <b>{r.name}</b>
                  <span>
                    {r.topic}, {r.date}
                  </span>
                  <span className="rev-stars" aria-label="Оценка 5 из 5">
                    ★★★★★
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

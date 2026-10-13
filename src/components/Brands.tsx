import { BRANDS } from '../data/content'
import './Brands.css'

export default function Brands() {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="wrap brands-in">
        <div>
          <h2 id="brands-title" className="brands-title display">Материалы и фурнитура</h2>
          <p className="brands-note">
            Петли, направляющие и подъёмники определяют, как мебель служит каждый день, поэтому на фурнитуре мы не
            экономим.
          </p>
        </div>
        <ul className="brands-list">
          {BRANDS.map((b) => (
            <li key={b.name}>
              <b>{b.name}</b>
              <span>{b.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

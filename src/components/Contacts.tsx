import Logo from './Logo'
import { CONTACTS } from '../data/content'
import './Contacts.css'

export default function Contacts() {
  return (
    <>
      <section className="cnt section" id="contacts">
        <div className="wrap">
          <h2 className="display h2">Приезжайте в цех</h2>
          <div className="cnt-grid">
            <a className="cnt-addr" href={CONTACTS.map} target="_blank" rel="noopener">
              <span className="cnt-label">Адрес</span>
              <b>{CONTACTS.address}</b>
              <span>{CONTACTS.city}, открыть в 2ГИС</span>
            </a>
            <div>
              <span className="cnt-label">Телефон и WhatsApp</span>
              <b>
                <a href={CONTACTS.phoneMainHref}>{CONTACTS.phoneMain}</a>
              </b>
              <a href={CONTACTS.phoneSecondHref}>{CONTACTS.phoneSecond}</a>
            </div>
            <div>
              <span className="cnt-label">Режим работы</span>
              <b>{CONTACTS.hours}</b>
              <span>Консультации и замеры по записи</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="ftr on-dark">
        <div className="wrap ftr-in">
          <Logo className="ftr-logo" />
          <p>© 2026 BIG STROI. Собственное производство корпусной мебели, Астана.</p>
          <nav className="ftr-links" aria-label="Соцсети">
            <a href={CONTACTS.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={CONTACTS.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
            <a href={CONTACTS.threads} target="_blank" rel="noopener">Threads</a>
          </nav>
        </div>
      </footer>

      <a className="wa-float" href={CONTACTS.whatsapp} target="_blank" rel="noopener" aria-label="Написать в WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z" />
        </svg>
      </a>
    </>
  )
}

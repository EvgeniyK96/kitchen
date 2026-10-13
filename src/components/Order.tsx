import { useState } from 'react'
import { CONTACTS } from '../data/content'
import './Order.css'

const TYPES = ['Кухня', 'Гардеробная', 'Шкаф', 'ТВ-зона', 'Санузел', 'Вся квартира']

export default function Order() {
  const [sent, setSent] = useState(false)

  // TODO: подключить отправку (Telegram-бот, CRM или почта) — сейчас форма только показывает подтверждение
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="order section on-dark" id="order">
      <div className="wrap order-grid">
        <div className="order-copy">
          <h2 className="display h2">Бесплатный замер</h2>
          <p className="lead">
            Оставьте телефон: перезвоним и согласуем время, когда замерщик сможет приехать. Или приезжайте на
            консультацию в цех.
          </p>
          <ul className="order-points">
            <li>Выезд замерщика и дизайн-проект бесплатно</li>
            <li>Цена и сроки фиксируются в договоре</li>
            <li>Подберём материалы под ваш бюджет</li>
          </ul>
        </div>

        <form className="order-form" onSubmit={submit}>
          {sent ? (
            <div className="order-done" role="status">
              <h3>Заявка отправлена</h3>
              <p>Мы перезвоним, чтобы договориться о замере. Если удобнее, напишите сразу в WhatsApp.</p>
              <a className="btn btn--dark" href={CONTACTS.whatsapp} target="_blank" rel="noopener">
                Открыть WhatsApp
              </a>
            </div>
          ) : (
            <>
              <fieldset className="order-types">
                <legend>Что нужно сделать</legend>
                {TYPES.map((t, i) => (
                  <label key={t}>
                    <input type="checkbox" name="type" value={t} defaultChecked={i === 0} />
                    <span>{t}</span>
                  </label>
                ))}
              </fieldset>
              <label className="order-field">
                <span>Имя</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="order-field">
                <span>Телефон</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="+7" required />
              </label>
              <label className="order-field">
                <span>Комментарий, если есть</span>
                <textarea name="comment" rows={3} placeholder="ЖК, размеры, пожелания по стилю" />
              </label>
              <button className="btn btn--dark order-submit" type="submit">
                Записаться на замер
              </button>
              <p className="order-legal">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

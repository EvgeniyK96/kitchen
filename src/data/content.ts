// Контент сайта. Источник — Instagram @big_stroi.kz (см. BRIEF.md в корне проекта).

export const MEDIA = '/media'
export const img = (name: string) => `${MEDIA}/img/${name}.webp`
export const video = (name: string) => `${MEDIA}/video/${name}.mp4`
export const poster = (name: string) => `${MEDIA}/video/${name}.webp`

export const CONTACTS = {
  phoneMain: '8 705 705 35 35',
  phoneMainHref: 'tel:+77057053535',
  phoneSecond: '+7 708 001 14 01',
  phoneSecondHref: 'tel:+77080011401',
  whatsapp: 'https://wa.me/87057053535',
  address: 'ул. Орлыколь, 21/3',
  city: 'Астана',
  hours: 'Ежедневно, 09:00–18:00',
  map: 'https://2gis.kz/astana/geo/70000001089219454',
  instagram: 'https://www.instagram.com/big_stroi.kz/',
  threads: 'https://www.threads.com/@big_stroi.kz',
}

// Отметки на «рулетке» под первым экраном
export const FACTS = [
  { value: '1000 м²', label: 'собственный цех' },
  { value: 'с 2015', label: 'года делаем мебель' },
  { value: '0 ₸', label: 'замер и дизайн-проект' },
  { value: '50 %', label: 'предоплата по договору' },
  { value: '200+', label: 'проектов в Instagram' },
]

export const CATALOG = [
  { title: 'Кухни', note: 'Угловые, прямые, с островом и витринами', image: 'fv-3', filter: 'kitchen' },
  { title: 'Гардеробные', note: 'Системы хранения, стекло, подсветка', image: 'wardrobe-2', filter: null },
  { title: 'Шкафы и прихожие', note: 'До потолка и в цвет стен', image: 'hall-1', filter: 'hall' },
  { title: 'ТВ-зоны', note: 'Шпон, подсветка, биокамины', image: 'vella-tv-1', filter: 'tv' },
  { title: 'Санузлы и прачечные', note: 'Литые мойки из камня, ниши под технику', image: 'laundry-1', filter: 'bath' },
  { title: 'Детские и кабинеты', note: 'Рабочие места, стеллажи', image: 'kids-1', filter: null },
] as const

export type Project = {
  cat: 'kitchen' | 'tv' | 'bath' | 'hall'
  title: string
  loc: string
  price?: string
  mats: string[]
  imgs: string[]
}

export const PROJECTS: Project[] = [
  { cat: 'kitchen', title: 'Классическая угловая кухня', loc: 'Family Village, ул. Шишкина', price: '2 850 000 ₸', mats: ['МДФ в краске', 'Grandex', 'Blum', 'латунные ручки'], imgs: ['fv-3', 'fv-2', 'fv-4', 'fv-1'] },
  { cat: 'kitchen', title: 'Кухня с островом и витриной', loc: 'ЖК «FreeDom»', mats: ['гарнитур, витрина, остров', 'подсветка'], imgs: ['freedom-1', 'freedom-2', 'freedom-3', 'freedom-4'] },
  { cat: 'tv', title: 'ТВ-зона 3 × 3,6 м', loc: 'Коттеджный городок «Vella Village»', price: '1 865 000 ₸', mats: ['МДФ шпон дуба', 'МДФ эмаль', 'Blum'], imgs: ['tv36-1', 'tv36-2'] },
  { cat: 'kitchen', title: 'Минималистичная кухня', loc: 'ЖК «Ray Residence»', mats: ['ЛДСП Egger', 'Grandex', 'Blanco', 'Blum'], imgs: ['ray-1', 'ray-2', 'ray-3', 'ray-4'] },
  { cat: 'bath', title: 'Прачечная в частном доме', loc: 'Коттеджный городок «Vella Village»', price: '1 750 000 ₸', mats: ['ЛДСП Egger', 'МДФ с фрезеровкой', 'литая мойка'], imgs: ['laundry-1', 'laundry-3', 'laundry-2'] },
  { cat: 'kitchen', title: 'Кухня с островом', loc: 'ЖК «Landmark»', mats: ['МДФ в эмали', 'барная зона'], imgs: ['landmark-1', 'landmark-2', 'landmark-3', 'landmark-4'] },
  { cat: 'tv', title: 'ТВ-зона с биокамином', loc: 'Коттедж «Vella Village»', price: '1 310 000 ₸', mats: ['МДФ шпон', 'латунные вставки'], imgs: ['vella-tv-1', 'vella-tv-2', 'vella-tv-3'] },
  { cat: 'bath', title: 'Гостевой санузел', loc: 'Коттеджный городок «Vella Village»', price: '540 000 ₸', mats: ['литая мойка', 'МДФ шпон', 'Makmart'], imgs: ['bath-vella-1', 'bath-vella-2'] },
  { cat: 'kitchen', title: 'Неоклассика с витринами', loc: 'Астана', mats: ['ЛДСП Egger', 'витрины Makmart', 'Boyard'], imgs: ['neoclassic-1', 'neoclassic-2'] },
  { cat: 'hall', title: 'Прихожая в цвет стен', loc: 'ЖК «Landmark»', mats: ['шкафы до потолка'], imgs: ['hall-1', 'hall-2'] },
]

export const BEFORE_AFTER = {
  title: 'Кухня в ЖК «Алтын Ұя»',
  address: 'Айтеке би, 15',
  text: 'Угловой гарнитур с островом и витринным шкафом: стеклянные полки в алюминиевом профиле и подсветка.',
  specs: [
    ['Корпус', 'ЛДСП, белый'],
    ['Фасады', 'МДФ, крашеный'],
    ['Столешница', 'искусственный камень Grandex'],
    ['Фурнитура', 'Blum, подсветка'],
  ],
  price: '2 200 000 ₸',
}

export const MACHINES = [
  { name: 'SCM SI 300', role: 'форматно-раскроечный станок' },
  { name: 'SCM ME 28T', role: 'кромкооблицовочный станок' },
  { name: 'WoodTec HA-2030P', role: 'фрезерный станок с ЧПУ' },
  { name: 'Yellow 3013', role: 'мембранно-вакуумный пресс' },
  { name: 'Малярный участок', role: 'покраска фасадов эмалью' },
]

export const STEPS = [
  { title: 'Замер', text: 'Выезжаем бесплатно, обсуждаем пожелания и бюджет.' },
  { title: 'Дизайн-проект', text: 'Показываем визуализацию, подбираем материалы и фурнитуру.' },
  { title: 'Договор', text: 'Фиксируем материалы, цену и сроки. Предоплата 50 %.' },
  { title: 'Производство', text: 'Раскрой, кромка, фрезеровка, покраска фасадов и контроль качества в своём цеху.' },
  { title: 'Доставка и сборка', text: 'Привозим своим транспортом и собираем у вас дома.' },
]

export const BRANDS = [
  { name: 'Blum', note: 'фурнитура' },
  { name: 'Egger', note: 'ЛДСП' },
  { name: 'Grandex', note: 'искусственный камень' },
  { name: 'Blanco', note: 'мойки и смесители' },
  { name: 'Makmart', note: 'витрины и ручки' },
  { name: 'Boyard', note: 'ручки и системы' },
  { name: 'TEKA', note: 'встроенная техника' },
]

export const REELS = [
  { src: 'reel-vitrina', caption: 'Витринный шкаф с необычной системой открывания' },
  { src: 'reel-wardrobe', caption: 'Гардеробная со стеклом и золотыми элементами' },
  { src: 'reel-kitchen', caption: 'Обзор кухни: хранение, доводчики, остров' },
  { src: 'reel-hallway', caption: 'Прихожая со скрытым хранением' },
  { src: 'reel-tvzone', caption: 'ТВ-зона с биокамином' },
]

// Отзывы с 2ГИС из хайлайта «отзывы». Тексты сокращены — согласовать с клиентом.
export const REVIEWS = [
  { name: 'Роза Ж.', date: '31 мая 2026', topic: 'шкаф в гостиную', text: 'Огромное спасибо за наш идеальный шкаф в гостиную! Дизайнер Ербол помог определиться с моделью, цветом и стилем. Изготовление и монтаж прошли мегабыстро, ребята чётко уложились в сроки.' },
  { name: 'Sultan Zhorabekov', date: '29 июня 2026', topic: 'квартира под ключ', text: 'Очень переживали за сроки и качество. Были на связи, а за день до оговорённой даты позвонили, что завтра уже доставят. Спасибо за ответственный подход и качественную работу!' },
  { name: 'Гулжан Абдыкалыкова', date: '5 июля 2026', topic: 'кухня', text: 'Провели знакомство с цехом. Дизайнеры всё считают на месте и наглядно показывают. Первичный дизайн-проект сделали чётко, цена устраивает. Очень ждём свою красавицу!' },
  { name: 'Diana Tileubekova', date: '23 июня 2026', topic: 'пробный заказ', text: 'Нас познакомили с цехом, в офисе всё показали на большом экране. Увидели своими глазами: цех есть, производство работает. Если всё понравится, закажем под ключ.' },
]

export const VIDEO_REVIEWS = [
  { src: 'review-1', caption: 'Отзыв заказчицы о кухне' },
  { src: 'review-2', caption: 'Отзыв на казахском' },
]

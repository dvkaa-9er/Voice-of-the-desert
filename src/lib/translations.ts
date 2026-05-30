export type Locale = 'en' | 'mn'

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.about': 'About',
    'nav.actions': 'Pillars',
    'nav.team': 'Team',
    'nav.partners': 'Partners',
    'nav.sponsors': 'Sponsors',
    'nav.contact': 'Contact',
    'nav.donate': 'Donate Now',

    // Hero
    'hero.title': 'VOICE OF THE DESERT',
    'hero.subtitle': 'Running with Love — Reviving the Desert',
    'hero.cta': 'Explore the Journey',

    // About
    'about.title': 'The Mission',
    'about.subtitle': 'Aligned with UNCCD COP17',
    'about.body':
      'Voice of the Desert is a Mongolian-led global initiative responding to one of the most urgent environmental crises of our time — desertification across Eurasia. By raising a unified international voice, the project directly supports the UNCCD COP17 agenda and calls on governments, scientists, and communities to act.',

    // Stats
    'statsLabel.km': 'Kilometers',
    'statsSubLabel.km': 'across Eurasian deserts',
    'statsLabel.countries': 'Nations',
    'statsSubLabel.countries': 'across Eurasia',
    'statsLabel.days': 'Days',
    'statsSubLabel.days': 'expedition duration',
    'statsLabel.reach': 'People',
    'statsSubLabel.reach': 'global audience reach',

    // Actions
    'actions.title': 'Three Pillars of Action',
    'actions.motion.title': 'Desert Motion',
    'actions.motion.subtitle': 'International Endurance Sports Expedition',
    'actions.motion.desc':
      'The 120-day expedition led by world champion B. Budjargal will traverse 12,000 km through 7 countries in Eurasia\'s desertified regions. This route represents human endurance, harsh natural conditions, cross-border connectivity, and the scale of the Mongolian initiative.',
    'actions.motion.tag':
      'The most visible and attention-grabbing core driving force of the project. It expresses the Mongolian initiative through real routing and action.',
    'actions.motion.cta': 'Track Expedition',
    'actions.science.title': 'Desert Science',
    'actions.science.subtitle': 'Science-Based Joint Research',
    'actions.science.desc':
      'An integrated environmental-social-economic research program implemented along the route will scientifically identify desertification, drought, livelihood, regional challenges, and cooperation opportunities.',
    'actions.science.tag':
      'Results will become policy content, science-based recommendations, and valuable materials for use at COP17.',
    'actions.science.cta': 'Explore Research',
    'actions.voice.title': 'Desert Voice',
    'actions.voice.subtitle': 'Documentary Film, Digital Narrative, International Content',
    'actions.voice.desc':
      'The expedition route, real stories, people\'s lives, environmental changes, and cooperation narratives will be distributed internationally through documentary films, photo projects, daily social content, and special media narratives.',
    'actions.voice.tag':
      'The primary platform building the project\'s international visibility, brand narrative, social impact, and media value.',
    'actions.voice.cta': 'Watch Trailer',

    // Team
    'team.title': 'Meet the Team',
    'team.subtitle': 'The voices behind the desert',
    'team.role.leader': 'Project Leader',
    'team.role.director': 'Executive Director',
    'team.role.coordinator': 'General Coordinator',
    'team.role.expedition': 'Expedition Leader',
    'team.role.runner': 'Ultra-Marathon World Champion',
    'team.role.scientist': 'Geography & Geo-Ecology Professor',

    // Partners
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Joined by global institutions',

    // Sponsors
    'sponsors.title': 'Our Sponsors',
    'sponsors.platinum': 'Platinum Sponsors',
    'sponsors.gold': 'Gold Sponsors',
    'sponsors.supporting': 'Supporting Brands',

    // Donate
    'donate.title': 'Plant a Tree, Stop the Desert',
    'donate.subtitle': 'Every $5 plants one tree in the degraded zones',
    'donate.cta': 'Plant Now',
    'donate.impact': 'trees planted by our community',

    // Contact
    'contact.title': "Let's Connect",
    'contact.subtitle': 'Be part of the movement',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.rights': '© 2026 Voice of the Desert · www.voiceofdesert.org · All rights reserved.',
  },
  mn: {
    // Nav
    'nav.about': 'Тухай',
    'nav.actions': 'Тулгуурууд',
    'nav.team': 'Баг',
    'nav.partners': 'Түншүүд',
    'nav.sponsors': 'Ивээн тэтгэгчид',
    'nav.contact': 'Холбоо барих',
    'nav.donate': 'Хандив өгөх',

    // Hero
    'hero.title': 'ЦӨЛИЙН ДУУ ХООЛОЙ',
    'hero.subtitle': 'Хайраар гүйж — Цөлийг сэргээж байна',
    'hero.cta': 'Аялалыг судлах',

    // About
    'about.title': 'Эрхэм зорилго',
    'about.subtitle': 'UNCCD COP17-той уялдаатай',
    'about.body':
      '"Цөлийн дуу хоолой" бол манай үеийн хамгийн яаралтай байгаль орчны хямрал болох Евразийн цөлжилтийн эсрэг Монголын санаачилгаар хэрэгжих дэлхийн хэмжээний хөдөлгөөн юм. Нэгдсэн олон улсын дуу хоолойгоо өргөн, UNCCD COP17-ын тавцанд засгийн газар, эрдэмтэд болон олон нийтийг хамтарч ажиллахад уриалж байна.',

    // Stats
    'statsLabel.km': 'Километр',
    'statsSubLabel.km': 'Евразийн цөлөөр',
    'statsLabel.countries': 'Улс',
    'statsSubLabel.countries': 'Евразид',
    'statsLabel.days': 'Өдөр',
    'statsSubLabel.days': 'экспедицийн үргэлжлэл',
    'statsLabel.reach': 'Хүн',
    'statsSubLabel.reach': 'дэлхийн үзэгчид',

    // Actions
    'actions.title': 'Үйл ажиллагааны 3 тулгуур',
    'actions.motion.title': 'Desert Motion',
    'actions.motion.subtitle': 'Тэсвэрийн спортын олон улсын экспедиц',
    'actions.motion.desc':
      'Дэлхийн аварга Б.Буджаргалын манлайлсан 120 хоногийн экспедиц нь Евразийн цөлжсөн бүс нутгийн 7 улсаар дамжин 12 мянган километр зам туулна. Энэхүү маршрут нь хүний тэсвэр, байгалийн хатуу нөхцөл, хил дамнасан холбоо болон Монголын санаачилгын далайцыг илэрхийлнэ.',
    'actions.motion.tag':
      'Төслийн хамгийн өндөр харагдацтай, олон нийтийн анхаарал татах гол хөдөлгөгч хэсэг. Монголын санаачилгыг бодит замнал, үйлдлээр илэрхийлнэ.',
    'actions.motion.cta': 'Экспедицийг дагах',
    'actions.science.title': 'Desert Science',
    'actions.science.subtitle': 'Шинжлэх ухаанд суурилсан хамтарсан судалгаа',
    'actions.science.desc':
      'Маршрутын дагуу хэрэгжих байгаль орчин–нийгэм–эдийн засгийн интеграл судалгаа нь цөлжилт, хуурайшилт, амьжиргаа, бүс нутгийн сорилт, хамтын ажиллагааны боломжийг шинжлэх ухааны үндэслэлтэйгээр тодорхойлно.',
    'actions.science.tag':
      'Үр дүн нь бодлогын агуулга, шинжлэх ухаанд суурилсан зөвлөмж, COP17-ын үеэр ашиглах үнэ цэнтэй материал болно.',
    'actions.science.cta': 'Судалгааг судлах',
    'actions.voice.title': 'Desert Voice',
    'actions.voice.subtitle': 'Баримтат кино, дижитал өгүүлэмж, олон улсын контент',
    'actions.voice.desc':
      'Экспедицийн замнал, бодит түүх, хүмүүсийн амьдрал, байгаль орчны өөрчлөлт, хамтын ажиллагааны утга агуулгыг баримтат кино, фото төсөл, өдөр тутмын сошиал контент, тусгай медиа өгүүлэмжээр олон улсад түгээнэ.',
    'actions.voice.tag':
      'Төслийн олон улсын харагдац, брэнд өгүүлэмж, нийгмийн нөлөөлөл, медиа үнэ цэнийг бүрдүүлэх үндсэн платформ болно.',
    'actions.voice.cta': 'Трейлер үзэх',

    // Team
    'team.title': 'Удирдлагын баг',
    'team.subtitle': 'Цөлийн дуу хоолойнууд',
    'team.role.leader': 'Төслийн удирдагч',
    'team.role.director': 'Гүйцэтгэх захирал',
    'team.role.coordinator': 'Ерөнхий зохицуулагч',
    'team.role.expedition': 'Экспедицийн ахлагч',
    'team.role.runner': 'Хэт холын зайн гүйлтийн дэлхийн аварга',
    'team.role.scientist': 'Газарзүй, геоэкологийн доктор, профессор',

    // Partners
    'partners.title': 'Манай түншүүд',
    'partners.subtitle': 'Дэлхийн байгууллагуудтай хамт',

    // Sponsors
    'sponsors.title': 'Манай ивээн тэтгэгчид',
    'sponsors.platinum': 'Платин ивээн тэтгэгчид',
    'sponsors.gold': 'Алтан ивээн тэтгэгчид',
    'sponsors.supporting': 'Дэмжигч брэндүүд',

    // Donate
    'donate.title': 'Мод тарьж, цөлийг зогсоо',
    'donate.subtitle': '$5 бүр нэг мод тарина',
    'donate.cta': 'Одоо тарих',
    'donate.impact': 'манай нийгэмлэгийн тарьсан мод',

    // Contact
    'contact.title': 'Холбогдоцгооё',
    'contact.subtitle': 'Хөдөлгөөний нэг хэсэг болоорой',
    'contact.name': 'Таны нэр',
    'contact.email': 'Имэйл хаяг',
    'contact.message': 'Таны мессеж',
    'contact.send': 'Мессеж илгээх',
    'contact.rights': '© 2026 Цөлийн дуу хоолой · www.voiceofdesert.org · Бүх эрх хамгаалагдсан.',
  },
}

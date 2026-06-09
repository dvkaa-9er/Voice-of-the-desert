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
    'nav.shop': 'Shop',
    'nav.shopBadge': 'Soon',

    // Hero
    'hero.title': 'VOICE OF THE DESERT',
    'hero.subtitle': 'Running with Love — Reviving the Desert',
    'hero.cta': 'Explore the Journey',

    // About
    'about.title': 'The Mission',
    'about.subtitle': 'Aligned with UNCCD COP17',
    'about.body':
      'Voice of the Desert is a Mongolia-led international initiative that unites sport, science and media to confront desertification — timed to the UNCCD COP17 global summit. It begins as a 120-day endurance expedition across roughly 16,000 kilometres of Eurasian drylands, led by world-champion ultra-runner B.Budjargal. Along the route, an international research team studies land degradation, livelihoods and the climate pressures reshaping the region. Every kilometre becomes a story — filmed, photographed and shared with the world.',

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
    'actions.title': 'Three pillars, one route.',
    'actions.motion.title': 'Desert Motion',
    'actions.motion.subtitle': 'The endurance expedition — the visible engine that draws the world\'s attention.',
    'actions.motion.desc':
      'A 120-day endurance expedition led by world-champion ultra-runner B.Budjargal, crossing roughly 16,000 km of Eurasian drylands. Motion is the pillar people see first — human effort against a hard landscape, broadcast in real time.',
    'actions.motion.tag':
      'The brand is built on three interlocking pillars. Each carries its own name, role and visual accent — but they share one route, one camel, one voice.',
    'actions.motion.cta': 'Track Expedition',
    'actions.science.title': 'Desert Science',
    'actions.science.subtitle': 'Collaborative research along the route — the evidence that gives the story weight.',
    'actions.science.desc':
      'An integrated environmental–social–economic study runs the length of the route, examining land degradation, drought, livelihoods and regional cooperation. Its findings feed policy material and science-based recommendations for COP17.',
    'actions.science.tag':
      'The numbers are the brand\'s backbone: concrete, repeatable, quotable.',
    'actions.science.cta': 'Explore Research',
    'actions.voice.title': 'Desert Voice',
    'actions.voice.subtitle': 'Film, photography and daily narrative — the channel that carries it to the world.',
    'actions.voice.desc':
      'Two feature documentaries, a photo project, daily social content and special media turn the route into a living story. Voice is the brand\'s loudest, most public surface — where motion and science become something people feel.',
    'actions.voice.tag':
      'The brand exists to turn a vast, abstract crisis into something human, visible and worth acting on. It is not a campaign about loss. It is a call to run toward the problem.',
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
    'team.role.deputy': 'Deputy Director of Operations',

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
    'nav.shop': 'Дэлгүүр',
    'nav.shopBadge': 'Удахгүй',

    // Hero
    'hero.title': 'ЦӨЛИЙН ДУУ ХООЛОЙ',
    'hero.subtitle': 'Хайраар гүйж — Цөлийг сэргээж байна',
    'hero.cta': 'Аялалыг судлах',

    // About
    'about.title': 'Эрхэм зорилго',
    'about.subtitle': 'UNCCD COP17-той уялдаатай',
    'about.body':
      '"Цөлийн дуу хоолой" нь спорт, шинжлэх ухаан, медиа гурвыг нэгтгэн цөлжилтийн асуудалд чиглэсэн, UNCCD COP17-тэй уялдан хэрэгжих Монголын санаачилгаар удирдагдсан олон улсын хөдөлгөөн юм. Дэлхийн аварга Б.Буджаргалын манлайлсан 120 хоногийн экспедиц Евразийн цөлжсөн бүс нутгийн 7 улсаар дамжин 16,000 километр зам туулна. Маршрутын дагуу олон улсын судалгааны баг газрын доройтол, амьжиргаа, уур амьсгалын дарамтыг судална. Тухайн газрын бодит түүх болж — кино, фото, дэлхийд түгээгдэнэ.',

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
    'actions.title': 'Гурван бүтэц, нэг маршрут.',
    'actions.motion.title': 'Desert Motion',
    'actions.motion.subtitle': 'Тэсвэрийн экспедиц — дэлхийн анхааралыг татах харагдах хөдөлгүүр.',
    'actions.motion.desc':
      'Дэлхийн аварга Б.Буджаргалын манлайлсан 120 хоногийн тэсвэрийн экспедиц Евразийн хуурай газраар 16,000 км зам туулна. Motion бол хүмүүс хамгийн түрүүнд хардаг бүтэц — хатуу газар нутаг дээрх хүний тэсвэр хатуужил, бодит цаг хугацаанд дамжуулагдана.',
    'actions.motion.tag':
      'Брэнд нь гурван хоорондоо уялдсан бүтэц дээр тулгуурладаг. Тус бүр өөр гэрийн нэр, үүрэг, өнгөн тодотголтой — гэвч нэг маршрут, нэг тэмээ, нэг дуу хоолойг хуваалцана.',
    'actions.motion.cta': 'Экспедицийг дагах',
    'actions.science.title': 'Desert Science',
    'actions.science.subtitle': 'Маршрутын дагуух хамтарсан судалгаа — өгүүллэгт жин нэмдэг нотолгоо.',
    'actions.science.desc':
      'Маршрутын дагуу байгаль орчин–нийгэм–эдийн засгийн интеграл судалгаа газрын доройтол, хуурайшилт, амьжиргаа, бүс нутгийн хамтын ажиллагааг шинжлэх ухааны үндэслэлтэйгээр судална. Үр дүн нь COP17-д зориулсан бодлогын материал болон шинжлэх ухаанд суурилсан зөвлөмж болно.',
    'actions.science.tag':
      'Тоо баримт нь брэндийн нуруу нугас: тодорхой, давтагдах, иш татах боломжтой.',
    'actions.science.cta': 'Судалгааг судлах',
    'actions.voice.title': 'Desert Voice',
    'actions.voice.subtitle': 'Кино, фото, өдөр тутмын өгүүлэмж — дэлхийд хүргэх суваг.',
    'actions.voice.desc':
      'Хоёр бүтэн хэмжээний баримтат кино, фото төсөл, өдөр тутмын сошиал контент болон тусгай медиа маршрутыг амьд түүх болгоно. Voice бол брэндийн хамгийн чанга, хамгийн олон нийтэд нээлттэй гадаргуу — хөдөлгөөн ба шинжлэх ухаан нь хүмүүсийн сэтгэлд хүрэх зүйл болдог газар.',
    'actions.voice.tag':
      'Брэнд нь асар том, хийсвэр хямралыг хүний нүдэнд харагдах, үйлдлийн сэдэл болохуйц зүйл болгоход оршино. Энэ нь алдагдлын кампанит ажил биш. Асуудал руу гүйх дуудлага юм.',
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
    'team.role.deputy': 'Үйл ажиллагаа хариуцсан дэд захирал',

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

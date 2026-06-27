import { Student, Lesson, Surah, Assignment } from './types';

export const SURAHS: Surah[] = [
  { id: '1', name: 'Fatiha', arabicName: 'الفاتحة', englishTranslation: 'Açılış', versesCount: 7, classification: 'Mekkî' },
  { id: '112', name: 'İhlas', arabicName: 'الإخلاص', englishTranslation: 'Samimiyet (Tevhid)', versesCount: 4, classification: 'Mekkî' },
  { id: '113', name: 'Felak', arabicName: 'الفلق', englishTranslation: 'Sabah Aydınlığı', versesCount: 5, classification: 'Mekkî' },
  { id: '114', name: 'Nas', arabicName: 'الناس', englishTranslation: 'İnsanlar', versesCount: 6, classification: 'Mekkî' },
  { id: '103', name: 'Asr', arabicName: 'العصر', englishTranslation: 'Zaman (Asr)', versesCount: 3, classification: 'Mekkî' },
  { id: '108', name: 'Kevser', arabicName: 'الكوثر', englishTranslation: 'Bol Nimet / Kevser', versesCount: 3, classification: 'Mekkî' }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'student-1',
    name: 'Ömer A.',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150',
    level: 'Başlangıç',
    currentSurah: 'İhlas',
    xp: 340,
    badgeCount: 5,
    completedLessonsCount: 12,
    achievements: ['İlk Ayet Okundu', 'Tecvid Şampiyonu', 'Günlük Seri x5']
  },
  {
    id: 'student-2',
    name: 'Leyla M.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    level: 'Orta',
    currentSurah: 'Fatiha',
    xp: 680,
    badgeCount: 8,
    completedLessonsCount: 24,
    achievements: ['Kusursuz Ezber', 'Süper Yardımcı', 'Fatiha Suresi Tamamlandı']
  },
  {
    id: 'student-3',
    name: 'Zeyn B.',
    avatar: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150',
    level: 'İleri',
    currentSurah: 'Felak',
    xp: 1250,
    badgeCount: 12,
    completedLessonsCount: 48,
    achievements: ['Kuran Kahramanı', 'Hızlı Öğrenen', 'Nas Suresi Uzmanı']
  },
  {
    id: 'student-4',
    name: 'Meryem K.',
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=150',
    level: 'Başlangıç',
    currentSurah: 'Nas',
    xp: 180,
    badgeCount: 2,
    completedLessonsCount: 6,
    achievements: ['Parlak Başlangıç']
  }
];

export const DEFAULT_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Tecvid Temelleri',
    subject: 'Tecvid',
    time: '10:00',
    dayOfWeek: 'Pzt',
    dayNumber: 23,
    completed: false,
    notes: 'Elif, Be, Te harflerinin makhraj (çıkış yerleri) üzerine odaklanın.'
  },
  {
    id: 'lesson-2',
    title: 'Kuran Hikayeleri',
    subject: 'Kuran Hikayeleri',
    time: '14:00',
    dayOfWeek: 'Sal',
    dayNumber: 24,
    completed: true,
    notes: 'Yunus Peygamber ve dev balina hikayesi. Sabır ve dua vurgulanacak!'
  },
  {
    id: 'lesson-3',
    title: 'Ezber Çalışması',
    subject: 'Ezber',
    time: '09:00',
    dayOfWeek: 'Çar',
    dayNumber: 25,
    completed: false,
    notes: 'İhlas suresi 1-4. ayetleri tekrar edin.'
  },
  {
    id: 'lesson-4',
    title: 'Cuma Hazırlığı',
    subject: 'Cuma Hazırlığı',
    time: '11:00',
    dayOfWeek: 'Cum',
    dayNumber: 27,
    completed: false,
    notes: 'Cuma gününün sünnetlerini öğrenme (Gusül, Kehf suresi, Dualar).'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1',
    studentId: 'student-1',
    studentName: 'Ömer A.',
    studentAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150',
    surahName: 'İhlas',
    notes: 'El-Ahad kelimesinin doğru ve net telaffuzuna odaklanın.',
    deadline: '2026-10-30',
    status: 'Devam Ediyor',
    dateCreated: '2026-10-23'
  },
  {
    id: 'assign-2',
    studentId: 'student-2',
    studentName: 'Leyla M.',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    surahName: 'Fatiha',
    notes: 'Melodik bir ritimle ve uzatma harflerine dikkat ederek oku.',
    deadline: '2026-10-28',
    status: 'Tamamlandı',
    dateCreated: '2026-10-22'
  }
];

export interface TajweedCard {
  title: string;
  rule: string;
  example: string;
  arabicExample: string;
  tip: string;
}

export const TAJWEED_CARDS: TajweedCard[] = [
  {
    title: 'Kalkale (Yankı / Çarpma Sesi)',
    rule: 'ق, ط, ب, ج, د (Kutup Cedd) harflerinden biri cezimli (sukünlu) veya durak halinde gelirse, ses sarsılarak ve yankılı bir şekilde çıkarılır.',
    example: 'Ehad',
    arabicExample: 'أَحَدٌ',
    tip: 'Kelimenin sonunu küçük ve yumuşak bir top gibi hafifçe zıplat!'
  },
  {
    title: 'Gunne (Geniz Sesi)',
    rule: 'Şeddeli Nun (نّ) veya Şeddeli Mim (مّ) harfleri geldiğinde, ses burun boşluğundan (genizden) getirilerek 2 hareke miktarı tutulur.',
    example: 'İnne',
    arabicExample: 'إِنَّ',
    tip: 'Dudaklarını hafifçe kapat ve sesin burnunun içinde uğuldayışını hisset!'
  },
  {
    title: 'Med (Uzatma Harfleri)',
    rule: 'Med harfleri (Elif, Vav, Ya) kendilerinden önceki harekeyi uzatırlar. Üzerlerinde med işareti varsa 2, 4 veya 6 hareke miktarı uzatılır.',
    example: 'El-Alemîn',
    arabicExample: 'الْعَالَمِينَ',
    tip: 'Harfi, yumuşak bir oyun hamurunu uzatır gibi biraz daha uzun oku!'
  }
];

export interface QuranStory {
  title: string;
  icon: string;
  content: string;
  moral: string;
}

export const QURAN_STORIES: QuranStory[] = [
  {
    title: 'Yunus Peygamber (A.S) ve Balina',
    icon: '🐳',
    content: 'Yunus Peygamber büyük bir balina tarafından yutulmuştu. Balinanın o karanlık karnında, samimi bir kalple şöyle dua etti: "Senden başka ilah yoktur. Seni tenzih ederim. Gerçekten ben zalimlerden oldum." Allah onun bu samimi duasını işitti ve onu güvenle kıyıya çıkardı.',
    moral: 'Her ne kadar karanlık veya zor durumda olursan ol, daima Allah’a dua et ve sabırlı ol.'
  },
  {
    title: 'Nuh Peygamber (A.S) ve Büyük Gemi',
    icon: '🚢',
    content: 'Nuh Peygamber’e karada devasa ahşap bir gemi inşa etmesi emredildi. İnsanlar onunla alay etti ama o Allah’a güvendi. Büyük tufan başladığında, Nuh Peygamber, inananlar ve her hayvandan birer çift gemiye bindi ve yükselen sulardan güvenle kurtuldu.',
    moral: 'Başkaları anlamasa bile daima Allah’ın rehberliğine ve yoluna güven.'
  },
  {
    title: 'Bahçe Sahiplerinin Hikayesi',
    icon: '🌳',
    content: 'Bir grup kardeşin çok güzel meyve bahçeleri vardı. Ancak yoksullarla meyveleri paylaşmamaya karar verdiler. Geceleyin ansızın çıkan bir fırtına tüm mahsullerini yok etti. Hırslarının yanlış olduğunu anlayıp tövbe ettiler. Cömert olduklarında Allah onlara daha güzel bir bahçe verdi.',
    moral: 'Başkalarıyla paylaşmak nimetlerimizi bereketlendirir ve kalbimizi temiz tutar.'
  }
];

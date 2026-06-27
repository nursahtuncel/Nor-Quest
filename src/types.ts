export type LessonSubject = 'Tecvid' | 'Kuran Hikayeleri' | 'Ezber' | 'Cuma Hazırlığı' | 'Özel';

export interface Lesson {
  id: string;
  title: string;
  subject: LessonSubject;
  time: string;
  dayOfWeek: 'Pzt' | 'Sal' | 'Çar' | 'Per' | 'Cum' | 'Cmt' | 'Paz';
  dayNumber: number; // e.g., 23, 24, 25...
  completed: boolean;
  notes?: string;
}

export interface Assignment {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  surahName: string;
  notes: string;
  deadline: string;
  status: 'Devam Ediyor' | 'Tamamlandı';
  dateCreated: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  level: string; // e.g. "Başlangıç", "Orta", "İleri"
  currentSurah: string;
  xp: number;
  badgeCount: number;
  completedLessonsCount: number;
  achievements: string[];
}

export interface Surah {
  id: string;
  name: string;
  arabicName: string;
  englishTranslation: string; // We can rename this or use it as turkishTranslation
  versesCount: number;
  classification: 'Mekkî' | 'Medenî';
}

export interface QuranVerse {
  number: number;
  text: string;
  arabic: string;
}

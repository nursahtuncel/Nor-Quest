import React from 'react';
import { Award, Users, BookOpen, Star, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { Student, Lesson } from '../types';
import { SURAHS } from '../data';

interface DashboardViewProps {
  students: Student[];
  lessons: Lesson[];
  setCurrentTab: (tab: string) => void;
  setSelectedStudentForDetail: (student: Student) => void;
}

export default function DashboardView({
  students,
  lessons,
  setCurrentTab,
  setSelectedStudentForDetail
}: DashboardViewProps) {
  // Statistics
  const totalXP = students.reduce((sum, s) => sum + s.xp, 0);
  const totalStudents = students.length;
  const completedLessonsCount = lessons.filter(l => l.completed).length;
  const totalBadgesCount = students.reduce((sum, s) => sum + s.badgeCount, 0);

  // Today's lessons
  const activeLessons = lessons.slice(0, 3);

  // Quran Quest Path definition
  const milestones = [
    { name: 'Fatiha', x: 10, y: 70, color: 'bg-primary-green', icon: '📖' },
    { name: 'İhlas', x: 30, y: 30, color: 'bg-accent-gold', icon: '🌟' },
    { name: 'Felak', x: 50, y: 65, color: 'bg-accent-blue', icon: '🌙' },
    { name: 'Nas', x: 70, y: 35, color: 'bg-purple-400', icon: '🛡️' },
    { name: 'Asr', x: 90, y: 70, color: 'bg-emerald-600', icon: '⏳' }
  ];

  const handleStudentAvatarClick = (student: Student) => {
    setSelectedStudentForDetail(student);
    setCurrentTab('students');
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-view-root">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-primary-green to-[#1B5743] p-8 text-white overflow-hidden shadow-lg" id="welcome-banner">
        {/* Geometric Islamic Pattern Overlays */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center justify-center font-serif text-[180px] pointer-events-none select-none">
          🕌
        </div>
        <div className="absolute top-2 right-4 text-3xl opacity-30 animate-bounce">✨</div>
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-bold text-accent-gold tracking-widest uppercase bg-black/20 px-3 py-1 rounded-full">
            Noor Quest Akademisi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Es-Selamu Aleykum, Amina Hocam! 👋
          </h2>
          <p className="text-primary-green-light font-medium mt-2 text-sm leading-relaxed">
            Öğrencileriniz harika bir ilerleme kaydediyor. Bugün Ömer ve Leyla Tecvid görevlerini tamamladılar. Aşağıdaki takip haritasından dönüm noktalarını keşfedin!
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setCurrentTab('planner')}
              className="px-5 py-2.5 bg-accent-gold hover:bg-accent-gold-hover text-neutral-dark font-extrabold rounded-full text-xs shadow-md shadow-accent-gold/20 flex items-center gap-1.5 transition-all cursor-pointer"
              id="btn-go-planner"
            >
              Haftalık Planlayıcıya Git <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentTab('support')}
              className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-extrabold rounded-full text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              id="btn-go-ai"
            >
              Yapay Zeka Yardımcısına Sor ✨
            </button>
          </div>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-bento-grid">
        {/* Stat Card 1 */}
        <div className="bg-neutral-card rounded-2xl p-5 border border-primary-green-light shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow" id="card-active-students">
          <div className="w-12 h-12 rounded-xl bg-primary-green-light text-primary-green flex items-center justify-center text-xl flex-shrink-0">
            📊
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-muted uppercase tracking-wider">Aktif Öğrenciler</p>
            <h3 className="text-2xl font-bold text-neutral-dark">{totalStudents}</h3>
            <span className="text-[10px] text-primary-green font-bold">Kayıtlı öğrenciler</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-neutral-card rounded-2xl p-5 border border-primary-green-light shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow" id="card-total-xp">
          <div className="w-12 h-12 rounded-xl bg-accent-gold-light text-accent-gold flex items-center justify-center text-xl flex-shrink-0">
            ⚡
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-muted uppercase tracking-wider">Kazanılan Toplam XP</p>
            <h3 className="text-2xl font-bold text-neutral-dark">{totalXP} <span className="text-xs text-neutral-muted">XP</span></h3>
            <span className="text-[10px] text-accent-gold font-bold">Öğrenme puanları</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-neutral-card rounded-2xl p-5 border border-primary-green-light shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow" id="card-lessons-finished">
          <div className="w-12 h-12 rounded-xl bg-accent-blue-light text-accent-blue flex items-center justify-center text-xl flex-shrink-0">
            ✅
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-muted uppercase tracking-wider">Tamamlanan Dersler</p>
            <h3 className="text-2xl font-bold text-neutral-dark">{completedLessonsCount}</h3>
            <span className="text-[10px] text-neutral-muted font-bold">Bu hafta tamamlanan</span>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-neutral-card rounded-2xl p-5 border border-primary-green-light shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow" id="card-badges-awarded">
          <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl flex-shrink-0">
            🏅
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-muted uppercase tracking-wider">Kazanılan Rozetler</p>
            <h3 className="text-2xl font-bold text-neutral-dark">{totalBadgesCount}</h3>
            <span className="text-[10px] text-pink-500 font-bold">Açılan başarılar</span>
          </div>
        </div>
      </div>

      {/* Interactive Quran Quest Map Card */}
      <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light shadow-sm" id="quran-quest-card">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs font-bold text-primary-green uppercase tracking-wider">Oyunlaştırma Takibi</span>
            <h3 className="text-xl font-bold text-neutral-dark">Kuran Görevi: Sure Yol Haritası</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-muted">
            <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
            <span>Ödevler tamamlandıkça çocuklar otomatik olarak ilerler!</span>
          </div>
        </div>
        <p className="text-xs text-neutral-muted mb-6 leading-relaxed">
          Sure detaylarını görmek için bir durağın üzerine gelin veya tıklayın. Profil detayları için öğrenci rozetlerine tıklayın!
        </p>

        {/* The Quest Board map */}
        <div className="relative h-64 md:h-72 bg-gradient-to-b from-[#EFF9F5] to-[#E9F3EE] rounded-2xl border border-primary-green-light/40 overflow-hidden select-none" id="quest-board-map">
          {/* Decorative Mosque Silhouettes background */}
          <div className="absolute inset-0 opacity-[0.03] flex items-end justify-between px-8 text-5xl pointer-events-none font-serif">
            <span>🕌</span>
            <span>🕌</span>
            <span>🕌</span>
          </div>

          {/* SVG Connector Path */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 100 180 Q 250 50 400 160 T 700 80 T 1000 180"
              fill="none"
              stroke="#D9A441"
              strokeWidth="6"
              strokeDasharray="8 8"
              className="animate-dash stroke-amber-400"
            />
          </svg>

          {/* Render Milestones as "Beads" on the track */}
          {milestones.map((milestone, i) => {
            // Map percentage positioning dynamically for responsiveness
            const leftPercent = `${milestone.x}%`;
            const topPercent = `${milestone.y}%`;

            return (
              <div
                key={milestone.name}
                style={{ left: leftPercent, top: topPercent }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              >
                {/* Milestone Bead dot */}
                <div className="w-10 h-10 rounded-full bg-white border-2 border-accent-gold flex items-center justify-center text-base shadow-md cursor-pointer group-hover:scale-110 transition-transform relative z-10">
                  <span>{milestone.icon}</span>
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full bg-accent-gold/20 animate-ping -z-10 group-hover:block" />
                </div>

                {/* Milestone Label */}
                <div className="absolute top-11 left-1/2 -translate-x-1/2 bg-neutral-dark text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  {milestone.name} Suresi
                </div>

                {/* Kids at this Surah */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex -space-x-2.5">
                  {students
                    .filter(s => s.currentSurah.includes(milestone.name))
                    .map(student => (
                      <button
                        key={student.id}
                        onClick={() => handleStudentAvatarClick(student)}
                        className="w-7 h-7 rounded-full border border-white ring-2 ring-primary-green overflow-hidden shadow-lg bg-neutral-card transform hover:-translate-y-1 hover:z-25 transition-all cursor-pointer"
                        title={`${student.name} bu sure üzerinde çalışıyor!`}
                      >
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column details: Today's scheduled classes & Badge Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-two-columns">
        {/* Today's Schedule Card */}
        <div className="bg-neutral-card rounded-2xl p-6 border border-primary-green-light shadow-sm lg:col-span-7" id="card-todays-lessons">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-neutral-dark">Bugünün Ders Programı</h4>
            <button
              onClick={() => setCurrentTab('planner')}
              className="text-xs font-bold text-primary-green hover:underline"
            >
              Programı Yönet
            </button>
          </div>

          <div className="space-y-3">
            {activeLessons.map((lesson) => {
              // Color map for lesson cards
              let bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-100';
              let badgeText = 'Tecvid';
              if (lesson.subject === 'Kuran Hikayeleri') {
                bgClass = 'bg-amber-50 text-amber-800 border-amber-100';
                badgeText = 'Kuran Hikayesi';
              } else if (lesson.subject === 'Ezber') {
                bgClass = 'bg-blue-50 text-blue-800 border-blue-100';
                badgeText = 'Ezber';
              } else if (lesson.subject === 'Cuma Hazırlığı') {
                bgClass = 'bg-purple-50 text-purple-800 border-purple-100';
                badgeText = 'Cuma';
              } else if (lesson.subject === 'Özel') {
                bgClass = 'bg-rose-50 text-rose-800 border-rose-100';
                badgeText = 'Özel';
              }

              return (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                    lesson.completed ? 'opacity-60 bg-neutral-bg' : bgClass
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 shadow-sm">
                        {badgeText}
                      </span>
                      <span className="text-xs font-bold text-neutral-muted">{lesson.time}</span>
                    </div>
                    <h5 className="font-bold text-sm text-neutral-dark mt-1">{lesson.title}</h5>
                    <p className="text-[11px] text-neutral-muted mt-0.5">{lesson.notes}</p>
                  </div>

                  <div>
                    {lesson.completed ? (
                      <span className="text-xs font-extrabold text-primary-green bg-white border border-primary-green-light rounded-full px-3 py-1 flex items-center gap-1">
                        ✓ Tamamlandı
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          lesson.completed = true;
                          alert(`"${lesson.title}" dersi tamamlandı olarak işaretlendi! Katılımcılara XP ödülleri verildi.`);
                        }}
                        className="text-xs font-extrabold bg-primary-green hover:bg-primary-green-dark text-white rounded-full px-3 py-1 cursor-pointer"
                      >
                        Başlat ▷
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Achievements / Badges Panel */}
        <div className="bg-neutral-card rounded-2xl p-6 border border-primary-green-light shadow-sm lg:col-span-5" id="card-achievements-showcase">
          <h4 className="text-base font-bold text-neutral-dark mb-4">Rozetler & Başarılar 🏆</h4>
          <p className="text-xs text-neutral-muted mb-4 leading-relaxed">
            Oyunlaştırılmış hedefler çocukların motivasyonunu artırır. Öğrencilerinizi bu özel rozetleri kazanmaya teşvik edin!
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gradient-to-br from-accent-gold-light to-amber-100 rounded-xl border border-amber-200 text-center relative group">
              <span className="text-3xl">🌟</span>
              <h5 className="font-bold text-xs text-amber-900 mt-2">Tecvid Şampiyonu</h5>
              <p className="text-[9px] text-amber-700 mt-0.5">Kalkale kurallarını kusursuz oku</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 text-center relative group">
              <span className="text-3xl">🕌</span>
              <h5 className="font-bold text-xs text-emerald-950 mt-2">Cuma Kahramanı</h5>
              <p className="text-[9px] text-emerald-800 mt-0.5">Cuma sünnetlerini tamamla</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-[#EBF3FC] to-[#D5E6F7] rounded-xl border border-[#C5DCF2] text-center relative group">
              <span className="text-3xl">⚡</span>
              <h5 className="font-bold text-xs text-[#1E436D] mt-2">Seri Ustası</h5>
              <p className="text-[9px] text-[#295C93] mt-0.5">Üst üste 5 gün boyunca ders çalış</p>
            </div>

            <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 text-center relative group">
              <span className="text-3xl">🐳</span>
              <h5 className="font-bold text-xs text-purple-900 mt-2">Hikaye Kaşifi</h5>
              <p className="text-[9px] text-purple-700 mt-0.5">Yunus Peygamber testini çöz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

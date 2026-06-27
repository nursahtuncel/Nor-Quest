import React, { useState } from 'react';
import { Users, Plus, Star, Award, ChevronRight, Zap, RefreshCw, Trophy, Sparkles } from 'lucide-react';
import { Student } from '../types';

interface StudentsViewProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
}

export default function StudentsView({
  students,
  setStudents,
  selectedStudent,
  setSelectedStudent
}: StudentsViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentLevel, setNewStudentLevel] = useState('Başlangıç');
  const [newStudentSurah, setNewStudentSurah] = useState('Fatiha');
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);

  // Diverse cartoonish portrait options from Unsplash
  const avatarOptions = [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150', // Cute school boy
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', // Smiling hijab girl
    'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150', // Playful boy
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=150', // Smiling girl
  ];

  // Handle adding new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) {
      alert('Lütfen bir öğrenci adı girin.');
      return;
    }

    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name: newStudentName,
      avatar: avatarOptions[selectedAvatarIdx],
      level: newStudentLevel,
      currentSurah: newStudentSurah,
      xp: 100,
      badgeCount: 1,
      completedLessonsCount: 0,
      achievements: ['Parlak Başlangıç']
    };

    setStudents([...students, newStudent]);
    setNewStudentName('');
    setShowAddForm(false);
    alert(`🎈 Akademiye hoş geldin, ${newStudentName}!`);
  };

  // Give a student some quick XP booster
  const handleRewardXP = (studentId: string) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            xp: s.xp + 25,
            badgeCount: s.xp >= 500 && s.badgeCount < 6 ? s.badgeCount + 1 : s.badgeCount
          };
        }
        return s;
      })
    );

    // If active selected, update active selected reference
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent({
        ...selectedStudent,
        xp: selectedStudent.xp + 25,
        badgeCount: selectedStudent.xp >= 500 && selectedStudent.badgeCount < 6 ? selectedStudent.badgeCount + 1 : selectedStudent.badgeCount
      });
    }
  };

  // Add achievement to student
  const handleAddAchievement = (studentId: string, achTitle: string) => {
    let alreadyHas = false;
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          if (s.achievements.includes(achTitle)) {
            alreadyHas = true;
            return s;
          }
          return {
            ...s,
            achievements: [...s.achievements, achTitle],
            badgeCount: s.badgeCount + 1
          };
        }
        return s;
      })
    );

    if (alreadyHas) {
      alert('Öğrenci zaten bu başarı rozetine sahip!');
    } else {
      alert(`🏅 Başarılı! Öğrenciye "${achTitle}" rozeti verildi.`);
      if (selectedStudent && selectedStudent.id === studentId) {
        setSelectedStudent({
          ...selectedStudent,
          achievements: [...selectedStudent.achievements, achTitle],
          badgeCount: selectedStudent.badgeCount + 1
        });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="students-view-root">
      {/* Header section with register trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary-green tracking-tight font-sans">Öğrenci Profilleri</h2>
          <p className="text-neutral-muted text-sm mt-1 font-medium">
            Sınıf listenizi yönetin, başarıları ödüllendirin ve ezber aşamalarını takip edin.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="tactile-btn bg-primary-green hover:bg-primary-green-dark text-white font-bold py-2.5 px-5 rounded-full text-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Öğrenci Kaydet
        </button>
      </div>

      {/* Add Student Card Form (Expanded toggle) */}
      {showAddForm && (
        <div className="bg-neutral-card rounded-2xl p-6 border-2 border-primary-green-light shadow-md max-w-2xl animate-fadeIn">
          <h3 className="font-bold text-base text-neutral-dark mb-4">Yeni Öğrenci Kaydı</h3>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1">
                  Adı Soyadı
                </label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Örn: Hamza S."
                  className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1">
                  Kuran Grubu Seviyesi
                </label>
                <select
                  value={newStudentLevel}
                  onChange={(e) => setNewStudentLevel(e.target.value)}
                  className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  <option value="Başlangıç">Başlangıç (5-7 Yaş)</option>
                  <option value="Orta">Orta (8-10 Yaş)</option>
                  <option value="İleri">İleri (11-12 Yaş)</option>
                </select>
              </div>
            </div>

            {/* Choose Avatar */}
            <div>
              <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">
                Karakter Portresi Seçin
              </label>
              <div className="flex gap-4">
                {avatarOptions.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatarIdx(idx)}
                    className={`w-14 h-14 rounded-full overflow-hidden border-3 transition-transform ${
                      selectedAvatarIdx === idx
                        ? 'border-accent-gold scale-110 shadow-md shadow-accent-gold/25'
                        : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <img src={av} alt="character" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="tactile-btn bg-primary-green hover:bg-primary-green-dark text-white font-extrabold py-2 px-4 rounded-full text-xs"
              >
                Profili Kaydet
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="py-2 px-4 rounded-full text-xs font-bold text-neutral-muted hover:bg-neutral-bg"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => {
          const isSelected = selectedStudent?.id === student.id;
          
          // XP levels tracking (e.g. 400 XP per level tier)
          const levelTier = Math.floor(student.xp / 400) + 1;
          const xpInTier = student.xp % 400;
          const xpProgressPercent = Math.min(100, Math.floor((xpInTier / 400) * 100));

          return (
            <div
              key={student.id}
              className={`bg-neutral-card rounded-3xl p-6 border transition-all ${
                isSelected
                  ? 'border-accent-gold ring-2 ring-accent-gold/30 shadow-md'
                  : 'border-primary-green-light hover:shadow-md'
              }`}
            >
              {/* Profile Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full ring-4 ring-primary-green/10 overflow-hidden relative flex-shrink-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-neutral-dark">{student.name}</h3>
                    <span className="text-[10px] font-bold uppercase text-primary-green tracking-wide bg-primary-green-light px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {student.level}
                    </span>
                  </div>
                </div>

                {/* Level badge */}
                <div className="w-9 h-9 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex flex-col items-center justify-center">
                  <span className="text-[8px] font-extrabold text-accent-gold-hover leading-none">SVY</span>
                  <span className="text-xs font-black text-accent-gold-hover leading-none mt-0.5">{levelTier}</span>
                </div>
              </div>

              {/* XP progress bar */}
              <div className="mt-5">
                <div className="flex justify-between text-[10px] font-bold text-neutral-muted mb-1">
                  <span>Sınıf Deneyimi</span>
                  <span>{student.xp} / {(levelTier) * 400} XP</span>
                </div>
                <div className="w-full h-3 bg-primary-green-light rounded-full overflow-hidden">
                  <div
                    style={{ width: `${xpProgressPercent}%` }}
                    className="h-full bg-gradient-to-r from-primary-green to-emerald-400 rounded-full transition-all duration-300"
                  />
                </div>
              </div>

              {/* Mini details list */}
              <div className="mt-5 space-y-2 border-t border-primary-green-light/40 pt-4 text-xs font-medium text-neutral-muted">
                <div className="flex justify-between">
                  <span>Mevcut Ödev:</span>
                  <span className="text-neutral-dark font-bold text-right">{student.currentSurah} Suresi</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamamlanan Görevler:</span>
                  <span className="text-neutral-dark font-bold">{student.completedLessonsCount}</span>
                </div>
              </div>

              {/* Action buttons on student card */}
              <div className="mt-6 pt-4 border-t border-primary-green-light/40 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(isSelected ? null : student)}
                  className="text-xs font-bold text-primary-green hover:underline flex items-center"
                >
                  {isSelected ? 'Detayları Gizle' : 'Başarıları Gör'} <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Tactile XP reward button */}
                <button
                  type="button"
                  onClick={() => handleRewardXP(student.id)}
                  className="tactile-btn-gold bg-accent-gold hover:bg-accent-gold-hover text-white text-[10px] font-extrabold py-1.5 px-3 rounded-full flex items-center gap-1 cursor-pointer"
                  title="Öğrenciyi aktif okuma veya güzel davranışı için 25 XP ile ödüllendir!"
                >
                  <Zap className="w-3 h-3 fill-current" /> +25 XP
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Student Expanded Detail Dashboard */}
      {selectedStudent && (
        <div className="bg-neutral-card rounded-3xl p-6 border border-accent-gold shadow-lg mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden animate-fadeIn">
          {/* Subtle gold decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />

          {/* Left panel: student summary & badges list */}
          <div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-accent-gold/20 flex-shrink-0">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-accent-gold-hover tracking-widest bg-accent-gold-light border border-accent-gold/20 px-2.5 py-1 rounded-full">
                  Seçkin Sınıf Şampiyonu
                </span>
                <h3 className="text-xl font-bold text-neutral-dark mt-1.5">{selectedStudent.name}</h3>
                <p className="text-xs text-neutral-muted font-medium mt-0.5">Çalışma Alanı: {selectedStudent.currentSurah} Suresi</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2.5">
                Kazanılan Başarılar & Rozetler ({selectedStudent.achievements.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.achievements.map((ach, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold bg-primary-green-light text-primary-green px-3 py-1.5 rounded-full flex items-center gap-1 border border-primary-green-light"
                  >
                    🏆 {ach}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-neutral-bg/60 rounded-xl border border-primary-green-light/40 text-xs">
              <span className="font-bold text-primary-green-dark">Öğretmenin Özel Değerlendirme Notları:</span>
              <p className="text-neutral-muted mt-1 leading-relaxed">
                {selectedStudent.name} nefes kontrolü ve harf uzatmalarında (Med) istikrarlı bir gelişim gösteriyor. Etkileşimli ses pratiklerine ve yıldız çıkartmalarına harika yanıt veriyor. Önümüzdeki hafta yeni bir sure ödevi tanımlanmasını tavsiye ederim!
              </p>
            </div>
          </div>

          {/* Right panel: classroom operations & awarding badges */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-neutral-muted uppercase tracking-wider mb-3">
                Özel Rozet & Çıkartma Ver
              </h4>
              <p className="text-xs text-neutral-muted mb-4 leading-relaxed">
                Eğitimsel gelişimi ödüllendirin! {selectedStudent.name} adlı öğrencinin profiline anında özel başarılar tanımlayın.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAddAchievement(selectedStudent.id, 'Güzel Okuma 🎙️')}
                  className="p-3 bg-neutral-bg hover:bg-primary-green-light border border-primary-green-light/50 rounded-xl text-left transition-all text-xs font-bold text-neutral-dark cursor-pointer flex items-center gap-2"
                >
                  <span>🎙️</span> Güzel Okuma Pro
                </button>

                <button
                  type="button"
                  onClick={() => handleAddAchievement(selectedStudent.id, 'Süper Yardımcı 🤝')}
                  className="p-3 bg-neutral-bg hover:bg-primary-green-light border border-primary-green-light/50 rounded-xl text-left transition-all text-xs font-bold text-neutral-dark cursor-pointer flex items-center gap-2"
                >
                  <span>🤝</span> Süper Yardımcı
                </button>

                <button
                  type="button"
                  onClick={() => handleAddAchievement(selectedStudent.id, 'Tecvid Şampiyonu 🌟')}
                  className="p-3 bg-neutral-bg hover:bg-primary-green-light border border-primary-green-light/50 rounded-xl text-left transition-all text-xs font-bold text-neutral-dark cursor-pointer flex items-center gap-2"
                >
                  <span>🌟</span> Tecvid Kahramanı
                </button>

                <button
                  type="button"
                  onClick={() => handleAddAchievement(selectedStudent.id, 'Kusursuz Katılım 📅')}
                  className="p-3 bg-neutral-bg hover:bg-primary-green-light border border-primary-green-light/50 rounded-xl text-left transition-all text-xs font-bold text-neutral-dark cursor-pointer flex items-center gap-2"
                >
                  <span>📅</span> Kusursuz Katılım
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-primary-green-light/40 mt-6 flex justify-between items-center">
              <div className="text-left">
                <span className="text-[10px] font-bold text-neutral-muted uppercase block">Toplam Puan</span>
                <span className="text-lg font-bold text-neutral-dark">{selectedStudent.xp} Puan</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="text-xs font-bold bg-neutral-bg hover:bg-neutral-dark hover:text-white border border-neutral-muted rounded-full px-4 py-2 cursor-pointer transition-colors"
              >
                Profil Panelini Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

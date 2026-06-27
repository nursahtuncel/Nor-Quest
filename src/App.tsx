import React, { useState } from 'react';
import { Menu, X, HelpCircle, UserPlus, Info, Check, Save } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import PlannerView from './components/PlannerView';
import StudentsView from './components/StudentsView';
import ResourcesView from './components/ResourcesView';
import SupportView from './components/SupportView';

import { INITIAL_STUDENTS, DEFAULT_LESSONS, INITIAL_ASSIGNMENTS } from './data';
import { Student, Lesson, Assignment, LessonSubject } from './types';

export default function App() {
  // Navigation & States
  const [currentTab, setCurrentTab] = useState<string>('planner'); // Planner tab is active by default as shown in the mockup screenshot!
  const [selectedLevel, setSelectedLevel] = useState<string>('Tümü');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Core Data States
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [lessons, setLessons] = useState<Lesson[]>(DEFAULT_LESSONS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);

  // Modals Toggles
  const [isNewLessonModalOpen, setIsNewLessonModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Form states for New Lesson Modal
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonSubject, setNewLessonSubject] = useState<LessonSubject>('Tecvid');
  const [newLessonTime, setNewLessonTime] = useState('10:00');
  const [newLessonDay, setNewLessonDay] = useState<'Pzt' | 'Sal' | 'Çar' | 'Per' | 'Cum'>('Pzt');
  const [newLessonNotes, setNewLessonNotes] = useState('');

  // Handle adding a new lesson
  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) {
      alert('Lütfen bir ders başlığı girin.');
      return;
    }

    // Map day name to date number (matching Oct 23 - 27)
    const dayMap = { Pzt: 23, Sal: 24, Çar: 25, Per: 26, Cum: 27 };

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: newLessonTitle,
      subject: newLessonSubject,
      time: newLessonTime,
      dayOfWeek: newLessonDay,
      dayNumber: dayMap[newLessonDay],
      completed: false,
      notes: newLessonNotes
    };

    setLessons([...lessons, newLesson]);
    setIsNewLessonModalOpen(false);

    // Reset Form
    setNewLessonTitle('');
    setNewLessonNotes('');

    alert(`🗓️ Başarılı! "${newLessonTitle}" dersi ${newLessonDay} günü saat ${newLessonTime} için planlandı.`);
  };

  // Filter students based on age group select
  const filteredStudents = selectedLevel === 'Tümü'
    ? students
    : students.filter(s => s.level === selectedLevel);

  return (
    <div className="flex bg-neutral-bg min-h-screen text-neutral-dark font-sans overflow-x-hidden antialiased" id="app-root">
      
      {/* Sidebar - fully responsive */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenNewLessonModal={() => setIsNewLessonModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        
        {/* Header with quick hamburger for mobile sizes */}
        <div className="flex flex-col">
          {/* Mobile Top Header helper */}
          <div className="lg:hidden bg-neutral-card px-6 py-4 flex items-center justify-between border-b border-primary-green-light">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg bg-primary-green-light text-primary-green hover:bg-primary-green hover:text-white transition-colors cursor-pointer"
              id="btn-mobile-hamburger"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌙</span>
              <span className="font-extrabold text-sm tracking-tight text-neutral-dark">Noor Quest</span>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-primary-green">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                alt="Profil"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <Header
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          />
        </div>

        {/* View Layout wrapper */}
        <main className="flex-1 p-6 md:p-8 max-w-[1400px] w-full mx-auto" id="main-content">
          {currentTab === 'dashboard' && (
            <DashboardView
              students={filteredStudents}
              lessons={lessons}
              setCurrentTab={setCurrentTab}
              setSelectedStudentForDetail={(student) => {
                setSelectedStudentDetail(student);
                setCurrentTab('students');
              }}
            />
          )}

          {currentTab === 'planner' && (
            <PlannerView
              lessons={lessons}
              setLessons={setLessons}
              assignments={assignments}
              setAssignments={setAssignments}
              students={filteredStudents}
              setStudents={setStudents}
              onOpenNewLessonModal={() => setIsNewLessonModalOpen(true)}
            />
          )}

          {currentTab === 'students' && (
            <StudentsView
              students={filteredStudents}
              setStudents={setStudents}
              selectedStudent={selectedStudentDetail}
              setSelectedStudent={setSelectedStudentDetail}
            />
          )}

          {currentTab === 'assignments' && (
            <div className="space-y-6">
              <PlannerView
                lessons={lessons}
                setLessons={setLessons}
                assignments={assignments}
                setAssignments={setAssignments}
                students={filteredStudents}
                setStudents={setStudents}
                onOpenNewLessonModal={() => setIsNewLessonModalOpen(true)}
              />
            </div>
          )}

          {currentTab === 'resources' && <ResourcesView />}

          {currentTab === 'support' && <SupportView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar for rapid tab switching */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-card/95 backdrop-blur-md border-t border-primary-green-light flex items-center justify-around py-3 z-35 px-2">
        <button
          type="button"
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'dashboard' ? 'text-primary-green' : 'text-neutral-muted'}`}
        >
          <span className="text-lg">📊</span>
          <span className="text-[10px] font-bold">İstatistikler</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('students')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'students' ? 'text-primary-green' : 'text-neutral-muted'}`}
        >
          <span className="text-lg">👦</span>
          <span className="text-[10px] font-bold">Öğrenciler</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('planner')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'planner' ? 'text-primary-green' : 'text-neutral-muted'}`}
        >
          <span className="text-lg">🗓️</span>
          <span className="text-[10px] font-bold">Planlayıcı</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('resources')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'resources' ? 'text-primary-green' : 'text-neutral-muted'}`}
        >
          <span className="text-lg">📖</span>
          <span className="text-[10px] font-bold">Kütüphane</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('support')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'support' ? 'text-primary-green' : 'text-neutral-muted'}`}
        >
          <span className="text-lg">✨</span>
          <span className="text-[10px] font-bold">Yapay Zeka</span>
        </button>
      </div>

      {/* MODAL 1: ADD NEW LESSON SCHEDULE */}
      {isNewLessonModalOpen && (
        <div className="fixed inset-0 bg-neutral-dark/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light max-w-md w-full shadow-2xl relative overflow-hidden animate-scaleIn">
            <button
              type="button"
              onClick={() => setIsNewLessonModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-neutral-bg hover:bg-neutral-dark hover:text-white text-neutral-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🗓️</span>
              <h3 className="text-lg font-bold text-neutral-dark">Özel Ders Planla</h3>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-muted uppercase mb-1">Ders Başlığı</label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Örn: Kuran Kıssaları Okuması, Tecvid Kuralları"
                  className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-muted uppercase mb-1">Konu</label>
                  <select
                    value={newLessonSubject}
                    onChange={(e) => setNewLessonSubject(e.target.value as LessonSubject)}
                    className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="Tecvid">Tecvid</option>
                    <option value="Kuran Hikayeleri">Kuran Hikayeleri</option>
                    <option value="Ezber">Ezber</option>
                    <option value="Cuma Hazırlığı">Cuma Hazırlığı</option>
                    <option value="Özel">Özel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-muted uppercase mb-1">Haftanın Günü</label>
                  <select
                    value={newLessonDay}
                    onChange={(e) => setNewLessonDay(e.target.value as any)}
                    className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="Pzt">Pazartesi (23)</option>
                    <option value="Sal">Salı (24)</option>
                    <option value="Çar">Çarşamba (25)</option>
                    <option value="Per">Perşembe (26)</option>
                    <option value="Cum">Cuma (27)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-muted uppercase mb-1">Saat Dilimi</label>
                  <select
                    value={newLessonTime}
                    onChange={(e) => setNewLessonTime(e.target.value)}
                    className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:30">15:30</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-muted uppercase mb-1">Kısa Açıklama / Ders Materyali</label>
                <textarea
                  value={newLessonNotes}
                  onChange={(e) => setNewLessonNotes(e.target.value)}
                  placeholder="Belirli ayetlere veya öğrenme hedeflerine odaklanın..."
                  rows={3}
                  className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 tactile-btn bg-primary-green text-white font-extrabold py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  Planlamayı Onayla
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewLessonModalOpen(false)}
                  className="py-3 px-4 rounded-full text-xs font-bold text-neutral-muted hover:bg-neutral-bg"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SETTINGS PROFILE CONFIG */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-neutral-dark/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light max-w-sm w-full shadow-2xl relative overflow-hidden animate-scaleIn">
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-neutral-bg hover:bg-neutral-dark hover:text-white text-neutral-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚙️</span>
              <h3 className="text-lg font-bold text-neutral-dark">Akademi Ayarları</h3>
            </div>

            <div className="space-y-4 text-xs font-medium text-neutral-muted">
              <div>
                <label className="block text-xs font-bold text-neutral-muted uppercase mb-1">Baş Eğitmen Profili</label>
                <div className="flex items-center gap-3 bg-neutral-bg p-3 rounded-xl border border-primary-green-light/40">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" alt="avatar" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-neutral-dark">Amina Hoca</h4>
                    <p className="text-[10px] text-primary-green font-bold">Yönetici Yetkileri</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-bold text-neutral-dark block mb-1">Tema Tercihleri</span>
                <p className="leading-relaxed">Noor Quest, geleneksel İslam geometrisine uygun özel bir "Yumuşak Dokulu Zümrüt" sistemi kullanır. Karanlık mod, yüksek kontrast filtreleri kullanılarak değiştirilebilir.</p>
              </div>

              <div className="bg-accent-gold-light p-3 rounded-xl border border-accent-gold/25 text-accent-gold-hover text-[11px] font-bold">
                🔒 Veri Güvenliği Garantisi: Tüm bilgiler, optimize edilmiş duyarlı sunum için istemci tarafında yerel olarak saklanır.
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSettingsModalOpen(false);
                  alert('Ayarlar başarıyla güncellendi!');
                }}
                className="w-full py-3 bg-primary-green hover:bg-primary-green-dark text-white font-extrabold rounded-full text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Ayarları Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

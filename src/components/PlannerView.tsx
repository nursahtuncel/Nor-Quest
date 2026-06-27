import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, Trash2, ClipboardList, PlusCircle, Award, RefreshCw } from 'lucide-react';
import { Lesson, Assignment, Student, Surah } from '../types';
import { SURAHS } from '../data';

interface PlannerViewProps {
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onOpenNewLessonModal: () => void;
}

export default function PlannerView({
  lessons,
  setLessons,
  assignments,
  setAssignments,
  students,
  setStudents,
  onOpenNewLessonModal
}: PlannerViewProps) {
  // Navigation for active day on the schedule card
  const [selectedDayNum, setSelectedDayNum] = useState<number>(25); // Wed 25 is active by default in the mockup screenshot!
  const [selectedSurah, setSelectedSurah] = useState<string>('Fatiha');
  const [specificNotes, setSpecificNotes] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [assignmentFilter, setAssignmentFilter] = useState<'By Student' | 'By Level'>('By Level'); // "By Level" active in screenshot!

  // Define weekdays for the schedule card (matching Oct 23 - 29 in Turkish)
  const days = [
    { name: 'Pzt', num: 23 },
    { name: 'Sal', num: 24 },
    { name: 'Çar', num: 25 },
    { name: 'Per', num: 26 },
    { name: 'Cum', num: 27 }
  ];

  // Handle assigning a task
  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudentId) {
      alert('Lütfen önce bir öğrenci seçin veya ekleyin.');
      return;
    }

    const matchedStudent = students.find(s => s.id === selectedStudentId);
    if (!matchedStudent) return;

    const newAssignment: Assignment = {
      id: `assign-${Date.now()}`,
      studentId: matchedStudent.id,
      studentName: matchedStudent.name,
      studentAvatar: matchedStudent.avatar,
      surahName: `${selectedSurah} Suresi`,
      notes: specificNotes || 'Dikkatlice tekrar et, nefes kontrolü ve doğru hızla oku.',
      deadline: deadline || '2026-10-31',
      status: 'Devam Ediyor',
      dateCreated: new Date().toISOString().split('T')[0]
    };

    // Add to assignments state
    setAssignments([newAssignment, ...assignments]);

    // Give some cool feedback!
    alert(`🎉 Başarılı! ${matchedStudent.name} adlı öğrenciye ${selectedSurah} Suresi ödevi verildi. Tamamlandığında 50 XP kazanacak!`);

    // Reset fields
    setSpecificNotes('');
    setDeadline('');
  };

  // Toggle assignment completion status
  const handleToggleAssignmentStatus = (id: string) => {
    setAssignments(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'Devam Ediyor' ? 'Tamamlandı' : 'Devam Ediyor';
          
          // Award XP to the student if completed
          if (nextStatus === 'Tamamlandı') {
            setStudents(stdPrev =>
              stdPrev.map(s => {
                if (s.id === item.studentId) {
                  return {
                    ...s,
                    xp: s.xp + 50,
                    completedLessonsCount: s.completedLessonsCount + 1,
                    badgeCount: s.completedLessonsCount % 3 === 0 ? s.badgeCount + 1 : s.badgeCount
                  };
                }
                return s;
              })
            );
          } else {
            // Deduct XP if reverted
            setStudents(stdPrev =>
              stdPrev.map(s => {
                if (s.id === item.studentId) {
                  return { ...s, xp: Math.max(0, s.xp - 50) };
                }
                return s;
              })
            );
          }

          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Delete assignment
  const handleDeleteAssignment = (id: string) => {
    if (confirm('Bu ödevi silmek istediğinizden emin misiniz?')) {
      setAssignments(prev => prev.filter(item => item.id !== id));
    }
  };

  // Delete lesson
  const handleDeleteLesson = (id: string) => {
    if (confirm('Bu dersi programınızdan silmek istediğinizden emin misiniz?')) {
      setLessons(prev => prev.filter(item => item.id !== id));
    }
  };

  // Render scheduled lesson cards for the selected day
  const filteredLessons = lessons.filter(l => l.dayNumber === selectedDayNum);

  return (
    <div className="space-y-8 animate-fadeIn" id="planner-view-root">
      {/* Title block */}
      <div>
        <h2 className="text-3xl font-bold text-primary-green tracking-tight font-sans">Ders Planlayıcı</h2>
        <p className="text-neutral-muted text-sm mt-1 font-medium">
          Haftanızı organize edin ve öğrenci ödevlerini yönetin.
        </p>
      </div>

      {/* Main Two Column Layout exactly matching mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Weekly Schedule Card */}
        <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light shadow-sm lg:col-span-8 flex flex-col justify-between min-h-[420px]">
          <div>
            {/* Schedule Header with arrows */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📅</span>
                <h3 className="text-lg font-bold text-neutral-dark tracking-tight">Haftalık Ders Programı</h3>
              </div>
              
              {/* Oct 23 - 29 Date Scroller */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Önceki hafta görüntüleniyor: 16 - 22 Ekim')}
                  className="p-1 rounded-full bg-neutral-bg hover:bg-primary-green-light text-neutral-muted hover:text-primary-green transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold bg-neutral-bg text-neutral-dark px-4 py-1.5 rounded-full select-none">
                  23 - 29 Ekim
                </span>
                <button
                  type="button"
                  onClick={() => alert('Sonraki hafta görüntüleniyor: 30 Ekim - 5 Kasım')}
                  className="p-1 rounded-full bg-neutral-bg hover:bg-primary-green-light text-neutral-muted hover:text-primary-green transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays row with exact underlined styling for active day */}
            <div className="grid grid-cols-5 border-b border-primary-green-light/60 pb-4 mb-6">
              {days.map((day) => {
                const isActive = day.num === selectedDayNum;
                return (
                  <button
                    key={day.num}
                    onClick={() => setSelectedDayNum(day.num)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <span className="text-[11px] font-bold text-neutral-muted uppercase group-hover:text-primary-green">
                      {day.name} {day.num}
                    </span>
                    <div
                      className={`h-1 w-10 mt-2.5 rounded-full transition-all ${
                        isActive ? 'bg-primary-green scale-100' : 'bg-transparent scale-0 group-hover:scale-75 group-hover:bg-primary-green/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Lesson Blocks for selected day */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLessons.length > 0 ? (
                filteredLessons.map((lesson) => {
                  // Subject styles matching theme
                  let borderClass = 'border-primary-green/30';
                  let bgClass = 'bg-primary-green-light/40';
                  let accentText = 'text-primary-green';

                  if (lesson.subject === 'Kuran Hikayeleri') {
                    borderClass = 'border-accent-gold/40';
                    bgClass = 'bg-[#FFF9EE]';
                    accentText = 'text-accent-gold-hover';
                  } else if (lesson.subject === 'Ezber') {
                    borderClass = 'border-accent-blue/40';
                    bgClass = 'bg-[#F2F8FD]';
                    accentText = 'text-accent-blue';
                  } else if (lesson.subject === 'Cuma Hazırlığı') {
                    borderClass = 'border-purple-200';
                    bgClass = 'bg-[#F9F5FD]';
                    accentText = 'text-purple-500';
                  } else if (lesson.subject === 'Özel') {
                    borderClass = 'border-rose-200';
                    bgClass = 'bg-rose-50/50';
                    accentText = 'text-rose-600';
                  }

                  return (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-2xl border ${borderClass} ${bgClass} flex flex-col justify-between h-32 hover:shadow-sm transition-all group relative overflow-hidden`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className={`font-extrabold text-sm ${accentText}`}>
                            {lesson.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="text-neutral-muted hover:text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Dersi sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] font-bold text-neutral-muted block mt-1">
                          Saat: {lesson.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-dark font-medium line-clamp-2 mt-2 leading-snug">
                        {lesson.notes || 'Ders notu eklenmemiş.'}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center text-neutral-muted border-2 border-dashed border-primary-green-light/40 rounded-2xl bg-neutral-bg/40">
                  <span className="text-3xl mb-2">🎈</span>
                  <p className="font-bold text-xs text-neutral-dark">Bu gün için planlanmış ders bulunmuyor</p>
                  <p className="text-[10px] max-w-xs mt-1">Yeni bir ders planlamak için sol menüdeki veya aşağıdaki "+ Yeni Ders" butonuna tıklayın!</p>
                  <button
                    type="button"
                    onClick={onOpenNewLessonModal}
                    className="mt-4 text-xs font-bold text-primary-green hover:underline flex items-center gap-1"
                  >
                    + Şimdi Yeni Ders Ekle
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-primary-green-light/40 mt-6 pt-4 text-center">
            <span className="text-[10px] font-bold text-neutral-muted uppercase tracking-wider">
              Seçilen Gün: Ekim {selectedDayNum} • 43. Hafta
            </span>
          </div>
        </div>

        {/* Right Column: New Assignment Widget Form */}
        <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light shadow-sm lg:col-span-4 border-t-4 border-t-accent-gold">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✍️</span>
            <h3 className="text-lg font-bold text-neutral-dark tracking-tight">Yeni Ödev Ver</h3>
          </div>

          <form onSubmit={handleAssignTask} className="space-y-4">
            {/* Student Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1.5">
                Öğrenci Seçin
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.level})
                  </option>
                ))}
              </select>
            </div>

            {/* Surah Selection Dropdown */}
            <div>
              <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1.5">
                Sure Seçin
              </label>
              <select
                value={selectedSurah}
                onChange={(e) => setSelectedSurah(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                {SURAHS.map((surah) => (
                  <option key={surah.id} value={surah.name}>
                    {surah.name} ({surah.englishTranslation})
                  </option>
                ))}
              </select>
            </div>

            {/* Specific Notes */}
            <div>
              <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1.5">
                Özel Talimatlar / Notlar
              </label>
              <textarea
                value={specificNotes}
                onChange={(e) => setSpecificNotes(e.target.value)}
                placeholder="Örn: Uzatma harflerine (Med) ve duraklama kurallarına dikkat et..."
                rows={3}
                className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              />
            </div>

            {/* Deadline Datepicker */}
            <div>
              <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1.5">
                Son Teslim Tarihi
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full text-xs font-semibold bg-neutral-bg border border-primary-green-light rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>

            {/* Assign Task Button - Tactile Emerald */}
            <button
              type="submit"
              className="w-full tactile-btn bg-primary-green hover:bg-primary-green-dark text-white font-extrabold py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              Ödevi Tanımla ▷
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Row: Current Assignments list with student status filters */}
      <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <h3 className="text-lg font-bold text-neutral-dark tracking-tight">Mevcut Ödevler</h3>
          </div>

          {/* Filtering Toggles exactly matching "By Student" & "By Level" button row */}
          <div className="flex bg-neutral-bg rounded-xl p-1 self-start sm:self-auto border border-primary-green-light/40">
            <button
              type="button"
              onClick={() => setAssignmentFilter('By Student')}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                assignmentFilter === 'By Student'
                  ? 'bg-primary-green text-white shadow-sm'
                  : 'text-neutral-muted hover:text-primary-green'
              }`}
            >
              Öğrenciye Göre
            </button>
            <button
              type="button"
              onClick={() => setAssignmentFilter('By Level')}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                assignmentFilter === 'By Level'
                  ? 'bg-primary-green text-white shadow-sm'
                  : 'text-neutral-muted hover:text-primary-green'
              }`}
            >
              Seviyeye Göre
            </button>
          </div>
        </div>

        {/* Assignment roster list */}
        <div className="space-y-3.5">
          {assignments.length > 0 ? (
            assignments.map((assignment) => {
              const isCompleted = assignment.status === 'Tamamlandı';
              return (
                <div
                  key={assignment.id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-primary-green-light/10 border-primary-green-light/40'
                      : 'bg-white border-primary-green-light/50 hover:shadow-sm'
                  }`}
                >
                  {/* Left part: Student Details */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-primary-green-light ring-2 ring-primary-green/20 relative flex-shrink-0">
                      <img
                        src={assignment.studentAvatar}
                        alt={assignment.studentName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-neutral-dark">{assignment.studentName}</h4>
                      <p className="text-xs font-bold text-primary-green">{assignment.surahName}</p>
                    </div>
                  </div>

                  {/* Middle part: Specific instruction notes */}
                  <div className="my-3 md:my-0 md:mx-6 flex-1 text-xs text-neutral-muted max-w-xl font-medium">
                    <span className="font-bold text-neutral-dark block md:inline md:mr-1">Talimatlar:</span>
                    {assignment.notes}
                  </div>

                  {/* Right part: Status triggers, deadline & delete */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t border-neutral-bg md:border-t-0 pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-neutral-muted uppercase block">Süre Sınırı</span>
                      <span className="text-xs font-bold text-neutral-dark">{assignment.deadline}</span>
                    </div>

                    {/* Status Toggle Button - Minty for completed, Gold for in progress */}
                    <button
                      type="button"
                      onClick={() => handleToggleAssignmentStatus(assignment.id)}
                      className={`text-xs font-extrabold px-4 py-2 rounded-full cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-[#EBF7F2] hover:bg-[#DDEFE6] text-primary-green border border-primary-green-light/40'
                          : 'bg-accent-gold-light hover:bg-[#FBEED3] text-accent-gold-hover border border-accent-gold/20 animate-pulse'
                      }`}
                      id={`btn-assignment-status-${assignment.id}`}
                    >
                      {isCompleted ? 'Tamamlandı ✓' : 'Devam Ediyor'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="p-2 rounded-full hover:bg-red-50 text-neutral-muted hover:text-red-500 transition-colors"
                      title="Ödev kaydını sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-muted border border-dashed border-primary-green-light rounded-2xl bg-neutral-bg/30">
              <ClipboardList className="w-10 h-10 mx-auto text-primary-green/40 mb-2" />
              <p className="font-bold text-xs text-neutral-dark">Listelenmiş ödev bulunmuyor</p>
              <p className="text-[10px] max-w-xs mx-auto mt-1">Öğrencilerinize ödev tanımlamak için yukarıdaki "Yeni Ödev Ver" formunu kullanın.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

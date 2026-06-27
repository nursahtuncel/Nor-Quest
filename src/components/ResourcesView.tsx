import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Pause, Volume2, Sparkles, HelpCircle, ChevronRight, CheckCircle } from 'lucide-react';
import { SURAHS, TAJWEED_CARDS, QURAN_STORIES } from '../data';

interface Verse {
  number: number;
  arabic: string;
  translation: string;
}

export default function ResourcesView() {
  const [activeTab, setActiveTab] = useState<'quran' | 'tajweed' | 'stories'>('quran');
  const [selectedSurah, setSelectedSurah] = useState(SURAHS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(45); // simulated duration in seconds

  // Simulated Audio progress timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= audioDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, audioDuration]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  // Format time (e.g. 0:24)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Selected Surah Verses in Turkish
  const getSurahVerses = (surahName: string): Verse[] => {
    if (surahName === 'Fatiha') {
      return [
        { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: "Rahman ve Rahim olan Allah'ın adıyla." },
        { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: "Hamd, Alemlerin Rabbi olan Allah'adır." },
        { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: "O, Rahman'dır, Rahim'dir." },
        { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: "Hesap ve ceza gününün (ahiretin) tek sahibidir." },
        { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: "(Rabbimiz!) Yalnızca Sana ibadet eder ve yalnızca Senden yardım dileriz." },
        { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: "Bizi doğru yola ilet." },
        { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: "Kendilerine lütuf ve ikramda bulunduğun kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil." }
      ];
    }
    if (surahName === 'İhlas') {
      return [
        { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', translation: 'De ki: O, Allah\'tır, tektir.' },
        { number: 2, arabic: 'اللَّهُ الصَّمَدُ', translation: 'Allah Samed\'dir (her şey O\'na muhtaçtır, O hiçbir şeye muhtaç değildir).' },
        { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', translation: 'O, doğurmamış ve doğurulmamıştır.' },
        { number: 4, arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', translation: 'Hiçbir şey O\'na denk ve benzer değildir.' }
      ];
    }
    if (surahName === 'Felak') {
      return [
        { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', translation: 'De ki: Sabahın Rabbine sığınırım,' },
        { number: 2, arabic: 'مِن شَرِّ مَا خَلَقَ', translation: 'Yarattığı şeylerin şerrinden,' },
        { number: 3, arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', translation: 'Karanlığı çöktüğü zaman gecenin şerrinden.' }
      ];
    }
    // Return standard short verse placeholders for others
    return [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', translation: 'De ki: Sığınırım insanların Rabbine,' },
      { number: 2, arabic: 'مَلِكِ النَّاسِ', translation: 'İnsanların hükümdarına,' },
      { number: 3, arabic: 'إِلَٰهِ النَّاسِ', translation: 'İnsanların ilahına.' }
    ];
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="resources-view-root">
      {/* View Header with mini tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary-green-light pb-4">
        <div>
          <h2 className="text-3xl font-bold text-primary-green tracking-tight font-sans">Kaynak Kütüphanesi</h2>
          <p className="text-neutral-muted text-sm mt-1 font-medium">
            Kuran-ı Kerim okuyun, Tecvid kurallarını pratik yapın ve ilham verici hikayeleri keşfedin.
          </p>
        </div>

        {/* Resources sub tabs */}
        <div className="flex bg-neutral-bg border border-primary-green-light/40 rounded-xl p-1 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('quran')}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'quran'
                ? 'bg-primary-green text-white shadow-sm'
                : 'text-neutral-muted hover:text-primary-green'
            }`}
          >
            📖 Kuran-ı Kerim
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tajweed')}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'tajweed'
                ? 'bg-primary-green text-white shadow-sm'
                : 'text-neutral-muted hover:text-primary-green'
            }`}
          >
            🎨 Tecvid Kuralları
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stories')}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'stories'
                ? 'bg-primary-green text-white shadow-sm'
                : 'text-neutral-muted hover:text-primary-green'
            }`}
          >
            🐳 Çocuk Hikayeleri
          </button>
        </div>
      </div>

      {/* QURAN READER VIEW */}
      {activeTab === 'quran' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Surah List Selectors */}
          <div className="bg-neutral-card rounded-2xl p-5 border border-primary-green-light shadow-sm lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-neutral-muted uppercase tracking-wider mb-4">Sure Seçin</h3>
            {SURAHS.map((surah) => {
              const isSelected = selectedSurah.id === surah.id;
              return (
                <button
                  key={surah.id}
                  type="button"
                  onClick={() => {
                    setSelectedSurah(surah);
                    setIsPlaying(false);
                    setAudioProgress(0);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-green-light text-primary-green border-primary-green'
                      : 'bg-white border-primary-green-light hover:bg-neutral-bg'
                  }`}
                >
                  <div>
                    <h4 className="font-extrabold text-sm text-neutral-dark">{surah.name}</h4>
                    <span className="text-[10px] text-neutral-muted font-bold block mt-0.5">
                      {surah.englishTranslation} • {surah.versesCount} Ayet
                    </span>
                  </div>
                  <span className="text-lg font-arabic font-bold text-primary-green">
                    {surah.arabicName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Surah Viewer with interactive player */}
          <div className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light shadow-sm lg:col-span-8 space-y-6">
            
            {/* Player block */}
            <div className="bg-primary-green-light rounded-2xl p-5 border border-primary-green/20 flex flex-col md:flex-row items-center gap-5 justify-between">
              <div className="flex items-center gap-3">
                {/* Simulated Wave equalizer animation */}
                <div className="w-12 h-12 rounded-full bg-primary-green text-white flex items-center justify-center text-xl shadow-md cursor-pointer hover:scale-105 transition-transform" onClick={handlePlayToggle}>
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-neutral-dark">Tilavet Ses Takibi</h4>
                  <span className="text-xs text-primary-green font-bold">Şeyh Mishary Al-Afasy (Simüle)</span>
                </div>
              </div>

              {/* Progress and wave graph */}
              <div className="flex-1 w-full max-w-sm flex items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-muted">{formatTime(audioProgress)}</span>
                <div className="flex-1 h-3 bg-white border border-primary-green-light rounded-full overflow-hidden relative">
                  <div
                    style={{ width: `${(audioProgress / audioDuration) * 100}%` }}
                    className="h-full bg-accent-gold rounded-full transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] font-bold text-neutral-muted">{formatTime(audioDuration)}</span>
              </div>

              {/* Dance Equalizer simulation bars */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-6">
                  <div className="w-1 bg-accent-gold rounded-full animate-equalizer-bar-1 h-4" />
                  <div className="w-1 bg-accent-gold rounded-full animate-equalizer-bar-2 h-6" />
                  <div className="w-1 bg-accent-gold rounded-full animate-equalizer-bar-3 h-3" />
                  <div className="w-1 bg-accent-gold rounded-full animate-equalizer-bar-4 h-5" />
                </div>
              )}
            </div>

            {/* Verses Container */}
            <div className="divide-y divide-primary-green-light/40 pt-4">
              <div className="text-center py-4 mb-6">
                <span className="text-xs font-bold text-accent-gold-hover tracking-widest uppercase bg-accent-gold-light border border-accent-gold/20 px-3 py-1 rounded-full">
                  {selectedSurah.name} Suresi ({selectedSurah.classification})
                </span>
              </div>

              {getSurahVerses(selectedSurah.name).map((verse) => (
                <div key={verse.number} className="py-6 space-y-4">
                  {/* Arabic Scripture in large elegant Amiri Font */}
                  <div className="text-right text-3xl md:text-4xl font-arabic text-neutral-dark leading-loose font-medium select-text pr-2">
                    {verse.arabic} <span className="text-xs font-sans text-primary-green font-bold border border-primary-green rounded-full px-2.5 py-1 inline-block ml-3 align-middle select-none">
                      {verse.number}
                    </span>
                  </div>

                  {/* Turkish Translation */}
                  <div className="text-xs text-neutral-muted leading-relaxed max-w-xl pr-2 font-medium">
                    <span className="font-extrabold text-neutral-dark mr-1">{verse.number}.</span>
                    {verse.translation}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAJWEED RULES CARDS VIEW */}
      {activeTab === 'tajweed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TAJWEED_CARDS.map((card, i) => (
            <div key={i} className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light hover:shadow-md transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-xs font-extrabold text-primary-green uppercase tracking-wider bg-primary-green-light px-2.5 py-1 rounded-full">
                  Kural {i+1}
                </span>
                <h3 className="text-base font-bold text-neutral-dark mt-3">{card.title}</h3>
                <p className="text-xs text-neutral-muted mt-2 leading-relaxed font-medium">{card.rule}</p>
              </div>

              {/* Colorful Arabic Example block */}
              <div className="my-5 p-4 bg-accent-gold-light/40 rounded-xl border border-accent-gold/20 text-center relative overflow-hidden">
                <span className="absolute left-2 top-2 text-[10px] font-bold text-accent-gold-hover uppercase">Örnek</span>
                <span className="text-3xl font-arabic font-bold text-neutral-dark block">{card.arabicExample}</span>
                <span className="text-[11px] font-semibold text-neutral-muted mt-1 block">"{card.example}"</span>
              </div>

              <div className="border-t border-primary-green-light/40 pt-4">
                <div className="flex items-start gap-2 text-xs text-primary-green-dark bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-bold">
                  <span>💡</span>
                  <span>{card.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KIDS STORIES TABS VIEW */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {QURAN_STORIES.map((story, i) => (
            <div key={i} className="bg-neutral-card rounded-3xl p-6 border border-primary-green-light shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-green-light rounded-xl flex items-center justify-center text-2xl shadow-sm">
                    {story.icon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-dark">{story.title}</h3>
                </div>

                <p className="text-xs text-neutral-muted leading-relaxed font-medium mt-4 border-l-2 border-primary-green-light pl-4 italic">
                  {story.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-primary-green-light/40 bg-accent-gold-light/20 p-3.5 rounded-xl border border-accent-gold/10 text-xs font-bold text-amber-900">
                <span className="text-amber-600 block mb-1">🌟 Çocuklar İçin Kıssadan Hisse:</span>
                {story.moral}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { Bell, Settings, Search, CheckCircle, Gift, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  onOpenSettingsModal: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  selectedLevel,
  setSelectedLevel,
  onOpenSettingsModal
}: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Ömer A. İhlas Suresi ses kaydını gönderdi! 🎙️', unread: true, type: 'submission' },
    { id: 2, text: 'Leyla M. "Tecvid Yıldızı" Rozeti kazandı! 🌟', unread: true, type: 'achievement' },
    { id: 3, text: 'Haftalık Planlayıcı Cuma Hazırlığı ile güncellendi. 🗓️', unread: false, type: 'system' }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 bg-neutral-card/95 backdrop-blur-md border-b border-primary-green-light px-6 py-4 flex items-center justify-between">
      {/* Search and Navigation Tabs */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 bg-neutral-bg border border-primary-green-light rounded-full px-3.5 py-1.5 text-xs font-bold text-neutral-dark">
          <span className="text-primary-green">🕌</span>
          <span>Noor Quest Merkezi</span>
        </div>

        {/* Classroom / Resources Tabs exactly like screenshot */}
        <div className="hidden sm:flex items-center gap-6 border-l border-primary-green-light/60 pl-6">
          <button
            onClick={() => setCurrentTab('planner')}
            className={`text-sm font-bold pb-1 transition-all relative ${
              currentTab === 'planner' || currentTab === 'dashboard'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-neutral-muted hover:text-primary-green'
            }`}
          >
            Sınıf
          </button>
          <button
            onClick={() => setCurrentTab('resources')}
            className={`text-sm font-bold pb-1 transition-all relative ${
              currentTab === 'resources'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-neutral-muted hover:text-primary-green'
            }`}
          >
            Kaynaklar
          </button>
        </div>
      </div>

      {/* Settings, Notification & Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Dynamic age-group selection */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-muted">Grup Seviyesi:</span>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="text-xs font-bold bg-primary-green-light text-primary-green border-none rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-green cursor-pointer"
          >
            <option value="All">Tüm Gruplar</option>
            <option value="Başlangıç">Başlangıç (5-7 Yaş)</option>
            <option value="Orta">Orta (8-10 Yaş)</option>
            <option value="İleri">İleri (11-12 Yaş)</option>
          </select>
        </div>

        {/* Notifications Icon with Indicator */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full bg-neutral-bg hover:bg-primary-green-light text-neutral-muted hover:text-primary-green transition-colors relative"
            id="btn-notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-extrabold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Interactive Notifications Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-neutral-card rounded-2xl border border-primary-green-light shadow-xl overflow-hidden z-50">
              <div className="p-4 bg-primary-green-light border-b border-primary-green-light flex justify-between items-center">
                <span className="font-bold text-sm text-primary-green-dark">Son Başarılar & Aktivite</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[11px] font-bold text-primary-green hover:underline">
                    Okundu İşaretle
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-neutral-bg">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3.5 text-xs ${n.unread ? 'bg-primary-green-light/20' : ''} hover:bg-neutral-bg transition-colors`}>
                    <div className="flex gap-2">
                      <span className="text-sm">
                        {n.type === 'submission' && '🎙️'}
                        {n.type === 'achievement' && '👑'}
                        {n.type === 'system' && '🗓️'}
                      </span>
                      <div>
                        <p className="text-neutral-dark font-medium">{n.text}</p>
                        <span className="text-[10px] text-neutral-muted block mt-0.5">Az önce</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Gear Icon */}
        <button
          onClick={onOpenSettingsModal}
          className="p-2 rounded-full bg-neutral-bg hover:bg-primary-green-light text-neutral-muted hover:text-primary-green transition-colors"
          id="btn-settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Cute Child Avatar Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-primary-green-light/60">
          <div className="w-9 h-9 rounded-full ring-2 ring-primary-green ring-offset-2 overflow-hidden bg-neutral-bg relative flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
              alt="Educator Profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-neutral-dark leading-tight">Ustadha Amina</p>
            <span className="text-[10px] font-bold text-primary-green">Baş Eğitmen</span>
          </div>
        </div>
      </div>
    </header>
  );
}

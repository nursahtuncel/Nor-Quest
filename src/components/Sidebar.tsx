import React from 'react';
import { LayoutDashboard, Users, Calendar, Award, BookOpen, Sparkles, LogOut, HelpCircle, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenNewLessonModal: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  onOpenNewLessonModal,
  isMobileOpen,
  setIsMobileOpen
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
    { id: 'students', label: 'Öğrenciler', icon: Users },
    { id: 'planner', label: 'Planlayıcı', icon: Calendar },
    { id: 'assignments', label: 'Ödevler', icon: Award },
    { id: 'resources', label: 'Kaynaklar', icon: BookOpen },
    { id: 'support', label: 'Yapay Zeka', icon: Sparkles },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-neutral-card border-r border-primary-green-light select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-primary-green-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-green flex items-center justify-center text-white shadow-md shadow-primary-green/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-green-dark to-primary-green opacity-30" />
            <span className="text-xl font-bold font-serif text-accent-gold">🌙</span>
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans text-neutral-dark tracking-tight leading-none">Noor Quest</h1>
            <span className="text-xs font-semibold text-primary-green tracking-wide uppercase">Öğrenme Yolculuğu</span>
          </div>
        </div>

        {/* Tactile New Lesson Button */}
        <button
          onClick={() => {
            onOpenNewLessonModal();
            setIsMobileOpen(false);
          }}
          className="mt-6 w-full tactile-btn bg-primary-green text-white font-bold py-3 px-4 rounded-full text-sm flex items-center justify-center gap-2 hover:bg-primary-green-dark transition-colors cursor-pointer"
          id="btn-new-lesson"
        >
          <span className="text-lg">+</span> Yeni Ders
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-primary-green text-white shadow-sm'
                  : 'text-neutral-muted hover:bg-primary-green-light hover:text-primary-green'
              }`}
              id={`nav-item-${item.id}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-accent-gold' : ''}`} />
              {item.label}
              {item.id === 'support' && (
                <span className="ml-auto flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Support & Logout */}
      <div className="p-4 border-t border-primary-green-light bg-neutral-bg/50 space-y-1">
        <button
          onClick={() => handleTabClick('support')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-neutral-muted hover:bg-primary-green-light hover:text-primary-green transition-colors`}
          id="btn-sidebar-help"
        >
          <HelpCircle className="w-4 h-4" />
          Yardım ve Destek
        </button>
        <button
          onClick={() => alert('Noor Quest: Eğittiğiniz ve öğrendiğiniz için teşekkürler! Çevrimdışı oturum sonlandırılıyor.')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          id="btn-sidebar-logout"
        >
          <LogOut className="w-4 h-4" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-neutral-dark/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Slideout */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-neutral-card z-50 transition-transform duration-300 transform lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg bg-primary-green-light text-primary-green hover:bg-primary-green hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}

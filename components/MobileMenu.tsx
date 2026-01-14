import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  currentView: 'home' | 'list' | 'analytics';
  onNavigate: (view: 'home' | 'list' | 'analytics') => void;
}

export const MobileMenu = ({ isOpen, currentView, onNavigate }: MobileMenuProps) => {
  if (!isOpen) return null;

  const navItems = ['home', 'list', 'analytics'] as const;

  return (
    <div className="fixed inset-0 z-40 bg-cyber-black/95 backdrop-blur-2xl pt-24 px-6 md:hidden animate-fade-in">
       <div className="flex flex-col gap-4">
          {navItems.map((navItem) => (
            <button 
              key={navItem}
              onClick={() => onNavigate(navItem)}
              className={`p-5 rounded-xl text-lg font-display font-bold uppercase tracking-widest border transition-all flex justify-between items-center ${currentView === navItem ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-black/40 border-white/10 text-slate-400'}`}
            >
              {navItem}
              <ChevronRight size={16} className={currentView === navItem ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
       </div>
    </div>
  );
};
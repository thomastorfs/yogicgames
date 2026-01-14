import React from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'list' | 'analytics';
  onNavigate: (view: 'home' | 'list' | 'analytics') => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Header = ({ currentView, onNavigate, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const navItems = ['home', 'list', 'analytics'] as const;

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 bg-cyber-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-transform">
             <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-display font-black tracking-tight text-white group-hover:text-cyber-cyan transition-colors">
              YOGIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">GAMES</span>
            </span>
            <span className="text-[10px] font-mono text-cyber-cyan/70 tracking-widest uppercase">v1.0.4</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-black/40 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
          {navItems.map((navItem) => (
             <button 
              key={navItem}
              onClick={() => onNavigate(navItem)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currentView === navItem ? 'bg-white/10 text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {navItem}
            </button>
          ))}
        </nav>

        {/* Tools / Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400 hover:text-cyber-cyan transition-colors">
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>
    </header>
  );
};
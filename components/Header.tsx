import React from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { id: 'home', label: 'home', path: '/' },
    { id: 'list', label: 'database', path: '/database' },
    { id: 'analytics', label: 'analytics', path: '/analytics' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 bg-cyber-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-transform">
             <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-display font-black tracking-tight text-white group-hover:text-cyber-cyan transition-colors">
              YOGIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">GAMES</span>
            </span>
            <span className="text-[10px] font-mono text-cyber-cyan/70 tracking-widest uppercase">v1.0.0</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-black/40 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
          {navItems.map((item) => (
             <button 
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isActive(item.path) ? 'bg-white/10 text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {item.label}
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
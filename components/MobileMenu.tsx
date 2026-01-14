import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-40 bg-cyber-black/95 backdrop-blur-2xl pt-24 px-6 md:hidden animate-fade-in">
       <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`p-5 rounded-xl text-lg font-display font-bold uppercase tracking-widest border transition-all flex justify-between items-center ${isActive(item.path) ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-black/40 border-white/10 text-slate-400'}`}
            >
              {item.label}
              <ChevronRight size={16} className={isActive(item.path) ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
       </div>
    </div>
  );
};
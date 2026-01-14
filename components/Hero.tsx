import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  isDark: boolean;
}

export const Hero = ({ isDark }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden py-32 lg:py-48 flex items-center justify-center">
       {/* Abstract BG */}
       <div className="absolute inset-0 z-0">
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-20 ${isDark ? 'bg-gradient-to-tr from-cyan-600 to-purple-600' : 'bg-gradient-to-tr from-cyan-300 to-purple-300'}`}></div>
       </div>
       
       <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">            
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight mb-8 text-slate-900 dark:text-white leading-none">
            YOGIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">GAMES</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The Conscious Gaming Website. We quantify the spiritual impact of digital entertainment using ancient Eastern frameworks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button 
               onClick={() => navigate('/database')} 
               className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-3"
             >
               Access Database <ArrowRight size={20} />
             </button>
             
             <button 
               onClick={() => navigate('/analytics')} 
               className="px-8 py-4 bg-white/50 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl text-lg font-bold hover:bg-white/80 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-3"
             >
               View Metrics <Activity size={20} />
             </button>
          </div>
       </div>
    </div>
  );
};
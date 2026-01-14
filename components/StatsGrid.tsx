import React from 'react';
import { Brain, Zap, Flame, ArrowRight } from 'lucide-react';
import { GameAttributes } from '../types';

interface StatsGridProps {
  onAttributeSelect?: (attr: keyof GameAttributes) => void;
}

export const StatsGrid = ({ onAttributeSelect }: StatsGridProps) => {
  return (
    <div className="container mx-auto px-4 -mt-10 relative z-20 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sattva Card */}
            <div 
                onClick={() => onAttributeSelect?.('sattva')}
                className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:border-green-500/50 hover:bg-green-500/5 cursor-pointer transition-all duration-300 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex flex-col items-center h-full">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 dark:text-green-500 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <Brain size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Sattva (Clarity)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-300 mb-6">Games that promote focus, balance, and mental light.</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-green-500 transition-colors">
                        View Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                    </div>
                </div>
            </div>

            {/* Rajas Card */}
            <div 
                onClick={() => onAttributeSelect?.('rajas')}
                className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:border-yellow-500/50 hover:bg-yellow-500/5 cursor-pointer transition-all duration-300 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex flex-col items-center h-full">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-500 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Rajas (Passion)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-300 mb-6">High-energy stimulation, anxiety, and competitive stress.</p>
                    
                     <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-yellow-500 transition-colors">
                        View Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                    </div>
                </div>
            </div>

            {/* Tamas Card */}
            <div 
                onClick={() => onAttributeSelect?.('tamas')}
                className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:border-red-500/50 hover:bg-red-500/5 cursor-pointer transition-all duration-300 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex flex-col items-center h-full">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-600 dark:text-red-500 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        <Flame size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">Tamas (Inertia)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-300 mb-6">Dullness, addiction loops, and harmful subconscious patterns.</p>
                    
                     <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">
                        View Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};
import React, { useMemo } from 'react';
import { Game } from '../types';
import { ArrowUpRight, Trophy, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface TopBottomListsProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const TopBottomLists = ({ games, onSelectGame }: TopBottomListsProps) => {
  const { topGames, bottomGames } = useMemo(() => {
    // Sort descending by Yogic Score
    const sorted = [...games].sort((a, b) => b.yogicScore - a.yogicScore);
    
    // Top 5 Best
    const top = sorted.slice(0, 5);
    
    // Bottom 5 Worst (slice the end, then reverse so worst is first)
    const bottom = sorted.slice(-5).reverse(); 
    
    return { topGames: top, bottomGames: bottom };
  }, [games]);

  return (
    <div className="container mx-auto px-4 pb-24 relative z-10">
       <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 tracking-tight">THE TOP 5</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-red-500 mx-auto rounded-full"></div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Top 5 High Vibration */}
          <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-green-500/20 to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative h-full bg-cyber-black/80 backdrop-blur-xl border border-green-500/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                  {/* Header */}
                  <div className="p-8 border-b border-green-500/20 bg-green-500/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-20 bg-green-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                      <div className="relative z-10 flex justify-between items-start">
                          <div>
                              <div className="flex items-center gap-3 mb-2">
                                  <div className="p-2 bg-green-500/10 rounded-lg text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                      <TrendingUp size={20} />
                                  </div>
                                  <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Sattvic Dominance</span>
                              </div>
                              <h3 className="text-2xl font-display font-bold text-white">HIGHEST VIBRATION</h3>
                          </div>
                          <Trophy className="text-green-500" size={48} />
                      </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto max-h-[800px] scrollbar-hide p-2">
                      {topGames.map((game, i) => (
                          <div 
                            key={game.id}
                            onClick={() => onSelectGame(game)}
                            className="group/item flex items-center justify-between p-4 rounded-xl hover:bg-green-500/5 border border-transparent hover:border-green-500/20 cursor-pointer transition-all mb-1 last:mb-0"
                          >
                             <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-500 font-mono text-sm font-bold group-hover/item:bg-green-500 group-hover/item:text-black transition-colors shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                     {i + 1}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-200 group-hover/item:text-green-400 transition-colors line-clamp-1 text-lg">{game.title}</h4>
                                     <p className="text-[10px] uppercase tracking-wider text-slate-500">{game.platform.split(',')[0]}</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="text-right">
                                     <span className="block font-mono font-bold text-green-400 text-lg leading-none drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">+{game.yogicScore}</span>
                                     <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Score</span>
                                 </div>
                                 <ArrowUpRight size={16} className="text-slate-600 group-hover/item:text-green-400 transition-colors opacity-0 group-hover/item:opacity-100" />
                             </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Top 5 Low Vibration */}
          <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500/20 to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative h-full bg-cyber-black/80 backdrop-blur-xl border border-red-500/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                  {/* Header */}
                  <div className="p-8 border-b border-red-500/20 bg-red-500/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-20 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                      <div className="relative z-10 flex justify-between items-start">
                          <div>
                              <div className="flex items-center gap-3 mb-2">
                                  <div className="p-2 bg-red-500/10 rounded-lg text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                      <TrendingDown size={20} />
                                  </div>
                                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Tamasic Risks</span>
                              </div>
                              <h3 className="text-2xl font-display font-bold text-white">LOWEST VIBRATION</h3>
                          </div>
                          <AlertTriangle className="text-red-500" size={48} />
                      </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto max-h-[800px] scrollbar-hide p-2">
                      {bottomGames.map((game, i) => (
                          <div 
                            key={game.id}
                            onClick={() => onSelectGame(game)}
                            className="group/item flex items-center justify-between p-4 rounded-xl hover:bg-red-500/5 border border-transparent hover:border-red-500/20 cursor-pointer transition-all mb-1 last:mb-0"
                          >
                             <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500 font-mono text-sm font-bold group-hover/item:bg-red-500 group-hover/item:text-black transition-colors shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                     {i + 1}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-200 group-hover/item:text-red-400 transition-colors line-clamp-1 text-lg">{game.title}</h4>
                                     <p className="text-[10px] uppercase tracking-wider text-slate-500">{game.platform.split(',')[0]}</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="text-right">
                                     <span className="block font-mono font-bold text-red-500 text-lg leading-none drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">{game.yogicScore}</span>
                                     <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Score</span>
                                 </div>
                                 <ArrowUpRight size={16} className="text-slate-600 group-hover/item:text-red-400 transition-colors opacity-0 group-hover/item:opacity-100" />
                             </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

       </div>
    </div>
  );
};
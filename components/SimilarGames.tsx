import React, { useMemo } from 'react';
import { Game } from '../types';
import { ArrowRight, Monitor, Target } from 'lucide-react';

interface SimilarGamesProps {
  currentGame: Game;
  allGames: Game[];
  onSelectGame: (game: Game) => void;
}

export const SimilarGames = ({ currentGame, allGames, onSelectGame }: SimilarGamesProps) => {
  const similarGames = useMemo(() => {
    if (!allGames || allGames.length === 0) return [];
    
    // 1. Filter out current game
    const candidates = allGames.filter(g => g.id !== currentGame.id);

    // 2. Calculate Euclidean distance based on attribute vectors
    const withDistance = candidates.map(g => {
      let distance = 0;
      const attrs = Object.keys(currentGame.attributes) as (keyof typeof currentGame.attributes)[];
      
      attrs.forEach(attr => {
         const valA = currentGame.attributes[attr] || 0;
         const valB = g.attributes[attr] || 0;
         const diff = valA - valB;
         distance += diff * diff;
      });
      
      return { ...g, distance: Math.sqrt(distance) };
    });

    // 3. Sort by distance (asc) to find closest matches
    withDistance.sort((a, b) => a.distance - b.distance);

    // 4. Return top 3
    return withDistance.slice(0, 3);
  }, [currentGame, allGames]);

  if (similarGames.length === 0) return null;

  return (
    <div className="pt-12 border-t border-slate-200 dark:border-white/5">
        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-wide flex items-center gap-3">
             <Target className="text-cyber-purple" size={24} /> 
             SIMILAR GAMES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarGames.map(game => (
                <div 
                    key={game.id} 
                    onClick={() => {
                        onSelectGame(game);
                    }}
                    className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 rounded-2xl p-6 hover:border-cyber-purple/50 cursor-pointer transition-all group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(176,38,255,0.15)] relative overflow-hidden"
                >
                    {/* Decorative hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono text-slate-500 group-hover:text-cyber-purple transition-colors">#{game.rank.toString().padStart(3, '0')}</span>
                            <span className={`text-xs font-bold font-mono px-2 py-1 rounded border ${game.yogicScore > 0 ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-500'}`}>
                                {game.yogicScore > 0 ? '+' : ''}{game.yogicScore}
                            </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyber-purple transition-colors line-clamp-1">{game.title}</h4>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                            <Monitor size={12} />
                            <span className="truncate">{game.platform.split(',')[0]}</span>
                        </div>
                        
                        <div className="text-xs font-bold text-slate-400 group-hover:text-cyber-purple flex items-center gap-1 uppercase tracking-wider group-hover:gap-2 transition-all">
                            View Analysis <ArrowRight size={12} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
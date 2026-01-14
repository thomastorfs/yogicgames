import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Monitor, Users, ArrowUpRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Game } from '../types';
import { generateSlug } from '../utils';

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial state from URL
  const initialSearch = searchParams.get('q') || "";
  const initialSort = (searchParams.get('sort') as 'rank' | 'score' | 'name') || 'score';
  const initialTier = searchParams.get('tier');
  const initialPlatform = searchParams.get('platform');
  const initialRating = searchParams.get('rating');

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'name'>(initialSort);
  const [filters, setFilters] = useState<{
    tier: string | null;
    platform: string | null;
    rating: string | null;
  }>({
    tier: initialTier,
    platform: initialPlatform,
    rating: initialRating
  });

  // Sync state to URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchTerm) params.q = searchTerm;
    if (sortBy !== 'score') params.sort = sortBy;
    if (filters.tier) params.tier = filters.tier;
    if (filters.platform) params.platform = filters.platform;
    if (filters.rating) params.rating = filters.rating;
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, sortBy, filters, setSearchParams]);

  const toggleFilter = (type: 'tier' | 'platform' | 'rating', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const clearFilter = (type: 'tier' | 'platform' | 'rating') => {
    setFilters(prev => ({ ...prev, [type]: null }));
  };

  const clearAllFilters = () => {
    setFilters({ tier: null, platform: null, rating: null });
  };

  const filteredGames = useMemo(() => {
    let result = games.filter(g => {
      const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            g.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = filters.tier ? g.tier.includes(filters.tier) : true;
      const matchesPlatform = filters.platform ? g.platform.includes(filters.platform) : true;
      const matchesRating = filters.rating ? g.originalRating === filters.rating : true;
      return matchesSearch && matchesTier && matchesPlatform && matchesRating;
    });

    if (sortBy === 'rank') result.sort((a, b) => a.rank - b.rank);
    if (sortBy === 'score') result.sort((a, b) => b.yogicScore - a.yogicScore);
    if (sortBy === 'name') result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [games, searchTerm, sortBy, filters]);

  const getScoreColorClass = (score: number) => {
     if (score >= 20) return "text-cyber-green drop-shadow-[0_0_8px_rgba(10,255,96,0.3)]";
     if (score >= 0) return "text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]";
     return "text-cyber-red drop-shadow-[0_0_8px_rgba(255,42,42,0.3)]";
  };
  
  const getScoreBarClass = (score: number) => {
     if (score >= 20) return "bg-cyber-green shadow-[0_0_10px_#0aff60]";
     if (score >= 0) return "bg-cyber-cyan shadow-[0_0_10px_#00f0ff]";
     return "bg-cyber-red shadow-[0_0_10px_#ff2a2a]";
  };

  return (
    <div className="container mx-auto max-w-7xl animate-fade-in">
      
      {/* Control Bar - HUD Style - STICKY ENABLED */}
      <div className="mb-8 glass-panel rounded-lg p-1 border border-white/10 shadow-2xl sticky top-24 z-30 bg-cyber-black/90 backdrop-blur-xl transition-all">
          <div className="bg-black/40 rounded-md p-4 flex flex-col xl:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyber-cyan transition-colors" size={18} />
                  <input 
                      type="text" 
                      placeholder="SEARCH GAMES..." 
                      className="w-full bg-cyber-dark border border-white/10 rounded-md h-12 pl-12 pr-12 text-sm font-mono text-cyber-cyan placeholder:text-slate-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                   {['score', 'rank', 'name'].map((option) => (
                      <button
                          key={option}
                          onClick={() => setSortBy(option as any)}
                          className={`px-4 h-12 rounded-md text-xs font-bold uppercase tracking-widest border transition-all ${
                              sortBy === option 
                              ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                              : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                          }`}
                      >
                          {option}
                      </button>
                  ))}
                  {(filters.tier || filters.platform || filters.rating) && (
                      <button 
                          onClick={clearAllFilters}
                          className="px-4 h-12 rounded-md text-xs font-bold uppercase tracking-widest border border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 flex items-center gap-2"
                      >
                          CLEAR FILTERS <X size={14} />
                      </button>
                  )}
              </div>
          </div>

          {/* Active Filters */}
          {(filters.tier || filters.platform || filters.rating) && (
              <div className="flex flex-wrap gap-2 p-4 border-t border-white/5">
                  {filters.tier && <span onClick={() => clearFilter('tier')} className="cursor-pointer bg-cyber-purple/20 border border-cyber-purple/50 text-cyber-purple px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-2 hover:bg-cyber-purple/30">{filters.tier.split(" - ")[1]} <X size={12}/></span>}
                  {filters.platform && <span onClick={() => clearFilter('platform')} className="cursor-pointer bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyber-cyan px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-2 hover:bg-cyber-cyan/30">{filters.platform} <X size={12}/></span>}
                  {filters.rating && <span onClick={() => clearFilter('rating')} className="cursor-pointer bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-2 hover:bg-yellow-500/30">{filters.rating} <X size={12}/></span>}
              </div>
          )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
              <div 
                  key={game.id}
                  onClick={() => navigate(`/game/${generateSlug(game.title)}`)}
                  className="group relative glass-panel rounded-lg p-0 hover:border-cyber-cyan/50 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:-translate-y-1"
              >
                  {/* Decorative Status Bar */}
                  <div className={`h-1 w-full ${getScoreBarClass(game.yogicScore)} transition-all duration-500`}></div>
                  
                  <div className="p-6 flex flex-col h-full">
                      {/* Header: Rank & Tier */}
                      <div className="flex justify-between items-start mb-4">
                          <span className="font-mono text-xs text-slate-500 group-hover:text-cyber-cyan transition-colors">
                              #{game.rank.toString().padStart(3, '0')}
                          </span>
                           <span 
                              onClick={(e) => { e.stopPropagation(); toggleFilter('tier', game.tier); }}
                              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-2 py-1 rounded group-hover:border-cyber-purple/30 group-hover:text-cyber-purple transition-all cursor-pointer hover:bg-white/10"
                           >
                              {game.tier.split(" - ")[1]}
                          </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight group-hover:text-cyber-cyan transition-colors line-clamp-1">
                          {game.title}
                      </h3>

                      {/* Platform/Meta */}
                      <div className="flex flex-wrap gap-4 mb-6 mt-auto pt-4">
                           <div 
                              onClick={(e) => { e.stopPropagation(); toggleFilter('platform', game.platform.split(',')[0]); }}
                              className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-cyber-cyan transition-colors"
                           >
                              <Monitor size={12} className="text-slate-600 group-hover:text-cyber-cyan transition-colors"/>
                              {game.platform.split(',')[0]}
                           </div>
                           <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Users size={12} className="text-slate-600 group-hover:text-cyber-cyan transition-colors"/>
                              {game.activePlayers.split(' ')[0]}
                           </div>
                      </div>

                      {/* Footer: Score & Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors flex items-center gap-1">
                              View game <ArrowUpRight size={10}/>
                          </span>
                          
                          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded border border-white/5">
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Score</span>
                               <span className={`text-sm font-mono font-bold ${getScoreColorClass(game.yogicScore)}`}>
                                  {game.yogicScore > 0 ? '+' : ''}{game.yogicScore}
                               </span>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
import React, { useEffect, useMemo } from 'react';
import { ShieldAlert, Monitor, Users, Brain, AlertTriangle, ChevronLeft, ExternalLink, Gamepad2, Activity, Search, ArrowUpRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Game, GameAttributes } from '../types';
import { RadarDisplay } from './RadarDisplay';
import { ATTRIBUTE_DEFINITIONS, POSITIVE_ATTRS, NEGATIVE_ATTRS, generateSlug } from '../utils';
import { SimilarGames } from './SimilarGames';

// Wrapper to handle data fetching from slug
export const GameDetailWrapper = ({ games, isDark }: { games: Game[], isDark: boolean }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const game = useMemo(() => {
    if (!slug) return undefined;
    return games.find(g => generateSlug(g.title) === slug);
  }, [games, slug]);

  useEffect(() => {
    if (game) {
      document.title = `YogicGames // ${game.title}`;
    }
  }, [game]);

  if (!games.length) return null; // Loading state handled by parent usually, or flash empty
  if (!game) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
       <h2 className="text-2xl font-bold text-cyber-red mb-4">GAME NOT FOUND</h2>
       <button onClick={() => navigate('/database')} className="text-cyber-cyan hover:underline">Return to Database</button>
    </div>
  );

  return (
    <GameDetail 
      game={game} 
      games={games} 
      onClose={() => navigate('/database')}
      onSelectGame={(g) => navigate(`/game/${generateSlug(g.title)}`)}
      onAttributeSelect={(attr) => navigate(`/analytics?attr=${attr}`)}
      isDark={isDark}
    />
  );
};

export const GameDetail = ({ 
  game, 
  games, 
  onClose, 
  onSelectGame,
  onAttributeSelect,
  isDark 
}: { 
  game: Game, 
  games: Game[], 
  onClose: () => void, 
  onSelectGame: (g: Game) => void,
  onAttributeSelect: (attr: keyof GameAttributes) => void,
  isDark: boolean 
}) => {
  
  const getStoreDetails = () => {
    // 1. Steam (Exact Match)
    if (game.steamAppId) {
      return {
        label: "Steam Store",
        url: `https://store.steampowered.com/app/${game.steamAppId}`,
        color: "hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-500/10"
      };
    }
    
    const p = game.platform.toLowerCase();
    
    // 2. Nintendo
    if (p.includes("switch") || game.title.toLowerCase().includes("mario") || game.title.toLowerCase().includes("zelda") || game.title.toLowerCase().includes("pokémon")) {
      return {
        label: "Nintendo eShop",
        url: `https://www.nintendo.com/search/?q=${encodeURIComponent(game.title)}`,
        color: "hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10"
      };
    }
    
    // 3. PlayStation
    if (p.includes("playstation") || p === "ps" || p === "ps4" || p === "ps5") {
      return {
        label: "PlayStation Store",
        url: `https://store.playstation.com/en-us/search/${encodeURIComponent(game.title)}`,
        color: "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/10"
      };
    }
    
    // 4. Xbox
    if (p.includes("xbox")) {
      return {
        label: "Xbox Store",
        url: `https://www.xbox.com/en-US/search?q=${encodeURIComponent(game.title)}`,
        color: "hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/10"
      };
    }
    
    // 5. Mobile
    if (p.includes("mobile") || p.includes("android") || p.includes("ios")) {
       return {
        label: "App Store / Play",
        url: `https://play.google.com/store/search?c=apps&q=${encodeURIComponent(game.title)}`,
        color: "hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/10"
      };
    }

    // 6. Generic Fallback
    return {
      label: "Official Search",
      url: `https://www.google.com/search?q=${encodeURIComponent(game.title + " official game site")}`,
      color: "hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-500/10"
    };
  };

  const storeLink = getStoreDetails();
  const metacriticUrl = `https://www.metacritic.com/search/${encodeURIComponent(game.title)}`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(game.title + " review")}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Navigation Breadcrumb */}
      <button 
        onClick={onClose}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-bold text-sm uppercase tracking-wider"
      >
        <ChevronLeft size={16} /> Return to Database
      </button>

      {/* Header Card */}
      <div className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
         {/* Ambient Glow */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-500/10 to-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

         <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
               <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                     <span className="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold font-mono tracking-wider uppercase">
                       Rank #{game.rank.toString().padStart(3, '0')}
                     </span>
                     <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono tracking-wider uppercase border ${game.yogicScore > 0 ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'}`}>
                       Score: {game.yogicScore}
                     </span>
                     <span className="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold font-mono tracking-wider uppercase">
                       {game.tier.split(" - ")[1]}
                     </span>
                  </div>
                  <h1 className="text-4xl lg:text-7xl font-display font-black text-slate-900 dark:text-white leading-none">
                     {game.title}
                  </h1>
               </div>
               
               <div className="flex gap-4">
                  <div className="bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-white/5">
                      <Monitor className="text-cyan-500" size={20} />
                      <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{game.platform}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-white/5">
                      <Users className="text-cyan-500" size={20} />
                      <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{game.activePlayers}</span>
                  </div>
               </div>
            </div>

            <p className="text-xl lg:text-2xl font-light text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
               {game.description}
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
             {/* Critical Intel */}
             <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-8 flex gap-6 items-start">
                 <div className="bg-red-100 dark:bg-red-500/20 p-3 rounded-xl shrink-0 text-red-600 dark:text-red-400">
                     <ShieldAlert size={28} />
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2 uppercase tracking-wide">Critical Intel</h3>
                     <p className="text-red-700 dark:text-red-200/80 text-lg leading-relaxed italic">"{game.criticism}"</p>
                 </div>
             </div>

             {/* Attributes Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 rounded-2xl p-6">
                     <h3 className="text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                         <Brain size={18} /> Positive Vectors
                     </h3>
                     <div className="space-y-3">
                         {POSITIVE_ATTRS.map(key => (
                             <div 
                                key={key} 
                                onClick={() => onAttributeSelect(key)} 
                                className="cursor-pointer group relative p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                             >
                                 <div className="flex justify-between items-center text-sm mb-1">
                                     <span className="text-slate-600 dark:text-slate-400 group-hover:text-green-500 transition-colors font-medium flex items-center gap-2">
                                        {ATTRIBUTE_DEFINITIONS[key].label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                     </span>
                                     <span className="font-mono font-bold text-green-600 dark:text-green-500">{game.attributes[key]}</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-green-500" style={{width: `${game.attributes[key] * 20}%`}}></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 <div className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 rounded-2xl p-6">
                     <h3 className="text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                         <AlertTriangle size={18} /> Negative Vectors
                     </h3>
                     <div className="space-y-3">
                         {NEGATIVE_ATTRS.map(key => (
                             <div 
                                key={key} 
                                onClick={() => onAttributeSelect(key)} 
                                className="cursor-pointer group relative p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                             >
                                 <div className="flex justify-between items-center text-sm mb-1">
                                     <span className="text-slate-600 dark:text-slate-400 group-hover:text-red-500 transition-colors font-medium flex items-center gap-2">
                                        {ATTRIBUTE_DEFINITIONS[key].label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                     </span>
                                     <span className="font-mono font-bold text-red-600 dark:text-red-500">{game.attributes[key]}</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-red-500" style={{width: `${game.attributes[key] * 20}%`}}></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              {/* Radar Chart */}
              <div className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Attribute Matrix</h3>
                  <div className="h-64">
                      <RadarDisplay attributes={game.attributes} isDark={isDark} />
                  </div>
              </div>

              {/* Links */}
              <div className="bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-lg space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Network Uplinks</h3>
                  
                  <a href={storeLink.url} target="_blank" rel="noopener" className={`flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/5 transition-colors group ${storeLink.color}`}>
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300"><Gamepad2 size={16} /> {storeLink.label}</span>
                      <ExternalLink size={14} className="opacity-50" />
                  </a>
                  
                  <a href={metacriticUrl} target="_blank" rel="noopener" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 hover:border-yellow-200 dark:hover:border-yellow-500/20 transition-colors group">
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400"><Activity size={16} /> Metacritic</span>
                      <ExternalLink size={14} className="opacity-50" />
                  </a>

                  <a href={googleUrl} target="_blank" rel="noopener" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors group">
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"><Search size={16} /> Analysis Search</span>
                      <ExternalLink size={14} className="opacity-50" />
                  </a>
              </div>
          </div>
      </div>

      {/* Similar Games Section */}
      <SimilarGames currentGame={game} allGames={games} onSelectGame={onSelectGame} />

    </div>
  );
};
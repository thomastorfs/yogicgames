import React, { useState, useEffect } from 'react';
import { Game, GameAttributes } from './types';
import { loadData } from './data';
import { GameDetail } from './components/GameDetail';
import { Home } from './components/Home';
import { GameList } from './components/GameList';
import { Analytics } from './components/Analytics';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';

export const App = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [view, setView] = useState<'home' | 'list' | 'analytics'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // State to track navigation to specific analytics attribute
  const [targetAttribute, setTargetAttribute] = useState<keyof GameAttributes | null>(null);
  
  // Theme State - Default to dark for neon aesthetic
  const [isDark, setIsDark] = useState(true);
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const data = loadData();
    setGames(data);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false); // Close mobile menu on view change
  }, [view, selectedGame]);

  const handleNavClick = (newView: 'home' | 'list' | 'analytics') => {
    setView(newView);
    setSelectedGame(null);
    if (newView !== 'analytics') {
      setTargetAttribute(null);
    }
  };

  const handleAttributeSelect = (attr: keyof GameAttributes) => {
    setTargetAttribute(attr);
    setSelectedGame(null); // Close game detail if open
    setView('analytics');
  };

  return (
    <div className="dark min-h-screen bg-cyber-black text-slate-200 font-sans selection:bg-cyber-cyan selection:text-black">
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyber-purple/10 to-transparent pointer-events-none z-0"></div>

      {/* Header */}
      <Header 
        currentView={view} 
        onNavigate={handleNavClick as any} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Mobile Navigation Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        currentView={view} 
        onNavigate={handleNavClick as any} 
      />

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-20 px-4 md:px-6">
        
        {selectedGame ? (
          <GameDetail 
            game={selectedGame} 
            games={games}
            onClose={() => handleNavClick('list')}
            onSelectGame={setSelectedGame}
            onAttributeSelect={handleAttributeSelect}
            isDark={isDark}
          />
        ) : (
          <>
            {view === 'home' && (
              <Home 
                games={games}
                onNavigate={handleNavClick as any} 
                onSelectGame={setSelectedGame}
                isDark={isDark} 
                onAttributeSelect={handleAttributeSelect}
              />
            )}

            {view === 'list' && (
              <GameList games={games} onSelectGame={setSelectedGame} />
            )}

            {view === 'analytics' && (
              <Analytics 
                games={games} 
                onSelectGame={setSelectedGame} 
                targetAttribute={targetAttribute}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};
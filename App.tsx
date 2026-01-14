import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Game } from './types';
import { loadData } from './data';
import { GameDetailWrapper } from './components/GameDetail';
import { Home } from './components/Home';
import { GameList } from './components/GameList';
import { Analytics } from './components/Analytics';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Skip scrolling to top if navigating to analytics with an attribute parameter
    // Let AttributeExplorer handle the scroll to the chart
    if (pathname === '/analytics' && new URLSearchParams(search).has('attr')) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
};

export const App = () => {
  const [games, setGames] = useState<Game[]>([]);
  const location = useLocation();
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const data = loadData();
    setGames(data);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  // Update Document Title based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') document.title = 'YogicGames // Home';
    else if (path.includes('/database')) document.title = 'YogicGames // Database';
    else if (path.includes('/analytics')) document.title = 'YogicGames // Analytics';
    // Game detail title is handled within GameDetailWrapper
  }, [location.pathname]);

  return (
    <div className="dark min-h-screen bg-cyber-black text-slate-200 font-sans selection:bg-cyber-cyan selection:text-black">
      <ScrollToTop />
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyber-purple/10 to-transparent pointer-events-none z-0"></div>

      {/* Header */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Mobile Navigation Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
      />

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-20 px-4 md:px-6">
        <Routes>
          <Route path="/" element={<Home games={games} isDark={true} />} />
          <Route path="/database" element={<GameList games={games} />} />
          <Route path="/analytics" element={<Analytics games={games} />} />
          <Route path="/game/:slug" element={<GameDetailWrapper games={games} isDark={true} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};
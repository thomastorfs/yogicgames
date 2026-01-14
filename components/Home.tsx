import React from 'react';
import { Game, GameAttributes } from '../types';
import { Hero } from './Hero';
import { StatsGrid } from './StatsGrid';
import { Methodology } from './Methodology';
import { TopBottomLists } from './TopBottomLists';

interface HomeProps {
  games: Game[];
  onNavigate: (view: 'list' | 'analytics') => void;
  onSelectGame: (game: Game) => void;
  isDark: boolean;
  onAttributeSelect: (attr: keyof GameAttributes) => void;
}

export const Home = ({ games, onNavigate, onSelectGame, isDark, onAttributeSelect }: HomeProps) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero onNavigate={onNavigate} isDark={isDark} />
      <StatsGrid onAttributeSelect={onAttributeSelect} />
      <TopBottomLists games={games} onSelectGame={onSelectGame} />
      <Methodology onAttributeSelect={onAttributeSelect} />
    </div>
  );
};
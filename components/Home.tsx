import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Game, GameAttributes } from '../types';
import { Hero } from './Hero';
import { StatsGrid } from './StatsGrid';
import { Methodology } from './Methodology';
import { TopBottomLists } from './TopBottomLists';

interface HomeProps {
  games: Game[];
  isDark: boolean;
}

export const Home = ({ games, isDark }: HomeProps) => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500">
      <Hero isDark={isDark} />
      <StatsGrid onAttributeSelect={(attr) => navigate(`/analytics?attr=${attr}`)} />
      <TopBottomLists games={games} onSelectGame={(g) => navigate(`/game/${g.id}`)} />
      <Methodology onAttributeSelect={(attr) => navigate(`/analytics?attr=${attr}`)} />
    </div>
  );
};
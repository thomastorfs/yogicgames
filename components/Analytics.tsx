import React from 'react';
import { Game, GameAttributes } from '../types';
import { CorrelationMatrix } from './CorrelationMatrix';
import { AttributeExplorer } from './AttributeExplorer';

interface AnalyticsProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  targetAttribute?: keyof GameAttributes | null;
}

export const Analytics = ({ games, onSelectGame, targetAttribute }: AnalyticsProps) => {
  return (
    <div className="container mx-auto max-w-7xl animate-fade-in space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Correlation Chart */}
          <div className="lg:col-span-3">
            <CorrelationMatrix games={games} />
          </div>

          {/* Attribute Explorer */}
          <div className="lg:col-span-3">
             <AttributeExplorer games={games} onSelectGame={onSelectGame} targetAttribute={targetAttribute} />
          </div>
      </div>
    </div>
  );
};
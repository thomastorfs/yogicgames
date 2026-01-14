import React from 'react';
import { Game } from '../types';
import { CorrelationMatrix } from './CorrelationMatrix';
import { AttributeExplorer } from './AttributeExplorer';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '../utils';

interface AnalyticsProps {
  games: Game[];
}

export const Analytics = ({ games }: AnalyticsProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-7xl animate-fade-in space-y-8 scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Correlation Chart */}
          <div className="lg:col-span-3">
            <CorrelationMatrix games={games} />
          </div>

          {/* Attribute Explorer */}
          <div className="lg:col-span-3">
             <AttributeExplorer 
               games={games} 
               onSelectGame={(g) => navigate(`/game/${generateSlug(g.title)}`)} 
             />
          </div>
      </div>
    </div>
  );
};
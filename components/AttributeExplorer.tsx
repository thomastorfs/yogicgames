import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { Game, GameAttributes } from '../types';
import { ATTRIBUTE_DEFINITIONS, POSITIVE_ATTRS, NEGATIVE_ATTRS } from '../utils';

interface AttributeExplorerProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const AttributeExplorer = ({ games, onSelectGame }: AttributeExplorerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetAttribute = searchParams.get('attr') as keyof GameAttributes | null;
  const [activeAttr, setActiveAttr] = useState<keyof GameAttributes>(targetAttribute || 'sattva');
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Compute active attribute data
  const activeAttrData = useMemo(() => {
    const sorted = [...games]
      .sort((a, b) => {
        const valDiff = b.attributes[activeAttr] - a.attributes[activeAttr];
        if (valDiff !== 0) return valDiff;
        return b.yogicScore - a.yogicScore;
      })
      .slice(0, 20);

    return sorted.map(g => ({
      name: g.title,
      value: g.attributes[activeAttr],
      score: g.yogicScore,
      originalGame: g
    }));
  }, [games, activeAttr]);

  // Handle URL updates (when navigating from home page or game detail page)
  useEffect(() => {
    if (targetAttribute && targetAttribute !== activeAttr) {
      setActiveAttr(targetAttribute);
    }
  }, [targetAttribute]);

  // Scroll to chart after data is rendered
  useEffect(() => {
    if (targetAttribute && activeAttrData.length > 0) {
      setTimeout(() => {
        chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeAttrData, targetAttribute]);

  const handleAttrClick = (attr: keyof GameAttributes) => {
    setActiveAttr(attr);
    setSearchParams({ attr }); // Update URL
    
    // Scroll to the chart view to show results
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const isPositiveAttr = POSITIVE_ATTRS.includes(activeAttr);
  const activeColor = isPositiveAttr ? "#0aff60" : "#ff2a2a"; // Neon Green : Neon Red
  const activeTitle = ATTRIBUTE_DEFINITIONS[activeAttr].label;
  const activeDesc = ATTRIBUTE_DEFINITIONS[activeAttr].description;

  // Custom Y-Axis Tick to make titles clickable
  const CustomYAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#94a3b8" // slate-400
          className="font-sans text-xs font-bold cursor-pointer hover:fill-cyber-cyan transition-colors"
          onClick={() => {
            const game = activeAttrData.find(d => d.name === payload.value)?.originalGame;
            if (game) onSelectGame(game);
          }}
        >
          {payload.value.length > 20 ? `${payload.value.substring(0, 20)}...` : payload.value}
        </text>
      </g>
    );
  };

  return (
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-panel rounded-2xl p-8 border border-white/10 scroll-mt-32">
           <div className="lg:col-span-3 space-y-6">
              <div>
                 <h4 className="text-xs font-mono font-bold text-cyber-green uppercase tracking-widest mb-3 glow-text">POSITIVE_DRIVERS</h4>
                 <div className="space-y-1">
                   {POSITIVE_ATTRS.map(attr => (
                     <button 
                       key={attr}
                       onClick={() => handleAttrClick(attr)}
                       className={`w-full text-left text-xs font-bold py-2 px-3 rounded-sm transition-all flex justify-between items-center border ${activeAttr === attr ? 'bg-cyber-green/10 border-cyber-green text-cyber-green' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                     >
                       {ATTRIBUTE_DEFINITIONS[attr].label.split(" (")[0]}
                     </button>
                   ))}
                 </div>
              </div>
              <div>
                 <h4 className="text-xs font-mono font-bold text-cyber-red uppercase tracking-widest mb-3 glow-text">NEGATIVE_DRIVERS</h4>
                 <div className="space-y-1">
                   {NEGATIVE_ATTRS.map(attr => (
                     <button 
                       key={attr}
                       onClick={() => handleAttrClick(attr)}
                       className={`w-full text-left text-xs font-bold py-2 px-3 rounded-sm transition-all flex justify-between items-center border ${activeAttr === attr ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                     >
                       {ATTRIBUTE_DEFINITIONS[attr].label.split(" (")[0]}
                     </button>
                   ))}
                 </div>
              </div>
           </div>

           <div ref={chartRef} className="lg:col-span-9 flex flex-col h-[1000px] scroll-mt-28">
              <div className="mb-6 pb-6 border-b border-white/10">
                  <h3 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-wide">Top 20 for {activeTitle}</h3>
                  <p className="text-cyber-cyan/70 font-mono text-sm">{activeDesc}</p>
              </div>
              <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={activeAttrData} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                       <XAxis type="number" domain={[0, 5]} hide />
                       <YAxis 
                         dataKey="name" 
                         type="category" 
                         width={140} 
                         tick={<CustomYAxisTick />}
                         interval={0}
                       />
                       <RechartsTooltip 
                         contentStyle={{ backgroundColor: '#030507', borderColor: '#333', borderRadius: '4px' }}
                         cursor={{fill: '#333', opacity: 0.4}}
                       />
                       <Bar 
                          dataKey="value" 
                          fill={activeColor} 
                          radius={[0, 2, 2, 0]} 
                          barSize={16} 
                          label={{ position: 'right', fill: '#fff', fontSize: 12, fontWeight: 'bold' }}
                          className="cursor-pointer hover:opacity-80"
                          onClick={(data: any) => {
                            const game = data?.payload?.originalGame || data?.originalGame;
                            if (game) {
                              onSelectGame(game);
                            }
                          }}
                       />
                     </BarChart>
                   </ResponsiveContainer>
              </div>
           </div>
      </div>
  );
};
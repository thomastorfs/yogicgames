import React, { useMemo } from 'react';
import { 
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  Scatter, ReferenceArea, ReferenceLine
} from 'recharts';
import { Activity } from 'lucide-react';
import { Game } from '../types';

interface CorrelationMatrixProps {
  games: Game[];
}

export const CorrelationMatrix = ({ games }: CorrelationMatrixProps) => {
  // Chart Data
  const scatterChartData = useMemo(() => {
    const sorted = [...games].sort((a, b) => a.rank - b.rank);
    const n = sorted.length;
    if (n === 0) return [];
    
    // Regression Calculation: Rank (Y) on YogicScore (X)
    const sumX = sorted.reduce((acc, g) => acc + g.yogicScore, 0);
    const sumY = sorted.reduce((acc, g) => acc + g.rank, 0);
    const sumXY = sorted.reduce((acc, g) => acc + (g.yogicScore * g.rank), 0);
    const sumXX = sorted.reduce((acc, g) => acc + (g.yogicScore * g.yogicScore), 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return sorted.map(g => ({
        ...g,
        trendLine: Number((slope * g.yogicScore + intercept).toFixed(2))
    }));
  }, [games]);

  return (
      <div className="glass-panel rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
             <Activity className="text-cyber-purple" size={24}/>
             <h3 className="text-xl font-display font-bold text-white tracking-wider">MARKET CORRELATION MATRIX</h3>
          </div>
          <div className="h-[500px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={scatterChartData} margin={{ top: 20, right: 30, bottom: 40, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                
                {/* Quadrant Backgrounds */}
                <ReferenceArea x1={-50} x2={0} y1={1} y2={50} fill="#ff2a2a" fillOpacity={0.03} strokeOpacity={0} label={{ value: "POPULAR & TOXIC", position: 'insideTopLeft', fill: '#ff2a2a', fontSize: 10, fontWeight: 800, opacity: 0.5 }} />
                <ReferenceArea x1={0} x2={50} y1={1} y2={50} fill="#0aff60" fillOpacity={0.03} strokeOpacity={0} label={{ value: "CONSCIOUS HITS", position: 'insideTopRight', fill: '#0aff60', fontSize: 10, fontWeight: 800, opacity: 0.5 }} />
                <ReferenceArea x1={-50} x2={0} y1={50} y2={100} fill="#ff2a2a" fillOpacity={0.01} strokeOpacity={0} label={{ value: "NICHE RISKS", position: 'insideBottomLeft', fill: '#ff2a2a', fontSize: 10, fontWeight: 800, opacity: 0.3 }} />
                <ReferenceArea x1={0} x2={50} y1={50} y2={100} fill="#0aff60" fillOpacity={0.01} strokeOpacity={0} label={{ value: "HIDDEN GEMS", position: 'insideBottomRight', fill: '#0aff60', fontSize: 10, fontWeight: 800, opacity: 0.3 }} />
                
                <ReferenceLine x={0} stroke="#666" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="#666" strokeDasharray="3 3" />

                <XAxis 
                  type="number" 
                  dataKey="yogicScore" 
                  name="Score" 
                  stroke="#94a3b8" 
                  tick={{fontSize: 12, fontFamily: 'Rajdhani'}} 
                  domain={[-30, 30]} 
                  label={{ value: 'SPIRITUAL VALUE (Yogic Score)', position: 'bottom', fill: '#94a3b8', offset: 0, fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="rank" 
                  name="Rank" 
                  stroke="#94a3b8" 
                  reversed 
                  tick={{fontSize: 12, fontFamily: 'Rajdhani'}}
                  domain={[1, 100]}
                  label={{ value: 'MARKET SUCCESS (Rank 1-100)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                
                <RechartsTooltip 
                   cursor={{ strokeDasharray: '3 3' }} 
                   content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                              <div className="bg-cyber-black/90 backdrop-blur-xl border border-white/20 p-4 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] min-w-[200px]">
                                  <p className="font-display font-bold text-white mb-2 text-lg">{data.title}</p>
                                  <div className="space-y-2 text-sm font-mono">
                                      <div className="flex justify-between border-b border-white/10 pb-1">
                                          <span className="text-slate-400">Success Rank</span>
                                          <span className="text-cyber-cyan font-bold">#{data.rank}</span>
                                      </div>
                                      <div className="flex justify-between pt-1">
                                          <span className="text-slate-400">Yogic Score</span>
                                          <span className={data.yogicScore > 0 ? "text-cyber-green font-bold" : "text-cyber-red font-bold"}>
                                              {data.yogicScore > 0 ? '+' : ''}{data.yogicScore}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          );
                      }
                      return null;
                  }}
                />
                <Scatter name="Games" dataKey="rank" fill="#b026ff" shape="circle" fillOpacity={0.6} />
                <Line type="monotone" dataKey="trendLine" name="Trend" stroke="#00f0ff" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
      </div>
  );
};
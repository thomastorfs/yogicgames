import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { GameAttributes } from '../types';

export const RadarDisplay = ({ attributes, isDark = true }: { attributes: GameAttributes, isDark?: boolean }) => {
  const data = [
    { subject: 'Sattva', A: attributes.sattva, fullMark: 5 },
    { subject: 'Rajas', A: attributes.rajas, fullMark: 5 },
    { subject: 'Tamas', A: attributes.tamas, fullMark: 5 },
    { subject: 'Focus', A: attributes.ekagrata, fullMark: 5 },
    { subject: 'Viol.', A: attributes.ahimsaViolation, fullMark: 5 },
    { subject: 'Addict.', A: attributes.addictionPotential, fullMark: 5 },
  ];

  const gridColor = isDark ? "#334155" : "#cbd5e1";
  const textColor = isDark ? "#38bdf8" : "#0f172a";
  const strokeColor = isDark ? "#0ea5e9" : "#0284c7";
  const fillColor = isDark ? "#0ea5e9" : "#0ea5e9";

  return (
    <div className="h-72 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis 
            dataKey="subject" 
            // INCREASED: fontSize 14 -> 16
            tick={{ fill: textColor, fontSize: 16, fontFamily: 'Orbitron', fontWeight: 'bold' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
          <Radar 
            name="Attributes" 
            dataKey="A" 
            stroke={strokeColor} 
            strokeWidth={3}
            fill={fillColor} 
            fillOpacity={isDark ? 0.3 : 0.5} 
          />
        </RadarChart>
      </ResponsiveContainer>
      {/* Center glowing dot effect */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isDark ? 'bg-cyan-400 text-cyan-400' : 'bg-cyan-600 text-cyan-600'}`}></div>
    </div>
  );
};
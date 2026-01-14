import React from 'react';
import { Brain, ShieldAlert, Scale, Zap, Minus, Equal } from 'lucide-react';
import { ATTRIBUTE_DEFINITIONS, POSITIVE_ATTRS, NEGATIVE_ATTRS } from '../utils';
import { GameAttributes } from '../types';

const MULTIPLIERS: Record<string, string> = {
  sattva: "x3.0",
  vairagya: "x2.0",
  viveka: "x2.0",
  ekagrata: "x1.5",
  santosha: "x1.5",
  frustrationTolerance: "x1.0",
  impulseControl: "x1.0",
  egoConfrontation: "x1.5",
  sanga: "x2.0",
  rajas: "x0.5",
  tamas: "x2.5",
  addictionPotential: "x2.0",
  timeWasting: "x1.5",
  dissociation: "x1.0",
  samskaraFormation: "x4.0",
  ahimsaViolation: "x3.0",
  pratyaharaDisturbance: "x2.0",
  sankalpaUndermining: "x2.5"
};

interface MethodologyProps {
  onAttributeSelect?: (attr: keyof GameAttributes) => void;
}

export const Methodology = ({ onAttributeSelect }: MethodologyProps) => {
  return (
    <div className="container mx-auto px-4 pb-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">HOW IS IT CALCULATED?</h2>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
                We quantify the spiritual nutritional value of digital experiences. 
                Every game is analyzed against 18 discrete psychological drivers, weighted by their impact on consciousness.
            </p>
        </div>

        {/* The Equation Visual */}
        <div className="mb-20">
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                {/* Background Noise/Grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative z-10">
                    {/* Positives */}
                    <div className="text-center group w-full md:w-auto">
                        <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-2xl border border-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <Brain className="text-green-500" size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-1">Sattvic Inputs</h3>
                        <p className="text-sm font-mono text-green-500">Accumulated Merits</p>
                    </div>

                    {/* Operator */}
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-white/5 items-center justify-center border border-white/10">
                        <Minus className="text-slate-400" size={24} />
                    </div>

                    {/* Negatives */}
                    <div className="text-center group w-full md:w-auto">
                        <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-2xl border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                            <ShieldAlert className="text-red-500" size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-1">Tamasic Loads</h3>
                        <p className="text-sm font-mono text-red-500">Psychological Weight</p>
                    </div>

                    {/* Operator */}
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-white/5 items-center justify-center border border-white/10">
                        <Equal className="text-slate-400" size={24} />
                    </div>

                    {/* Result */}
                    <div className="text-center group w-full md:w-auto">
                        <div className="w-20 h-20 mx-auto bg-cyan-500/10 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                            <Zap className="text-cyan-500" size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-1">Yogic Score</h3>
                        <p className="text-sm font-mono text-cyan-500">Net Consciousness</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Detailed Vectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Positive Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4 border-b border-green-500/20 pb-4 sticky top-20 bg-cyber-black/95 backdrop-blur-xl z-20 py-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                    <div className="p-2 bg-green-500/10 rounded-lg shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        <Brain className="text-green-500" size={20} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                        POSITIVE VECTORS <span className="text-green-500 text-sm ml-2 font-mono tracking-normal opacity-70">/ BUFFS</span>
                    </h3>
                </div>

                <div className="grid gap-4">
                    {POSITIVE_ATTRS.map(attr => (
                        <div 
                            key={attr} 
                            onClick={() => onAttributeSelect?.(attr)}
                            className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 relative overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 p-24 bg-green-500/5 rounded-full blur-3xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            
                            <div className="flex justify-between items-start gap-4 relative z-10">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-200 group-hover:text-green-400 transition-colors mb-1 font-display">
                                        {ATTRIBUTE_DEFINITIONS[attr].label}
                                    </h4>
                                    <p className="text-sm text-slate-500 group-hover:text-slate-300 leading-relaxed">
                                        {ATTRIBUTE_DEFINITIONS[attr].description}
                                    </p>
                                </div>
                                <span className="shrink-0 px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-xs font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                    {MULTIPLIERS[attr]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Negative Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4 border-b border-red-500/20 pb-4 sticky top-20 bg-cyber-black/95 backdrop-blur-xl z-20 py-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                     <div className="p-2 bg-red-500/10 rounded-lg shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                        <ShieldAlert className="text-red-500" size={20} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                        NEGATIVE VECTORS <span className="text-red-500 text-sm ml-2 font-mono tracking-normal opacity-70">/ DEBUFFS</span>
                    </h3>
                </div>

                <div className="grid gap-4">
                    {NEGATIVE_ATTRS.map(attr => (
                        <div 
                            key={attr} 
                            onClick={() => onAttributeSelect?.(attr)}
                            className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 relative overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 p-24 bg-red-500/5 rounded-full blur-3xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            
                            <div className="flex justify-between items-start gap-4 relative z-10">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-200 group-hover:text-red-400 transition-colors mb-1 font-display">
                                        {ATTRIBUTE_DEFINITIONS[attr].label}
                                    </h4>
                                    <p className="text-sm text-slate-500 group-hover:text-slate-300 leading-relaxed">
                                        {ATTRIBUTE_DEFINITIONS[attr].description}
                                    </p>
                                </div>
                                <span className="shrink-0 px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-xs font-bold shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                    {MULTIPLIERS[attr]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
};
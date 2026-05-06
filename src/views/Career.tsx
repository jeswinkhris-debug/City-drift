import React from 'react';
import { motion } from 'motion/react';
import { Play, MapPin, Trophy, Clock, ChevronRight } from 'lucide-react';
import { useGame } from '../GameContext';
import { TRACKS } from '../data/gameData';

interface CareerProps {
  onSelectTrack: (track: any) => void;
}

export default function Career({ onSelectTrack }: CareerProps) {
  const { profile } = useGame();
  
  if (!profile) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header>
        <p className="text-[#F27D26] font-mono text-sm uppercase tracking-widest mb-1">Race Events</p>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">PROFESSIONAL CAREER</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRACKS.map(track => (
          <div key={track.id} className="bg-[#111] rounded-[40px] border border-white/5 overflow-hidden group hover:border-[#F27D26]/30 transition-all">
            <div className="aspect-video bg-white/5 relative flex items-center justify-center overflow-hidden">
               <MapPin className="w-24 h-24 text-white/5 group-hover:scale-110 group-hover:text-[#F27D26]/10 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
               <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                     <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest ${
                       track.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                       track.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                       'bg-red-500/20 text-red-400'
                     }`}>
                       {track.difficulty}
                     </span>
                     <h3 className="text-3xl font-black uppercase italic mt-2">{track.name}</h3>
                  </div>
               </div>
            </div>

            <div className="p-10 space-y-8">
              <p className="text-gray-500 font-mono text-sm leading-relaxed">{track.description}</p>
              
              <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-6">
                 <div>
                    <p className="text-[10px] text-gray-600 font-mono uppercase">Length</p>
                    <p className="text-lg font-bold font-mono">{track.length}m</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-gray-600 font-mono uppercase">Checkpoints</p>
                    <p className="text-lg font-bold font-mono">{track.checkpoints}</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-gray-600 font-mono uppercase">Prize Pot</p>
                    <p className="text-lg font-bold font-mono text-[#F27D26]">${track.reward}</p>
                 </div>
              </div>

              <button
                onClick={() => onSelectTrack(track)}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#F27D26] hover:text-white transition-all transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                ENTER RACE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

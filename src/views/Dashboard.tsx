import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Car as CarIcon, 
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useGame } from '../GameContext';
import { CARS } from '../data/gameData';

export default function Dashboard() {
  const { profile } = useGame();
  
  if (!profile) return null;

  const currentCar = CARS.find(c => c.id === profile.currentCarId);
  const totalCars = Object.keys(profile.ownedCars).length;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-[#F27D26] font-mono text-sm uppercase tracking-widest mb-1">Welcome back, Driver</p>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">STATUS REPORT</h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
             <p className="text-gray-500 text-xs font-mono uppercase mb-1">Career Rating</p>
             <p className="text-2xl font-black font-mono">#{profile.totalWins + 1}</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="relative z-10">
            <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
            <p className="text-sm font-mono text-gray-500 uppercase">Total Victories</p>
            <p className="text-4xl font-black font-mono mt-2">{profile.totalWins}</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-yellow-500/20 transition-all"></div>
        </div>

        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="relative z-10">
            <CarIcon className="w-8 h-8 text-blue-500 mb-4" />
            <p className="text-sm font-mono text-gray-500 uppercase">Cars Collection</p>
            <p className="text-4xl font-black font-mono mt-2">{totalCars}<span className="text-sm text-gray-600">/50</span></p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>
        </div>

        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="relative z-10">
            <TrendingUp className="w-8 h-8 text-[#F27D26] mb-4" />
            <p className="text-sm font-mono text-gray-500 uppercase">Current Wealth</p>
            <p className="text-4xl font-black font-mono mt-2">${profile.money.toLocaleString()}</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F27D26]/10 blur-3xl -mr-16 -mt-16 group-hover:bg-[#F27D26]/20 transition-all"></div>
        </div>
      </div>

      {/* Current Ride */}
      <div className="bg-gradient-to-br from-[#151515] to-[#0A0A0A] rounded-[40px] border border-white/10 p-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-[#F27D26] font-mono text-sm uppercase tracking-widest mb-2">Selected Ride</p>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{currentCar?.name}</h3>
            <p className="text-gray-500 font-mono mt-2">{currentCar?.category} Class</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                  <span>Speed</span>
                  <span>{currentCar?.baseStats.topSpeed}%</span>
               </div>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${currentCar?.baseStats.topSpeed}%` }}
                   className="h-full bg-white" 
                 />
               </div>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                  <span>Handling</span>
                  <span>{currentCar?.baseStats.handling}%</span>
               </div>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${currentCar?.baseStats.handling}%` }}
                   className="h-full bg-white" 
                 />
               </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 aspect-video bg-white/5 rounded-3xl flex items-center justify-center p-8 relative group">
           <CarIcon className="w-48 h-48 text-white/10 group-hover:text-[#F27D26]/20 transition-all scale-110 group-hover:scale-125 duration-700" />
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10vw] font-black opacity-5 uppercase tracking-tighter select-none">VELOCITY</span>
           </div>
        </div>
      </div>
    </div>
  );
}

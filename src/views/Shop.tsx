import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Gauge, Briefcase, Trophy, Zap } from 'lucide-react';
import { useGame } from '../GameContext';
import { CARS } from '../data/gameData';

export default function Shop() {
  const { profile, buyCar } = useGame();
  
  if (!profile) return null;

  const categories = ['Starter', 'Street', 'Muscle', 'Super', 'Hyper'];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header>
        <p className="text-[#F27D26] font-mono text-sm uppercase tracking-widest mb-1">Vehicle Dealership</p>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">THE SHOWROOM</h1>
      </header>

      {categories.map(cat => (
        <section key={cat} className="space-y-6">
          <div className="flex items-center gap-4">
             <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">{cat} Series</h2>
             <div className="flex-1 h-px bg-white/5"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARS.filter(c => c.category === cat).map(car => {
              const isOwned = !!profile.ownedCars[car.id];
              const canAfford = profile.money >= car.price;

              return (
                <div key={car.id} className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden group">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="text-xl font-bold uppercase">{car.name}</h3>
                          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">${car.price.toLocaleString()}</p>
                       </div>
                       {isOwned && (
                         <span className="bg-green-500/20 text-green-400 text-[10px] font-mono px-2 py-1 rounded uppercase tracking-widest">Owned</span>
                       )}
                    </div>

                    <div className="space-y-3">
                       <StatBar label="Speed" value={car.baseStats.topSpeed} />
                       <StatBar label="Accel" value={car.baseStats.acceleration} />
                       <StatBar label="Handling" value={car.baseStats.handling} />
                    </div>

                    <button
                      disabled={isOwned || !canAfford}
                      onClick={() => buyCar(car)}
                      className={`w-full py-4 rounded-2xl font-mono text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                        isOwned 
                          ? 'bg-white/5' 
                          : canAfford 
                            ? 'bg-white text-black hover:bg-[#F27D26] hover:text-white' 
                            : 'bg-red-500/10 text-red-500 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {isOwned ? 'IN GARAGE' : canAfford ? 'PURCHASE CAR' : 'INSUFFICIENT FUNDS'}
                      {!isOwned && canAfford && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function StatBar({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono text-gray-600 uppercase">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-white/20" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

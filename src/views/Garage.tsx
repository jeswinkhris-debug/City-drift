import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, Palette, Zap, Shield, Target, Check, Box, Image as ImageIcon } from 'lucide-react';
import { useGame } from '../GameContext';
import { CARS, UPGRADES, PAINT_COLORS, DECALS, BODY_KITS } from '../data/gameData';

export default function Garage() {
  const { profile, upgradeCar, customizeCar, updateVisuals, selectCar } = useGame();
  const [activeTab, setActiveTab] = useState<'tuning' | 'paint' | 'decals' | 'bodykit'>('tuning');

  if (!profile) return null;

  const currentCarData = CARS.find(c => c.id === profile.currentCarId);
  const currentCarState = profile.ownedCars[profile.currentCarId];

  if (!currentCarData || !currentCarState) return null;

  const ownedCars = Object.keys(profile.ownedCars).map(id => CARS.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-[#F27D26] font-mono text-sm uppercase tracking-widest mb-1">Personal Collection</p>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">THE GARAGE</h1>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
           {['tuning', 'paint', 'decals', 'bodykit'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase transition-all ${activeTab === tab ? 'bg-[#F27D26] text-white' : 'text-gray-500 hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Car List */}
        <div className="space-y-6">
           <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Your Fleet</h3>
           <div className="space-y-3 h-[600px] overflow-auto pr-4 custom-scrollbar">
              {ownedCars.map(car => (
                <button
                  key={car?.id}
                  onClick={() => selectCar(car!.id)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 group transition-all ${
                    profile.currentCarId === car?.id 
                      ? 'bg-[#F27D26] border-[#F27D26] text-white' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${profile.currentCarId === car?.id ? 'bg-white/20' : 'bg-white/5'}`}>
                     <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-tight">{car?.name}</p>
                    <p className={`text-[10px] font-mono uppercase ${profile.currentCarId === car?.id ? 'text-white/60' : 'text-gray-500'}`}>
                      {car?.category} Series
                    </p>
                  </div>
                </button>
              ))}
           </div>
        </div>

        {/* Active Modifier */}
        <div className="lg:col-span-2 bg-[#111] rounded-[40px] border border-white/5 overflow-hidden">
           <div className="p-10 border-b border-white/5 flex gap-10 items-center justify-between">
              <div>
                 <h2 className="text-4xl font-black italic uppercase tracking-tighter">{currentCarData.name}</h2>
                 <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mt-1">Active for next event</p>
              </div>
              <div 
                className="w-24 h-12 rounded-xl border border-white/10" 
                style={{ backgroundColor: currentCarState.paintColor }}
              />
           </div>

           <div className="p-10">
              {activeTab === 'tuning' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <UpgradeCard 
                     label="Engine" 
                     level={currentCarState.engineLevel} 
                     max={3} 
                     cost={UPGRADES.engine[currentCarState.engineLevel]?.cost || 0}
                     onUpgrade={() => upgradeCar(currentCarData.id, 'engine', UPGRADES.engine[currentCarState.engineLevel].cost)}
                     icon={Zap}
                     stats="Top Speed & Acceleration"
                   />
                   <UpgradeCard 
                     label="Tires" 
                     level={currentCarState.tiresLevel} 
                     max={3} 
                     cost={UPGRADES.tires[currentCarState.tiresLevel]?.cost || 0}
                     onUpgrade={() => upgradeCar(currentCarData.id, 'tires', UPGRADES.tires[currentCarState.tiresLevel].cost)}
                     icon={Target}
                     stats="Handling & Grip"
                   />
                   <UpgradeCard 
                     label="Suspension" 
                     level={currentCarState.suspensionLevel} 
                     max={3} 
                     cost={UPGRADES.suspension[currentCarState.suspensionLevel]?.cost || 0}
                     onUpgrade={() => upgradeCar(currentCarData.id, 'suspension', UPGRADES.suspension[currentCarState.suspensionLevel].cost)}
                     icon={Shield}
                     stats="Stability & Cornering"
                   />
                </div>
              )}

              {activeTab === 'paint' && (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Respray Colors</h4>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                       {PAINT_COLORS.map(color => (
                         <button
                           key={color.name}
                           onClick={() => customizeCar(currentCarData.id, color.hex)}
                           className={`aspect-square rounded-full border-4 transition-all ${currentCarState.paintColor === color.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                           style={{ backgroundColor: color.hex }}
                           title={color.name}
                         >
                           {currentCarState.paintColor === color.hex && <Check className="w-4 h-4 mx-auto text-white mix-blend-difference" />}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'decals' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {DECALS.map(decal => {
                     const isOwned = currentCarState.decals.includes(decal.id);
                     const canAfford = profile.money >= decal.price;
                     return (
                       <button
                         key={decal.id}
                         onClick={() => updateVisuals(currentCarData.id, 'decals', [decal.id], decal.price)}
                         disabled={isOwned || !canAfford}
                         className={`p-6 rounded-2xl border text-left flex items-center justify-between group transition-all ${
                           isOwned ? 'bg-[#F27D26]/10 border-[#F27D26]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                         }`}
                       >
                         <div className="flex items-center gap-4">
                            <ImageIcon className="w-5 h-5 text-gray-500" />
                            <div>
                               <p className="font-bold uppercase tracking-tight">{decal.name}</p>
                               <p className="text-[10px] font-mono text-gray-500 uppercase">${decal.price.toLocaleString()}</p>
                            </div>
                         </div>
                         {isOwned && <Check className="w-4 h-4 text-[#F27D26]" />}
                       </button>
                     );
                   })}
                </div>
              )}

              {activeTab === 'bodykit' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {BODY_KITS.map(kit => {
                     const isOwned = currentCarState.bodyKit === kit.id;
                     const canAfford = profile.money >= kit.price;
                     return (
                       <button
                         key={kit.id}
                         onClick={() => updateVisuals(currentCarData.id, 'bodyKit', kit.id, kit.price)}
                         disabled={isOwned || !canAfford}
                         className={`p-6 rounded-2xl border text-left flex items-center justify-between group transition-all ${
                           isOwned ? 'bg-[#F27D26]/10 border-[#F27D26]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                         }`}
                       >
                         <div className="flex items-center gap-4">
                            <Box className="w-5 h-5 text-gray-500" />
                            <div>
                               <p className="font-bold uppercase tracking-tight">{kit.name}</p>
                               <p className="text-[10px] font-mono text-gray-500 uppercase">${kit.price.toLocaleString()}</p>
                            </div>
                         </div>
                         {isOwned && <Check className="w-4 h-4 text-[#F27D26]" />}
                       </button>
                     );
                   })}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}

function UpgradeCard({ label, level, max, cost, onUpgrade, icon: Icon, stats }: any) {
  const isMax = level >= max;
  return (
    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-6 flex flex-col">
       <div className="flex justify-between items-start">
          <div className="p-3 bg-[#F27D26]/10 rounded-xl">
             <Icon className="w-6 h-6 text-[#F27D26]" />
          </div>
          <div className="text-right">
             <p className="text-gray-500 text-[10px] font-mono uppercase">Level</p>
             <p className="text-xl font-black font-mono">{level}/{max}</p>
          </div>
       </div>

       <div className="flex-1">
          <h4 className="font-bold uppercase tracking-tight text-lg">{label}</h4>
          <p className="text-xs text-gray-500 font-mono mt-1 leading-relaxed capitalize">{stats}</p>
       </div>

       <div className="space-y-4">
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= level ? 'bg-[#F27D26]' : 'bg-white/10'}`} />
            ))}
          </div>

          <button
            disabled={isMax}
            onClick={onUpgrade}
            className={`w-full py-4 rounded-xl font-mono text-xs uppercase transition-all ${
              isMax 
                ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-[#F27D26] hover:text-white'
            }`}
          >
            {isMax ? 'MAX LEVEL' : `UPGRADE - $${cost.toLocaleString()}`}
          </button>
       </div>
    </div>
  );
}

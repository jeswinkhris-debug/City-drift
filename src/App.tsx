import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car as CarIcon, 
  Wrench, 
  ShoppingBag, 
  Trophy, 
  Briefcase, 
  Home, 
  LogOut, 
  Play,
  Gauge,
  Wallet
} from 'lucide-react';
import { useGame } from './GameContext';

// Views (Placeholder components for now, will be implemented fully)
import Dashboard from './views/Dashboard';
import Garage from './views/Garage';
import Shop from './views/Shop';
import Career from './views/Career';
import Jobs from './views/Jobs';
import Leaderboard from './views/Leaderboard';
import RaceView from './views/RaceView';

type View = 'dashboard' | 'garage' | 'shop' | 'career' | 'jobs' | 'leaderboard' | 'race';

export default function App() {
  const { user, profile, loading, login, logout } = useGame();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTrack, setSelectedTrack] = useState<any>(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Gauge className="w-12 h-12 text-[#F27D26]" />
        </motion.div>
        <p className="mt-4 font-mono text-sm tracking-widest uppercase opacity-50">Warming Up Engines...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none">
              VELOCITY<br /><span className="text-[#F27D26]">PEAK</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm uppercase tracking-wider mt-4">
              Work jobs, buy cars, dominate the streets.
            </p>
          </div>
          
          <button
            onClick={login}
            className="w-full bg-white text-black font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-[#F27D26] hover:text-white transition-all transform hover:scale-105"
          >
            <Play className="w-5 h-5 fill-current" />
            START YOUR CAREER
          </button>
        </motion.div>
        
        <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 opacity-20 text-white font-mono text-xs uppercase tracking-widest">
           <span>50+ CARS</span>
           <span>CAREER MODE</span>
           <span>CUSTOMIZATION</span>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'garage': return <Garage />;
      case 'shop': return <Shop />;
      case 'career': return <Career onSelectTrack={(track) => { setSelectedTrack(track); setCurrentView('race'); }} />;
      case 'jobs': return <Jobs />;
      case 'leaderboard': return <Leaderboard />;
      case 'race': return <RaceView track={selectedTrack} onFinish={() => setCurrentView('career')} />;
      default: return <Dashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'garage', icon: Wrench, label: 'Garage' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'career', icon: Play, label: 'Race' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'leaderboard', icon: Trophy, label: 'Ranks' },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      {/* Sidebar - Visible on Desktop */}
      <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col pt-8">
        <div className="px-6 mb-12">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            VE<span className="text-[#F27D26]">P</span>
          </h2>
          <div className="mt-6 flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F27D26] to-orange-400 flex items-center justify-center">
               <CarIcon className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-xs font-mono text-gray-400 truncate uppercase tracking-tighter">{profile?.username}</p>
               <div className="flex items-center gap-1 text-[#F27D26]">
                 <Wallet className="w-3 h-3" />
                 <span className="text-sm font-bold font-mono">${profile?.money?.toLocaleString()}</span>
               </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-tight transition-all ${
                currentView === item.id 
                ? 'bg-[#F27D26] text-white shadow-lg shadow-orange-950/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-mono text-sm uppercase text-red-400 hover:bg-red-950/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#050505] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

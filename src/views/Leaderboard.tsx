import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, User } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: This would typically be segmented by trackId in a full app
    // For this demo we display top worldwide wins
    const q = query(collection(db, 'users'), orderBy('totalWins', 'desc'), limit(10));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setEntries(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'users');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <header className="text-center">
        <div className="inline-block p-3 bg-yellow-500/10 rounded-2xl mb-4 border border-yellow-500/20">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">HALL OF FAME</h1>
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mt-4">Top Street Racers Worldwide</p>
      </header>

      <div className="bg-[#111] rounded-[40px] border border-white/5 overflow-hidden">
        {loading ? (
           <div className="p-20 text-center font-mono opacity-20 uppercase tracking-widest">Scanning Network...</div>
        ) : (
          <div className="divide-y divide-white/5">
            {entries.map((entry, index) => (
              <motion.div 
                key={entry.uid}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-6 p-6 group hover:bg-white/5 transition-all"
              >
                <div className="w-12 text-center">
                   {index < 3 ? (
                     <div className="flex justify-center">
                       <Medal className={`w-8 h-8 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-300' : 'text-orange-700'}`} />
                     </div>
                   ) : (
                     <span className="text-xl font-black font-mono text-gray-700">#{index + 1}</span>
                   )}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                   <User className="w-6 h-6 text-gray-500" />
                </div>

                <div className="flex-1">
                   <h3 className="font-bold uppercase text-lg group-hover:text-[#F27D26] transition-colors">{entry.username}</h3>
                   <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Level {Math.floor(entry.totalWins / 5) + 1} Driver</p>
                </div>

                <div className="text-right">
                   <p className="text-2xl font-black font-mono italic">{entry.totalWins}</p>
                   <p className="text-[10px] font-mono text-gray-500 uppercase">Victories</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

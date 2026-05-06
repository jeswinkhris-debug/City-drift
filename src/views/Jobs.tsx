import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Clock, Wallet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useGame } from '../GameContext';
import { JOBS } from '../data/gameData';

export default function Jobs() {
  const { profile, addMoney } = useGame();
  const [activeJob, setActiveJob] = useState<any>(null);
  const [working, setWorking] = useState(false);
  const [complete, setComplete] = useState(false);

  if (!profile) return null;

  const startJob = (job: any) => {
    setActiveJob(job);
    setWorking(true);
    setComplete(false);
    
    // Simulate job work
    setTimeout(() => {
      setWorking(false);
      setComplete(true);
      addMoney(job.reward);
    }, 3000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header>
        <p className="text-[#F27D26] font-mono text-sm uppercase tracking-widest mb-1">Gig Economy</p>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">CITY JOBS</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {JOBS.map(job => (
          <div key={job.id} className="bg-[#111] rounded-3xl border border-white/5 p-8 space-y-8 flex flex-col">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                 <div className="p-3 bg-white/5 rounded-xl">
                   <Briefcase className="w-6 h-6 text-gray-400" />
                 </div>
                 <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${
                   job.difficulty === 'Low' ? 'text-green-400' :
                   job.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                 }`}>
                   {job.difficulty} Risk
                 </span>
              </div>
              <h3 className="text-xl font-bold uppercase">{job.name}</h3>
              <p className="text-sm text-gray-500 font-mono">{job.description}</p>
            </div>

            <div className="flex-1 space-y-4 pt-4 border-t border-white/5">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase">
                     <Clock className="w-3 h-3" />
                     {job.timeLimit}s duration
                  </div>
                  <div className="text-[#F27D26] font-bold font-mono">
                     +${job.reward}
                  </div>
               </div>

               <button
                 disabled={working}
                 onClick={() => startJob(job)}
                 className="w-full py-4 rounded-xl font-mono text-xs uppercase bg-white text-black hover:bg-[#F27D26] hover:text-white transition-all transition-all font-bold"
               >
                 ACCEPT GIG
               </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {(working || complete) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
          >
            <div className="max-w-sm w-full bg-[#111] rounded-[40px] border border-white/10 p-12 text-center space-y-8">
               {working ? (
                 <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                       <Loader2 className="w-16 h-16 text-[#F27D26]" />
                    </motion.div>
                    <div>
                       <h3 className="text-2xl font-black uppercase italic italic tracking-tighter">WORKING...</h3>
                       <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">{activeJob?.name}</p>
                    </div>
                 </>
               ) : (
                 <>
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-block p-4 bg-green-500 rounded-full"
                    >
                       <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-black uppercase italic italic tracking-tighter">JOB DONE!</h3>
                       <p className="text-green-500 font-mono text-xl font-bold">+${activeJob?.reward}</p>
                    </div>
                    <button
                      onClick={() => setComplete(false)}
                      className="w-full bg-white text-black font-bold py-4 rounded-2xl"
                    >
                      COLLECT PAY
                    </button>
                 </>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, Gauge, ArrowLeft, Trophy, Clock, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGame } from '../GameContext';
import { CARS, TRACKS } from '../data/gameData';

interface RaceViewProps {
  track: any;
  onFinish: () => void;
}

export default function RaceView({ track, onFinish }: RaceViewProps) {
  const { profile, addMoney, addWin } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'countdown' | 'racing' | 'finished'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [raceResult, setRaceResult] = useState<{ position: number; time: string } | null>(null);
  const [timer, setTimer] = useState(0);

  // Game Logic variables
  const requestRef = useRef<number>();
  const keys = useRef<{ [key: string]: boolean }>({});
  const car = useRef({
    x: 100,
    y: 300,
    angle: 0,
    speed: 0,
    maxSpeed: 8,
    accel: 0.1,
    friction: 0.98,
    turnSpeed: 0.05,
    width: 40,
    length: 20
  });

  const aiCars = useRef(
    [1, 2, 3].map(i => ({
      x: 100,
      y: 350 + i * 50,
      angle: 0,
      speed: 0,
      maxSpeed: 7 + Math.random(),
      accel: 0.08 + Math.random() * 0.04,
      width: 40,
      length: 20,
      color: i === 1 ? '#FF0000' : i === 2 ? '#0000FF' : '#00FF00',
      difficulty: 0.5 + Math.random() * 0.5
    }))
  );

  const checkpoints = useRef<any[]>([]);
  const currentCheckpoint = useRef(0);
  const startTime = useRef(0);

  // Initialize Track & Car stats
  useEffect(() => {
    if (!profile) return;
    const currentCarStats = CARS.find(c => c.id === profile.currentCarId);
    const carState = profile.ownedCars[profile.currentCarId];
    
    if (currentCarStats && carState) {
      // Modify stats based on levels
      const engineBonus = carState.engineLevel * 0.5;
      const tiresBonus = carState.tiresLevel * 0.01;
      car.current.maxSpeed = 8 + (currentCarStats.baseStats.topSpeed / 20) + engineBonus;
      car.current.accel = 0.1 + (currentCarStats.baseStats.acceleration / 500) + (engineBonus / 20);
      car.current.turnSpeed = 0.05 + (currentCarStats.baseStats.handling / 1000) + tiresBonus;
    }

    // Simple Track Generation (points along a line for this demo)
    checkpoints.current = Array.from({ length: track.checkpoints }, (_, i) => ({
      x: (i + 1) * (track.length / track.checkpoints),
      y: 300 + Math.sin(i) * 100,
      passed: false
    }));
  }, [profile, track]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => keys.current[e.code] = true;
  const handleKeyUp = (e: KeyboardEvent) => delete keys.current[e.code];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'countdown') {
      setGameState('racing');
      startTime.current = Date.now();
    }
  }, [countdown, gameState]);

  const update = () => {
    if (gameState !== 'racing') return;

    setTimer(Date.now() - startTime.current);

    // Player Movement
    if (keys.current['ArrowUp'] || keys.current['KeyW']) car.current.speed += car.current.accel;
    if (keys.current['ArrowDown'] || keys.current['KeyS']) car.current.speed -= car.current.accel;
    if (keys.current['ArrowLeft'] || keys.current['KeyA']) car.current.angle -= car.current.turnSpeed;
    if (keys.current['ArrowRight'] || keys.current['KeyD']) car.current.angle += car.current.turnSpeed;

    car.current.speed *= car.current.friction;
    if (car.current.speed > car.current.maxSpeed) car.current.speed = car.current.maxSpeed;
    
    car.current.x += Math.cos(car.current.angle) * car.current.speed;
    car.current.y += Math.sin(car.current.angle) * car.current.speed;

    // AI Movement
    aiCars.current.forEach(ai => {
      // Simple logic: move forward, slightly adjust angle towards track mid
      ai.speed += ai.accel;
      if (ai.speed > ai.maxSpeed) ai.speed = ai.maxSpeed;
      ai.x += Math.cos(ai.angle) * ai.speed;
      ai.y += Math.sin(ai.angle) * ai.speed;
      
      // Wander slightly
      ai.angle += (Math.random() - 0.5) * 0.02;
    });

    // Checkpoint Logic
    const target = checkpoints.current[currentCheckpoint.current];
    if (target) {
      const dist = Math.sqrt(Math.pow(car.current.x - target.x, 2) + Math.pow(car.current.y - target.y, 2));
      if (dist < 100) {
        currentCheckpoint.current++;
        if (currentCheckpoint.current >= track.checkpoints) {
          finishRace();
        }
      }
    }

    draw();
    requestRef.current = requestAnimationFrame(update);
  };

  const finishRace = async () => {
    setGameState('finished');
    cancelAnimationFrame(requestRef.current!);
    
    const timeSpent = (Date.now() - startTime.current) / 1000;
    const position = 1; // Simplification for demo
    setRaceResult({ position, time: timeSpent.toFixed(2) });

    if (position === 1) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F27D26', '#FFFFFF', '#FFA500']
      });
      await addWin();
    }

    // Rewards
    const baseReward = track.reward;
    const finalReward = position === 1 ? baseReward : Math.floor(baseReward / position);
    await addMoney(finalReward);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and translate for camera (follow car)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2 - car.current.x, canvas.height / 2 - car.current.y);

    // Draw Track
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 150;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(track.length, 300); // Simple straight for demo bounds
    ctx.stroke();

    // Draw Checkpoints
    checkpoints.current.forEach((cp, i) => {
      ctx.fillStyle = i === currentCheckpoint.current ? '#F27D26' : 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 20, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw AI
    aiCars.current.forEach(ai => {
      ctx.save();
      ctx.translate(ai.x, ai.y);
      ctx.rotate(ai.angle);
      ctx.fillStyle = ai.color;
      ctx.fillRect(-ai.width/2, -ai.length/2, ai.width, ai.length);
      ctx.restore();
    });

    // Draw Player
    ctx.save();
    ctx.translate(car.current.x, car.current.y);
    ctx.rotate(car.current.angle);
    const carState = profile?.ownedCars[profile.currentCarId];
    ctx.fillStyle = carState?.paintColor || '#FFF';
    ctx.fillRect(-car.current.width/2, -car.current.length/2, car.current.width, car.current.length);
    
    // Draw Decals
    if (carState?.decals.includes('racing-stripe')) {
       ctx.fillStyle = 'rgba(255,255,255,0.7)';
       ctx.fillRect(-car.current.width/2, -2, car.current.width, 4);
    }
    if (carState?.decals.includes('side-flames')) {
       ctx.fillStyle = '#FF4500';
       ctx.fillRect(-car.current.width/4, -car.current.length/2, car.current.width/2, 2);
       ctx.fillRect(-car.current.width/4, car.current.length/2 - 2, car.current.width/2, 2);
    }
    
    // Headlights
    ctx.fillStyle = '#FF0';
    ctx.fillRect(car.current.width/2 - 2, -car.current.length/2, 2, 4);
    ctx.fillRect(car.current.width/2 - 2, car.current.length/2 - 4, 2, 4);
    ctx.restore();
  };

  useEffect(() => {
    if (gameState === 'racing') {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(requestRef.current!);
  }, [gameState]);

  return (
    <div className="relative h-full bg-[#050505] overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={window.innerWidth} 
        height={window.innerHeight}
        className="block"
      />

      {/* HUD */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between pointer-events-none">
        <div className="space-y-2">
          <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">Speed</p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-black italic font-mono">{(car.current.speed * 20).toFixed(0)}</span>
              <span className="text-xs text-gray-400 font-mono mb-1">KM/H</span>
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">Progress</p>
            <div className="flex items-center gap-4">
               <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F27D26]" style={{ width: `${(currentCheckpoint.current / track.checkpoints) * 100}%` }} />
               </div>
               <span className="text-xs font-mono">{currentCheckpoint.current}/{track.checkpoints}</span>
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 h-fit">
           <div className="flex items-center gap-2 mb-1">
             <Clock className="w-3 h-3 text-[#F27D26]" />
             <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">Time</p>
           </div>
           <p className="text-2xl font-black font-mono">{(timer / 1000).toFixed(2)}s</p>
        </div>
      </div>

      <AnimatePresence>
        {gameState === 'countdown' && (
          <motion.div 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 4, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            <h2 className="text-[20vw] font-black italic text-white leading-none">
              {countdown === 0 ? 'GO!' : countdown}
            </h2>
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl p-8"
          >
            <div className="max-w-md w-full text-center space-y-8">
               <div className="inline-block p-4 bg-[#F27D26] rounded-full mb-4">
                  <Trophy className="w-12 h-12 text-white" />
               </div>
               <h2 className="text-6xl font-black italic uppercase italic tracking-tighter">FINISH!</h2>
               
               <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                     <p className="text-gray-500 text-xs font-mono uppercase">Position</p>
                     <p className="text-3xl font-black font-mono">#{raceResult?.position}</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                     <p className="text-gray-500 text-xs font-mono uppercase">Time</p>
                     <p className="text-3xl font-black font-mono">{raceResult?.time}s</p>
                  </div>
               </div>

               <button
                 onClick={onFinish}
                 className="w-full bg-[#F27D26] text-white font-bold py-4 rounded-full mt-12 flex items-center justify-center gap-2 hover:bg-orange-500"
               >
                 CONTINUE TO CAREER <ArrowLeft className="w-4 h-4 rotate-180" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

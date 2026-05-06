import { Car, Track, Job } from './types';

export const CARS: Car[] = [
  // Starter
  { id: 'starter-1', name: 'Swift Hatch', category: 'Starter', price: 0, baseStats: { topSpeed: 30, acceleration: 40, handling: 50, braking: 40 } },
  { id: 'starter-2', name: 'Rusty Sedan', category: 'Starter', price: 500, baseStats: { topSpeed: 25, acceleration: 30, handling: 40, braking: 30 } },
  { id: 'starter-3', name: 'Micro Dash', category: 'Starter', price: 1200, baseStats: { topSpeed: 35, acceleration: 50, handling: 60, braking: 45 } },
  { id: 'starter-4', name: 'Urban Zip', category: 'Starter', price: 2000, baseStats: { topSpeed: 40, acceleration: 45, handling: 55, braking: 50 } },
  { id: 'starter-5', name: 'Old Timer', category: 'Starter', price: 2500, baseStats: { topSpeed: 38, acceleration: 35, handling: 45, braking: 40 } },
  
  // Street
  { id: 'street-1', name: 'Drift King', category: 'Street', price: 5000, baseStats: { topSpeed: 50, acceleration: 55, handling: 70, braking: 60 } },
  { id: 'street-2', name: 'Neon Pulsar', category: 'Street', price: 7500, baseStats: { topSpeed: 55, acceleration: 60, handling: 65, braking: 55 } },
  { id: 'street-3', name: 'Cyber Rogue', category: 'Street', price: 9000, baseStats: { topSpeed: 58, acceleration: 65, handling: 60, braking: 60 } },
  { id: 'street-4', name: 'Night Rider', category: 'Street', price: 12000, baseStats: { topSpeed: 62, acceleration: 62, handling: 62, braking: 62 } },
  { id: 'street-5', name: 'Tuner X', category: 'Street', price: 15000, baseStats: { topSpeed: 65, acceleration: 70, handling: 68, braking: 65 } },
  { id: 'street-6', name: 'Zenith S', category: 'Street', price: 18000, baseStats: { topSpeed: 68, acceleration: 65, handling: 72, braking: 70 } },
  { id: 'street-7', name: 'Vortex GT', category: 'Street', price: 22000, baseStats: { topSpeed: 70, acceleration: 72, handling: 70, braking: 68 } },
  { id: 'street-8', name: 'Phantom Z', category: 'Street', price: 25000, baseStats: { topSpeed: 72, acceleration: 75, handling: 75, braking: 72 } },
  { id: 'street-9', name: 'Raptor SE', category: 'Street', price: 28000, baseStats: { topSpeed: 75, acceleration: 70, handling: 68, braking: 70 } },
  { id: 'street-10', name: 'Echo One', category: 'Street', price: 30000, baseStats: { topSpeed: 74, acceleration: 78, handling: 74, braking: 75 } },

  // Muscle
  { id: 'muscle-1', name: 'Bulldog V8', category: 'Muscle', price: 35000, baseStats: { topSpeed: 70, acceleration: 85, handling: 40, braking: 50 } },
  { id: 'muscle-2', name: 'Iron Horse', category: 'Muscle', price: 40000, baseStats: { topSpeed: 75, acceleration: 88, handling: 45, braking: 45 } },
  { id: 'muscle-3', name: 'Thunder Bolt', category: 'Muscle', price: 45000, baseStats: { topSpeed: 80, acceleration: 90, handling: 42, braking: 48 } },
  { id: 'muscle-4', name: 'Raw Power', category: 'Muscle', price: 50000, baseStats: { topSpeed: 82, acceleration: 92, handling: 40, braking: 40 } },
  { id: 'muscle-5', name: 'Heavy Metal', category: 'Muscle', price: 55000, baseStats: { topSpeed: 85, acceleration: 95, handling: 35, braking: 35 } },
  { id: 'muscle-6', name: 'Grave Digger', category: 'Muscle', price: 60000, baseStats: { topSpeed: 88, acceleration: 90, handling: 45, braking: 50 } },
  { id: 'muscle-7', name: 'Road Rage', category: 'Muscle', price: 65000, baseStats: { topSpeed: 90, acceleration: 92, handling: 42, braking: 45 } },
  { id: 'muscle-8', name: 'Stallion G', category: 'Muscle', price: 70000, baseStats: { topSpeed: 92, acceleration: 94, handling: 40, braking: 42 } },
  { id: 'muscle-9', name: 'Titan 500', category: 'Muscle', price: 75000, baseStats: { topSpeed: 94, acceleration: 96, handling: 38, braking: 40 } },
  { id: 'muscle-10', name: 'Crusher XT', category: 'Muscle', price: 80000, baseStats: { topSpeed: 96, acceleration: 98, handling: 35, braking: 38 } },

  // Super
  { id: 'super-1', name: 'Aero S', category: 'Super', price: 100000, baseStats: { topSpeed: 90, acceleration: 85, handling: 90, braking: 85 } },
  { id: 'super-2', name: 'Velocity X', category: 'Super', price: 125000, baseStats: { topSpeed: 92, acceleration: 88, handling: 92, braking: 88 } },
  { id: 'super-3', name: 'Spectre GT', category: 'Super', price: 150000, baseStats: { topSpeed: 94, acceleration: 90, handling: 94, braking: 90 } },
  { id: 'super-4', name: 'Lightning MR', category: 'Super', price: 175000, baseStats: { topSpeed: 96, acceleration: 92, handling: 96, braking: 92 } },
  { id: 'super-5', name: 'Mirage F1', category: 'Super', price: 200000, baseStats: { topSpeed: 98, acceleration: 95, handling: 98, braking: 95 } },
  { id: 'super-6', name: 'Orbit S', category: 'Super', price: 250000, baseStats: { topSpeed: 95, acceleration: 92, handling: 95, braking: 92 } },
  { id: 'super-7', name: 'Apex Predator', category: 'Super', price: 300000, baseStats: { topSpeed: 96, acceleration: 94, handling: 96, braking: 94 } },
  { id: 'super-8', name: 'Zenith RS', category: 'Super', price: 350000, baseStats: { topSpeed: 97, acceleration: 95, handling: 97, braking: 95 } },
  { id: 'super-9', name: 'Pulsar GT', category: 'Super', price: 400000, baseStats: { topSpeed: 98, acceleration: 96, handling: 98, braking: 96 } },
  { id: 'super-10', name: 'Hyperion', category: 'Super', price: 450000, baseStats: { topSpeed: 99, acceleration: 98, handling: 99, braking: 98 } },

  // Hyper
  { id: 'hyper-1', name: 'Mach 1', category: 'Hyper', price: 1000000, baseStats: { topSpeed: 100, acceleration: 100, handling: 90, braking: 90 } },
  { id: 'hyper-2', name: 'Nebula', category: 'Hyper', price: 1500000, baseStats: { topSpeed: 102, acceleration: 102, handling: 92, braking: 92 } },
  { id: 'hyper-3', name: 'Chronos', category: 'Hyper', price: 2000000, baseStats: { topSpeed: 105, acceleration: 105, handling: 95, braking: 95 } },
  { id: 'hyper-4', name: 'Void Walker', category: 'Hyper', price: 3000000, baseStats: { topSpeed: 110, acceleration: 110, handling: 98, braking: 98 } },
  { id: 'hyper-5', name: 'Zenith Prime', category: 'Hyper', price: 5000000, baseStats: { topSpeed: 120, acceleration: 120, handling: 100, braking: 100 } },
  { id: 'hyper-6', name: 'Godspeed', category: 'Hyper', price: 7500000, baseStats: { topSpeed: 125, acceleration: 125, handling: 105, braking: 105 } },
  { id: 'hyper-7', name: 'Lightbringer', category: 'Hyper', price: 10000000, baseStats: { topSpeed: 130, acceleration: 130, handling: 110, braking: 110 } },
  { id: 'hyper-8', name: 'Event Horizon', category: 'Hyper', price: 15000000, baseStats: { topSpeed: 140, acceleration: 140, handling: 115, braking: 115 } },
  { id: 'hyper-9', name: 'The Singularity', category: 'Hyper', price: 20000000, baseStats: { topSpeed: 150, acceleration: 150, handling: 120, braking: 120 } },
  { id: 'hyper-10', name: 'Velocity Omega', category: 'Hyper', price: 50000000, baseStats: { topSpeed: 200, acceleration: 200, handling: 150, braking: 150 } },
];

export const TRACKS: Track[] = [
  { id: 'neon-city', name: 'Neon City Circuit', description: 'A vibrant urban track with technical corners.', length: 2500, difficulty: 'Medium', reward: 1500, checkpoints: 5 },
  { id: 'desert-highway', name: 'Desert Storm Highway', description: 'Long straights through the open desert.', length: 5000, difficulty: 'Easy', reward: 2000, checkpoints: 3 },
];

export const JOBS: Job[] = [
  { id: 'delivery-1', name: 'Midnight Parcel', description: 'Quickly deliver a package through the city.', reward: 200, timeLimit: 60, difficulty: 'Low' },
  { id: 'taxi-1', name: 'VIP Transit', description: 'High-speed taxi service for a CEO.', reward: 500, timeLimit: 90, difficulty: 'Medium' },
  { id: 'pro-1', name: 'Secret Prototype Transport', description: 'Highly delicate prototype delivery.', reward: 1200, timeLimit: 45, difficulty: 'High' },
];

export const UPGRADES = {
  engine: [
    { level: 1, cost: 1000, bonus: { topSpeed: 5, acceleration: 5 } },
    { level: 2, cost: 5000, bonus: { topSpeed: 12, acceleration: 12 } },
    { level: 3, cost: 15000, bonus: { topSpeed: 25, acceleration: 25 } },
  ],
  tires: [
    { level: 1, cost: 800, bonus: { handling: 10 } },
    { level: 2, cost: 4000, bonus: { handling: 20 } },
    { level: 3, cost: 12000, bonus: { handling: 35 } },
  ],
  suspension: [
    { level: 1, cost: 1200, bonus: { handling: 5, braking: 5 } },
    { level: 2, cost: 6000, bonus: { handling: 15, braking: 15 } },
    { level: 3, cost: 20000, bonus: { handling: 30, braking: 30 } },
  ],
};

export const PAINT_COLORS = [
  { name: 'Radiant Red', hex: '#FF0000', price: 100 },
  { name: 'Azure Blue', hex: '#0000FF', price: 100 },
  { name: 'Vibrant Green', hex: '#00FF00', price: 100 },
  { name: 'Carbon Black', hex: '#1A1A1A', price: 250 },
  { name: 'Arctic White', hex: '#FFFFFF', price: 100 },
  { name: 'Solar Yellow', hex: '#FFFF00', price: 150 },
  { name: 'Neon Pink', hex: '#FF00FF', price: 300 },
  { name: 'Royal Purple', hex: '#800080', price: 300 },
];

export const DECALS = [
  { id: 'none', name: 'None', price: 0 },
  { id: 'racing-stripe', name: 'Racing Stripe', price: 500, color: '#FFFFFF' },
  { id: 'side-flames', name: 'Side Flames', price: 1200, color: '#FF4500' },
  { id: 'cyber-circuit', name: 'Cyber Circuit', price: 2500, color: '#00F2FF' },
  { id: 'dual-stripes', name: 'Dual Stripes', price: 800, color: '#000000' },
];

export const BODY_KITS = [
  { id: 'standard', name: 'Standard', price: 0, weightMod: 1 },
  { id: 'aero-v1', name: 'Aero Pack v1', price: 2000, weightMod: 0.95 },
  { id: 'widebody-gt', name: 'Widebody GT', price: 8000, weightMod: 1.05 },
  { id: 'carbon-ultra', name: 'Carbon Ultra', price: 15000, weightMod: 0.8 },
];

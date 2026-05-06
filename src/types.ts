export interface Car {
  id: string;
  name: string;
  category: 'Starter' | 'Street' | 'Muscle' | 'Super' | 'Hyper';
  price: number;
  baseStats: {
    topSpeed: number; // 0-100
    acceleration: number; // 0-100
    handling: number; // 0-100
    braking: number; // 0-100
  };
}

export interface CarState {
  carId: string;
  paintColor: string;
  decals: string[];
  bodyKit: string;
  engineLevel: number;
  suspensionLevel: number;
  tiresLevel: number;
}

export interface UserProfile {
  uid: string;
  username: string;
  money: number;
  totalWins: number;
  ownedCars: { [carId: string]: CarState };
  currentCarId: string;
  createdAt: any;
  updatedAt: any;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  length: number; // in meters
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reward: number;
  checkpoints: number;
}

export interface Job {
  id: string;
  name: string;
  description: string;
  reward: number;
  timeLimit: number; // in seconds
  difficulty: 'Low' | 'Medium' | 'High';
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  time: number;
  trackId: string;
  carId: string;
  timestamp: any;
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { UserProfile, CarState, Car } from './types';
import { CARS } from './data/gameData';

interface GameContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  buyCar: (car: Car) => Promise<void>;
  upgradeCar: (carId: string, type: 'engine' | 'suspension' | 'tires', cost: number) => Promise<void>;
  customizeCar: (carId: string, paintColor: string) => Promise<void>;
  updateVisuals: (carId: string, type: 'decals' | 'bodyKit', value: any, cost: number) => Promise<void>;
  selectCar: (carId: string) => Promise<void>;
  addMoney: (amount: number) => Promise<void>;
  addWin: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        
        // Listen for profile changes
        const unsubProfile = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.data() as UserProfile);
          } else {
            // Create profile if doesn't exist
            const initialProfile: UserProfile = {
              uid: user.uid,
              username: user.displayName || 'Driver',
              money: 1000,
              totalWins: 0,
              ownedCars: {
                'starter-1': {
                  carId: 'starter-1',
                  paintColor: '#FFFFFF',
                  decals: [],
                  bodyKit: 'standard',
                  engineLevel: 0,
                  suspensionLevel: 0,
                  tiresLevel: 0
                }
              },
              currentCarId: 'starter-1',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            setDoc(userRef, initialProfile).catch(e => handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`));
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        });

        return () => unsubProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  const buyCar = async (car: Car) => {
    if (!user || !profile || profile.money < car.price) return;
    
    const userRef = doc(db, 'users', user.uid);
    const newCarState: CarState = {
      carId: car.id,
      paintColor: '#FFFFFF',
      decals: [],
      bodyKit: 'standard',
      engineLevel: 0,
      suspensionLevel: 0,
      tiresLevel: 0
    };

    try {
      await updateDoc(userRef, {
        money: profile.money - car.price,
        [`ownedCars.${car.id}`]: newCarState,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const upgradeCar = async (carId: string, type: 'engine' | 'suspension' | 'tires', cost: number) => {
    if (!user || !profile || profile.money < cost) return;
    
    const userRef = doc(db, 'users', user.uid);
    const currentLevel = (profile.ownedCars[carId] as any)[`${type}Level`];

    try {
      await updateDoc(userRef, {
        money: profile.money - cost,
        [`ownedCars.${carId}.${type}Level`]: currentLevel + 1,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const customizeCar = async (carId: string, paintColor: string) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        [`ownedCars.${carId}.paintColor`]: paintColor,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const updateVisuals = async (carId: string, type: 'decals' | 'bodyKit', value: any, cost: number) => {
    if (!user || !profile || profile.money < cost) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        money: profile.money - cost,
        [`ownedCars.${carId}.${type}`]: value,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const selectCar = async (carId: string) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        currentCarId: carId,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const addMoney = async (amount: number) => {
    if (!user || !profile) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        money: profile.money + amount,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const addWin = async () => {
    if (!user || !profile) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        totalWins: profile.totalWins + 1,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  return (
    <GameContext.Provider value={{
      user, profile, loading, login, logout, 
      buyCar, upgradeCar, customizeCar, updateVisuals, selectCar, addMoney, addWin 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, PetProfile, BreakSettings, BlockingIntensity } from './types';
import { DEFAULT_PE_PROFILE, DEFAULT_BREAK_SETTINGS } from './constants';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import FakeBrowser from './components/FakeBrowser';
import PetOverlay from './components/PetOverlay';

export default function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [pet, setPet] = useState<PetProfile>(DEFAULT_PE_PROFILE);
  const [settings, setSettings] = useState<BreakSettings>(DEFAULT_BREAK_SETTINGS);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [nextBreakTime, setNextBreakTime] = useState(DEFAULT_BREAK_SETTINGS.intervalMinutes * 60);

  // Simple timer logic
  useEffect(() => {
    let timer: number;
    if (isBreakActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isBreakActive) {
      setIsBreakActive(false);
      setNextBreakTime(settings.intervalMinutes * 60); // Reset for next cycle
    }
    
    if (!isBreakActive && nextBreakTime > 0) {
       timer = window.setInterval(() => {
         setNextBreakTime((prev) => {
            if (prev <= 1) {
              startBreak();
              return settings.intervalMinutes * 60;
            }
            return prev - 1;
         });
       }, 1000);
    }

    return () => clearInterval(timer);
  }, [isBreakActive, timeLeft, nextBreakTime, settings.intervalMinutes]);

  const startBreak = () => {
    setTimeLeft(settings.durationSeconds);
    setIsBreakActive(true);
  };

  const handleCompleteSetup = (newPet: PetProfile) => {
    setPet(newPet);
    setAppState('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {appState === 'onboarding' && (
          <Onboarding key="onboarding" onComplete={handleCompleteSetup} />
        )}

        {appState === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen"
          >
            <div className="w-1/3 border-r bg-white p-8 overflow-y-auto">
              <Dashboard 
                pet={pet} 
                settings={settings} 
                onUpdateSettings={setSettings}
                onUpdatePet={setPet}
                onTriggerBreak={startBreak}
                activeBreak={isBreakActive}
                nextBreakSeconds={nextBreakTime}
              />
            </div>
            
            <div className="w-2/3 bg-slate-100 relative overflow-hidden flex items-center justify-center p-8">
              <FakeBrowser />
              
              <AnimatePresence>
                {isBreakActive && (
                  <PetOverlay 
                    pet={pet} 
                    settings={settings} 
                    timeLeft={timeLeft}
                    onSnooze={() => setIsBreakActive(false)}
                    onDismiss={() => setIsBreakActive(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

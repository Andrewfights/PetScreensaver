import { motion } from 'motion/react';
import { PetProfile, BreakSettings, BlockingIntensity } from '../types';
import { Clock, Coffee, X, ChevronRight, Heart } from 'lucide-react';

interface Props {
  pet: PetProfile;
  settings: BreakSettings;
  timeLeft: number;
  onSnooze: () => void;
  onDismiss: () => void;
}

export default function PetOverlay({ pet, settings, timeLeft, onSnooze, onDismiss }: Props) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isHard = settings.intensity === BlockingIntensity.HARD_BREAK;
  const isGatekeeper = settings.intensity === BlockingIntensity.GATEKEEPER;
  const isSoft = settings.intensity === BlockingIntensity.SOFT_BLOCK;
  const isReminder = settings.intensity === BlockingIntensity.REMINDER;

  // Visual variants based on intensity
  const overlayPosition = isReminder ? 'bottom-8 right-8' : 'inset-0 items-center justify-center';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`absolute inset-0 z-50 flex flex-col pointer-events-none ${
        settings.intensity === BlockingIntensity.HARD_BREAK ? 'bg-brand-dark/30 backdrop-blur-[2px]' : ''
      }`}
    >
      <div className={`relative w-full h-full flex ${overlayPosition} ${
        settings.intensity === BlockingIntensity.REMINDER ? '' : 'flex-col'
      }`}>
        
        {/* The Pet Asset Container */}
        <div className="relative flex items-center justify-center">
            <motion.div
               initial={{ y: 200, scale: 0.5, opacity: 0 }}
               animate={{ y: 0, scale: 1, opacity: 1 }}
               exit={{ y: 200, scale: 0.5, opacity: 0 }}
               transition={{ type: 'spring', damping: 15, stiffness: 80 }}
               className="relative pointer-events-auto"
               style={{
                 height: isReminder ? '220px' : `${pet.settings.size}%`,
                 maxHeight: isReminder ? '220px' : '75vh'
               }}
            >
                <img 
                    src={pet.imageUrl} 
                    alt={pet.name}
                    className="h-full object-contain pointer-events-auto select-none drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
                    style={{
                      opacity: pet.settings.opacity / 100
                    }}
                />
                
                {/* Speech Bubble (Artistic Style) */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0, rotate: 12 }}
                    animate={{ scale: 1, opacity: 1, rotate: 12 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 -right-12 px-6 py-5 bg-white text-brand-dark rounded-[40px] rounded-bl-none border-4 border-brand-dark shadow-2xl max-w-[200px] pointer-events-auto"
                >
                    <p className="font-black text-lg leading-tight italic font-serif">
                       {pet.name} says: "{timeLeft > 0 ? "Stop Scrolling, Human." : "Break's over. Work!"}"
                    </p>
                </motion.div>

                {/* Yellow Countdown Sticker */}
                {!isReminder && (
                  <motion.div 
                    initial={{ x: -50, opacity: 0, rotate: -12 }}
                    animate={{ x: 0, opacity: 1, rotate: -12 }}
                    transition={{ delay: 0.7 }}
                    className="absolute -left-20 top-1/2 -translate-y-1/2 bg-brand-yellow border-4 border-brand-dark px-6 py-4 rounded-2xl shadow-xl pointer-events-auto"
                  >
                    <p className="text-[10px] font-black uppercase tracking-tighter leading-none mb-1">Break Time Remaining</p>
                    <p className="text-5xl font-black font-mono tracking-tighter italic leading-none">{formatTime(timeLeft)}</p>
                  </motion.div>
                )}
            </motion.div>
        </div>

        {/* Floating Interaction Buttons (Bottom) */}
        {(isGatekeeper || isHard || isSoft) && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 pointer-events-auto flex flex-col items-center gap-6"
            >
                <div className="flex gap-4">
                  <button 
                    onClick={onSnooze}
                    className="px-8 py-4 bg-brand-orange text-white font-black rounded-full shadow-2xl hover:scale-105 transition-transform uppercase tracking-widest border-2 border-white ring-4 ring-brand-orange/20"
                  >
                    Take Break
                  </button>
                  <button 
                    onClick={onDismiss}
                    className="px-8 py-4 bg-white text-brand-dark font-black rounded-full shadow-xl hover:scale-105 transition-transform uppercase tracking-widest border-2 border-brand-dark"
                  >
                    Snooze 10m
                  </button>
                </div>

                <div className="flex items-center gap-2 text-brand-dark/40 text-[10px] font-black uppercase tracking-widest">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Gatekeeper Active
                </div>
            </motion.div>
        )}

        {isReminder && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 pointer-events-auto"
            >
               <button 
                onClick={onDismiss}
                className="w-12 h-12 bg-white border-4 border-brand-dark rounded-full shadow-xl flex items-center justify-center text-brand-dark hover:scale-110 transition-all font-black"
               >
                 <X size={24} />
               </button>
            </motion.div>
        )}
      </div>

      {/* Blocking Layer for specific modes */}
      {(isHard || isGatekeeper) && (
         <div className="absolute inset-0 pointer-events-auto z-[-1]" />
      )}
    </motion.div>
  );
}

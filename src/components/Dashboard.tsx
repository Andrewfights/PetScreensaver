import { Settings, Play, Pause, Bell, Shield, Skull, Zap, Clock, ExternalLink, Globe, Heart } from 'lucide-react';
import { PetProfile, BreakSettings, BlockingIntensity } from '../types';
import { motion } from 'motion/react';

interface Props {
  pet: PetProfile;
  settings: BreakSettings;
  onUpdateSettings: (settings: BreakSettings) => void;
  onUpdatePet: (pet: PetProfile) => void;
  onTriggerBreak: () => void;
  activeBreak: boolean;
  nextBreakSeconds: number;
}

export default function Dashboard({ pet, settings, onUpdateSettings, onUpdatePet, onTriggerBreak, activeBreak, nextBreakSeconds }: Props) {
  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-full space-y-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg shadow-brand-orange/20">
            <Shield className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tight uppercase">Pet Gatekeeper</h1>
        </div>
        <button className="p-2 hover:bg-brand-border/30 rounded-lg transition-colors">
          <Settings size={20} className="text-brand-dark/40" />
        </button>
      </header>

      <section className="bg-white border-2 border-brand-dark rounded-3xl p-5 relative group shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-brand-border overflow-hidden border-2 border-brand-dark">
                <img 
                  src={pet.imageUrl} 
                  className="w-full h-full object-cover" 
                  alt={pet.name}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-brand-dark rounded-full shadow-sm" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg leading-tight">{pet.name}</h2>
              <p className="text-brand-dark/50 text-xs italic font-serif">"The Screen Bouncer"</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-brand-bg border border-brand-border rounded-xl p-3">
              <div className="text-brand-dark/40 text-[10px] font-black uppercase tracking-widest mb-1">Intensity</div>
              <div className="font-bold text-sm">{settings.intensity}</div>
            </div>
            <div className="bg-brand-dark rounded-xl p-3 text-white">
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Status</div>
              <div className="font-bold text-sm flex items-center gap-1">
                 {activeBreak ? 'ACTIVE' : 'READY'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 block">Control Panel</label>
        
        <div className="grid grid-cols-1 gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onTriggerBreak}
            disabled={activeBreak}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm border-2 transition-all ${
              activeBreak 
              ? 'bg-brand-border text-brand-dark/30 border-brand-border' 
              : 'bg-brand-orange text-white border-brand-dark shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] active:shadow-none translate-y-0 active:translate-y-1'
            }`}
          >
            {activeBreak ? 'Break Active' : 'Trigger Bouncer'}
          </motion.button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">Break Interval</label>
          <span className="text-xs font-bold">{settings.intervalMinutes}m</span>
        </div>
        <div className="h-2 w-full bg-brand-border rounded-full relative">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-brand-orange rounded-full"
            animate={{ width: `${(nextBreakSeconds / (settings.intervalMinutes * 60)) * 100}%` }}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-dark rounded-full shadow-sm"></div>
        </div>
      </section>

      <section className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 block">Intensity Mode</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            BlockingIntensity.REMINDER,
            BlockingIntensity.SOFT_BLOCK,
            BlockingIntensity.GATEKEEPER,
            BlockingIntensity.HARD_BREAK
          ].map((mode) => (
            <button
              key={mode}
              onClick={() => onUpdateSettings({...settings, intensity: mode})}
              className={`p-3 text-[10px] font-black border uppercase tracking-tighter rounded-xl transition-all ${
                settings.intensity === mode
                ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                : 'bg-white border-brand-border hover:bg-brand-bg text-brand-dark/60'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-auto p-5 bg-brand-border/40 rounded-2xl border border-brand-border relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-2 -mt-2 w-12 h-12 bg-white/50 rounded-full blur-xl" />
        <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-1">Next Interruption In</p>
        <p className="text-3xl font-black font-mono tracking-tighter italic">{formatCountdown(nextBreakSeconds)}</p>
      </div>

      {/* Decorative Post-it Rule */}
      <div className="absolute bottom-6 right-6 w-36 h-36 bg-brand-note border border-[#FBC02D] shadow-lg p-4 rotate-3 z-10 flex flex-col group hover:rotate-0 transition-transform">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 bg-brand-dark/10"></div>
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 border-b border-brand-dark/10">House Rules</p>
        <p className="font-serif text-[11px] leading-tight text-[#795548] italic font-medium">
          - Stay hydrated<br/>
          - Deep breaths<br/>
          - {pet.name} is watching
        </p>
        <div className="mt-auto flex justify-end">
           <Heart size={10} className="text-red-400 fill-current" />
        </div>
      </div>
    </div>
  );
}

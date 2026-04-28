import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Check, PawPrint, ChevronRight, SlidersHorizontal, Camera } from 'lucide-react';
import { PetProfile, PetVisualSettings } from '../types';
import { DEFAULT_PE_PROFILE, PET_TYPES } from '../constants';

interface Props {
  onComplete: (pet: PetProfile) => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [petData, setPetData] = useState<PetProfile>(DEFAULT_PE_PROFILE);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = () => {
    setIsProcessing(true);
    // Simulate background removal
    setTimeout(() => {
      setPetData({
        ...petData,
        processedImageUrl: petData.imageUrl // In real app, this would be the transparent blob
      });
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-bg z-50 overflow-y-auto pt-20 pb-20">
      <div className="w-full max-w-2xl px-6">
        <div className="flex justify-between items-center mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ${
                step > i ? 'w-1/3 bg-brand-orange' : 'w-10 bg-brand-border'
              }`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: -20, opacity: 0 }}
              className="text-center"
            >
              <div className="mb-6 inline-flex p-4 bg-brand-orange text-white rounded-3xl shadow-xl shadow-brand-orange/20">
                <PawPrint size={48} />
              </div>
              <h1 className="text-5xl font-black tracking-tight mb-4 text-brand-dark uppercase">
                Your pet is now your screen's bouncer.
              </h1>
              <p className="text-lg text-brand-dark/60 mb-12 max-w-lg mx-auto italic font-serif">
                Upload your pet and let them cover your browser when it's time to take a break.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
                <div className="p-8 bg-white rounded-2xl border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] transition-all cursor-pointer group" onClick={() => {}}>
                  <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center mb-4 border border-brand-border group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Upload size={24} />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-sm mb-1">Upload Photo</h3>
                  <p className="text-xs text-brand-dark/40 font-bold uppercase tracking-tighter">JPG, PNG or WebP</p>
                </div>
                <div onClick={handleUpload} className="p-8 bg-brand-orange text-white rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-brand-orange/90 transition-colors shadow-2xl shadow-brand-orange/20 border-2 border-brand-dark">
                  {isProcessing ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Camera size={40} />
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-2 font-black text-xl uppercase tracking-widest">Use Sample Pet</div>
                      <p className="text-white/70 text-xs font-bold uppercase tracking-tighter">See how it works instantly</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -20, opacity: 0 }}
            >
              <h2 className="text-4xl font-black mb-8 text-center text-brand-dark uppercase tracking-tight">Looks good! Who is this?</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2">
                   <div className="relative aspect-square rounded-[2rem] bg-white overflow-hidden shadow-2xl flex items-center justify-center p-8 border-4 border-brand-dark bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                      <img 
                        src={petData.imageUrl} 
                        alt="Pet Preview" 
                        id="pet-onboarding-preview"
                        className="max-h-full object-contain transition-all"
                        style={{
                          filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.3))`
                        }}
                      />
                   </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">Pet's Name</label>
                    <input 
                      id="pet-name-input"
                      type="text" 
                      value={petData.name}
                      onChange={(e) => setPetData({...petData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-white border-2 border-brand-dark rounded-xl focus:ring-4 focus:ring-brand-orange/20 outline-none transition-all font-bold" 
                      placeholder="e.g. Luna"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">Species</label>
                    <div className="flex flex-wrap gap-2">
                       {PET_TYPES.map(type => (
                         <button
                           key={type}
                           id={`pet-type-${type.toLowerCase()}`}
                           onClick={() => setPetData({...petData, type})}
                           className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                             petData.type === type 
                             ? 'bg-brand-dark text-white border-brand-dark shadow-lg' 
                             : 'bg-white text-brand-dark/60 border-brand-border hover:border-brand-dark'
                           }`}
                         >
                           {type}
                         </button>
                       ))}
                    </div>
                  </div>

                  <button 
                    id="pet-onboarding-step2-next"
                    onClick={() => setStep(3)}
                    className="w-full py-5 bg-brand-dark text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-dark/90 transition-all mt-8 shadow-[6px_6px_0px_0px_rgba(255,107,53,1)]"
                  >
                    Customize Pose <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-black mb-8 text-center text-brand-dark uppercase tracking-tight">Perfecting {petData.name}'s Pose</h2>
              
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                   <div className="relative aspect-square rounded-[2rem] bg-brand-dark overflow-hidden shadow-2xl flex items-center justify-center p-12 border-8 border-brand-dark">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-purple-500/20 opacity-50" />
                      <motion.img 
                        id="pet-pose-preview"
                        src={petData.imageUrl} 
                        className="w-full h-full object-contain z-10"
                        animate={{ 
                          scale: petData.settings.size / 65,
                          opacity: petData.settings.opacity / 100
                        }}
                      />
                      <div className="absolute bottom-8 left-0 right-0 text-center text-white/30 text-[10px] font-black uppercase tracking-[0.3em] z-20">
                        Overlay Preview
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-1/2 space-y-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">Display Size</label>
                        <span className="text-xs font-mono font-bold text-brand-orange">{petData.settings.size}%</span>
                      </div>
                      <input 
                        id="size-slider"
                        type="range" 
                        min="20" max="120"
                        value={petData.settings.size}
                        onChange={(e) => setPetData({
                          ...petData, 
                          settings: { ...petData.settings, size: parseInt(e.target.value) }
                        })}
                        className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-orange" 
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">Opacity</label>
                        <span className="text-xs font-mono font-bold text-brand-orange">{petData.settings.opacity}%</span>
                      </div>
                      <input 
                        id="opacity-slider"
                        type="range" 
                        min="20" max="100"
                        value={petData.settings.opacity}
                        onChange={(e) => setPetData({
                          ...petData, 
                          settings: { ...petData.settings, opacity: parseInt(e.target.value) }
                        })}
                        className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-orange" 
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 border-b-2 border-brand-dark/5 w-full block pb-2 mb-4">Position</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['bottom', 'center', 'random'] as const).map(pos => (
                          <button
                            key={pos}
                            id={`pos-${pos}`}
                            onClick={() => setPetData({
                              ...petData, 
                              settings: { ...petData.settings, position: pos }
                            })}
                            className={`py-4 rounded-xl uppercase text-[10px] font-black tracking-widest transition-all border-2 ${
                              petData.settings.position === pos 
                              ? 'bg-brand-dark text-white border-brand-dark shadow-xl' 
                              : 'bg-white text-brand-dark/60 border-brand-border'
                            }`}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    id="finish-setup-button"
                    onClick={() => onComplete(petData)}
                    className="w-full py-6 bg-brand-orange text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-orange/90 transition-all shadow-2xl shadow-brand-orange/30 active:scale-95 border-2 border-brand-dark"
                  >
                   <Check size={28} /> Bring {petData.name} Home
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

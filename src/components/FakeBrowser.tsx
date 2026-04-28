import { Search, MoreVertical, ChevronLeft, ChevronRight, RotateCcw, ShieldAlert, Laptop, Eye, Heart, Coffee } from 'lucide-react';

export default function FakeBrowser() {
  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-dark flex flex-col h-[80vh] relative z-0">
      {/* Browser Chrome */}
      <div className="bg-brand-border/30 border-b-2 border-brand-dark p-3 flex items-center gap-4">
        <div className="flex gap-1.5 px-2">
            <div className="w-3 h-3 rounded-full bg-brand-dark/20" />
            <div className="w-3 h-3 rounded-full bg-brand-dark/20" />
            <div className="w-3 h-3 rounded-full bg-brand-dark/20" />
        </div>
        <div className="flex gap-2">
            <ChevronLeft size={18} className="text-brand-dark/30" />
            <ChevronRight size={18} className="text-brand-dark/30" />
            <RotateCcw size={18} className="text-brand-dark/30" />
        </div>
        <div className="flex-1 bg-white rounded-lg border-2 border-brand-dark px-3 py-1 flex items-center gap-2 text-brand-dark/40">
            <Search size={14} />
            <span className="text-xs font-bold uppercase tracking-tighter italic">https://www.productive-work.com/urgent-tasks</span>
        </div>
        <div className="p-1 px-2 bg-white border-2 border-brand-dark rounded-lg flex items-center gap-2 shadow-sm">
           <div className="w-2 h-2 bg-red-500 rounded-full" />
           <span className="text-[10px] font-black uppercase tracking-widest leading-none">Gatekeeper</span>
        </div>
      </div>

      {/* Fake Webpage Content */}
      <div className="flex-1 overflow-y-auto p-12 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
                <div className="h-12 w-2/3 bg-brand-border/20 rounded-xl" />
                <div className="h-4 w-full bg-brand-border/10 rounded-lg" />
                <div className="h-4 w-5/6 bg-brand-border/10 rounded-lg" />
                <div className="h-4 w-3/4 bg-brand-border/10 rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="aspect-video bg-brand-bg rounded-3xl flex items-center justify-center border-2 border-dashed border-brand-border">
                   <Laptop size={48} className="text-brand-border" />
                </div>
                <div className="space-y-4">
                    <div className="h-8 w-full bg-brand-border/20 rounded-xl" />
                    <div className="h-4 w-full bg-brand-border/10 rounded-lg" />
                    <div className="h-4 w-5/6 bg-brand-border/10 rounded-lg" />
                    <div className="h-4 w-2/3 bg-brand-border/10 rounded-lg" />
                </div>
            </div>

            <div className="space-y-8">
                <div className="h-10 w-1/2 bg-brand-border/20 rounded-xl" />
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="space-y-3 p-4 border border-brand-border rounded-2xl bg-brand-bg text-brand-dark/20">
                            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center p-4 shadow-sm">
                                {i === 1 && <Eye size={32} />}
                                {i === 2 && <Heart size={32} />}
                                {i === 3 && <Coffee size={32} />}
                            </div>
                            <div className="h-3 w-full bg-brand-border/40 rounded" />
                            <div className="h-3 w-5/6 bg-brand-border/20 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

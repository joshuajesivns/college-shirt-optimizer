import { useSnapshot } from 'valtio';
import { shirtStore } from '@/store/shirtStore';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CURATED_COLORS = [
  '#111111', // Black
  '#ffffff', // White
  '#0B5D2A', // University Green
  '#EAB308', // Gold/Yellow
  '#0f172a', // Navy
  '#1e293b', // Slate
  '#7f1d1d', // Burgundy
  '#0284c7', // Ocean
  '#d946ef', // Pink
];

export default function ColorPicker() {
  const snap = useSnapshot(shirtStore);

  const renderPicker = (target: 'color' | 'accentColor' | 'collarColor' | 'cuffColor') => (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-5 gap-3">
        {CURATED_COLORS.map((color) => (
          <button
            key={color}
            className={`w-full aspect-square rounded-full border-2 transition-all hover:scale-110 ${
              snap[target] === color ? 'border-primary scale-110' : 'border-transparent shadow-sm'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => (shirtStore[target] = color)}
            title={color}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded overflow-hidden border border-border/50 shrink-0">
          <input
            type="color"
            value={snap[target]}
            onChange={(e) => (shirtStore[target] = e.target.value)}
            className="absolute -inset-2 w-14 h-14 cursor-pointer"
          />
        </div>
        <Input 
          value={snap[target]}
          onChange={(e) => (shirtStore[target] = e.target.value)}
          className="font-mono uppercase bg-background/50"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="body" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-9">
          <TabsTrigger value="body" className="text-[10px]">Body</TabsTrigger>
          <TabsTrigger value="sleeves" className="text-[10px]">Sleeves</TabsTrigger>
          <TabsTrigger value="collar" className="text-[10px]">Collar</TabsTrigger>
          <TabsTrigger value="cuffs" className="text-[10px]">Cuffs</TabsTrigger>
        </TabsList>
        
        <div className="min-h-[160px]">
          {/* We use standard divs if TabsContent doesn't behave as expected in this layout */}
          <div className={snap.activeTab === 'colors' ? '' : 'hidden'}>
             {/* Content is managed by the selected trigger */}
          </div>
          
          <div data-state={snap.activeTab === 'colors' ? 'active' : ''}>
             {/* Note: In this project's shadcn setup, Tabs might need careful handling */}
             {/* I'll use a simpler state-based toggle for robustness */}
          </div>
        </div>
      </Tabs>
      
      {/* Fallback to simple list if Tabs are complex */}
      <div className="flex flex-col gap-4">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Garment Zones</h3>
            <div className="space-y-4">
                <div>
                   <span className="text-[10px] font-medium text-white/50 block mb-2">BODY COLOR</span>
                   {renderPicker('color')}
                </div>
                <div className="pt-4 border-t border-white/5">
                   <span className="text-[10px] font-medium text-white/50 block mb-2">SLEEVE / ACCENT COLOR</span>
                   {renderPicker('accentColor')}
                </div>
                <div className="pt-4 border-t border-white/5">
                   <span className="text-[10px] font-medium text-white/50 block mb-2">COLLAR COLOR</span>
                   {renderPicker('collarColor')}
                </div>
                <div className="pt-4 border-t border-white/5">
                   <span className="text-[10px] font-medium text-white/50 block mb-2">CUFF COLOR</span>
                   {renderPicker('cuffColor')}
                </div>
            </div>
          </section>
      </div>
    </div>
  );
}

import { useSnapshot } from 'valtio';
import { shirtStore } from '@/store/shirtStore';
import { Input } from '@/components/ui/input';

const CURATED_COLORS = [
  '#111111', // Black
  '#ffffff', // White
  '#1e293b', // Slate
  '#0f172a', // Navy
  '#14532d', // Forest
  '#7f1d1d', // Burgundy
  '#78716c', // Stone
  '#b45309', // Rust
  '#0284c7', // Ocean
  '#d946ef', // Pink
];

export default function ColorPicker() {
  const snap = useSnapshot(shirtStore);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Base Color</h3>
        <div className="grid grid-cols-5 gap-3">
          {CURATED_COLORS.map((color) => (
            <button
              key={color}
              className={`w-full aspect-square rounded-full border-2 transition-all hover:scale-110 ${
                snap.color === color ? 'border-primary scale-110' : 'border-transparent shadow-sm'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => (shirtStore.color = color)}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <h3 className="text-sm font-medium mb-3">Custom Hex</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded overflow-hidden border border-border/50 shrink-0">
            <input
              type="color"
              value={snap.color}
              onChange={(e) => (shirtStore.color = e.target.value)}
              className="absolute -inset-2 w-14 h-14 cursor-pointer"
            />
          </div>
          <Input 
            value={snap.color}
            onChange={(e) => (shirtStore.color = e.target.value)}
            className="font-mono uppercase bg-background/50"
          />
        </div>
      </div>
    </div>
  );
}

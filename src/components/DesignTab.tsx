import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { shirtStore, DecalPosition, TextLayer, LogoLayer } from '@/store/shirtStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Type, Image as ImageIcon, AlignCenter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const POSITIONS: { id: DecalPosition; label: string; short: string }[] = [
  { id: 'chest',          label: 'Chest',          short: 'CH' },
  { id: 'left-chest',     label: 'Left Chest',     short: 'LC' },
  { id: 'back',           label: 'Back',           short: 'BK' },
  { id: 'left-shoulder',  label: 'Left Shoulder',  short: 'LS' },
  { id: 'right-shoulder', label: 'Right Shoulder', short: 'RS' },
  { id: 'sleeve-left',    label: 'Left Sleeve',    short: 'SL' },
  { id: 'sleeve-right',   label: 'Right Sleeve',   short: 'SR' },
];

const FONTS = [
  { id: 'Space Grotesk', label: 'Space Grotesk' },
  { id: 'Bebas Neue',    label: 'Bebas Neue' },
  { id: 'Oswald',        label: 'Oswald' },
  { id: 'Playfair Display', label: 'Playfair Display' },
];

function PositionGrid({
  value,
  onChange,
}: {
  value: DecalPosition;
  onChange: (p: DecalPosition) => void;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">Placement</p>
      <div className="grid grid-cols-4 gap-1">
        {POSITIONS.map((pos) => (
          <button
            key={pos.id}
            onClick={() => onChange(pos.id)}
            title={pos.label}
            className={`text-[10px] font-medium py-1.5 px-1 rounded-md border transition-all ${
              value === pos.id
                ? 'border-primary/70 bg-primary/10 text-foreground'
                : 'border-border/40 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground'
            }`}
          >
            {pos.short}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">
        Selected: {POSITIONS.find((p) => p.id === value)?.label}
      </p>
    </div>
  );
}

// ─── Logo section ────────────────────────────────────────────────────────────
function LogoSection() {
  const snap = useSnapshot(shirtStore);
  const [position, setPosition] = useState<DecalPosition>('chest');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const logo: LogoLayer = {
      id: crypto.randomUUID(),
      url,
      position,
    };
    shirtStore.logos.push(logo);
    toast({ title: 'Logo added', description: POSITIONS.find((p) => p.id === position)?.label });
    e.target.value = '';
  };

  const removelogo = (id: string) => {
    const idx = shirtStore.logos.findIndex((l) => l.id === id);
    if (idx !== -1) shirtStore.logos.splice(idx, 1);
  };

  return (
    <div className="space-y-4">
      <PositionGrid value={position} onChange={setPosition} />

      <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:bg-muted/20 transition-colors cursor-pointer relative">
        <input
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleUpload}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Upload className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-sm">
            <span className="font-medium text-primary">Click to upload</span>
          </div>
          <p className="text-[11px] text-muted-foreground">PNG, SVG, JPG — transparent bg recommended</p>
        </div>
      </div>

      {snap.logos.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Added logos</p>
          {snap.logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center gap-3 bg-muted/20 rounded-lg p-2.5 border border-border/40"
            >
              <div className="w-10 h-10 rounded bg-background/60 flex items-center justify-center overflow-hidden shrink-0">
                <img src={logo.url} alt="logo" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Logo</p>
                <p className="text-[10px] text-muted-foreground">
                  {POSITIONS.find((p) => p.id === logo.position)?.label}
                </p>
              </div>
              <button
                onClick={() => removelogo(logo.id)}
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Text section ────────────────────────────────────────────────────────────
function TextSection() {
  const snap = useSnapshot(shirtStore);
  const [content, setContent] = useState('');
  const [fontFamily, setFontFamily] = useState('Space Grotesk');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [color, setColor] = useState('#ffffff');
  const [position, setPosition] = useState<DecalPosition>('chest');

  const addText = () => {
    if (!content.trim()) return;
    const layer: TextLayer = {
      id: crypto.randomUUID(),
      content: content.trim(),
      fontFamily,
      fontSize,
      color,
      position,
    };
    shirtStore.texts.push(layer);
    toast({ title: 'Text added', description: `"${layer.content}" on ${POSITIONS.find((p) => p.id === position)?.label}` });
    setContent('');
  };

  const removeText = (id: string) => {
    const idx = shirtStore.texts.findIndex((t) => t.id === id);
    if (idx !== -1) shirtStore.texts.splice(idx, 1);
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter text (e.g. TEAM NAME, #42...)"
          className="bg-background/50"
          onKeyDown={(e) => e.key === 'Enter' && addText()}
          data-testid="input-text-content"
        />
      </div>

      {/* Font family */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Font</p>
        <div className="grid grid-cols-2 gap-1.5">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFontFamily(f.id)}
              className={`text-xs py-2 px-2 rounded-md border transition-all text-left truncate ${
                fontFamily === f.id
                  ? 'border-primary/70 bg-primary/10 text-foreground'
                  : 'border-border/40 bg-background/30 text-muted-foreground hover:border-border'
              }`}
              style={{ fontFamily: f.id }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Size</p>
        <div className="flex gap-1">
          {(['small', 'medium', 'large'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFontSize(s)}
              className={`flex-1 py-1.5 text-xs rounded-md border capitalize transition-all ${
                fontSize === s
                  ? 'border-primary/70 bg-primary/10 text-foreground'
                  : 'border-border/40 bg-background/30 text-muted-foreground hover:border-border'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Text Color</p>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded overflow-hidden border border-border/50 shrink-0">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute -inset-2 w-12 h-12 cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            {['#ffffff', '#000000', '#ef4444', '#3b82f6', '#fbbf24', '#22c55e'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                  color === c ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <PositionGrid value={position} onChange={setPosition} />

      <Button
        className="w-full"
        onClick={addText}
        disabled={!content.trim()}
        data-testid="button-add-text"
      >
        <AlignCenter className="w-4 h-4 mr-2" />
        Add Text to Shirt
      </Button>

      {snap.texts.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Text layers</p>
          {snap.texts.map((text) => (
            <div
              key={text.id}
              className="flex items-center gap-3 bg-muted/20 rounded-lg p-2.5 border border-border/40"
            >
              <div
                className="w-10 h-10 rounded bg-background/60 flex items-center justify-center shrink-0 overflow-hidden"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <span
                  className="text-[9px] font-bold truncate px-1 text-center leading-none"
                  style={{ color: text.color, fontFamily: text.fontFamily }}
                >
                  {text.content}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{text.content}</p>
                <p className="text-[10px] text-muted-foreground">
                  {text.fontFamily} · {text.fontSize} · {POSITIONS.find((p) => p.id === text.position)?.label}
                </p>
              </div>
              <button
                onClick={() => removeText(text.id)}
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── exported tab ────────────────────────────────────────────────────────────
export default function DesignTab() {
  const [subTab, setSubTab] = useState<'logo' | 'text'>('logo');

  return (
    <div className="space-y-5">
      {/* sub-tabs */}
      <div className="flex bg-muted/40 rounded-lg p-0.5 gap-0.5">
        <button
          onClick={() => setSubTab('logo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${
            subTab === 'logo'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Logo
        </button>
        <button
          onClick={() => setSubTab('text')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${
            subTab === 'text'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Text
        </button>
      </div>

      {subTab === 'logo' ? <LogoSection /> : <TextSection />}
    </div>
  );
}

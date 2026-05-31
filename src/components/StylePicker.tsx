import { type ReactElement } from 'react';
import { useSnapshot } from 'valtio';
import { shirtStore, ShirtCut, LayoutStyle } from '@/store/shirtStore';

// ─── Shirt cut data ──────────────────────────────────────────────────────────
const CUTS: { id: ShirtCut; label: string; desc: string; svg: string }[] = [
  {
    id: 'crew',
    label: 'Plain Crew Neck',
    desc: 'Round neck, clean and professional',
    svg: `<svg viewBox="0 0 60 70" fill="currentColor">
      <path d="M15,10 Q30,4 45,10 L55,18 L50,24 L42,20 L42,62 L18,62 L18,20 L10,24 L5,18 Z"/>
    </svg>`,
  },
  {
    id: 'raglan',
    label: 'Raglan',
    desc: 'Different-colored sleeves extending to collar',
    svg: `<svg viewBox="0 0 60 70" fill="currentColor">
      <path d="M18,20 L42,20 L42,62 L18,62 Z" opacity="0.9"/>
      <path d="M18,20 L5,18 L10,24 L18,20Z M42,20 L55,18 L50,24 L42,20Z" opacity="0.4"/>
      <path d="M18,20 Q24,8 30,6 Q36,8 42,20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>`,
  },
  {
    id: 'baseball-raglan',
    label: 'Baseball Raglan',
    desc: '3/4 sleeves, classic sporty look',
    svg: `<svg viewBox="0 0 60 70" fill="currentColor">
      <path d="M18,20 L42,20 L42,62 L18,62 Z" opacity="0.9"/>
      <path d="M18,20 L3,16 L7,28 L18,26Z M42,20 L57,16 L53,28 L42,26Z" opacity="0.4"/>
      <path d="M18,20 Q24,8 30,6 Q36,8 42,20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>`,
  },
  {
    id: 'vneck',
    label: 'V-Neck',
    desc: 'Modern and casual open collar',
    svg: `<svg viewBox="0 0 60 70" fill="currentColor">
      <path d="M15,10 Q22,6 30,16 Q38,6 45,10 L55,18 L50,24 L42,20 L42,62 L18,62 L18,20 L10,24 L5,18 Z"/>
    </svg>`,
  },
  {
    id: 'polo',
    label: 'Polo Shirt',
    desc: 'Collar with buttons, most formal option',
    svg: `<svg viewBox="0 0 60 70" fill="currentColor">
      <path d="M20,8 L40,8 L45,14 L55,18 L50,24 L42,20 L42,62 L18,62 L18,20 L10,24 L5,18 L15,14 Z"/>
      <rect x="28" y="8" width="4" height="14" rx="1" opacity="0.4"/>
      <circle cx="30" cy="13" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="30" cy="18" r="1.5" fill="white" opacity="0.7"/>
    </svg>`,
  },
  {
    id: 'henley',
    label: 'Henley',
    desc: 'Round neck with 2–3 buttons',
    svg: `<svg viewBox="0 0 60 70" fill="currentColor">
      <path d="M15,10 Q30,4 45,10 L55,18 L50,24 L42,20 L42,62 L18,62 L18,20 L10,24 L5,18 Z"/>
      <rect x="28" y="8" width="4" height="10" rx="1" opacity="0.4"/>
      <circle cx="30" cy="11" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="30" cy="15" r="1.2" fill="white" opacity="0.7"/>
    </svg>`,
  },
];

// ─── Layout style data ───────────────────────────────────────────────────────
const LAYOUTS: { id: LayoutStyle; label: string; preview: () => ReactElement }[] = [
  {
    id: 'plain',
    label: 'Plain / Minimalist',
    preview: () => <div className="w-full h-full bg-current rounded-sm" />,
  },
  {
    id: 'shoulder-stripe',
    label: 'Shoulder Stripe',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-[18%] left-0 right-0 h-[12%] bg-white/30" />
      </div>
    ),
  },
  {
    id: 'chest-stripe',
    label: 'Chest Stripe',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-[38%] left-0 right-0 h-[14%] bg-white/30" />
      </div>
    ),
  },
  {
    id: 'double-chest-stripe',
    label: 'Double Chest Stripe',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-[36%] left-0 right-0 h-[7%] bg-white/30" />
        <div className="absolute top-[47%] left-0 right-0 h-[7%] bg-white/30" />
      </div>
    ),
  },
  {
    id: 'color-block-chest',
    label: 'Color Block Chest',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-[24%] left-0 right-0 h-[26%] bg-white/30" />
      </div>
    ),
  },
  {
    id: 'side-panels',
    label: 'Side Panels',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-[18%] bg-white/30" />
        <div className="absolute top-0 bottom-0 right-0 w-[18%] bg-white/30" />
      </div>
    ),
  },
  {
    id: 'shoulder-panel',
    label: 'Shoulder Panel',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-[10%] left-[8%] right-[8%] h-[22%] bg-white/30 rounded-sm" />
      </div>
    ),
  },
  {
    id: 'yoke',
    label: 'Yoke Design',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-white/30" />
      </div>
    ),
  },
  {
    id: 'diagonal-stripe',
    label: 'Diagonal Stripe',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div
          className="absolute inset-0 bg-white/30"
          style={{ clipPath: 'polygon(0 40%, 100% 25%, 100% 40%, 0 55%)' }}
        />
      </div>
    ),
  },
  {
    id: 'asymmetrical',
    label: 'Asymmetrical',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-[45%] bg-white/25" />
      </div>
    ),
  },
  {
    id: 'piping',
    label: 'Piping Design',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden border-2 border-white/30">
        <div className="absolute top-0 left-0 right-0 h-[4%] bg-white/40" />
        <div className="absolute bottom-0 left-0 right-0 h-[4%] bg-white/40" />
      </div>
    ),
  },
  {
    id: 'chevron',
    label: 'Chevron',
    preview: () => (
      <div className="w-full h-full bg-current rounded-sm relative overflow-hidden">
        <div
          className="absolute inset-0 bg-white/30"
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 50% 40%)' }}
        />
      </div>
    ),
  },
  {
    id: 'gradient',
    label: 'Gradient',
    preview: () => (
      <div className="w-full h-full rounded-sm bg-gradient-to-b from-white/50 to-transparent" />
    ),
  },
  {
    id: 'full-sublimation',
    label: 'Full Sublimation',
    preview: () => (
      <div
        className="w-full h-full rounded-sm"
        style={{
          background: 'linear-gradient(135deg, currentColor 0%, rgba(255,255,255,0.5) 50%, currentColor 100%)',
        }}
      />
    ),
  },
  {
    id: 'split-color',
    label: 'Split Color',
    preview: () => (
      <div className="w-full h-full rounded-sm overflow-hidden flex">
        <div className="flex-1 bg-current" />
        <div className="flex-1 bg-white/40" />
      </div>
    ),
  },
];

export default function StylePicker() {
  const snap = useSnapshot(shirtStore);

  return (
    <div className="space-y-8">
      {/* ── Shirt Cut ── */}
      <div>
        <h3 className="text-sm font-medium mb-1">Shirt Cut</h3>
        <p className="text-xs text-muted-foreground mb-3">Choose the collar and sleeve style</p>
        <div className="grid grid-cols-3 gap-2">
          {CUTS.map((cut) => {
            const active = snap.shirtCut === cut.id;
            return (
              <button
                key={cut.id}
                data-testid={`cut-${cut.id}`}
                onClick={() => (shirtStore.shirtCut = cut.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                  active
                    ? 'border-primary/70 bg-primary/10 text-foreground'
                    : 'border-border/40 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                <div
                  className="w-10 h-10 text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: cut.svg }}
                />
                <div className="text-[11px] font-medium leading-tight">{cut.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Accent Color ── */}
      <div className="pt-2 border-t border-border/30">
        <h3 className="text-sm font-medium mb-1">Accent Color</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Used for sleeves (raglan), stripes, panels, and patterns
        </p>
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded overflow-hidden border border-border/50 shrink-0">
            <input
              type="color"
              value={snap.accentColor}
              onChange={(e) => (shirtStore.accentColor = e.target.value)}
              className="absolute -inset-2 w-14 h-14 cursor-pointer"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['#ffffff', '#e2e8f0', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#111111', '#6366f1'].map((c) => (
              <button
                key={c}
                onClick={() => (shirtStore.accentColor = c)}
                className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                  snap.accentColor === c ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Layout Style ── */}
      <div className="pt-2 border-t border-border/30">
        <h3 className="text-sm font-medium mb-1">Design Layout</h3>
        <p className="text-xs text-muted-foreground mb-3">Pattern applied over the shirt</p>
        <div className="grid grid-cols-3 gap-2">
          {LAYOUTS.map(({ id, label, preview: Preview }) => {
            const active = snap.layoutStyle === id;
            return (
              <button
                key={id}
                data-testid={`layout-${id}`}
                onClick={() => (shirtStore.layoutStyle = id)}
                className={`flex flex-col gap-2 p-2 rounded-xl border transition-all text-left ${
                  active
                    ? 'border-primary/70 bg-primary/10'
                    : 'border-border/40 bg-background/30 hover:border-border'
                }`}
              >
                <div
                  className="w-full aspect-video rounded overflow-hidden"
                  style={{ color: snap.color }}
                >
                  <Preview />
                </div>
                <span className="text-[10px] font-medium leading-tight px-1 text-foreground/80">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

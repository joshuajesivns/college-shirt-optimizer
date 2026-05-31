import { useSnapshot } from 'valtio';
import { shirtStore } from '@/store/shirtStore';
import { motion, AnimatePresence } from 'framer-motion';
import ColorPicker from './ColorPicker';
import StylePicker from './StylePicker';
import DesignTab from './DesignTab';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Palette, Layers, Scissors, PenTool } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const TABS = [
  { id: 'colors',  label: 'Colors',  Icon: Palette   },
  { id: 'style',   label: 'Style',   Icon: Scissors  },
  { id: 'design',  label: 'Design',  Icon: PenTool   },
  { id: 'materials', label: 'Materials', Icon: Layers },
];

export default function DesignPanel() {
  const snap = useSnapshot(shirtStore);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'custom-shirt.png';
    link.href = document.querySelector('canvas')?.toDataURL('image/png') || '';
    link.click();
    toast({ title: 'Design exported' });
  };

  const resetAll = () => {
    shirtStore.color = '#111111';
    shirtStore.accentColor = '#ffffff';
    shirtStore.shirtCut = 'crew';
    shirtStore.layoutStyle = 'plain';
    shirtStore.texts.splice(0);
    shirtStore.logos.splice(0);
    toast({ title: 'Design reset' });
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="p-5 border-b border-border/50 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-medium tracking-tight">Studio</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Configure your drop</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={resetAll} title="Reset all">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleDownload}
            className="gap-2 bg-foreground text-background hover:bg-foreground/90"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-4 shrink-0">
        <div className="flex bg-muted/50 rounded-lg p-1 gap-0.5">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              data-testid={`tab-${id}`}
              onClick={() => (shirtStore.activeTab = id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-md transition-all ${
                snap.activeTab === id
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          {snap.activeTab === 'colors' && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <ColorPicker />
            </motion.div>
          )}

          {snap.activeTab === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <StylePicker />
            </motion.div>
          )}

          {snap.activeTab === 'design' && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <DesignTab />
            </motion.div>
          )}

          {snap.activeTab === 'materials' && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-medium mb-1">Fabric Materials</h3>
                <p className="text-xs text-muted-foreground mb-4">Select the physical material finish</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Cotton Heavyweight', active: true },
                    { label: 'Washed Vintage',     active: false },
                    { label: 'Technical Mesh',     active: false },
                    { label: 'Brushed Fleece',     active: false },
                    { label: 'Pique Polo',         active: false },
                    { label: 'Dri-Fit Sport',      active: false },
                  ].map(({ label, active }, i) => (
                    <div
                      key={i}
                      className={`border border-border/50 rounded-lg p-3 cursor-pointer transition-colors ${
                        active ? 'bg-muted/50 border-primary/50' : 'bg-background/30 hover:border-border'
                      }`}
                    >
                      <div className="w-full aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                        <div
                          className="w-full h-full opacity-20"
                          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
                        />
                      </div>
                      <div className="text-xs font-medium">{label}</div>
                      {!active && <div className="text-[10px] text-muted-foreground mt-0.5">Coming soon</div>}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border/50 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground shrink-0">
        <div className="flex items-center gap-2">
          <span>Auto-rotate</span>
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-2 text-[10px] uppercase tracking-wider ${
              snap.autoRotate ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}
            onClick={() => (shirtStore.autoRotate = !snap.autoRotate)}
          >
            {snap.autoRotate ? 'On' : 'Off'}
          </Button>
        </div>
        <div>
          Hold <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px]">Left Click</kbd> to rotate
        </div>
      </div>
    </motion.div>
  );
}

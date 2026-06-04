import React from 'react';
import { useSnapshot } from 'valtio';
import { shirtStore } from '@/store/shirtStore';

const ShirtPreview2D = () => {
  const snap = useSnapshot(shirtStore);

  // High-Fidelity Realistic Garment Paths
  const renderFront = () => {
    switch (snap.shirtCut) {
      case 'raglan':
      case 'baseball-raglan':
        return (
          <g>
            {/* Body Panel - Realistic Tapered Shape */}
            <path 
              d="M190,105 C230,125 270,125 310,105 L370,460 Q250,475 130,460 Z" 
              fill={snap.color} 
              stroke="#222" 
              strokeWidth="1" 
            />
            {/* Left Raglan Sleeve - Sweeping Diagonal Seam */}
            <path 
              d="M190,105 C140,115 100,140 60,170 L95,300 Q130,260 145,230 C165,180 175,140 190,105 Z" 
              fill={snap.accentColor} 
              stroke="#222" 
              strokeWidth="1" 
            />
            {/* Right Raglan Sleeve - Sweeping Diagonal Seam */}
            <path 
              d="M310,105 C360,115 400,140 440,170 L405,300 Q370,260 355,230 C335,180 325,140 310,105 Z" 
              fill={snap.accentColor} 
              stroke="#222" 
              strokeWidth="1" 
            />
            {/* Realistic Collar Band */}
            <path 
              d="M190,105 Q250,145 310,105 L315,95 Q250,135 185,95 Z" 
              fill={snap.collarColor} 
              stroke="#222" 
              strokeWidth="0.8" 
            />
          </g>
        );
      case 'box-tee':
        return (
          <g>
            {/* Boxy Body */}
            <path d="M120,120 L380,120 L390,470 L110,470 Z" fill={snap.color} stroke="#222" strokeWidth="2" />
            {/* Oversized Sleeves */}
            <path d="M120,120 L40,170 L60,330 L120,310 Z" fill={snap.color} stroke="#222" strokeWidth="1.5" />
            <path d="M380,120 L460,170 L440,330 L380,310 Z" fill={snap.color} stroke="#222" strokeWidth="1.5" />
            {/* Thick Ribbed Collar */}
            <path d="M210,100 Q250,135 290,100 L300,120 Q250,155 200,120 Z" fill={snap.collarColor} stroke="#222" strokeWidth="1.5" />
          </g>
        );
      default: // Standard Crew / Ringer
        const isRinger = snap.shirtCut === 'ringer';
        return (
          <g>
            {/* Standard T-Shirt Silhouette */}
            <path 
              d="M150,120 Q250,100 350,120 L450,180 L420,300 L370,260 L385,460 Q250,475 115,460 L130,260 L80,300 L50,180 Z" 
              fill={snap.color} 
              stroke="#222" 
              strokeWidth="1.2" 
            />
            {/* Collar */}
            <path 
              d="M200,100 Q250,140 300,100 L310,120 Q250,160 190,120 Z" 
              fill={isRinger ? snap.collarColor : snap.color} 
              stroke="#222" 
              strokeWidth="1" 
            />
            {/* Ringer Cuffs */}
            {isRinger && (
              <g>
                <path d="M50,180 L80,300 L95,290 L65,190 Z" fill={snap.cuffColor} />
                <path d="M450,180 L420,300 L405,290 L435,190 Z" fill={snap.cuffColor} />
              </g>
            )}
          </g>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] p-10 overflow-hidden">
      <div className="relative w-full max-w-[650px] aspect-square bg-[#151515] rounded-[2.5rem] border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl">
        
        {/* Fabric Detail Filter (Subtle grain to look real) */}
        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer>
               <feFuncA type="linear" slope="0.05"/>
            </feComponentTransfer>
            <feComposite operator="in" in2="SourceGraphic"/>
          </filter>
        </svg>

        <svg viewBox="0 0 500 500" width="95%" height="95%" className="drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)]">
           <g filter="url(#grain)">
              {snap.view === 'front' ? renderFront() : <g><rect x="100" y="100" width="300" height="350" fill={snap.color} rx="20" /><text x="250" y="280" textAnchor="middle" fill="white" opacity="0.2">BACK PREVIEW</text></g>}
           </g>
           
           {/* Branding Layers */}
           {snap.logos.map((logo) => (
             <image 
                key={logo.id}
                href={logo.url}
                x={logo.x || 210}
                y={logo.y || 160}
                width={80}
                height={80}
             />
           ))}

           {snap.texts.map((text) => (
             <text
                key={text.id}
                x={text.x || 250}
                y={text.y || 320}
                fill={text.color}
                fontSize={text.fontSize === 'small' ? 24 : text.fontSize === 'medium' ? 36 : 48}
                fontFamily={text.fontFamily}
                textAnchor="middle"
                fontWeight="bold"
                className="select-none"
             >
                {text.content}
             </text>
           ))}
        </svg>
        
        {/* Toggle UI */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex p-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <button 
                className={`px-8 py-2.5 rounded-full text-[11px] font-black tracking-[0.15em] transition-all duration-300 ${snap.view === 'front' ? 'bg-white text-black shadow-lg scale-105' : 'bg-transparent text-white/30 hover:text-white/60'}`}
                onClick={() => shirtStore.view = 'front'}
            >
                FRONT
            </button>
            <button 
                className={`px-8 py-2.5 rounded-full text-[11px] font-black tracking-[0.15em] transition-all duration-300 ${snap.view === 'back' ? 'bg-white text-black shadow-lg scale-105' : 'bg-transparent text-white/30 hover:text-white/60'}`}
                onClick={() => shirtStore.view = 'back'}
            >
                BACK
            </button>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="h-[1px] w-12 bg-white/20" />
        <p className="text-[11px] text-white/40 uppercase tracking-[0.4em] font-black">Technical Garment Master</p>
      </div>
    </div>
  );
};

export default ShirtPreview2D;

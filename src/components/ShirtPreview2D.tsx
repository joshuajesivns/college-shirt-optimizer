import React from 'react';
import { useSnapshot } from 'valtio';
import { shirtStore } from '@/store/shirtStore';

const ShirtPreview2D = () => {
  const snap = useSnapshot(shirtStore);

  const renderFront = () => {
    switch (snap.shirtCut) {
      case 'raglan':
      case 'baseball-raglan':
        const isBaseball = snap.shirtCut === 'baseball-raglan';
        return (
          <g>
            {/* Body */}
            <path d="M180,100 L320,100 L380,450 L120,450 Z" fill={snap.color} stroke="#333" strokeWidth="1.5" />
            {/* Left Raglan Sleeve */}
            <path d="M180,100 L120,130 L50,180 L80,280 L125,230 Z" fill={snap.accentColor} stroke="#333" strokeWidth="1.5" />
            <path d="M180,100 L250,120 L125,230 Z" fill={snap.accentColor} /> {/* Seam curve fill */}
            {/* Right Raglan Sleeve */}
            <path d="M320,100 L380,130 L450,180 L420,280 L375,230 Z" fill={snap.accentColor} stroke="#333" strokeWidth="1.5" />
            <path d="M320,100 L250,120 L375,230 Z" fill={snap.accentColor} />
            {/* Collar */}
            <path d="M200,85 Q250,125 300,85 L310,100 Q250,140 190,100 Z" fill={snap.collarColor} stroke="#333" strokeWidth="1" />
          </g>
        );
      case 'ringer':
        return (
          <g>
            {/* Body */}
            <path d="M150,110 L350,110 L450,180 L420,280 L380,450 L120,450 L80,280 L50,180 Z" fill={snap.color} stroke="#333" strokeWidth="1.5" />
            {/* Ringer Collar */}
            <path d="M200,85 Q250,125 300,85 L310,100 Q250,140 190,100 Z" fill={snap.collarColor} stroke="#333" strokeWidth="1" />
            {/* Ringer Cuffs */}
            <path d="M50,180 L80,280 L95,270 L65,190 Z" fill={snap.cuffColor} />
            <path d="M450,180 L420,280 L405,270 L435,190 Z" fill={snap.cuffColor} />
          </g>
        );
      case 'polo':
        return (
          <g>
            {/* Body */}
            <path d="M150,110 L350,110 L450,180 L420,280 L380,450 L120,450 L80,280 L50,180 Z" fill={snap.color} stroke="#333" strokeWidth="1.5" />
            {/* Polo Collar */}
            <path d="M180,100 L320,100 L350,70 L250,90 L150,70 Z" fill={snap.collarColor} stroke="#333" strokeWidth="1.5" />
            {/* Placket */}
            <path d="M240,100 L260,100 L260,220 L240,220 Z" fill={snap.collarColor} stroke="#333" strokeWidth="0.5" />
            <circle cx="250" cy="130" r="2" fill="white" />
            <circle cx="250" cy="170" r="2" fill="white" />
          </g>
        );
      case 'box-tee':
        return (
          <g>
            {/* Dropped Shoulder Body */}
            <path d="M100,120 L400,120 L410,480 L90,480 Z" fill={snap.color} stroke="#333" strokeWidth="2.5" />
            {/* Wide Sleeves */}
            <path d="M100,120 L20,180 L40,320 L100,300 Z" fill={snap.color} stroke="#333" strokeWidth="2" />
            <path d="M400,120 L480,180 L460,320 L400,300 Z" fill={snap.color} stroke="#333" strokeWidth="2" />
            {/* Thick Collar */}
            <path d="M210,95 Q250,135 290,95 L300,120 Q250,160 200,120 Z" fill={snap.collarColor} stroke="#333" strokeWidth="2" />
          </g>
        );
      default: // Plain Crew
        return (
          <g>
            <path d="M150,110 L350,110 L450,180 L420,280 L380,450 L120,450 L80,280 L50,180 Z" fill={snap.color} stroke="#333" strokeWidth="1.5" />
            <path d="M200,85 Q250,125 300,85 L310,100 Q250,140 190,100 Z" fill={snap.color} stroke="#333" strokeWidth="1" />
          </g>
        );
    }
  };

  const renderBack = () => {
     // Back view is mirror of front but with a higher neckline
     return (
       <g opacity="0.8">
          <rect x="100" y="100" width="300" height="350" fill={snap.color} stroke="#666" />
          <text x="250" y="250" textAnchor="middle" className="text-[10px] fill-gray-400 font-bold">BACK VIEW TEMPLATE</text>
       </g>
     )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] p-10 overflow-hidden">
      <div className="relative w-full max-w-[600px] aspect-square bg-[#111] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Subtle Background Radial */}
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-20 pointer-events-none" />

        <svg viewBox="0 0 500 500" width="90%" height="90%" className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
           {snap.view === 'front' ? renderFront() : renderBack()}
           
           {/* Logo Overlays */}
           {snap.logos.map((logo) => (
             <image 
                key={logo.id}
                href={logo.url}
                x={logo.x || 190}
                y={logo.y || 160}
                width={80}
                height={80}
             />
           ))}

           {/* Text Overlays */}
           {snap.texts.map((text) => (
             <text
                key={text.id}
                x={text.x || 250}
                y={text.y || 300}
                fill={text.color}
                fontSize={text.fontSize === 'small' ? 24 : text.fontSize === 'medium' ? 36 : 48}
                fontFamily={text.fontFamily}
                textAnchor="middle"
                fontWeight="bold"
             >
                {text.content}
             </text>
           ))}
        </svg>
        
        {/* Modern View Toggle */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            <button 
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${snap.view === 'front' ? 'bg-white text-black' : 'bg-transparent text-white/40 hover:text-white'}`}
                onClick={() => shirtStore.view = 'front'}
            >
                FRONT
            </button>
            <button 
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${snap.view === 'back' ? 'bg-white text-black' : 'bg-transparent text-white/40 hover:text-white'}`}
                onClick={() => shirtStore.view = 'back'}
            >
                BACK
            </button>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Vector Technical Specification</p>
        <p className="text-[9px] text-white/20 uppercase tracking-widest">Pixel-Perfect Garment Mapping</p>
      </div>
    </div>
  );
};

export default ShirtPreview2D;

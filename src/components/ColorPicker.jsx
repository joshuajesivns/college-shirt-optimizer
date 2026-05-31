import React, { useState } from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const [activePart, setActivePart] = useState('body');

  // University themed colors
  const colors = [
    "#EFBD4E", "#80C670", "#726DE8", "#353934", "#2CCCE4", "#ff8a00", "#7098DA", "#C19277", "#FF96AD", "#512314", "#5F123D"
  ];

  return (
    <div className="absolute left-full ml-3">
       <div className="flex flex-col gap-2 p-3 bg-white rounded-md shadow-lg w-[180px]">
          <div className="flex gap-1 mb-2">
            <button 
              className={`flex-1 text-[10px] py-1 border rounded ${activePart === 'body' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => setActivePart('body')}
            >
              Body
            </button>
            <button 
              className={`flex-1 text-[10px] py-1 border rounded ${activePart === 'sleeves' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => setActivePart('sleeves')}
            >
              Sleeves
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div 
                key={color}
                className="w-6 h-6 rounded-full cursor-pointer border border-gray-200"
                style={{ backgroundColor: color }}
                onClick={() => state.colors[activePart] = color}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px]">Custom:</span>
            <input 
              type="color" 
              className="flex-1 h-6 cursor-pointer"
              value={snap.colors[activePart]}
              onChange={(e) => state.colors[activePart] = e.target.value}
            />
          </div>
       </div>
    </div>
  )
}

export default ColorPicker

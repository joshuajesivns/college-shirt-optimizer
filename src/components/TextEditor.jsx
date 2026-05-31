import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const TextEditor = () => {
  const snap = useSnapshot(state);

  const fonts = [
    'Inter', 'Nunito Sans', 'serif', 'sans-serif', 'monospace', 'Impact', 'Arial Black'
  ];

  return (
    <div className="absolute left-full ml-3 glassmorphism p-3 w-[200px] flex flex-col gap-3 rounded-md shadow-lg">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-700">Text Content</label>
        <input 
          type="text"
          className="p-1 text-sm border rounded"
          value={snap.text}
          onChange={(e) => state.text = e.target.value}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-700">Font Style</label>
        <select 
          className="p-1 text-sm border rounded"
          value={snap.textFont}
          onChange={(e) => state.textFont = e.target.value}
        >
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-700">Text Color</label>
        <input 
          type="color"
          className="w-full h-8 cursor-pointer"
          value={snap.textColor}
          onChange={(e) => state.textColor = e.target.value}
        />
      </div>
    </div>
  )
}

export default TextEditor

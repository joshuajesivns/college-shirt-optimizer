import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const StylesEditor = () => {
  const snap = useSnapshot(state);

  const styles = [
    { name: 'Plain', value: 'plain' },
    { name: 'Raglan', value: 'raglan' },
    { name: 'Striped', value: 'striped' },
  ];

  return (
    <div className="absolute left-full ml-3 glassmorphism p-3 w-[200px] flex flex-col gap-3 rounded-md shadow-lg">
      <label className="text-xs font-bold text-gray-700">Shirt Style</label>
      <div className="flex flex-col gap-2">
        {styles.map((style) => (
          <button
            key={style.value}
            className={`p-2 text-sm border rounded hover:bg-gray-100 ${snap.style === style.value ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
            onClick={() => state.style = style.value}
          >
            {style.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default StylesEditor

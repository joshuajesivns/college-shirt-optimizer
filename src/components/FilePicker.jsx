import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'
import CustomButton from './CustomButton'

const FilePicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state);

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload Image
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : file.name}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-[10px] font-bold text-gray-700">Logo Placement</label>
        <div className="flex gap-1">
          {['chest', 'left_sleeve', 'right_sleeve'].map((place) => (
            <button
              key={place}
              className={`text-[9px] px-2 py-1 border rounded capitalize ${snap.logoPlacement === place ? 'bg-blue-100 border-blue-500 font-bold' : 'bg-white'}`}
              onClick={() => state.logoPlacement = place}
            >
              {place.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton 
          type="outline"
          title="Apply Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton 
          type="filled"
          title="Apply Pattern"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker

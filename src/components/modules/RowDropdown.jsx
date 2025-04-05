import React from "react"

function RowDropdown({ onSelect }) {
  return (
    <div className="text-black flex flex-col bg-white border border-ocean/50 shadow-lg rounded-xl">
      <span
        onClick={() => onSelect(5)}
        className="px-4 py-2 cursor-pointer hover:bg-ocean/20 rounded-t-xl"
      >
        5
      </span>
      <span
        onClick={() => onSelect(10)}
        className="px-4 py-2 cursor-pointer hover:bg-ocean/20"
      >
        10
      </span>
      <span
        onClick={() => onSelect(15)}
        className="px-4 py-2 cursor-pointer hover:bg-ocean/20 rounded-b-xl"
      >
        15
      </span>
    </div>
  )
}

export default RowDropdown

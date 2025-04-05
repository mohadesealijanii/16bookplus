import React, { useState, useRef, useEffect } from "react"

import { IoChevronDown } from "react-icons/io5"

function IsFree({ pagination, setPagination }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedOption, setSelectedOption] = useState("all")
  const dropdownRef = useRef(null)

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev)
  }

  const handleOptionClick = (option) => {
    let offer = pagination.isOffer
    if (option === "on offer") {
      offer = true
    } else if (option === "not on offer") {
      offer = false
    } else if (option === "all") {
      offer = null
    }
    setSelectedOption(option)
    setPagination((prev) => ({
      ...prev,
      isOffer: offer,
    }))
    setOpenMenu(false)
    console.log(pagination)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const options = ["all", "on offer", "not on offer"]

  return (
    <div className="relative w-32 ml-2 mt-3" ref={dropdownRef}>
      <div
        className="flex justify-between rounded-xl bg-ocean/15 border border-ocean/50 py-1 px-2 cursor-pointer"
        onClick={toggleMenu}
      >
        {selectedOption}
        <span className="p-1">
          <IoChevronDown />
        </span>
      </div>
      {openMenu && (
        <div className="absolute z-10 mt-1 w-full rounded-xl bg-white border border-ocean/50 shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-2 py-1 hover:bg-ocean/20 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default IsFree

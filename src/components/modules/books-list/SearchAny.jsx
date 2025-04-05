import React, { useState, useEffect } from "react"
import Input from "../Input"

function SearchAny({ setPagination }) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      title: search,
    }))
  }, [search, setPagination])

  return (
    <div className="pl-2">
      <Input
        placeholder="Search Any"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label= "Search Any"
      />
    </div>
  )
}

export default SearchAny

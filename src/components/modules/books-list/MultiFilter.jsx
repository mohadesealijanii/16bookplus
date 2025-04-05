import { useEffect, useRef, useState } from "react"
import Icons from "../Icons"
import { GoTrash } from "react-icons/go"
import { getAllCategories } from "../../../utils/services"

const MultiFiter = ({ setPagination }) => {
  const [state, setState] = useState({
    query: "",
    selected: [],
    menuOpen: false,
    categories: [],
  })
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        if (data) {
          setState((prevState) => ({
            ...prevState,
            categories: data.map((item) => item.title),
          }))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      category: state.selected.join(",") || "",
      pageNumber: 1,
    }))
  }, [state.selected, setPagination])

  const inputRef = useRef(null)

  const remainedCategories = state.categories.filter(
    (item) =>
      item
        ?.toLocaleLowerCase()
        ?.includes(state.query.toLocaleLowerCase()?.trim()) &&
      !state.selected.includes(item)
  )
  return (
    <div className="card relative flex flex-nowrap max-h-12 w-48 lg:w-77 rounded-xl border border-ocean/50 ml-2 mt-3 mb-2">
      <div className="text-sm w-full">
        <input
          ref={inputRef}
          type="text"
          value={state.query}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              query: e.target.value.trimStart(),
            }))
          }
          placeholder={state.selected.length ? null : "Search & Filter"}
          className="pb-1 focus:outline-none px-2 w-full h-13 z-1
          
          "
          onFocus={() =>
            setState((prevState) => ({ ...prevState, menuOpen: true }))
          }
          maxLength={10}
          onBlur={() =>
            setState((prevState) => ({ ...prevState, menuOpen: false }))
          }
        />

        {state.selected.length > 0 && (
          <div className="text-xs flex flex-nowrap gap-1 mb-2 -mt-11 pl-1">
            {state.selected
              .slice(0, window.innerWidth < 900 ? 1 : 2)
              .map((tag) => (
                <div
                  key={tag}
                  className="rounded-full w-fit h-8 py-1 px-3 border border-ocean/50 bg-ocean/5 text-gray-500 flex items-center gap-1"
                >
                  <span className="max-w-13 truncate overflow-hidden whitespace-nowrap">
                    {tag}
                  </span>
                  {window.innerWidth >= 900 && (
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        setState((prevState) => ({
                          ...prevState,
                          selected: prevState.selected.filter((i) => i !== tag),
                        }))
                      }
                    >
                      <Icons.Close />
                    </div>
                  )}
                </div>
              ))}
            {state.selected.length > (window.innerWidth < 900 ? 1 : 2) && (
              <div className="rounded-full w-fit text-nowrap h-8 py-1.5 px-3 border border-ocean/50 bg-ocean/5 text-gray-500 flex items-center gap-1">
                +{state.selected.length - (window.innerWidth < 900 ? 1 : 2)}{" "}
                more
              </div>
            )}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer">
              <span
                className="cursor-pointer text-red-900"
                onClick={() => {
                  setState((prevState) => ({ ...prevState, selected: [] }))
                  inputRef.current?.focus(),
                    setPagination((prev) => ({
                      ...prev,
                      pageNumber: 1,
                      category: "",
                    }))
                }}
              >
                <GoTrash size={19} />
              </span>
            </div>
          </div>
        )}

        {state.menuOpen && (
          <div
            className="
          card absolute z-10 w-full bg-ocean border text-white border-ocean/50 shadow-2xl rounded-xl max-h-52 -mt-0.5 flex overflow-y-scroll px-3 py-2"
          >
            <ul className="w-full">
              {remainedCategories.length > 0 ? (
                remainedCategories.map((tag) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer hover:bg-white/90 hover:text-ocean rounded-md w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setState((prevState) => ({
                        ...prevState,
                        selected: [...prevState.selected, tag],
                        query: "",
                      }))
                    }
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No Categories Available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiFiter

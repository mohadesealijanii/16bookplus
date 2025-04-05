import React, { useEffect, useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { MdArrowDropUp, MdOutlineLocalOffer } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import RowDropdown from "./RowDropdown";
import { getAllBooks } from "../../utils/services";
import IsFree from "../modules/books-list/IsFree";
import SearchAny from "../modules/books-list/SearchAny";
import DetailRow from "../modules/books-list/DetailRow";
import { TbCurrencyDollarOff } from "react-icons/tb";

function Table({
  data,
  columns,
  title,
  pagination,
  setPagination,
  totalData,
  setData,
  loading,
  setLoading,
  detailRow,
  setDetailRow,
  customHeaderContent,
}) {
  const totPages = Math.ceil(totalData / pagination.pageSize);
  const thisPage = pagination.pageNumber;
  const [dropdown, setDropdown] = useState(false);
  const [paginator, setPaginator] = useState({
    currentPage: thisPage,
    jumpInput: "",
  });

  const handleNext = async () => {
    if (thisPage < totPages) {
      const newCurrentPage = thisPage + 1;
      setPagination({ ...pagination, pageNumber: newCurrentPage });
      setPaginator((prev) => ({ ...prev, jumpInput: "" }));
      setLoading(true);
      setData({ data: [] });
      try {
        await getAllBooks({
          pagination: { ...pagination, pageNumber: newCurrentPage },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevious = async () => {
    if (thisPage > 1) {
      const newCurrentPage = thisPage - 1;
      setPagination({ ...pagination, pageNumber: newCurrentPage });
      setPaginator((prev) => ({ ...prev, jumpInput: "" }));
      setLoading(true);
      setData({ data: [] });
      try {
        console.log("second");
        await getAllBooks({
          pagination: { ...pagination, pageNumber: newCurrentPage },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const jumpHandler = async (e) => {
    const input = e.target.value;
    setPaginator((prev) => ({ ...prev, jumpInput: input }));
    let targetPage = +input;
    if (!input || targetPage < 1 || targetPage > totPages) {
      toast.error(`Page must be between 1 to ${totPages}`);
      targetPage = 1;
    }
    setPagination({ ...pagination, pageNumber: targetPage });
    setLoading(true);
    try {
      console.log("third");
      await getAllBooks({
        pagination: { ...pagination, pageNumber: targetPage },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const dropdownHandler = () => {
    setDropdown((prev) => !prev);
  };

  const handleRowsChange = (newRows) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newRows,
      pageNumber: 1,
    }));
    setDropdown(false);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-self-start flex-1 min-w-0 max-w-full overflow-x-hidden">
        <Sidebar />
        <div className="w-screen shadow-md max-h-fit md:min-w-max min-w-100 rounded-b-2xl">
          <div className="max-w-[900px] flex flex-col h-fit min-h-fit text-slate-700 bg-white shadow-t-2xl rounded-xl">
            <div className="flex mx-4 mt-4 text-slate-700 rounded-none">
              <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
            </div>
            {customHeaderContent && (
              <div className="max-w-96 flex">{customHeaderContent}</div>
            )}

            <div className="p-0 w-full">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <PropagateLoader size={20} color="#023047" />
                </div>
              ) : data?.length > 0 ? (
                <table className="w-full mt-4 text-left table-auto min-w-max border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300">
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className={`p-4 border-slate-300${
                            column.key === columns[0].key ? "" : ""
                          }`}
                        >
                          <h1>{column.label}</h1>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <React.Fragment key={item.id}>
                        {console.log(item)}
                        <tr
                          className={`hover:bg-ocean/6 transition-colors duration-400 border-t border-slate-300 overflow-x-hidden cursor-pointer ${
                            detailRow === item.id
                              ? "bg-ocean/15 text-bold"
                              : "hover:bg-ocean/6"
                          }`}
                          onClick={() =>
                            setDetailRow((prev) =>
                              prev === item.id ? null : item.id
                            )
                          }
                        >
                          <td className="pl-2 pr-2 sm:pl-4 lg:pl-4 md:pl-4 border-slate-300">
                            {item.id}
                          </td>
                          <td className="flex p-4 border-slate-300 overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px]">
                            {item.isOffer && (
                              <span className="p-1 bg-sea rounded text-white mr-1">
                                <MdOutlineLocalOffer />
                              </span>
                            )}
                            {item.isFree && (
                              <span className="p-1 bg-green-400 rounded text-white mr-1">
                                <TbCurrencyDollarOff />
                              </span>
                            )}
                            {item.title}
                          </td>

                          <td className="p-4 border-slate-300">
                            {item.category}
                          </td>
                        </tr>
                        {detailRow === item.id && (
                          <tr
                            className={`transition-all duration-500 ease-in-out ${
                              detailRow === item.id
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0"
                            } overflow-hidden`}
                          >
                            <td colSpan={3}>
                              <DetailRow
                                author={item.authors}
                                tag={item.tags}
                                description={item.description}
                                end={item.end}
                                start={item.freeDay}
                                id={item.id}
                                title={item.title}
                                offer={item.isOffer}
                                initialOrder={item.order}
                                free={item.isFree}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col justify-center items-center h-64">
                  <img
                    src="   https://cdn-icons-png.flaticon.com/512/7486/7486809.png "
                    width="156"
                    height="156"
                    alt=""
                    title=""
                    className="img-small"
                  ></img>
                  <p className="text-lg text-gray-500">Nothing Found!</p>
                </div>
              )}
            </div>

            {/* pagination */}
            <div className="text-nowrap bg-ocean/10 bg-op border-[1px] border-blue-950/15 rounded-b-2xl shadow-2xl">
              <div className="flex items-center justify-between p-3">
                <div className="flex relative">
                  <p className="text-sm text-slate-500 pr-3 pt-2.5">
                    Page {thisPage} of {totPages}
                  </p>
                  <div className="hidden md:block sm:block lg:block group rounded border border-slate-300 pr-2 h-fit py-1 mt-1.5   pl-1 m-1 lg:px-3 text-center text-xs font-semibold text-slate-600 transition-all ">
                    <label className="group-hover:text-ocean group-focus-within:text-ocean text-sm text-slate-500">
                      jump to page
                      <input
                        type="number"
                        value={paginator.jumpInput}
                        placeholder=" "
                        className="pl-4 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-10 outline-none bg-inherit"
                        onChange={jumpHandler}
                      />
                    </label>
                  </div>

                  <div
                    ref={dropdownRef}
                    className="relative flex group rounded border border-slate-300 text-nowrap h-fit py-1 mt-1 text-center text-xs font-semibold text-slate-600 transition-all hover:cursor-pointer"
                  >
                    <p
                      onClick={dropdownHandler}
                      className="group-hover:text-ocean group-focus-within:text-ocean text-sm text-slate-500 pl-1"
                    >
                      rows
                      <span> {pagination.pageSize}</span>
                    </p>
                    <p>
                      <MdArrowDropUp size={20} />
                    </p>
                    {dropdown && (
                      <div className="absolute bottom-10 mx-auto left-6 shadow-lg rounded mt-1 z-50">
                        <RowDropdown onSelect={handleRowsChange} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    disabled={thisPage === 1}
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleNext}
                    disabled={thisPage === totPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Table;

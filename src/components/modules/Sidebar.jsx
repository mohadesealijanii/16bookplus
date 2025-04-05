import logo from "../../pics/logo.png";
import React, { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Sidebar() {
  const [openMenus, setOpenMenus] = useState({
    books: false,
    settings: false,
    banners: false,
  });
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/signin";
  };

  return (
    <div className="hidden max-h-fit py-7 min-w-fit md:block lg:block bg-white shadow-xl w-56 ml-5 mr-40 p-3 rounded-xl text-nowrap">
      <div className="flex">
        <div className="mr-2">
          <img src={logo} alt="logo" className="w-9 flex-nowrap" />
        </div>
        <div>
          <h1 className="mt-1 font-bold text-sea text-2xl mb-4">Book Plus</h1>
        </div>
      </div>
      <ul className="text-grey">
        <li>
          <button
            onClick={() => toggleMenu("books")}
            className={`mb-1 mt-3 hover:text-sea transition duration-300 ease-in-out ${
              openMenus.books ? "text-sea font-semibold" : ""
            }`}
          >
            <IoChevronForward
              className={`text-sea mr-3 transition-transform duration-300 inline ${
                openMenus.books ? "rotate-90" : ""
              }`}
            />
            Books
          </button>
          {openMenus.books && (
            <ul className="flex flex-col ml-2">
              <Link className="hover:text-sea ml-6" to="/bookCategories">
                categories
              </Link>
              <Link className="hover:text-sea ml-6" to="/books">
                book list
              </Link>
              <Link className="hover:text-sea ml-6" to="/booksCode">
                book code
              </Link>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={() => toggleMenu("settings")}
            className={`mb-1 mt-3 hover:text-sea transition duration-300 ease-in-out ${
              openMenus.settings ? "text-sea font-semibold" : ""
            }`}
          >
            <IoChevronForward
              className={`text-sea mr-3 transition-transform duration-300 inline ${
                openMenus.settings ? "rotate-90" : ""
              }`}
            />
            Settings
          </button>
          {openMenus.settings && (
            <ul className="flex flex-col ml-2">
              <Link className="hover:text-sea ml-6" to="/bookCategories">
                emails
              </Link>
              <Link className="hover:text-sea ml-6" to="/books">
                searches
              </Link>
              <Link className="hover:text-sea ml-6" to="/booksCode">
                updates
              </Link>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={() => toggleMenu("banners")}
            className={`mb-1 mt-3 hover:text-sea transition duration-300 ease-in-out ${
              openMenus.banners ? "text-sea font-semibold" : ""
            }`}
          >
            <IoChevronForward
              className={`text-sea mr-3 transition-transform duration-300 inline ${
                openMenus.banners ? "rotate-90" : ""
              }`}
            />
            Banners
          </button>
          {openMenus.banners && (
            <ul className="flex flex-col ml-2">
              <Link className="hover:text-sea ml-6" to={"/bannerItems"}>
                banner items
              </Link>
              <Link className="hover:text-sea ml-6" to={"/banners"}>
                banner names
              </Link>
            </ul>
          )}
        </li>

        <li className="mt-3">
          <Link
            to="/members"
            className="ml-7 hover:text-sea transition duration-300 ease-in-out"
          >
            Members
          </Link>
        </li>

        <li>
          <div className="mt-3 ml-7">
            <button
              onClick={handleLogout}
              className="text-red-800 transition duration-300 ease-in-out"
            >
              Log out
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

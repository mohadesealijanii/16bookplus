import React, { useState } from "react";
import { GoTrash, GoCommentDiscussion } from "react-icons/go";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { SiWikibooks } from "react-icons/si";
import { FaBarcode } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import ToolTip from "./Tooltip";

import logo from "../../../pics/logo.png";
import OfferModal from "./OfferModal";
import FreeModal from "./FreeModal";
import OrderModal from "./OrderModal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function DetailRow({
  author,
  tag,
  description,
  start,
  end,
  id,
  title,
  offer,
  initialOrder,
  free,
}) {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const handleModal = (modalType) => {
    setModal((prev) => (prev === modalType ? null : modalType));
  };

  const firstGroup = [
    {
      id: "offer",
      icon: <MdOutlineLocalOffer />,
      text: "Set Offer",
      onClick: () => handleModal("offer"),
    },
    {
      id: "free",
      icon: <TbCurrencyDollarOff />,
      text: "Free",
      onClick: () => handleModal("free"),
    },
    {
      id: "order",
      icon: <BiSortAlt2 />,
      text: "Sort Book",
      onClick: () => handleModal("order"),
    },
    {
      id: "chapters",
      icon: <SiWikibooks />,
      text: "Chapters",
      onClick: () => navigate(`/chapters/${id}`),
    },
  ];

  const secondGroup = [
    { id: "code", icon: <FaBarcode />, text: "Book Codes" },
    { id: "edit", icon: <FiEdit />, text: "Edit Book" },
    { id: "comments", icon: <GoCommentDiscussion />, text: "Comments" },
    {
      id: "delete",
      icon: <GoTrash />,
      text: "Delete Book",
      className: "bg-red-200 text-red-900 hover:bg-red-900 hover:text-white",
    },
  ];

  return (
    <div className="flex items-center justify-between lg:justify-around gap-4 p-4 bg-ocean/15 shadow-sm">
      {modal === "offer" && (
        <OfferModal
          id={id}
          title={title}
          onClose={() => setModal(false)}
          setOfferModal={setModal}
        />
      )}
      {modal === "free" && (
        <FreeModal
          id={id}
          title={title}
          onClose={() => setModal(false)}
          setModal={setModal}
          free={free}
        />
      )}

      {modal === "order" && (
        <OrderModal
          id={id}
          title={title}
          onClose={() => setModal(false)}
          setModal={setModal}
          initialOrder={initialOrder}
        />
      )}
      <div className="flex items-center w-35 lg:w-75 md:w-45 sm:w-45 bg-white h-24 rounded-xl pr-1 shadow-sm">
        <img
          src={logo}
          alt="logo"
          className="hidden lg:block md:block sm:block w-13 h-auto min-w-15 pl-3"
        />
        <div className="text-sm pl-2 overflow-hidden max-w-xs">
          <p className="font-bold pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            Author: <span className="font-light">{author}</span>
          </p>
          <p className="font-bold pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            Tag: <span className="font-light">{tag}</span>
          </p>
          {description && (
            <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              Description: {description}
            </p>
          )}
          {free ? (
            <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              Free:‌ ‌
              <span className="font-light">
                {dayjs(start).format("DD MMM YYYY")}
                <span className="font-bold"> to </span>
                {dayjs(end).format("DD MMM YYYY")}
              </span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-4 ml-5">
        {[firstGroup, secondGroup].map((group, index) => (
          <div key={index} className="flex gap-4 p-1 rounded-md">
            {group.map(({ id, icon, text, onClick, className }) => (
              <div key={id} className="relative group">
                <div
                  className={`p-2 cursor-pointer shadow-md rounded-lg transition-colors duration-400 ${
                    className || "bg-white hover:bg-ocean hover:text-white"
                  }`}
                  data-tooltip-id={id}
                  onClick={onClick}
                >
                  {icon}
                </div>
                <ToolTip id={id} content={text} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailRow;

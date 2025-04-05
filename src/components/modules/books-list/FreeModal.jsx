// import React, { useState } from "react";
// import { ClipLoader } from "react-spinners";
// import toast from "react-hot-toast";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Box } from "@mui/material";
// import { setFree } from "../../../utils/services";

// function FreeModal({ id, title, onClose, setModal, free }) {
//   const [loading, setLoading] = useState(false);
//   const [date, setDate] = useState({
//     start: null,
//     end: null,
//   });

//   const FreeHandler = async () => {
//     try {
//       setLoading(true);
//       const res = await setFree(id, date.start, date.end);
//       if (res.status === 200) {
//         setModal(false);
//         toast.success("Done!");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {free ? (
//         <div className="fixed z-5 flex justify-center items-center inset-0 bg-black/60 ">
//           <div className="absolute p-3 bg-white w-96 h-64 rounded-lg">
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               ✖
//             </button>
//             <h2 className="text-md mb-25 text-center mt-5">
//               Are you sure you want to make "
//               {<span className="text-sea">{title}</span>}" book unavailable for
//               free?
//             </h2>
//             <div className="flex justify-around gap-2">
//               <button
//                 onClick={onClose}
//                 className="px-7 py-2 border-ocean border-2 text-ocean rounded hover:bg-ocean hover:text-white transition-colors duration-300"
//               >
//                 cancel
//               </button>
//               {loading ? (
//                 <p className="flex items-center justify-center max-h-10 px-9 bg-sea text-white rounded">
//                   <ClipLoader size={20} color="white" />
//                 </p>
//               ) : (
//                 <button
//                   onClick={() => FreeHandler(id, date.start, date.end)}
//                   className="px-11 py-2 bg-sea/45 rounded hover:bg-sea/70 hover:text-white transition-colors duration-300"
//                 >
//                   yes
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-10 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-120 h-70 relative ">
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               ✖
//             </button>
//             <div>
//               <h2 className="text-md mb-5 text-center ">
//                 To make the "{<span className="text-sea">{title}</span>}" book
//                 available for free, please specify its start and end time:
//               </h2>
//               <div className="flex flex-col justify-center">
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 3,
//                     mb: 7,
//                   }}
//                 >
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Start Date"
//                       value={date.start}
//                       onChange={(newValue) =>
//                         setDate((prevState) => ({
//                           ...prevState,
//                           start: newValue,
//                         }))
//                       }
//                       sx={{ width: 200 }}
//                     />
//                     <DatePicker
//                       label="End Date"
//                       value={date.end}
//                       onChange={(newValue) =>
//                         setDate((prevState) => ({
//                           ...prevState,
//                           end: newValue,
//                         }))
//                       }
//                       sx={{ width: 200 }}
//                     />
//                   </LocalizationProvider>
//                 </Box>
//               </div>
//               <div className="flex justify-around gap-2">
//                 <button
//                   onClick={onClose}
//                   className="px-7 py-2 border-ocean border-2 text-ocean rounded hover:bg-ocean hover:text-white transition-colors duration-300"
//                 >
//                   cancel
//                 </button>
//                 {loading ? (
//                   <p className="flex items-center justify-center max-h-10 px-9 bg-sea text-white rounded">
//                     <ClipLoader size={20} color="white" />
//                   </p>
//                 ) : (
//                   <button
//                     onClick={() => FreeHandler(id, date.start, date.end)}
//                     className="px-9 py-2 bg-sea/45 rounded hover:bg-sea/70 hover:text-white transition-colors duration-300"
//                   >
//                     confirm
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default FreeModal;





import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

function FreeModal({ id, title, onClose, setFreeModal }) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({
    start: null,
    end: null,
  });

  const offerHandler = (id) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Offer set successfully");
      setLoading(false);
      setFreeModal(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex justify-center items-start pt-10 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg max-w-120 h-70 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            ✖
          </button>
          <h2 className="text-md mb-5 text-center">
            To make the "<span className="text-sea">{title}</span>" book
            available for free, please specify its start and end time:
          </h2>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mb: 7,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={date.start}
                onChange={(newValue) =>
                  setDate((prev) => ({ ...prev, start: newValue }))
                }
                sx={{
                  width: 200,
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#0ea5e9", // ocean color on focus
                    },
                }}
              />
              <DatePicker
                label="End Date"
                value={date.end}
                onChange={(newValue) =>
                  setDate((prev) => ({ ...prev, end: newValue }))
                }
                sx={{
                  width: 200,
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#0ea5e9",
                    },
                }}
              />
            </LocalizationProvider>
          </Box>

          <div className="flex justify-around gap-2">
            <button
              onClick={onClose}
              className="px-7 py-2 border-ocean border-2 text-ocean rounded hover:bg-ocean hover:text-white transition-colors duration-300"
            >
              cancel
            </button>
            {loading ? (
              <p className="flex items-center justify-center max-h-10 px-9 bg-sea text-white rounded">
                <ClipLoader size={20} color="white" />
              </p>
            ) : (
              <button
                onClick={() => offerHandler(id)}
                className="px-9 py-2 bg-sea/45 rounded hover:bg-sea/70 hover:text-white transition-colors duration-300"
              >
                confirm
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default FreeModal;

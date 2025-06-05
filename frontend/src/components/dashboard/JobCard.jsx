import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchChangeStatus,
  fetchDeleteCompany,
} from "../../redux/slices/companySlice";
import popup from "../../assets/popup.svg";
import Popup from "./Popup"; // import your Popup component

const JobCard = ({ data }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(data?.status);

  const bgColors = {
    Pending: "bg-yellow-100",
    Interview: "bg-indigo-100",
    Accepted: "bg-green-100",
    Rejected: "bg-red-100",
  };

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    dispatch(fetchChangeStatus({ status: newStatus, id: data?._id }));
  };

  const handleDelete = () => {
    dispatch(fetchDeleteCompany(data?._id));
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 shadow rounded-lg ${bgColors[currentStatus]}`}
      >
        <p className="w-1/4 font-medium">{data?.companyName}</p>
        <p className="w-1/4 text-gray-700">{data?.designation}</p>
        <select
          onChange={handleChange}
          value={currentStatus || ""}
          className="w-1/4 border border-gray-300 rounded-md bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted" className="bg-green-300">
            Accepted
          </option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={handleDelete}
          className="w-1/6 text-red-600 hover:underline hover:cursor-pointer"
        >
          Delete
        </button>

        <button>
          <img
            onClick={openPopup}
            width={25}
            className="hover:cursor-pointer"
            src={popup}
            alt="popup"
          />
        </button>
      </div>

      {/* Render Popup here */}
      <Popup showPopup={showPopup} closePopup={closePopup} data={data} />
    </>
  );
};

export default JobCard;

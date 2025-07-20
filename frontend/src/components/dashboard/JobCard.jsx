import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchChangeStatus,
  fetchDeleteCompany,
  fetchStarWishlistStatus,
} from "../../redux/slices/companySlice";
import popup from "../../assets/popup.svg";
import UnfilledStar from "../../assets/star_unfilled.svg";
import FilledStar from "../../assets/star_filled.svg";
import Popup from "./Popup";

const JobCard = ({ data }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(data?.status);
  const [starWishlist, setStarWishlist] = useState(data?.starWishList);

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

  const handleStarWishlist = () => {
    dispatch(fetchStarWishlistStatus({ id: data?._id }))
      .unwrap()
      .then(() => {
        setStarWishlist(!starWishlist);
      })
      .catch((err) => console.log(err));
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 shadow rounded-lg ${bgColors[currentStatus]}`}
      >
        <p className="w-1/4 text-xs md:text-sm font-medium">
          {data?.companyName}
        </p>
        <p className="md:w-1/4 text-xs md:text-sm text-gray-700">
          {data?.designation}
        </p>
        <select
          onChange={handleChange}
          value={currentStatus || ""}
          className="w-1/4 border text-xs md:text-sm border-gray-300 rounded-md bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
          className="w-1/10 text-xs md:text-sm text-red-600 hover:underline hover:cursor-pointer"
        >
          Delete
        </button>
        <div className="flex gap-2">
          <button>
            <img
              width={20}
              onClick={handleStarWishlist}
              className="hover:cursor-pointer"
              src={starWishlist ? FilledStar : UnfilledStar}
              alt="popup"
            />
          </button>
          <button>
            <img
              onClick={openPopup}
              width={20}
              className="hover:cursor-pointer"
              src={popup}
              alt="popup"
            />
          </button>
        </div>
      </div>

      {/* Render Popup here */}
      <Popup showPopup={showPopup} closePopup={closePopup} data={data} />
    </>
  );
};

export default JobCard;

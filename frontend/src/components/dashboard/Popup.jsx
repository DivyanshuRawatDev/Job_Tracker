import React from "react";
import crossBtn from "../../assets/cross.svg"
const Popup = ({ showPopup, closePopup, data }) => {
  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white relative p-6 rounded-lg shadow-xl w-96">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Company Name :- </h2>
          <p>{data.companyName}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl  font-semibold">Designation :- </h2>
          <p>{data?.designation}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Applied From :- </h2>
          <p>{data?.appliedFrom}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Contact :- </h2>
          <p>{data?.contact}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">About :- </h2>
          <p>{data?.about}</p>
        </div>

        <button
          onClick={closePopup}
          className=" absolute top-0 right-0 text-white px-4 py-2 rounded hover:cursor-pointer"
        >
          <img src={crossBtn} alt="cross btn" width={30}/>
        </button>
      </div>
    </div>
  );
};

export default Popup;

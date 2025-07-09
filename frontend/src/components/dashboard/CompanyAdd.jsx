import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddCompany } from "../../redux/slices/companySlice";

const CompanyAdd = () => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    designation: "",
    appliedFrom: "",
    contact: "",
    status: "Pending",
    about: "",
  });
  const company = useSelector((store) => store?.company);

  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isEmpty = Object.entries(companyData).some(
      ([key, value]) => key !== "status" && value.trim() === ""
    );

    if (isEmpty) {
      alert("Please fill all fields before submitting.");
      return;
    }
    dispatch(fetchAddCompany(companyData));
    setCompanyData({
      companyName: "",
      designation: "",
      appliedFrom: "",
      contact: "",
      status: "Pending",
      about: "",
    });
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white  rounded-lg space-y-4">
      <input
        type="text"
        onChange={handleValueChange}
        value={companyData.companyName}
        name="companyName"
        placeholder="Company Name"
        className="w-full px-4 py-2 border rounded-md focus:outline-0 focus:ring-1 focus:ring-red-200"
      />

      <input
        type="text"
        onChange={handleValueChange}
        value={companyData.designation}
        name="designation"
        placeholder="Designation"
        className="w-full px-4 py-2 border rounded-md focus:outline-0 focus:ring-1 focus:ring-red-200"
      />

      <input
        type="text"
        onChange={handleValueChange}
        value={companyData.appliedFrom}
        name="appliedFrom"
        placeholder="Applied From"
        className="w-full px-4 py-2 border rounded-md focus:outline-0 focus:ring-1 focus:ring-red-200"
      />

      <input
        type="text"
        onChange={handleValueChange}
        value={companyData.contact}
        name="contact"
        placeholder="Contact Info"
        className="w-full px-4 py-2 border rounded-md focus:outline-0 focus:ring-1 focus:ring-red-200"
      />

      <textarea
        placeholder="Write about company with AI"
        onChange={handleValueChange}
        value={companyData.about}
        name="about"
        className="w-full px-4 py-2 border rounded-md focus:outline-0 focus:ring-1 focus:ring-red-200"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={company.isLoading}
        className="hover:cursor-pointer w-full bg-red-400 text-white font-semibold py-2 rounded-md hover:bg-red-300 transition flex justify-center items-center space-x-2"
      >
        {company.isLoading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        <span>{company.isLoading ? "Submitting..." : "Submit"}</span>
      </button>
    </div>
  );
};

export default CompanyAdd;

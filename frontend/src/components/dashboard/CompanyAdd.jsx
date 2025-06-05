import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
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
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg space-y-4">
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
        className=" hover:cursor-pointer w-full bg-red-400 text-white font-semibold py-2 rounded-md hover:bg-red-300 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default CompanyAdd;

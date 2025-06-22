import React, { useEffect, useState } from "react";
import JobCard from "../components/dashboard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies } from "../redux/slices/companySlice";
import CompanyAdd from "../components/dashboard/CompanyAdd";
import { fetchUserLogout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("All");
  const { user } = useSelector((store) => store.user);
  const { companies = [] } = useSelector((store) => store.company);
  const [showLogout, setShowlogout] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);

  const handleStatus = (e) => {
    if (e.target.tagName === "P") {
      setCurrentStatus(e.target.textContent);
    }
    console.log(e.target);
  };

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, []);

  const handleLogoutBtn = () => {
    setShowlogout(!showLogout);
  };

  const handleLogout = () => {
    dispatch(fetchUserLogout())
      .unwrap()
      .then(() => {
        navigate("/google");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleShowAddCompany = () => {
    setShowAddCompany(!showAddCompany);
  };

  return (
    <div className="bg-violet-300 h-screen">
      <div className="flex justify-between items-center p-5">
        <h1 className="font-extrabold  text-3xl">JOB TRACKER</h1>
        <div className="relative">
          <img
            onClick={handleLogoutBtn}
            src={user?.profilePic}
            className="rounded-full cursor-pointer w-12 h-12"
          />
          {showLogout ? (
            <p
              onClick={handleLogout}
              className="bg-orange-600 p-2 rounded-xl font-medium absolute left-[-5px]  cursor-pointer"
            >
              LOGOUT
            </p>
          ) : null}
        </div>
      </div>

      <div className="bg-yellow-200 p-5 flex flex-col-reverse md:flex-row gap-4">
        {/* left side */}
        <div className="bg-pme-300 md:w-[65%] h-[80vh] rounded-2xl">
          <div className="flex items-center justify-center bg-red-200 py-4 px-6">
            <div className="flex w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 outpne-none rounded-l-2xl focus:outline-0"
              />
              <button className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition">
                Search
              </button>
            </div>
          </div>

          <div className="bg-white h-[70vh]">
            <div
              onClick={(e) => handleStatus(e)}
              className="bg-indigo-100 flex gap-2 text-center text-xs items-center p-2 overflow-x-auto md:overflow-visible justify-between scrollbar-none md:p-4"
            >
              <p className="bg-blue-400 md:w-[20%] p-2 rounded-xl cursor-pointer">
                All
              </p>
              <p className="bg-yellow-200 md:w-[20%]  p-2 rounded-xl cursor-pointer">
                Pending
              </p>
              <p className="bg-green-300 md:w-[20%]  p-2 rounded-xl cursor-pointer">
                Accepted
              </p>
              <p className="bg-indigo-300 md:w-[20%]  p-2 rounded-xl cursor-pointer">
                Interview
              </p>
              <p className="bg-red-300 md:w-[20%]  p-2 rounded-xl cursor-pointer">
                Rejected
              </p>
            </div>
            <div className=" flex  flex-col gap-4 p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
              {companies
                .filter((company) =>
                  currentStatus == "All"
                    ? true
                    : company.status === currentStatus
                )
                .map((data) => {
                  return <JobCard key={data?._id} data={data} />;
                })}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="bg-sky-200 md:w-[35%] flex flex-col gap-7 p-3 rounded-2xl">
          <div className="bg-green-400 rounded-lg">
            <h1
              onClick={handleShowAddCompany}
              className="text-2xl text-center cursor-pointer  p-5 font-medium"
            >
              ADD DETAILS
            </h1>
          </div>
          {showAddCompany && (
            <div className="md:hidden block">
              <CompanyAdd />
            </div>
          )}

          <div className=" md:block hidden">
          <CompanyAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

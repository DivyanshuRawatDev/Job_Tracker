import React, { useEffect, useState } from "react";
import JobCard from "../components/dashboard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies } from "../redux/slices/companySlice";
import CompanyAdd from "../components/dashboard/CompanyAdd";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState("All");
  const { user } = useSelector((store) => store.user);
  const { companies = [] } = useSelector((store) => store.company);

  const handleStatus = (e) => {
    if (e.target.tagName === "P") {
      setCurrentStatus(e.target.textContent);
    }
    console.log(e.target);
  };

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, []);

  return (
    <div className="bg-violet-300 h-screen">
      <div className="flex justify-between items-center p-5">
        <h1 className="font-extrabold  text-3xl">JOB TRACKER</h1>
        <img src={user?.profilePic} className="rounded-full w-12 h-12" />
      </div>

      <div className="bg-yellow-200 p-5 flex gap-4">
        {/* left side */}
        <div className="bg-pme-300 w-[65%] h-[80vh] rounded-2xl">
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
              className="bg-indigo-100 flex gap-2 text-center items-center justify-between p-4"
            >
              <p className="bg-blue-400 w-[20%] p-2 rounded-xl cursor-pointer">All</p>
              <p className="bg-yellow-200 w-[20%]  p-2 rounded-xl cursor-pointer">
                Pending
              </p>
              <p className="bg-green-300 w-[20%]  p-2 rounded-xl cursor-pointer">
                Accepted
              </p>
              <p className="bg-indigo-300 w-[20%]  p-2 rounded-xl cursor-pointer">
                Interview
              </p>
              <p className="bg-red-300 w-[20%]  p-2 rounded-xl cursor-pointer">
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
        <div className="bg-sky-200 w-[35%] flex flex-col justify-around p-3 rounded-2xl">
          <div className="bg-green-400 rounded-lg">
            <h1 className="text-2xl text-center  p-5 font-medium">
              ADD DETAILS
            </h1>
          </div>
          <CompanyAdd />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

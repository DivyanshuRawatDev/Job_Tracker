import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVerifyOTP } from "../redux/slices/userSlice";
import { useNavigate } from "react-router";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOtp(value);
    }
  };
  const handleVerifyOTP = async (user) => {
    const email = JSON.parse(localStorage.getItem("pendingEmail"))?.email;

    try {
      await dispatch(fetchVerifyOTP({ email: email, otp }))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Email Verification
        </h1>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          className="w-full text-center border border-gray-300 rounded-lg py-2 text-lg tracking-widest focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={() => {
            handleVerifyOTP(user);
          }}
          className="w-full cursor-pointer bg-green-500 text-white py-2 rounded-lg text-lg hover:bg-green-600 transition mt-4"
        >
          Verify OTP
        </button>
        <div className="mt-4 text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <span className="text-blue-500 font-medium cursor-pointer">
            Resend OTP
          </span>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;

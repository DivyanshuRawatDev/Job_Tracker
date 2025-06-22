import React, { useEffect, useState } from "react";
import authImage from "../assets/auth.png";
import googleLogo from "../assets/google.svg";
import { useDispatch } from "react-redux";
import { fetchGoogleAuth } from "../redux/slices/userSlice";
import { useNavigate } from "react-router";
import API from "../utils/axios";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(null);
  const handleGoogleLogin = async () => {
    try {
      const result = await dispatch(fetchGoogleAuth()).unwrap();
      console.log("Login success:", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    API.get("/auth/verify", { withCredentials: true })
      .then(() => {
        setIsVerified(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen items-stretch">
      {/* Left Image Section */}
      <div className=" md:w-1/2 flex justify-center items-center">
        <img className="w-full" src={authImage} alt="Auth-Image" />
      </div>

      {/* Vertical Line */}
      <div className="md:w-[1px] bg-gray-300 h-0.5 md:h-[90vh] flex  m-10 md:m-auto" />

      {/* Right Login Section */}
      <div className="md:w-1/2 flex flex-col gap-8 justify-center items-center px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">WELCOME</h2>
          <h1 className="text-4xl font-extrabold">JOB SEEKER</h1>
        </div>
        <div className="text-center">
          <p className="max-w-lg">
            This platform helps you efficiently manage your job applications.
            Log in to add, update, and track the status of your job prospects
            all in one organized place. Stay focused and take control of your
            career journey.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="bg-white flex items-center gap-3 p-4 rounded-md border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer transition"
        >
          <img src={googleLogo} alt="Google" className="w-6 h-6" />
          <p className="text-gray-700 font-medium">Sign in with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Auth;

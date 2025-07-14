import React, { useEffect, useState } from "react";
import authImage from "../assets/auth.png";
import googleLogo from "../assets/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoogleAuth } from "../redux/slices/userSlice";
import { useNavigate } from "react-router";
import API from "../utils/axios";
import { getRedirectResult } from "firebase/auth";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(null);
  const { isLoading } = useSelector((store) => store.user);
  console.log(isLoading, "load");
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
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/verify", { withCredentials: true });
        if (res?.data?.user) {
          setIsVerified(true);
          setTimeout(() => navigate("/dashboard"), 100);
        }
      } catch (err) {
        console.log("Not logged in yet.", err);
        setIsVerified(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const checkRedirectResult = async () => {
      const result = await getRedirectResult(auth);
      if (result) {
        const idToken = await result.user.getIdToken();
        const response = await API.post("auth/google", { idToken });
        console.log("Redirect login success:", response.data);
        navigate("/dashboard");
      }
    };
    checkRedirectResult();
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
          disabled={isLoading}
          className={`bg-white flex items-center gap-3 p-4 rounded-md border border-gray-300 shadow-sm transition ${
            isLoading
              ? "cursor-not-allowed opacity-60"
              : "hover:shadow-md hover:cursor-pointer"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <p className="text-gray-700 font-medium">Signing in...</p>
            </>
          ) : (
            <>
              <img src={googleLogo} alt="Google" className="w-6 h-6" />
              <p className="text-gray-700 font-medium">Sign in with Google</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Auth;

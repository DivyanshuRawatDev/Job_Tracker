import React, { useEffect, useState } from "react";
import authImage from "../assets/auth.png";
import googleLogo from "../assets/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoogleAuth } from "../redux/slices/userSlice";
import { useNavigate, useLocation, Link } from "react-router";
import API from "../utils/axios";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";



const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(null);
  const { isLoadingGoogle } = useSelector((store) => store.user);
 

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

  return (
    <div className="flex flex-col md:flex-row h-screen items-stretch">
      {/* Left Image Section */}
      <div className=" md:w-1/2 flex justify-center items-center">
        <img className="w-full" src={authImage} alt="Auth-Image" />
      </div>

      {/* Vertical Line */}
      <div className="md:w-[1px] bg-gray-300 h-0.5 md:h-[90vh] flex  m-10 md:m-auto" />

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col gap-8 justify-center items-center px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">WELCOME</h2>
          <h1 className="text-4xl font-extrabold">JOB SEEKER</h1>
        </div>

     
        {location.pathname === "/signup" ? <Signup /> : <Login />}

        <p className="text-gray-500">
          {location.pathname === "/signup" ? (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </>
          )}
        </p>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoadingGoogle}
          className={`bg-white flex items-center gap-3 p-4 rounded-md border border-gray-300 shadow-sm transition ${
            isLoadingGoogle
              ? "cursor-not-allowed opacity-60"
              : "hover:shadow-md hover:cursor-pointer"
          }`}
        >
          {isLoadingGoogle ? (
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

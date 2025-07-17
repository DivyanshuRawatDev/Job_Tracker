import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingLogin } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(fetchUserLogin(form)).unwrap();
      if (res.redirectTo) {
        navigate(res.redirectTo, { state: { email: form.email } });
      } else {
        localStorage.removeItem("pendingEmail");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold mb-2">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-3 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-3 rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoadingLogin}
        className={`bg-green-600 cursor-pointer text-white py-2 rounded flex items-center justify-center gap-2 transition ${
            isLoadingLogin
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-green-700"
        }`}
      >
        {isLoadingLogin && (
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {isLoadingLogin ? "Logging In..." : "Login"}
      </button>
      <p>
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </form>
  );
};

export default Login;

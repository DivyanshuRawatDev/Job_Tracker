import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSignup } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingSignup } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(fetchUserSignup(form)).unwrap();
      setForm({ name: "", email: "", password: "", gender: "" });
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-3 rounded"
        required
      />
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
      <div className="flex flex-col gap-2">
        <label className="font-medium">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="accent-blue-500"
              required
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="accent-pink-500"
              required
            />
            Female
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoadingSignup}
        className={`bg-green-600 cursor-pointer text-white py-2 rounded flex items-center justify-center gap-2 transition ${
          isLoadingSignup
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-green-700"
        }`}
      >
        {isLoadingSignup && (
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
        {isLoadingSignup ? "Signing Up..." : "Sign Up"}
      </button>

      <p>
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;

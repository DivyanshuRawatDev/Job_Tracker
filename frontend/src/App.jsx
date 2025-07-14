import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import { Routes, Route, Navigate } from "react-router";
import DashBoard from "./pages/DashBoard";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 via-transparent to-gray-900 flex items-center h-[100vh]">
        <div className="container mt-[5%]">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

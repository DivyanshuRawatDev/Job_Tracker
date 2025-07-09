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
          <div>
            <Routes>
              <Route path="/google" element={<Auth />} />
              <Route path="/" element={<Navigate to="/google" replace />} />
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
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

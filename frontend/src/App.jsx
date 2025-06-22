import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import { Routes, Route, Navigate } from "react-router";
import DashBoard from "./pages/DashBoard";

function App() {
  console.log("Testing console log from App.jsx");

  return (
    <>
      <div className="container">
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
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router";
import DashBoard from "./pages/DashBoard";

function App() {
  console.log("Testing console log from App.jsx");
  
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/google" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

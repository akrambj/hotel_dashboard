import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login.jsx";
import Booking from "./pages/Booking.jsx";
import Rooms from "./pages/Rooms.jsx";
import Users from "./pages/Users.jsx";
import Overview from "../src/pages/overview/Overview.jsx";
import SharedLayout from "../src/pages/overview/SharedLayout.jsx";
import { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="bg-[#f7f4f7] overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          {isAuthenticated && (
            <Route path="/" element={<SharedLayout />}>
              {/* Overview should be outside SharedLayout */}
              <Route index element={<Overview />} />
              {/* Use a relative path for the Booking route */}
              <Route path="booking" element={<Booking />} />
              <Route path="users" element={<Users />} />
              <Route path="rooms" element={<Rooms />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

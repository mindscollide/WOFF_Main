import "./App.less";
import PrivateRoute from "./Routes/PrivateRoute";
import { Routes, Route, Navigate } from "react-router";
import Login from "./Container/Authentication/Login/Login";
import SignUp from "./Container/Authentication/SignUp/SignUp";
import NotFound from "./Container/404/404";
import Dashboard from "./Container/Dashboard/dashboard";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* The trailing /* lets Dashboard's own nested <Routes> (CustomRoutes) match below /Wof */}
        <Route
          path="/Wof/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;

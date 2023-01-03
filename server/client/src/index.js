import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import App from "./pages/App/App";
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import "./global.css";
import ProtectedRoute from "./features/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="/login" />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route> 
        <Route path="/notecenter" element={<App />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tagline from "./components/Tagline";
import Couple from "./components/Couple";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
const HomePage = () => (
  <>
    <Tagline />
    <Couple />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

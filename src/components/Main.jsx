import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, MyRoutines, Activities, Register } from "/components";
import { Navbar } from "../components";

const Main = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div id="main">
      <Navbar />
      React Boilerplate
    </div>
  );
};

export default Main;

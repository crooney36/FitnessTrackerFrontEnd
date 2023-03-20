import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  MyRoutines,
  Activities,
  Register,
  Navbar,
  Routine,
} from "./";

const Main = () => {
  // const [user, setUser] = useState(null);
  // const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div id="main">
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="routines" element={<Routine />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          token={token}
          setToken={setToken}
          element={<Login />}
        />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Main;

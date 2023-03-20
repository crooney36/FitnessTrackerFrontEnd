import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, MyRoutines, Activities, Register, Navbar } from "./";

const Main = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
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
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
};

export default Main;

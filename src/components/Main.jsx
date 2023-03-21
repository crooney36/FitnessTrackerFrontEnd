import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, MyRoutines, Activities, Register, Navbar, Routine, CreateNewRoutine, CreateNewActivity } from "./";
const Main = () => {
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, [token]);

  return (
    <div id="main">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
      <Route path="routines" element={<Routine />} />
      <Route path="routines/create-new-routine" element={<CreateNewRoutine />} />
      <Route path="activities" element={<Activities />} />
      <Route path="activities/create-new-activity" element={<CreateNewActivity />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login />}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          token={token}
          setToken={setToken}
        />
        <Route
          path="/Register"
          element={<Register />}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          token={token}
          setToken={setToken}
        />
      </Routes>
    </div>
  );
};

export default Main;

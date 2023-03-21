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
  CreateNewRoutine,
} from "./";
const Main = () => {
  const [token, setToken] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("token"), "/////");
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div id="main">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="routines" element={<Routine />} />
        <Route
          path="routines/create-new-routine"
          element={<CreateNewRoutine />}
        />
        <Route path="activities" element={<Activities />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/Register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token}
              setToken={setToken}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;

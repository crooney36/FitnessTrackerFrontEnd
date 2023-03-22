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
  CreateNewActivity,
  EditRoutine,
} from "./";
const Main = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token")
    const localStorageUsername = localStorage.getItem("username")
    if (localStorageToken) {
      setIsLoggedIn(true);
      setToken(localStorageToken)
      setUser(localStorageUsername)
      console.log(isLoggedIn, "if");
    } else {
      setIsLoggedIn(false);
      console.log(isLoggedIn, "else");
    }
  }, []);

  return (
    <div id="main">
      <Navbar
        isLoggedIn={isLoggedIn}
        // setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
      />
      <Routes>
        <Route path="routines" element={<Routine user={user} />} />
        <Route
          path="routines/create-new-routine"
          element={<CreateNewRoutine />}
        />
        <Route
          path="routines/edit-routine/:routineId"
          element={<EditRoutine />}
        />
        <Route path="activities" element={<Activities />} />
        <Route
          path="activities/create-new-activity"
          element={<CreateNewActivity />}
        />

        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={
            <Login
              // setIsLoggedIn={setIsLoggedIn}
              // isLoggedIn={isLoggedIn}
              setUser={setUser}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/Register"
          element={
            <Register
              // setIsLoggedIn={setIsLoggedIn}
              // isLoggedIn={isLoggedIn}
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

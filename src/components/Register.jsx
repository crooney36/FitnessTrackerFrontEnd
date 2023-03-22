import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";

const Register = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (password === confirmedPassword) {
      console.log("Passwords Match");
      try {
        const user = await registerUser(username, password);
        if (user) {
          console.log("Registering...");
          localStorage.setItem("token", user.token);
          setToken(localStorage.getItem(token));
          setIsLoggedIn(true);
          console.log(isLoggedIn);
          Navigate("/");
        }
      } catch (error) {
        console.error("Registration Failed", error);
      }
    } else {
      console.log("Passwords Do Not Match, registration failed!");
    }
  };

  return (
    <div id="register">
      <div id="register-title">Register</div>
      <form
        id="registration-form"
        onSubmit={(element) => {
          element.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="confirmedPassword">Confirm Password:</label>
        <input
          type="password"
          required
          value={confirmedPassword}
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
          }}
        />
        <button type="submit">Register!</button>
      </form>
    </div>
  );
};

export default Register;

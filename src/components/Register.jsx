import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      console.log("Passwords Match");
      const user = await registerUser(username, password);
      if (user) {
        console.log("Registering...");
        Navigate("/");
      }
    } else {
      console.log("Passwords Do Not Match");
    }
  };

  return (
    <div id="register">
      <div id="register-title">Register</div>
      <form id="register-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="confirmedPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
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

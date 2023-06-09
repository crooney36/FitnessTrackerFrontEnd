import React, { useState, useEffect } from "react";
import { loginUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = props.setUser;
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = await loginUser(username, password);
    if (data && data.token) {
      console.log("Logging in...");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
      Navigate("/");
      window.location.reload;
    } else {
      window.alert("Username or Password is incorrect");
      console.log("Login Failed");
    }
  };

  return (
    <div id="login">
      <form
        id="login-form"
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
        <button type="submit">Login!</button>
      </form>
      <Link to="/Register">Register Here!</Link>
    </div>
  );
};

export default Login;

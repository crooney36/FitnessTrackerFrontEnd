import React, { useState } from "react";
import { loginUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = await loginUser(username, password);
    console.log(data);
    console.log(data.token);
    if (data && data.token) {
      console.log("Logging in...");
      localStorage.setItem("token", data.token);
      setToken(localStorage.getItem(token));
      setIsLoggedIn(true);
      Navigate("/");
    } else {
      console.log("Login Failed");
    }
  };

  return (
    <div id="login">
      <div id="login-title">Login</div>
      <form
        id="login-form"
        onSubmit={(element) => {
          element.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="current-password"
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

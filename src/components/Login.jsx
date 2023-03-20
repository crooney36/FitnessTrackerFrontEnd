import React, { useState } from "react";
import { loginUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const { username, setUsername } = useState("");
  const { password, setPassword } = useState("");
  const { token, setToken } = props;
  const { isLoggedIn, setLoggedIn } = props;
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    const user = await loginUser(username, password);
    if (user) {
      console.log("Logging in...");
      setToken(user.token);
      localStorage.setItem("token", user.token);
      setLoggedIn(true);
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
          id="username"
          name="username"
          required
          value={username}
          //   onChange={(e) => {
          //     setUsername(e.target.value);
          //   }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          //   onChange={(e) => {
          //     setPassword(e.target.value);
          //   }}
        />
        <button type="submit">Login!</button>
      </form>
      <Link to="/Register">Register Here!</Link>
    </div>
  );
};

export default Login;

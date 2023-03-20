import React from "react";
import loginUser from "../api";

const Login = (props) => {
  const { user, setUser } = props;
  const { username, password } = user;

  return (
    <div id="login">
      <div id="login-title">Login</div>
      <form id="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {/* <Link to="/Register">Register Here!</Link> */}
    </div>
  );
};

export default Login;

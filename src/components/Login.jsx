import React from "react";
import { loginUser } from "../api/users";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { username, setUsername } = props;
  const { password, setPassword } = props;
  const { token, setToken } = props;
  const { isLoggedIn, setLoggedIn } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(username, password);
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
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
        <button type="submit" onClick={handleSubmit}>
          Register Here!
        </button>
      </form>
      <Link to="/Register">Register Here!</Link>
    </div>
  );
};

export default Login;

import { Button } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Navbar = (props) => {
  const setToken = props.setToken;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const Navigate = useNavigate();

  return (
    <div id="navbar">
      <div id="navbar-title">My Fitness Tracker</div>
      <span id="nav-buttons">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        {!isLoggedIn ? (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <div>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                setToken("");
                setIsLoggedIn(false);
                Navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </Button>
            <Link to="/my-routines">
              <Button>My Routines</Button>
            </Link>
          </div>
        )}
        <Link to="activities">
          <Button>Activities</Button>{" "}
        </Link>
        <Link to="routines">
          <Button>Routines</Button>{" "}
        </Link>
      </span>
    </div>
  );
};

export default Navbar;

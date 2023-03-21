import { Button } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";

const Navbar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const Navigate = useNavigate();

  return (
    <div id="navbar">
      <div id="navbar-title">Navbar</div>
      {isLoggedIn ? (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      ) : (
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            Navigate("/");
          }}
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default Navbar;

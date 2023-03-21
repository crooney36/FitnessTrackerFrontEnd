import { Button } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Navbar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const Navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

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
            console.log(isLoggedIn);
            setIsLoggedIn(false);
            console.log(isLoggedIn);
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

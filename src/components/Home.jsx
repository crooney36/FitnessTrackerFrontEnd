import React from "react";
import gym from "../assets/gym.jpg";

const Home = (props) => {
  const user = localStorage.getItem("username");
  return (
    <div id="home">
      <div id="home-title">
        {user ? (
          <h1>Welcome, {user} !</h1>
        ) : (
          <h1>Welcome, please sign in or register!</h1>
        )}
      </div>
      <div id="image-container">
        <img src={gym} alt="gym image" />
      </div>
    </div>
  );
};

export default Home;

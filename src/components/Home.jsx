import React from "react";

const Home = (props) => {
  const user = localStorage.getItem("username");
  return (
    <div id="home">
      <div id="home-title">
        {user ? <h1>Welcome, {user} !</h1> : <h1>Welcome!</h1>}
      </div>
    </div>
  );
};

export default Home;

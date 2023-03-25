import React, { useState, useEffect } from "react";
import { getAllRoutines, deleteRoutine } from "../api/routines";
import { useNavigate } from "react-router";
import { Button } from "antd";
import SingleRoutine from "./SingleRoutine";

const Routine = (props) => {
  const user = props.user;
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  const allRoutines = async () => {
    try {
      const result = await getAllRoutines();
      setRoutines(result);
      setToken(localStorage.getItem("token"));
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    allRoutines();
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? (
        <Button onClick={() => navigate("/routines/create-new-routine")}>
          Create New Routine!
        </Button>
      ) : (
        <div></div>
      )}
      <div id="grid-wrapper">
        <div id="routine-container">
          {routines.map((routine, idx) => {
            return (
              <SingleRoutine
                routine={routine}
                key={`idx: ${idx}`}
                routines={routines}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Routine;

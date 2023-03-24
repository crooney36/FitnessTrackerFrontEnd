import React, { useState, useEffect } from "react";
import { getAllRoutines } from "../api/routines";
import { useNavigate } from "react-router";
import { Button } from "antd";
import SingleRoutine from "./SingleRoutine";
import deletePostHandler from "./SingleRoutine";

const MyRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const user = localStorage.getItem("username");
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const allRoutines = await getAllRoutines();
      setRoutines(allRoutines);
    }
    fetchData();
  }, []);

  // Filter allRoutines by creatorName and userName
  const myRoutines = routines.filter((routine) => {
    if (routine.creatorName === user) {
      return true;
    } else {
      return false;
    }
  });
  return (
    <div>
      {localStorage.getItem("token") ? (
        <Button onClick={() => navigate("/routines/create-new-routine")}>
          Create New Routine!
        </Button>
      ) : (
        <div></div>
      )}
      {/* <div id="grid-wrapper"> */}
      <div id="routine-container">
        {myRoutines.map((routine, idx) => {
          return (
            <SingleRoutine
              routine={routine}
              key={`idx: ${idx}`}
              deletePostHandler={deletePostHandler}
            />
          );
        })}
      </div>
      {/* </div> */}
    </div>
  );
};

export default MyRoutines;

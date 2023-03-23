import React, { useState, useEffect } from "react";
import { getAllRoutines } from "../api/routines";
import { useNavigate } from "react-router";

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
        <div>
          <h1>My Routines</h1>
          <h2>Here are your routines!</h2>
          <div>
            {myRoutines.map((routine) => {
              return (
                <div key={routine.id}>
                  <h3>Name: {routine.name}</h3>
                  <h4>Goal: {routine.goal}</h4>
                  <h5>Creator: {routine.creatorName}</h5>
                  <button
                    onClick={() =>
                      navigate(`/routines/edit-routine/${routine.id}`)
                    }
                  >
                    Edit Routine
                  </button>
                  <button onClick={() => deletePostHandler(routine.id)}>
                    Delete Routine
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>My Routines</h1>
          <h2>You must be logged in to view your routines!</h2>
        </div>
      )}
    </div>
  );
};

export default MyRoutines;

import React, { useState } from "react";
import { deleteRoutine } from "../api/routines";
import { Link } from "react-router-dom";

const SingleRoutine = (props) => {
  const routine = props.routine;
  const user = localStorage.getItem("username");
  const routines = props.routines;
  const [newRoutines, setNewRoutines] = useState([]);
  const deletePostHandler = async (routineId) => {
    try {
      const result = await deleteRoutine(routineId);
      const routineCopy = [...routines];
      const filteredRoutines = routineCopy.filter((routine) => {
        if (routine.id !== routineId) {
          return true;
        } else {
          return false;
        }
      });
      if (result.error) {
        return null;
      } else {
        setNewRoutines(filteredRoutines);
        window.location.reload();
        return result;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="routine-card">
      <h1>{routine.name}</h1>
      <h2>Goal: {routine.goal}</h2>
      <h3>Creator: {routine.creatorName}</h3>

      {routine.creatorName === user ? (
        <div>
          <Link
            to={`/routines/edit-routine/${routine.id}`}
            state={{ routine: routine }}
          >
            <button>edit</button>
          </Link>
          <button
            id="DELETE_BUTTON"
            onClick={() => deletePostHandler(routine.id)}
          >
            DELETE
          </button>
        </div>
      ) : null}

      <div className="routineActivitiesList">
        {routine.activities.length
          ? routine.activities.map((activity, idx) => {
              return (
                <div className="routineActivity" key={`activity: ${idx}`}>
                  <p>Activity: {activity.name}</p>
                  <p>Description: {activity.description}</p>
                  <p>Count: {activity.count}</p>
                  <p>Duration: {activity.duration} minutes</p>
                  <p>______________________</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SingleRoutine;

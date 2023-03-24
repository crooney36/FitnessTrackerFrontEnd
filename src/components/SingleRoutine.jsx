import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SingleRoutine = (props) => {
  const routine = props.routine;
  const user = localStorage.getItem("username");
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

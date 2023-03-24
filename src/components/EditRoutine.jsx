import React, { useState, useEffect } from "react";
import {
  getAllRoutines,
  updateRoutine,
  attachActivityToRoutine,
} from "../api/routines";
import { getAllActivities } from "../api/activities";
import {
  updateRoutineActivity,
  deleteRoutineActivities,
} from "../api/routine_activities";
import { useNavigate } from "react-router";
import { Switch } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";

const EditRoutine = () => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [activities, setActivities] = useState([]);
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [activityId, setActivityId] = useState("");
  const navigate = useNavigate();
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsPublic(checked);
  };
  const App = () => <Switch defaultChecked onChange={onChange} />;
  const { routineId } = useParams();
  const location = useLocation();
  const { routine } = location.state;
  console.log(routine);

  async function sendUpdatedRoutine(name, goal, isPublic, routineId) {
    try {
      const result = await updateRoutine(name, goal, isPublic, routineId);
      setName(name);
      setGoal(goal);
      setIsPublic(isPublic);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function allActivities() {
    const result = await getAllActivities();
    setActivities(result);
    return result;
  }

  async function sendUpdatedActivity(count, duration, routineActivityId) {
    const result = await updateRoutineActivity(
      count,
      duration,
      routineActivityId
    );
    return result;
  }

  async function sendDeletedActivity(routineActivityId) {
    const result = await deleteRoutineActivities(routineActivityId);
    return result;
  }

  const filteredActivities = activities.filter((activity) => {
    if (!routine) {
      return true;
    }
    for (let i = 0; i < routine.activities.length; i++) {
      if (activity.name === routine.activities[i].name) {
        return false;
      }
    }
    return true;
  });

  async function sendAttachActivity(activityId, count, duration, routineId) {
    if (!count || !duration) {
      window.alert("count and/or duration must be filled out");
      return null;
    } else {
      try {
        const result = await attachActivityToRoutine(
          activityId,
          count,
          duration,
          routineId
        );
        if (result.error) {
          return null;
        } else {
          navigate("/routines");
          return result;
        }
      } catch (error) {
        throw error;
      }
    }
  }

  useEffect(() => {
    // getRoutine(),
    allActivities();
  }, []);

  return (
    <div>
      <h1>Edit Routine!</h1>
      <form
        className="form"
        id="editRoutineForm"
        onSubmit={(event) => {
          event.preventDefault();
          sendUpdatedRoutine(name, goal, isPublic, routineId);
        }}
      >
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>

        <label>
          Goal:
          <input
            name="goal"
            type="text"
            value={goal}
            onChange={(event) => {
              setGoal(event.target.value);
            }}
          />
        </label>

        <label>
          Public:
          {App()}
        </label>

        <button type="submit">Submit</button>

        <Link className="goBackLink" to="/routines">
          Go back
        </Link>
      </form>

      <form
        className="form"
        id="editRoutineForm"
        onSubmit={(event) => {
          event.preventDefault();
          sendAttachActivity(activityId, count, duration, routineId);
        }}
      >
        <h1>Add an Activity to your Routine!</h1>
        <select
          value={activityId}
          onChange={(event) => {
            setActivityId(event.target.value);
          }}
        >
          {filteredActivities.map((activity, idx) => {
            return (
              <option key={`idx: ${idx}`} value={`${activity.id}`}>
                {activity.name}
              </option>
            );
          })}
        </select>

        <label>
          count:
          <input
            name="count"
            type="number"
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />
        </label>

        <label>
          duration:
          <input
            name="duration"
            type="number"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      <div id="grid-wrapper">
        <div id="activity-container">
          {routine.activities.map((activity, idx) => {
            return (
              <div className="allActivities" key={`activity: ${idx}`}>
                <h1>Activity Name: {activity.name}</h1>
                <h2>Description: {activity.description}</h2>
                <p>______________________</p>
                <button>edit</button>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendUpdatedActivity(
                      count,
                      duration,
                      activity.routineActivityId
                    );
                  }}
                >
                  <label>
                    count:
                    <input
                      name="count"
                      type="number"
                      value={count}
                      onChange={(event) => {
                        setCount(event.target.value);
                      }}
                    />
                  </label>

                  <label>
                    duration:
                    <input
                      name="duration"
                      type="number"
                      value={duration}
                      onChange={(event) => {
                        setDuration(event.target.value);
                      }}
                    />
                  </label>
                  <button type="submit">Save</button>
                </form>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendDeletedActivity(activity.routineActivityId);
                  }}
                >
                  <button type="submit">delete</button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EditRoutine;

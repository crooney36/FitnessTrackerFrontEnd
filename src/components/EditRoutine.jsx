import React, { useState, useEffect } from "react"
import { getAllRoutines, updateRoutine, attachActivityToRoutine } from "../api/routines"
import { getAllActivities } from "../api/activities"
import { useNavigate } from "react-router";
import { Switch } from 'antd';
import { Link, useParams } from "react-router-dom";

const EditRoutine = () => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [singleRoutine, setSingleRoutine] = useState({});
    const [activities, setActivities] = useState([]);
    const [count, setCount] = useState("")
    const [duration, setDuration] = useState("")
    const [activityId, setActivityId] = useState("")
    const navigate = useNavigate()
    
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsPublic(checked)
    };
    const App = () => <Switch defaultChecked onChange={onChange} />;
    const { routineId } = useParams()

async function sendUpdatedRoutine(name, goal, isPublic, routineId){
    try {
        const result = await updateRoutine(name, goal, isPublic, routineId)
        setName(name);
        setGoal(goal);
        setIsPublic(isPublic);
        return result
    } catch (error) {
        throw error
    }
}

async function allActivities(){
  const result = await getAllActivities()
  setActivities(result)
  return result
}

async function getRoutine(){
  const result = await getAllRoutines();
  const matchedRoutine = result.filter((routine) => {
    return routine.id === Number(routineId)
  })
  if(matchedRoutine){
    setSingleRoutine(matchedRoutine[0])
  }
}

const filteredActivities = activities.filter((activity)=>{
  for(let i = 0; i < singleRoutine.activities.length; i++){
    if(activity.name === singleRoutine.activities[i].name){
      return false
    }
  }
  return true
})

async function sendAttachActivity(activityId, count, duration, routineId){
  if(!count || !duration){
    window.alert("count and/or duration must be filled out")
    return null
  }else{
    try {
      const result = await attachActivityToRoutine(activityId, count, duration, routineId)
      if(result.error){
        return null  
      }else{
        navigate("/routines")
        return result
      }
    } catch (error) {
        throw error
    }
  }
}

useEffect(() => {
  getRoutine(),
  allActivities()
}, []);

return(
  <div>
    <h1>Edit Routine!</h1>
    <form className="form" id="editRoutineForm"
    onSubmit={(event) => {
      event.preventDefault();
      sendUpdatedRoutine(name, goal, isPublic, routineId);
    }}>
        
    <label>
    Name:
      <input
      name="name"
      type="text"
      value={name}
      onChange={(event) => {
        setName(event.target.value);
      }}/>
    </label>

    <label>
    Goal:
    <input
    name="goal"
    type="text"
    value={goal}
    onChange={(event) => {
      setGoal(event.target.value);
    }}/>
    </label>
        
    <label>
    Public:

      {
        App()
      }
    </label>

      <button type="submit">Submit</button>

      <Link className="goBackLink" to="/routines">Go back</Link>
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
        {
          filteredActivities.map((activity, idx)=>{
            return(
              <option key={`idx: ${idx}`} value={`${activity.id}`}>{activity.name}</option>
            )
          })
        }
      </select>

      <label>
      count:
      <input
      name="count"
      type="number"
      value={count}
      onChange={(event) => {
        setCount(event.target.value);
      }}/>
      </label>
      
      <label>
      duration:
      <input
      name="duration"
      type="number"
      value={duration}
      onChange={(event) => {
        setDuration(event.target.value);
      }}/>
      </label>

      <button type="submit">Submit</button>
    </form>
  </div>
    )
}
export default EditRoutine
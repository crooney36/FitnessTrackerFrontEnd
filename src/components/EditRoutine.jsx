import React, { useState, useEffect } from "react"
import { getAllRoutines, updateRoutine } from "../api/routines"
import { getAllActivities } from "../api/activities"
import { useNavigate } from "react-router";
import { Switch } from 'antd';
import { Link, useParams } from "react-router-dom";

const EditRoutine = () => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [singleRoutine, setSingleRoutine] = useState([]);
    const [activities, setActivities] = useState([]);
    console.log(singleRoutine," ////////////////////////////////////////////////")
    console.log(activities," ???????????????????????????????????????????????????????")
    let navigate = useNavigate()
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsPublic(checked)
    };
    const App = () => <Switch defaultChecked onChange={onChange} />;
    let { routineId } = useParams()

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
  // console.log(result, " ///////////////////////////////////////////")
  result.filter((routine) => {
    if(routine.id === routineId){
      setSingleRoutine(routine)
      return true
    }else{
      return false
    }
  })
}

function filteredActivities(arr1, arr2){
  arr2.filter((e)=>{
    arr1.activities.name !== e.name
  })
}

useEffect(() => {
  allActivities(),
  getRoutine()
}, []);

// console.log(filteredActivities(singleRoutine,activities))
    return(
        <div>
    <h1>Edit Routine!</h1>
    <form className="form"
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
        {/* <input
        name="public"
        type="text"
        value={isPublic}
        onChange={(event) => {
          setIsPublic(event.target.value);
        }}/> */}
      </label>
      <button type="submit">Submit</button>
      <Link className="goBackLink" to="/routines">Go back</Link>
    </form>
  </div>
    )
}
export default EditRoutine
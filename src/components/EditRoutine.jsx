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
    // console.log(singleRoutine," ////////////singleRoutine////////////")
    const [activities, setActivities] = useState([]);
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
  // console.log(matchedRoutine[0]," ////////////////////////////////")
  if(matchedRoutine){
    setSingleRoutine(matchedRoutine[0])
  }
}

console.log(singleRoutine," ////////singleRoutine///////")
console.log(activities," ////////activities/////////")
const filteredActivities = activities.filter((activity)=>{
  for(let i = 0; i < singleRoutine.activities.length; i++){
    if(activity.name === singleRoutine.activities[i].name){
      return false
    }
  }
  return true
})

// console.log(filteredActivities)
// function filteredActivities(singleRoutine, activities, ){
//   const singleRoutineArr = singleRoutine.activities
//   console.log(singleRoutineArr, " ///////////////////////")
//   const filteredArr = []
//   if(singleRoutineArr){
//     console.log("in if")
//     allActivitiesArr.filter((activity)=>{
//       if(activity.name !== singleRoutineArr.name){
//         filteredArr.push(activity)
//         // console.log(filteredArr, " ///////////////////////////////")
//         return filteredArr
//       }
//     })
//   }else{
//     console.log("in else")
//     return allActivitiesArr
//   }
// }

// console.log(filteredActivities(singleRoutine.activities, activities))


async function attachActivity(activityId, count, duration, routineId){
  const result = await attachActivityToRoutine(activityId, count, duration, routineId)
  return result
}

useEffect(() => {
  getRoutine(),
  allActivities()
}, []);


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
      <select>
        {
          filteredActivities.map((activity, idx)=>{
            return(
              <option key={`idx:${idx}`}>{activity.name}</option>
            )
          })
        }
      </select>
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
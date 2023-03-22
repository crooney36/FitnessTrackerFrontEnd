import React, { useState, useEffect } from "react"
import { updateRoutine } from "../api/routines"
import { useNavigate } from "react-router";
import { Switch } from 'antd';
import { Link } from "react-router-dom";


const EditRoutine = () => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    let navigate = useNavigate()
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsPublic(checked)
    };
    const App = () => <Switch defaultChecked onChange={onChange} />;

async function sendUpdatedRoutine(name, goal, isPublic){
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

    return(
        <div>
    <h1>Edit Routine!</h1>
    <form className="form"
    onSubmit={(event) => {
      event.preventDefault();
      sendUpdatedRoutine(name, goal, isPublic);
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
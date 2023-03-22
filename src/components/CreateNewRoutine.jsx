import React, { useState, useEffect } from "react"
import { createNewRoutine } from "../api/routines"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Switch } from 'antd';

const CreateNewRoutine = () => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  let navigate = useNavigate()
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsPublic(checked)
  };
  const App = () => <Switch defaultChecked onChange={onChange} />;

async function sendNewRoutine(name, goal, isPublic){
    if(!name || !goal){
        window.alert("Routine name and/or goal must be filled out")
        return null
    }else if(name.length < 3 || goal.length < 3){
        window.alert("Routine name and/or goal are too short")
        return null
    }else{
        try {
          const result = await createNewRoutine(name, goal, isPublic)
          setName(name);
          setGoal(goal);
          setIsPublic(isPublic);
          if(result.error){
            return null  
          }else{
            navigate("/routines")
            return result
          }
        } catch (error) {
            throw error;
        }
    }
}

return(
  <div>
    <h1>Create a New Routine!</h1>
    <form className="form"
    onSubmit={(event) => {
      event.preventDefault();
      sendNewRoutine(name, goal, isPublic);
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

export default CreateNewRoutine;
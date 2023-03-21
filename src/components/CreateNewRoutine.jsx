import React, { useState, useEffect } from "react"
import { createNewRoutine } from "../api/routines"
import { Link } from "react-router-dom";

const CreateNewRoutine = () => {
const [name, setName] = useState("");
const [goal, setGoal] = useState("");
const [isPublic, setIsPublic] = useState("");

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
            return result
        } catch (error) {
            throw error;
        }
    }
}

return(
    <form className="form"
    onSubmit={(event) => {
      event.preventDefault();
      sendNewRoutine(name, goal, isPublic);
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
        <input
          name="public"
          type="text"
          value={isPublic}
          onChange={(event) => {
            setIsPublic(event.target.value);
          }}
        />
      </label>
      <button type="submit">Submit</button>
      <Link to="/routines">Go back</Link>
    </form>
)
}

export default CreateNewRoutine;
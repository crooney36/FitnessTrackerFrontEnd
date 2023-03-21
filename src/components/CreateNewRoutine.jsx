import React, { useState, useEffect } from "react"
import { createNewRoutine } from "../api/routines"
import { Link } from "react-router-dom";

const CreateNewRoutine = () => {
const [name, setName] = useState("");
const [goal, setGoal] = useState("");
const [isPublic, setIsPublic] = useState("");

async function sendNewRoutine(name, goal, isPublic){
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
          value={setName}
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
          value={setGoal}
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
          value={setIsPublic}
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
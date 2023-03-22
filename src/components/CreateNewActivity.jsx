import React, { useState, useEffect } from "react"
import { postActivity } from "../api/activities"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const CreateNewActivity = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    let navigate = useNavigate()

    async function sendNewActivity(name, description){
        if(!name || !description){
            window.alert("Activity name and/or description must be filled out")
            return null
        }else if(name.length < 3 || description.length < 3){
            window.alert("Activity name and/or description are too short")
            return null
        }else{
            try {
                const result = await postActivity(name, description)
                setName(name)
                setDescription(description)
                if(result.error){
                    return null  
                }else{
                    navigate("/activities")
                    return result
                }
            } catch (error) {
                window.alert(error)
                throw error
            }
        } 
    }

return(
    <div>
        <h1>Create New Activity!</h1>
        <form className="form"
        onSubmit={(event) => {
            event.preventDefault();
            sendNewActivity(name, description);
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
            description:
                <input
                name="description"
                type="text"
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}/>
            </label>

            <button type="submit">Submit</button>
            <Link className="goBackLink" to="/activities">Go back</Link>
        </form>
    </div>
    
)
}

export default CreateNewActivity
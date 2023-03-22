import React, { useState, useEffect } from "react"
import { getAllActivities } from "../api/activities"
import { useNavigate } from "react-router";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [ token, setToken ] = useState(null);
    const [ isLoggedIn, setLoggedIn ] = useState(true);
    let navigate = useNavigate();

    const allActivities = async () => {
        try {
            const result = await getAllActivities();
        setActivities(result)
        // setToken(localStorage.getItem("token"))
        // if(token){
        //     setLoggedIn(true);
        // }else{
        //     setLoggedIn(false);
        // }
        return result;
        } catch(error) {
            throw error
        }
        
    }

    useEffect(() => {
        allActivities();
    }, [])

    return(
        <div id="activity">
            <h1>Activities!</h1>
            {
                isLoggedIn ? <button onClick={() => navigate("/activities/create-new-activity")}>Create New Activity!</button> : null 
            }
            {
                activities.length ? activities.map((activity, idx) =>{
                    return(
                        <div className="allActivities" key={`activity: ${idx}`}>
                            <h1>Activity Name: {activity.name}</h1>
                            <h2>Description: {activity.description}</h2>
                            <p>______________________</p>
                        </div>
                    )
                }): null 
            }
        </div>
    )

};

export default Activities;

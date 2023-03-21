import React, { useState, useEffect } from "react";
import { getAllRoutines } from "../api/routines"
import { useNavigate } from "react-router";

const Routine = () => {
    const [routines, setRoutines] = useState([]);
    const [ token, setToken ] = useState(null);
    const [ isLoggedIn, setLoggedIn ] = useState(true);
    let navigate = useNavigate();

    const AllRoutines = async () => {
        try {
            const result = await getAllRoutines();
            setRoutines(result);
            // setToken(localStorage.getItem("token"))
            // if(token){
            //     setLoggedIn(true);
            // }else{
            //     setLoggedIn(false);
            // }
            return result;
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        AllRoutines();
    }, [])
    
    return (
        <div id="routine">
            {
                isLoggedIn ? <button onClick={() => navigate("/routines/create-new-routine")}>Create New Routine!</button> : null 
            }
            {
                routines.length ? routines.map((routine, idx)=>{
                    return(
                        
                        <div className="AllPublicRoutines" key={`routine: ${idx}`}>
                            <h1>{routine.name}</h1>
                            <h2>Goal: {routine.goal}</h2>
                            <h3>Creator: {routine.creatorName}</h3>

                            <div className="routineActivitiesList">
                            {
                                routine.activities.length? routine.activities.map((activity, idx)=>{
                                    return(
                                        <div className="routineActivity" key ={`activity: ${idx}`}>
                                            <p>Activity: {activity.name}</p>
                                            <p>Description: {activity.description}</p>
                                            <p>Count: {activity.count}</p>
                                            <p>Duration: {activity.duration} minutes</p>
                                            <p>______________________</p>
                                        </div>
                                    )
                                }):null
                            }
                            </div>
                        </div>
                    )
                }): null

            }
            
        </div>
    );
};

export default Routine;

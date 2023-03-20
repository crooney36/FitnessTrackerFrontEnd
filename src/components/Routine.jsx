import React, { useState, useEffect } from "react";
import { getAllRoutines } from "../api/routines"

const Routine = () => {
    const [routines, setRoutines] = useState([])

    const AllRoutines = async () => {
        try {
            const result = await getAllRoutines();
            setRoutines(result);
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
                routines.length ? routines.map((routine, idx)=>{
                    return(
                        <div className="AllPublicRoutines" key ={`routine: ${idx}`}>
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
                                    </div>)
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

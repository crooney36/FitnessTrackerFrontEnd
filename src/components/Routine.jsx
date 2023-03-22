import React, { useState, useEffect } from "react";
import { getAllRoutines, deleteRoutine } from "../api/routines"
import { useNavigate } from "react-router";
import { Cascader } from 'antd';


const Routine = (props) => {
    const user = props.user
    const [ routines, setRoutines ] = useState([]);
    const [ token, setToken ] = useState("");
    const [ isLoggedIn, setLoggedIn ] = useState(null);
    let navigate = useNavigate();
    const options = [{}]
    const onChange = (value) => {
        console.log(value);
    };
    const App = () => (
        <Cascader
        style={{
            width: '100%',
        }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"/>
      );

    const AllRoutines = async () => {
        try {
            const result = await getAllRoutines();
            setRoutines(result);
            console.log(localStorage.getItem("token"))
            setToken(localStorage.getItem("token"))
            if(token){
                setLoggedIn(true);
            }else{
                setLoggedIn(false);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    const deletePostHandler = async (routineId) => {
        try {
            await deleteRoutine(routineId)
            const routineCopy = [...routines]
            const filteredRoutines = routineCopy.filter((routine)=>{
                if(routine.id !== routineId){
                    return true
                }{
                    return false
                }
            })
            setRoutines(filteredRoutines)
        } catch (error) {
            throw error
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

                            {
                                
                               routine.creatorName === user ? 
                                <div>
                                    <button onClick={() => navigate(`/routines/edit-routine/${routine.id}`)} >Edit</button> 
                                    <button id = "DELETE_BUTTON" onClick={() => deletePostHandler(routine.id)}>DELETE</button>
                                </div>: null
                            }
                            
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

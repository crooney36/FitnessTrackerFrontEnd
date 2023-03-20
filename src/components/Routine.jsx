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
                routines.length ? routines.map((routine)=>{

            }): null

            }
            <h1>Routines!</h1>
        </div>
    );
};

export default Routine;

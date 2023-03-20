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
            <div id="routine-title">Routine</div>
        </div>
    );
};

export default Routine;
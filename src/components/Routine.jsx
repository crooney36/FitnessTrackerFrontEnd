import React, { useState, useEffect } from "react";
import { getAllRoutines, deleteRoutine } from "../api/routines";
import { useNavigate } from "react-router";
import { Cascader } from "antd";
import SingleRoutine from "./SingleRoutine";

const Routine = (props) => {
  const user = props.user;
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);

  //   const options = [{}];
  //   const onChange = (value) => {
  //     console.log(value);
  //   };
  //   const App = () => (
  //     <Cascader
  //       style={{
  //         width: "100%",
  //       }}
  //       options={options}
  //       onChange={onChange}
  //       multiple
  //       maxTagCount="responsive"
  //     />
  //   );

  const allRoutines = async () => {
    try {
      const result = await getAllRoutines();
      setRoutines(result);
      console.log(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const deletePostHandler = async (routineId) => {
    try {
      await deleteRoutine(routineId);
      const routineCopy = [...routines];
      const filteredRoutines = routineCopy.filter((routine) => {
        if (routine.id !== routineId) {
          return true;
        }
        {
          return false;
        }
      });
      setRoutines(filteredRoutines);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    allRoutines();
  }, []);

  return (
    routines.map((routine, idx)=>{
      return(
        <SingleRoutine routine={routine} key={`idx: ${idx}`}/>
      )
    })
  )
};

export default Routine;

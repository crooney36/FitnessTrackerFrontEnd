import { BASE_URL } from "./index";

export const getAllRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      //   method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const createNewRoutine = async (name, goal, isPublic) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic,
        })
      });
      const result = await response.json();
      if(result.error){
        window.alert(result.error)
      }
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}

export const updateRoutine = async (name, goal, isPublic, routineId) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const deleteRoutine = async (routineId) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const attachActivityToRoutine = async (
  activityId,
  count,
  duration,
  routineId
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

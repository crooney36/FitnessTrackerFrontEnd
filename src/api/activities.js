import { BASE_URL } from './index';

export const getAllActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      // console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}

export const postActivity = async (name, description) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
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

export const updateActivity = async (name, description) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
        },
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          description: description,
        })
      });
  
        const result = await response.json();
        console.log(result);
        return result
      } catch (err) {
      console.error(err);
      }
}

export const getPublicRoutineByActivityId = async (activityId) => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
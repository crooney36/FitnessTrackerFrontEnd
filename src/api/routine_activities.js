import { BASE_URL } from './index';

export const updateRoutineActivity = async (count, duration, routineActivityId) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          count: count,
          duration: duration,
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}

export const deleteRoutineActivities = async (routineActivityId) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
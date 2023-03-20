import { BASE_URL } from "./index.js";

// Register User to Database
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Login User to Database
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// // Get User from Database
// fetch(`${BASE_URL}/api/users/me`, {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${TOKEN}`,
//   },
// })
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   })
//   .catch(console.error);

// Get user routines from Database
export const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/albert/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

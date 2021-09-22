//import defaultImg from  '../media/Avatar/avatar.png';
import axios from "axios";

// -- Constants ------------------------
const API_HOST = "http://localhost:4000";
const USERS_KEY = "users";
const USER_KEY = "user";
//const date = new Date();


// const users = [
//   {
//     email: "user@test.com",
//     username: "Tester1",
//     password: "Password1!",
//     date: "Tue 24th Aug 2021",
//     profileImg: defaultImg
//   },
  
//   {
//     email: "user1@test.com",
//     username: "Tester2",
//     password: "Password2!",
//     date: "Tue 24th Aug 2021",
//     profileImg: defaultImg
//   },
// ];


// //initialize local storage "users" with data, if the data is already set this function returns
// function initUsers() {

//   if (localStorage.getItem(USERS_KEY !== null)) {
//     return;
//   }

//   //set data into local storag
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

// //new user sign up 
// //add new user into local Storage
// function insertOrUpdateUser(user) {
//   const users = getUsers();

//   users.push({ username: user.username, email: user.email, password: user.password, date: date.toDateString(), profileImg: defaultImg});
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }


// function getUsers() {
//   //retrieve user data from local Storage
//   //if no key then return null
//   const data = localStorage.getItem(USERS_KEY);

//   //convert data to objects
//   return JSON.parse(data);
// }

// //verify user while login
// function verifyUser(email, password) {
//   const users = getUsers();
//   console.log(users);
//   for (const user of users) {
//     if (email === user.email && password === user.password) {
//       setUser(user);
//       return true;
//     }
//   }
//   return false;
// }



// //in local storage set a new key 'user' for logged in user
// function setUser(user) {
//   const currentUser = ({ ...user });
//   localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
// }

// //set user upon signup


// //get the logged in user details only 
// // ->after logged in display user info 
// function getUser() {
//   const data = localStorage.getItem(USER_KEY);

//   //convert data to objects
//   return JSON.parse(data);
// }

// //remove user from the logged in session
// function removeUser() {
//   localStorage.removeItem(USER_KEY);
// }

// function deleteUser(username) {
//   let users = getUsers();
//   let index;
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].username === username) {
//       index = i;
//       break;
//     }
//   }
//   if (index === undefined) return
//   users.splice(index, 1);
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));

// }

// function editUser(userUpdated) {
//   let users = getUsers();
//   let index;
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].email === userUpdated.email) {
//       index = i;
//       break;
//     }
//   }
//   users[index] = { ...users[index], username: userUpdated.username, password: userUpdated.password, profileImg : userUpdated.profileImg};
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));

// }



// export {
//   initUsers,
//   verifyUser,
//   setUser,
//   getUsers,
//   getUser,
//   removeUser,
//   insertOrUpdateUser,
//   deleteUser,
//   editUser,
// }



// ---- User -------
async function verifyUser(username, password) {
  const response =  await axios.get(API_HOST + "/api/users/login", { params: {  username, password}});
  const user = response.data;

  if(user !== null)
    setUser(user);
  
  return user;

}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);
  
  return response.data;
}

async function editUser(id, user) {
  const response = await axios.post(API_HOST + `/api/users/update./${id}`, user);
  
  return response.data;
}

async function deleteUser(id) {
  const response = await axios.post(API_HOST + `/api/users/delete/${id}`);

  return response.data;
}

//in local storage set a new key 'user' for logged in user
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser(user) {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

//remove user from the logged in session
function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  deleteUser,
  editUser,
  getUser,
  setUser,
  removeUser
}
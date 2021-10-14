//import defaultImg from  '../media/Avatar/avatar.png';
import axios from "axios";

// -- Constants ------------------------
const API_HOST = "http://localhost:4000";
const USERS_KEY = "users";
const USER_KEY = "user";
//const date = new Date();

// ---- User -------
async function verifyUser(username, password) {
  const response =  await axios.get(API_HOST + "/api/users/login", { params: {  username, password}});
  const user = response.data;

  if(user !== null)
    setUser(user);
  
  return user;

}

async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);

  return response.data;
}

// RETURN ALL USERS INFO
async function getUsers(){
  const response = await axios.get(API_HOST + `/api/users/`);

  return response.data;

}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);
  
  return response.data;
}

async function editUser(user) {
 
  const response = await axios.put(API_HOST + "/api/users/update", user);
  
  return response.data;
}

async function deleteUser(username) {
  const response = await axios.delete(API_HOST + `/api/users/delete/${username}`);

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

async function getFollowing(username){
  const response = await axios.get(API_HOST + `/api/relationship/${username}/following`);

  return response.data;
}

async function getFollowable(username){
  const response = await axios.get(API_HOST + `/api/relationship/${username}/follow`);

  return response.data;
}

async function unfollow(username, targetUser){
  const response = await axios.post(API_HOST + `/api/relationship/${username}/unfollow`, targetUser);

  return response.data;
}

async function follow(username, targetUser){
  const response = await axios.post(API_HOST + `/api/relationship/${username}/follow/`, targetUser);

  return response.data;
}


export {
  verifyUser,
  getUsers,
  findUser,
  createUser,
  deleteUser,
  editUser,
  getUser,
  setUser,
  removeUser,
 
  getFollowing,
  getFollowable,
  unfollow,
  follow,


}
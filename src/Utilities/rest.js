import { serverAddress } from "./constants";
import { getToken } from "./useLocalStorage";


const createUser = (user) => {
    fetch(serverAddress + "/user", {
      method: 'POST',
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  function getPublicMessages() {   
    let token = getToken();
    return fetch(serverAddress + "/auth/MainRoom/Get", {
        method: 'Get',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': token
        }
    }).then(response=>response.json())
    .then(response=>
    { 
        console.log(response)
        return response
    }
    );
}
const getAllUserPrivateMessages = (userid) => {
    fetch(serverAddress + "/channel/getAll", {
        method: 'GET',
        headers: {
        'from': userid
        }})
}

function sendPublicMessage(messageBody) {
    console.log("sendPublicMessage");
    let token = getToken();
    return fetch(serverAddress + "/auth/MainRoom/Send", {
        method: 'POST',
        body: messageBody,
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': token
        }
    }).then(Response => {
        if (Response.ok) {
            return Response.text();
        }
    }).then(result => result);
}

function getAllRegisteredUsers () {
    let token = getToken();
    return fetch(serverAddress + "/auth/get-all-registered-users", {
        method: 'GET',
        headers:{
            'Authorization': token
        }
    }).then(response=>response.json())
    .then(responseBody=>responseBody);
}


const getAllUserPrivateChats = async (token) => {
    return fetch(serverAddress + "/auth/channel/get-all-private-messages", {
        method: 'GET',
        headers:{
            'Authorization': token
        }
    }).then(response=>response.json())
    .then(response=>{console.log(response)});
}


    // export const loadProfile = async () => {
    //     let token = localStorage.getItem("token");
    //     fetch(serverAddress + "/Auth/profile/load",{
    //         method: 'GET',
    //         headers:{
    //             'Authorization': token
    //         }
    //     });
    // }

export{createUser, getPublicMessages,sendPublicMessage ,getAllUserPrivateMessages, getAllRegisteredUsers, getAllUserPrivateChats}
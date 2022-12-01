import { serverAddress } from "./constants"
import { globalPublicMessages } from "./data"
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
    let token = localStorage.getItem("token")
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

const sendPublicMessage = async (userid, message) => {
    let res = await fetch(serverAddress + "/MainRoom/Send", {
    method: 'POST',
    body: message,
    headers: {
        'Content-Type': 'text/plain',
        'from': userid
    }})
    if(res.ok)
    {
       let respone=res.text()
       console.log(respone)
       return Response;
    }
}

const getAllRegisteredUsers = async (token) => {
    fetch(serverAddress + "/auth/get-all-registered-users", {
        method: 'GET',
        headers:{
            'Authorization': token
        }
    });
}

const getAllUserPrivateChats = async (token) => {
    fetch(serverAddress + "/auth/channel/get-all-private-messages", {
        method: 'GET',
        headers:{
            'Authorization': token
        }
    });
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
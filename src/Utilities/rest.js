import { param } from "jquery";
import { useTransition } from "react";
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
const getAllUserPrivateMessages = (username) => {
    let token = getToken();
    return fetch(serverAddress + "/auth/channel/get?reciverName="+username, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': token
    }}).then(response => {
        if(response.ok){
            return response.json();
        } else {
            window.alert("error") //goback!
        }
    })
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

function getAllRegisteredUsers (lastUpdate) {
    let url=serverAddress + "/auth/get-registered-users";
    if(lastUpdate) url+="?fromDate="+lastUpdate.toISOString();
    let token = getToken();
    // console.log(url);
    return fetch(url, {
        method: 'GET',
        headers:{
            'Authorization': token
        }
    }).then(response=>response.json())
    .then(response=>{
        // console.log(response);
        // console.log(lastUpdate);
        return response;    });
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

function sendPrivateMessage(messageBody, username) {
    console.log("sendPrivateMessage");
    let token = getToken();
    return fetch(serverAddress + "/auth/channel/send?reciverName="+username, {
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

function getUsernameFromToken(){
    let token = getToken();
    return fetch(serverAddress + "/auth/name" ,{
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then(Response => {
        if (Response.ok) {
            return Response.text();
        }
    }).then(result => result);
}

function getOtherProfileByUsername(username){
    let token = getToken();
    return fetch(serverAddress + "/auth/profile/load?usernameToView="+username ,{
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then(Response => {
        if (Response.ok) {
            return Response.json();
        } else {
            return null;
        }
    }).then(result => result);

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

export{getOtherProfileByUsername, getUsernameFromToken, createUser, getPublicMessages,sendPublicMessage ,
    getAllUserPrivateMessages, getAllRegisteredUsers, getAllUserPrivateChats, sendPrivateMessage}
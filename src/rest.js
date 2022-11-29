import { serverAddress } from "./constants"

const createUser = (user) => {
    fetch(serverAddress + "/user", {
      method: 'POST',
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  const getAllPubulicMessages = (userid,startDate,endDate) => {
    let url=serverAddress + "/MainRoom/GetAll";
    if(endDate != undefined && startDate != undefined) url+="?startDate="+startDate+"&endDate="+endDate;
    else if(startDate === undefined) url+="?endDate="+endDate;
    else if(endDate === undefined) url+="?startDate="+startDate;   
    fetch(url, {
      method: 'GET',
      headers: {
        'from': userid
      }})
  }
  const getAllUserPrivateMessages = (userid) => {
    fetch(serverAddress + "/channel/getAll", {
      method: 'GET',
      headers: {
        'from': userid
      }})
  }

  const sendPublicMessage = (userid, message) => {
  fetch(serverAddress + "/MainRoom/Send", {
    method: 'POST',
    body: message,
    headers: {
      'Content-Type': 'text/plain',
      'from': userid
    }})
}

export{createUser, sendPublicMessage,getAllPubulicMessages,getAllUserPrivateMessages}
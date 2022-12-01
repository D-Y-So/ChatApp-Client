import React, { useState, useEffect} from "react"
import { json, Link, useNavigate } from "react-router-dom";
import { usePublicMesagges } from "./data.js";
import { getAllRegisteredUsers, getPublicMessages, getAllUserPrivateChats } from "./rest";
import { serverAddress } from "./constants";
import Register from "./Register";
import { Button } from "bootstrap";
import { get } from "jquery";
import { openConnection } from "./socketjs.js";

export const MainPage = () => {
    const navigate = useNavigate();
    
    const [publicMessages,] = usePublicMesagges();
    console.log(publicMessages instanceof Array);
    const [messageToSend, setMessageToSend] = useState("");
    const [privateChat, setPrivateChat] = useState()
    const [users, setActivatedUsers] = useState()
    
    useEffect(() => {
        console.log("on the beginning...")
     openConnection();
    }, []);
    useEffect(() => {
        console.log("useEffect");
        
    }, [publicMessages])
    //getPublicMessages()
   
    function sendPublicMessage() {
        console.log("sendPublicMessage");
        let token = localStorage.getItem("token");
        fetch(serverAddress + "/auth/MainRoom/Send", {
            method: 'POST',
            body: messageToSend,
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': token
            }
        }).then(Response => {
            if (Response.ok) {
                setMessageToSend("")
                return Response.text();
            }
        }).then(text => alert(text))
    }


    function inputMessage(e) {
        setMessageToSend(e.target.value);
    }
    //getMessages();
    return (
        <div className="MainPage">
            <div className="container">
            <ul>{ publicMessages && publicMessages.map(
                (message,index)=><li key={index}>{JSON.stringify(message)}</li>
            )}</ul>
            </div>
            <input onChange={inputMessage}></input>
            <button onClick={sendPublicMessage}>send</button>
        </div>
    )
}


export default MainPage

    // return(
    //     <ul>
    //         {members.map(d=> <li>{d.username}</li>)}
    //     </ul>
    // )


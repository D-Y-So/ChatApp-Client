import React, { useState, useEffect } from "react"
import { json, Link, useNavigate } from "react-router-dom";
import { usePublicMesagges } from "../dataComponents/publicMessages.js";
import { getAllRegisteredUsers, sendPublicMessage, getAllUserPrivateChats } from "../Utilities/rest";
import { serverAddress } from "../Utilities/constants";
import Register from "./Register";
import { Button } from "bootstrap";
import { get } from "jquery";
import { openConnection, isConnected } from "../Utilities/socketjs.js";

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




    function inputMessage(e) {
        setMessageToSend(e.target.value);
    }
    //getMessages();
    return (
        <div className="MainPage">
            <div className="container">
                <ul>{publicMessages && publicMessages.map(
                    (message, index) => <li key={index}>{JSON.stringify(message)}</li>
                )}</ul>
            </div>
            <input onChange={inputMessage}></input>
            <button onClick={() => sendPublicMessage(messageToSend)}>send</button>
        </div>
    )
}


export default MainPage

    // return(
    //     <ul>
    //         {members.map(d=> <li>{d.username}</li>)}
    //     </ul>
    // )


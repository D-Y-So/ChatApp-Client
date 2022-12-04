import React, { useState, useEffect } from "react"
import { json, Link, useNavigate } from "react-router-dom";
import { usePublicMesagges } from "../dataComponents/publicMessages.js";
import { GetUsers } from "../dataComponents/users.js";
import { getAllRegisteredUsers, sendPublicMessage, getAllUserPrivateChats } from "../Utilities/rest";
import { serverAddress } from "../Utilities/constants";
import Register from "./Register";
import { Button } from "bootstrap";
import { get } from "jquery";
import {GetUsersNew} from "../dataComponents/newUsers.jsx";
import { openConnection, isConnected } from "../Utilities/socketjs.js";
import PrivateChat from "../dataComponents/PrivateChat.jsx";

export const MainPage = () => {
    const navigate = useNavigate();

    const [publicMessages,] = usePublicMesagges();
    //console.log(publicMessages instanceof Array);
    const [messageToSend, setMessageToSend] = useState("");
    const [privateChat, setPrivateChat] = useState();
    // const [users, setActivatedUsers] = useState();
    // const [registeredUsers] = GetUsersNew();
    const [users, setUsers] = useState([]);
    const [newUsers, setnewUsers] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();
    // console.log(registeredUsers);
    // console.log(registeredUsers instanceof Array);

    useEffect(() => {
        console.log("on the beginning...")
        openConnection();
    }, []);
    useEffect(() => {
        console.log("useEffect");

    }, [publicMessages])
    //getPublicMessages()

    useEffect(()=>
    {
        async function init()
        {
            let usersFromApi=await getAllRegisteredUsers();
            // console.log(usersFromApi);
            setUsers(usersFromApi);
            // console.log(users)
            setLastUpdate(new Date());
        }
        init();
        const interval = setInterval(getUsers,5000);
        return () => clearInterval(interval);
    },[users]);

    async function getUsers()
    {
        let usersFromApi=await getAllRegisteredUsers(lastUpdate);
        // console.log(usersFromApi instanceof Array);
        // let difference = usersFromApi.filter(o1 => o1.username !== "maya");
        let difference = usersFromApi.filter(o1 => !users.some(o2 => o1.username === o2.username));
        if(difference.length>0) {
            console.log("difference");
            console.log(difference);
            setnewUsers([...difference]);
            setUsers((users) => [...users, newUsers]);
        } 
    }

    function openPrivateChat(e){
        
    }


    function inputMessage(e) {
        setMessageToSend(e.target.value);
    }
    //getMessages();


    return (
        <div className="MainPage">
            <div className="container">
                <div className="users">
                    <ul title="All Registered Users :"> {users && users.map(
                        (user, index) => 
                        <li key={index}>
                            {<button className="user-li" onClick={() =>console.log("click on " + user.username) }>{user.username}</button>}
                        </li>
                        )}
                    </ul>
                </div>
                <div className="messages-container">
                    <div className="messages">
                        <ul>{publicMessages && publicMessages.map(
                            (message, index) => <li className = "message-li" key={index}>{message.time + "  " + message.sender + ": " + message.content}</li>
                        )}</ul>
                    </div>
                    <input className="text-in" onChange={inputMessage}></input>
                    <button className="send-btn" onClick={() => sendPublicMessage(messageToSend)}>send</button>
                </div> 
                <div >
                    <button className="profile-btn" onClick={() => navigate("/Profile")}> view profile</button>
                </div>
            </div>
            
        </div>
    )
}


export default MainPage

    // return(
    //     <ul>
    //         {members.map(d=> <li>{d.username}</li>)}
    //     </ul>
    // )


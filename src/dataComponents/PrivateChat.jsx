import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { serverAddress } from "./../Utilities/constants";
import { getAllUserPrivateMessages} from "../Utilities/rest";
import { sendPrivateMessage } from "../Utilities/rest";
import {MainPage} from "../appFlow/MainPage";
import Logout from "../appFlow/Logout";
import SelfProfile from "./SelfProfile";

let addMessageToPrivateMessages;
export default function PrivateChat ({user}) {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");
    const [mainPage, setMainPage] = useState(false);
    const [displayProfile, setDisplayProfile] = useState(false);

    // let set = setTab
    useEffect(() => {
        async function init() {
            let res = await getAllUserPrivateMessages(user);
            setMessages(res);          
        }
        init();
        addMessageToPrivateMessages=addPrivateMessage;     
        return () => addMessageToPrivateMessages = null    
    },[]);

    useEffect(() => {
        console.log("here");
    },[messages]);


    function inputMessage(e) {
        setMessageToSend(e.target.value);
    }

    function onClickClose() {setMainPage(true)};

    function onClickProfile() {
        setDisplayProfile(!displayProfile);
    }

    function addPrivateMessage(message){
        setMessages((messages) =>[...messages, message])
    }


    return (
        <div>
        {mainPage === true ? <MainPage/> :
        <div>
            <div className="private-messages">

                <h2 className="title-private-chat">private chat with {user}</h2>
                <div className="messages-container">
                    <div className="messages">
                        <ul>{messages && messages.map(
                            (message, index) => <li className = "message-li" key={index}>{message.time + "  " + message.sender + ": " + message.content}</li>
                        )}</ul>

                    </div>
                    <input className="text-in" onChange={inputMessage}></input>
                    <button className="send-btn" onClick={() => sendPrivateMessage(messageToSend, user)}>send</button>
                </div>
            </div>
            <div >
                <button className="profile-btn" onClick={onClickProfile}> view {user} profile</button>
            </div> 
            <div>
                <Logout/>
            </div>
            <div>
                <button
                    type="button"
                    className="closebtn"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClickClose}
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div> {displayProfile === true ? <SelfProfile></SelfProfile> : <div></div>
                }
            </div>
        </div> }
        </div>

    )

}

export function addPrivateMessage(message) {
    if(addMessageToPrivateMessages) {
        addMessageToPrivateMessages(message);
    }
}




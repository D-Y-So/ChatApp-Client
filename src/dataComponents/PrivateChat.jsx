import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { serverAddress } from "./../Utilities/constants";
import { getAllUserPrivateMessages} from "../Utilities/rest";
import { sendPrivateMessage } from "../Utilities/rest";

let addMessageToPrivateMessages;
export default function PrivateChat ({user}) {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function init() {
            let res = await getAllUserPrivateMessages(user);
            setMessages([res]);
            console.log([res]);
            addMessageToPrivateMessages=addPrivateMessage;
        }
        init();
        
    },[]);

    useEffect(() => {
        console.log("here");
    },messages);

    function inputMessage(e) {
        setMessageToSend(e.target.value);
    }

    function addPrivateMessage(message){
        setMessages((messages) =>[...messages, message])
    }


    return (
        <div className="private-messages">
                        <ul>{messages && messages.map(
                            (message, index) => <li key={index}>{JSON.stringify(message)}</li>
                        )}</ul>
                        <input onChange={inputMessage}></input>
                        <button onClick={() => sendPrivateMessage(messageToSend, user)}>send</button>
                    </div> 
    )

}

export function addPrivateMessage(message) {
    if(addMessageToPrivateMessages) {
        addMessageToPrivateMessages(message);
    }
}




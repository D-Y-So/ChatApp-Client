import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { serverAddress } from "./../Utilities/constants";
import { getAllUserPrivateMessages} from "../Utilities/rest";
import { sendPrivateMessage } from "../Utilities/rest";


export default function PrivateChat ({user}) {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function init() {
            let res = await getAllUserPrivateMessages(user);
            setMessages([res]);
        }
        init();
        
    },[]);

    function inputMessage(e) {
        setMessageToSend(e.target.value);
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


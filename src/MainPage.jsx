import React, { useState, useEffect } from "react"
import { getAllRegisteredUsers, getAllUserPrivateChats } from "./rest";
import { serverAddress } from "./constants";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Register from "./Register";

export const MainPage = () => {
    let stompClient;
    const [members, setMembers] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab,setTab] =useState("-1");
    const [publicChats, setPublicChats] = useState([]); 
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: true,
        message: ''
      });
    
    useEffect(() => {
    console.log(userData);
    }, [userData]);


    // useEffect(() => {
    //     const fetchMembers = () => {
    //     let token = localStorage.getItem("token");
    //     const res = getAllRegisteredUsers(token);
    //     setMembers(res);
    //     };

    //     fetchMembers();
    // }, []);

    //remove, load private chats accourding to user we chose not the whole private chats, on click on tab bring 
    useEffect(() => {
        const fetchPrivateChats = () => {
        let token = localStorage.getItem("token");
        //console.log(token);
        const res = getAllUserPrivateChats(token);
        setPrivateChats(res);
        console.log(privateChats.size)
        };

        fetchPrivateChats();
    }, []);



    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onConnected = () => {
        console.log("connection established");
        stompClient.subscribe('/topic/mainChat', onMessageReceived);
        stompClient.subscribe('/user',)
    }

    const socketFactory = () => {
        console.log("socketFactory")
        return new SockJS(serverAddress + '/ws');
    }

    const connect = () => {
        console.log("openConnection");
        const socket = socketFactory();
        console.log(socket);
        stompClient = Stomp.over(socket);
        console.log(stompClient.connect({}, onConnected));
        console.log(stompClient);
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            
            {/* <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button>  */}
        </div>}
    </div>
    )
}

export default MainPage

    // return(
    //     <ul>
    //         {members.map(d=> <li>{d.username}</li>)}
    //     </ul>
    // )


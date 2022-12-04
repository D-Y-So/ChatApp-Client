import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { serverAddress } from "./constants";
import { addMessage } from "../dataComponents/publicMessages";
import { getPublicMessages } from './rest';
import {addPrivateMessage} from '../dataComponents/PrivateChat'

let stompClient;
function socketFactory() {
    console.log("socketFactory")
    return new SockJS(serverAddress + '/ws');
}



function onConnected(username) {
    let x = '/user/' + username +"/";
    console.log(x)
    console.log("connection established");
    stompClient.subscribe('/topic/mainChat', usePublicMessageReceived);
    stompClient.subscribe(x,usePrivateMessageReceived)
    console.log("first")
}

function openConnection(username) {
    console.log("openConnection");
    console.log(username);
    const socket = socketFactory();
    console.log(socket);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => onConnected(username));
}
function usePublicMessageReceived(payload) {
    console.log("message received");
    console.log(payload);
    var message = JSON.parse(payload.body);
    console.log(message);
    addMessage(message);
}

function usePrivateMessageReceived(payload) {
    console.log("private message recieved");
    var message = JSON.parse(payload.body);
    console.log(message);
    addPrivateMessage(message);
    

    
}

export { openConnection };
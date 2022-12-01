import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { serverAddress } from "./constants";
import {addMessage} from "./data";
import { getPublicMessages } from './rest';

let stompClient;
function socketFactory() {
    console.log("socketFactory")
    return new SockJS(serverAddress + '/ws');
}



function onConnected() {
    getPublicMessages();
    console.log("connection established");
    stompClient.subscribe('/topic/mainChat', useMessageReceived);
    stompClient.subscribe('/user',)
}

function openConnection() {
    console.log("openConnection");
    const socket = socketFactory();
    console.log(socket);
    stompClient = Stomp.over(socket);
    console.log(stompClient.connect({}, onConnected));
    console.log(stompClient);
}
function useMessageReceived(payload) {
    console.log("message received");
    console.log(payload);
    var message = JSON.parse(payload.body);
    console.log(message);  
    addMessage(message);
}
export {openConnection};
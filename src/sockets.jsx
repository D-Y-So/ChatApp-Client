import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import $ from 'jquery'
import { serverAddress } from "./constants";

let stompClient;
let messages = [];

const socketFactory = () => {
    console.log("socketFactory")
    return new SockJS(serverAddress + '/ws');
}

const onMessageReceived = (payload) => {
    console.log("message received");
    console.log(payload);
    var message = JSON.parse(payload.body);
    messages.push(message);
    let textArea = $('#main-chat');
    textArea.val(textArea.val() + "\n"+message.time + message.sender + ": " + message.content);
    console.log(message)
}

const onConnected = () => {
    console.log("connection established");
    stompClient.subscribe('/topic/mainChat', onMessageReceived);
    stompClient.subscribe('/user',)
}

const openConnection = () => {
    console.log("openConnection");
    const socket = socketFactory();
    console.log(socket);
    stompClient = Stomp.over(socket);
    console.log(stompClient.connect({}, onConnected));
    console.log(stompClient);
}



export { openConnection}
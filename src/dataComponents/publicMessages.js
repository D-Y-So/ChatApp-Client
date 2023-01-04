import { useEffect, useState, useMemo } from "react";
import { getPublicMessages } from "../Utilities/rest";

let addMessageToPublicMessages;
export function usePublicMesagges() {
    const [messages, setMessages] = useState([]);
    const memoizedMessages = useMemo(() => messages, [messages]);

    useEffect(() => {
        console.log("something changed");
        console.log(messages)
    }, [messages]);
    useEffect(() => {
        async function func() {
            const response = await getPublicMessages();
            setMessages(response);
        }
        func();
        addMessageToPublicMessages = addMessage;
        return () => addMessageToPublicMessages = null
    }, []);
    function addMessage(message) {
        console.log(`add messages has been called with this message: ${message}`)
        if (memoizedMessages.some(m => m.id === message.id)) {
            // message with same id already exists, do not add
            return;
        }
        setMessages((messages) => [...messages, message]);
    }


    return [memoizedMessages, addMessage];
}
export function addMessage(message) {
    if (addMessageToPublicMessages) {
        addMessageToPublicMessages(message);
    }
}
import React from 'react';
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
import axios from "axios";

const ChatsPage = (props) => {
    console.log(props.user);

    const handleNewMessage = (chatId, message) => {
        console.log("Chat ID:", chatId);
        console.log("Message details:", message.text);
        console.log("Username: ", message.sender.username);
        if (message.sender.username != "DiagnosAI") {
            axios.post('http://localhost:3001/process_message', { chatId, message })
            .then(r => {
                console.log(r.data);
            })
            .catch(error => {
                console.error('Error sending message to server:', error);
            });
        }

    };

    const chatProps = useMultiChatLogic(
        'c5d63ebc-b1ce-4c18-aa71-d7eeb1203ffb',
        props.user.username,
        props.user.secret,
    );

    return (
    <div style={{ height : '100vh' }}>
        <MultiChatSocket {...chatProps} onNewMessage={handleNewMessage} />
        <MultiChatWindow {...chatProps} style={{ height: '100%'}} />
    </div>
    )
}

export default ChatsPage;
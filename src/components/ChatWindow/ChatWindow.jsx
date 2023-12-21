import React from 'react';
import { MessageBubble } from '../../components';
import './ChatWindow.css';

const testData = [
    {
        "content": "THIS IS THE MESSAGE I POSTED",
        "content_id": null,
        "created_at": "2023-12-21T00:49:07.725Z",
        "id": "0eQzcJZkAMkldi6ceBCp",
        "key": "prod_messages/0eQzcJZkAMkldi6ceBCp",
        "type": "text",
        "user": "end_user"
    },
    {
        "content": "I am the agent and this is my reply",
        "content_id": null,
        "created_at": "2023-12-21T00:49:53.143Z",
        "id": "",
        "key": "dsd",
        "type": "text",
        "user": "ai_coach"
    },
    {
        "content": "https://storage.cloud.google.com/willow-conversation-assets/ae2b4543-de04-4d09-904f-f27617617f16",
        "content_id": "ae2b4543-de04-4d09-904f-f27617617f16",
        "created_at": "2023-12-21T00:49:53.143Z",
        "id": "39drlRuOIWN5DDc7aMqn",
        "key": "prod_messages/39drlRuOIWN5DDc7aMqn",
        "type": "image",
        "user": "end_user"
    },
    {
        "content": "THIS IS THE MESSAGE I POSTED",
        "content_id": null,
        "created_at": "2023-12-21T00:49:07.725Z",
        "id": "0eQzcJZkAMkldi6ceBCp",
        "key": "prod_messages/0eQzcJZkAMkldi6ceBCp",
        "type": "text",
        "user": "end_user"
    },
    {
        "content": "I am the agent and this is my reply",
        "content_id": null,
        "created_at": "2023-12-21T00:49:53.143Z",
        "id": "",
        "key": "dsd",
        "type": "text",
        "user": "ai_coach"
    },
    {
        "content": "https://storage.cloud.google.com/willow-conversation-assets/ae2b4543-de04-4d09-904f-f27617617f16",
        "content_id": "ae2b4543-de04-4d09-904f-f27617617f16",
        "created_at": "2023-12-21T00:49:53.143Z",
        "id": "39drlRuOIWN5DDc7aMqn",
        "key": "prod_messages/39drlRuOIWN5DDc7aMqn",
        "type": "image",
        "user": "end_user"
    },
    {
        "content": "THIS IS THE MESSAGE I POSTED",
        "content_id": null,
        "created_at": "2023-12-21T00:49:07.725Z",
        "id": "0eQzcJZkAMkldi6ceBCp",
        "key": "prod_messages/0eQzcJZkAMkldi6ceBCp",
        "type": "text",
        "user": "end_user"
    },
    {
        "content": "I am the agent and this is my reply",
        "content_id": null,
        "created_at": "2023-12-21T00:49:53.143Z",
        "id": "",
        "key": "dsd",
        "type": "text",
        "user": "ai_coach"
    },
    {
        "content": "https://storage.cloud.google.com/willow-conversation-assets/ae2b4543-de04-4d09-904f-f27617617f16",
        "content_id": "ae2b4543-de04-4d09-904f-f27617617f16",
        "created_at": "2023-12-21T00:49:53.143Z",
        "id": "39drlRuOIWN5DDc7aMqn",
        "key": "prod_messages/39drlRuOIWN5DDc7aMqn",
        "type": "image",
        "user": "end_user"
    }
]

const ChatWindow = ({ env, convo_history=testData }) => {

    return (
        <div className="chat-window">
            {convo_history.map(( messageObject ) => {
                return <MessageBubble {...messageObject} />
            })}
        </div>    
    )
}

export default ChatWindow;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchConversationHistory } from './store/messageSlice';
import { setEnv } from './store/appSlice';
import { BlurryBoi, ChatWindow, Header, Footer } from './components'

export default function App({ env }) {
    const dispatch = useDispatch()
    const env_state = useSelector((state) => {
        return state.app.env;
    });
    const fetchedInitialConversationState = useSelector((state) => {
        return state.message.fetchedInitialConversationState;
    })
    const messages = useSelector(state => state.message[`${env}Messages`]);

    useEffect(() => {
        if (env !== env_state) {
            dispatch(setEnv({ env }));
        }
    }, [env, env_state, dispatch]);

    // Fetch conversation history only once when the component mounts
    useEffect(() => {
        if (!fetchedInitialConversationState) {
            dispatch(fetchConversationHistory({env, page: 1, limit: 20, lastDocument: 1 }));
        }
    }, [dispatch, env, fetchedInitialConversationState]);
    
    return (
        <div className="window">
            <BlurryBoi className="blurry-boi-1" />
            <BlurryBoi className="blurry-boi-2" />
            <Header />
            <ChatWindow convoHistory={messages} />
            <Footer />
        </div>
    );
}
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUDIO, BASE_URL, IMAGE, LOADING_STATES, SUPPORTED_FILE_TYPES, TEXT } from '../constants';

const appendMessage = (state, env, newMessage) => {
    const key = `${env}Messages`;
    console.log({env, key: state[key], keyString: JSON.stringify(state[key])})
    const newMessageList = [...state[key], newMessage];
    console.log({state, env, key, newMessage})
    state[key] = newMessageList;
}

export const clearConversationHistory = createAsyncThunk(
    'DELETE /api/conversation',
    async (env , thunkAPI) => {
        const deleteConversationURL = `${BASE_URL}/conversation?env=${env}`
        const response = await fetch(deleteConversationURL, {
            method: "DELETE"
        })

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(`Problem deleting conversation with error code ${response.status}`)
        }

        return { status: "clean slate", env }
    }
)

export const sendFile = createAsyncThunk(
    'POST /api/sendFile',
    async ({ env, file, userMessage }) => {
        const sendFileURL = `${BASE_URL}/sendFile?env=${env}&contentId=${userMessage.content}`;
        console.log({sendFileURL})
        const formData = new FormData();
        formData.append('file', file);
        console.log({sendFileURL, env, formData, contentId: userMessage.content})
        const response = await fetch(sendFileURL, {
            method: "POST",
            body: formData
        });

        if (response.status !== 200) {
            return { env, userMessage };
        }

        return { env, userMessage };
    }
)

export const sendMessage = createAsyncThunk(
    'POST message/sendMessage',
    async ({ user, env, type, content, file }, thunkAPI) => {
        try {
            const sendMessageURL = `${BASE_URL}/sendMessage?env=${env}&user=${user}`;
            const body = {
                type,
                createdAt: new Date().toUTCString()
            }

            if (content) {
                body.content = content;
            }

            console.log({msg: "Sending request", sendMessageURL, body})
            const response = await fetch(sendMessageURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const { userMessage, agentResponse } = await response.json();
            console.log({msg: "Received response", userMessage, agentResponse})

            if (response.status !== 200) {
                thunkAPI.rejectWithValue({ userMessage });
            }

            if (type === TEXT) {
                // we should have agent response
                return { type, env, userMessage, agentResponse }
            } else {
                // skip agent response, get in sendFile
                thunkAPI.dispatch(sendFile({ env, file, user, userMessage }))
                return { type, env, userMessage }
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

const extraReducers = (builder) => {
    builder
        .addCase(fetchConversationHistory.fulfilled, (state, action) => {
            state[`${action.payload.env}Messages`] = action.payload.messages.toReversed();
        })
        .addCase(sendMessage.pending, (state, action) => {
            // we'll assume we'll succeed (if text) and add it to the chat window for performance purposes
            const { user, type, content } = action.meta.arg;
            const created_at = new Date().toUTCString();
            if (type === TEXT) {
                state.tempMessage = { user, type, content, created_at };
            }
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            if (action.payload.type === TEXT) {
                const { env, agentResponse, userMessage } = action.payload
                // append the actual message and remove the temporary one
                userMessage && appendMessage(state, env, userMessage)
                state.tempMessage = null;
                agentResponse && appendMessage(state, env, agentResponse)
            }
        })
        .addCase(sendFile.fulfilled, (state, action) => {
            const { env, userMessage } = action.payload
            appendMessage(state, env, userMessage)
        })
        .addCase(clearConversationHistory.fulfilled, (state, action) => {
            state[`${action.payload.env}Messages`] = []
        });
}

export const fetchConversationHistory = createAsyncThunk(
    'GET api/conversation',
    async ({ env, page=1, limit=20, lastDocument=1 }, thunkAPI) => {
        const requestURL = `${BASE_URL}/conversation?env=${env}&page=${page}&limit=${limit}&last_document=${lastDocument}`;
        try {
            const response = await fetch(requestURL, {
                method: "GET",
            });
            const conversationHistory = await response.json();
            return { env, ...conversationHistory };
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const setTempFileReducer = (state, action) => {
    state.tempFile = action.payload
}

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        devMessages: [],
        prodMessages: [],
        fetchedInitialConversationState: false,
        tempMessage: null,
        tempFile: null
    },
    reducers: {
        setTempFile: setTempFileReducer
    },
    extraReducers
});

export const { setTempFile } = messageSlice.actions;
export default messageSlice.reducer;
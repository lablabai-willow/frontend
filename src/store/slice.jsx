import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../constants';

export const fetchConversationHistory = createAsyncThunk(
    'GET api/conversation',
    async (env, page=1, limit=10, lastDocument=null, { rejectWithValue }) => {
        const requestURL = `${CONSTANTS.baseUrl}/api/conversation?env=${env}&page=${page}&limit=${limit}&last_document=${lastDocument}`;
        try {
            const response = await fetch(requestURL, {
                method: "GET",
            });
            const conversationHistory = await response.json();
            return { env, ...conversationHistory };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        devMessages: [],
        prodMessages: [],
        loading: ""
    },
    reducers: {
        sendMessage: async (state, action) => {
            state.loading = "pending"
            const { user, env, type, content=null, createdAt, file=null } = action.payload;
            const sendMessageURL = `${CONSTANTS.baseUrl}/api/sendMessage?env=${env}&user=${user}`;

            const body = {
                type,
                createdAt
            }

            if (content) {
                body.content = content;
            }

            const response = await fetch(sendMessageURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            });

            const { statusText, message } = response.json;

            console.log({ statusText });

            if (message.contentId) {
                const sendFileURL = `${CONSTANTS.baseUrl}/api/sendFile?env=${env}&user=${user}`;
                const formData = new FormData()
                formData.append('file', file)
                const response = await fetch(sendFileURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData
                })
                const json = response.json()
                if (response.status() !== 200) {
                    state.loading = "failed"
                    return;
                }
            }
        },
        appendMessage: (state, action) => {
            const { env, message } = action.payload;
            newMessageList = [...state[`${env}Messages`], message];
            state[`${env}Messages`] = newMessageList;
            state.loading = "succeeded"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationHistory.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchConversationHistory.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state[`${env}Messages`] = action.payload;
            })
            .addCase(fetchConversationHistory.rejected, (state, action) => {
                state.loading = 'failed';
                state[`${env}Messages`] = []
            })
    }
});
import { createSlice } from '@reduxjs/toolkit';
import { clearConversationHistory, fetchConversationHistory, sendMessage, sendFile } from './messageSlice';
import { LOADING_STATES, PROD} from '../constants';



const extraReducers = (builder) => {
    const functionMap = [
        clearConversationHistory,
        fetchConversationHistory,
        sendMessage,
        sendFile
    ]
    
    const buildExtraReducer = (builder, func) => {
        return builder
            .addCase(func.pending, (state) => {
                state.loading = LOADING_STATES.PENDING;
                state.error = null;
            })
            .addCase(func.fulfilled, (state) => {
                state.loading = LOADING_STATES.SUCCESS;
                state.error = null;
            })
            .addCase(func.rejected, (state, action) => {
                console.log({msg: "ERROR", payload: action})
                state.loading = LOADING_STATES.FAILED;
                state.error = action.payload?.error
            })
    }

    functionMap.forEach((func) => {
        builder = buildExtraReducer(builder, func)
    })

    return builder
}

// const extraReducers = (builder) => {
//     builder
//         .addCase(fetchConversationHistory.pending, (state) => {
//             state.loading = LOADING_STATES.PENDING;
//             state.fetchedInitialConversationState = true;
//         })
//         .addCase(fetchConversationHistory.fulfilled, (state, action) => {
//             state.loading = LOADING_STATES.SUCCESS;
//         })
//         .addCase(fetchConversationHistory.rejected, (state, action) => {
//             state.loading = LOADING_STATES.FAILED;
//             state.error = action.payload;
//             state.fetchedInitialConversationState = false;
//         })
//         .addCase(sendMessage.pending, (state) => {
//             state.loading = LOADING_STATES.PENDING;
//         })
//         .addCase(sendMessage.fulfilled, (state, action) => {
//             state.loading = LOADING_STATES.SUCCESS;
//         })
//         .addCase(sendMessage.rejected, (state, action) => {
//             state.loading = LOADING_STATES.FAILED;
//             state.error = action.payload;
//         })
//         .addCase(sendFile.pending, (state) => {
//             state.loading = LOADING_STATES.PENDING;
//         })
//         .addCase(sendFile.fulfilled, (state, action) => {
//             state.loading = LOADING_STATES.SUCCESS;
//         })
//         .addCase(sendFile.rejected, (state, action) => {
//             state.loading = LOADING_STATES.FAILED;
//             state.error = action.payload;
//         })
//         .addCase(clearConversationHistory.fulfilled, (state, action) => {
//             state.loading = LOADING_STATES.SUCCESS;
//             state.error = "";
//         })
//         .addCase(clearConversationHistory.rejected, (state, action) => {
//             state.loading = LOADING_STATES.FAILED;
//             state.error = action.payload
//         })
// };

const setEnvReducer = (state, action) => {
    state.env = action.payload.env;
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading: LOADING_STATES.SUCCESS,
        error: null,
        env: PROD,
    },
    reducers: {
        setEnv: setEnvReducer
    },
    extraReducers
});

export const { setEnv } = appSlice.actions;
export default appSlice.reducer;
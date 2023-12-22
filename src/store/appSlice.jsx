import { createSlice } from '@reduxjs/toolkit';
import { clearConversationHistory, fetchConversationHistory, sendMessage, sendFile } from './messageSlice';
import { LOADING_STATES, PROD, TEXT} from '../constants';

const extraReducers = (builder) => {
    const functionMap = [
        clearConversationHistory,
        fetchConversationHistory,
        sendMessage,
        sendFile
    ]
    
    const buildExtraReducer = (builder, func) => {
        if (func === sendMessage) {
            return builder
                .addCase(func.pending, (state) => {
                    state.loading = LOADING_STATES.PENDING;
                    state.error = null;
                })
                .addCase(func.fulfilled, (state, action) => {
                    if(action.payload.type === TEXT) {
                        state.loading = LOADING_STATES.SUCCESS;
                    }
                    state.error = null;
                })
                .addCase(func.rejected, (state, action) => {
                    console.log({msg: "ERROR", payload: action})
                    state.loading = LOADING_STATES.FAILED;
                    state.error = action.payload?.error
                })               
        }
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
import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './messageSlice';
import appReducer from './appSlice';

export default configureStore({
    reducer: {
        message: messageReducer,
        app: appReducer
    }
});
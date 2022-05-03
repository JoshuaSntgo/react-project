import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../form/reducer'
export const store = configureStore({
    reducer: {
        userInfo: userReducer,
    }
})
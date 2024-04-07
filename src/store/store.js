import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import configSlice from './configSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        config: configSlice
    }
})

export default store
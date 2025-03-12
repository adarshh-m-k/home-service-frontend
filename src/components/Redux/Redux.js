import { configureStore, createSlice } from "@reduxjs/toolkit"


let userSlice = createSlice({
    name: 'user',
    initialState: {
        value:{}
    },
    reducers: {
        setUser: (state, action) => action.payload,
        updateUser: (state, action) => {

            console.log('----->',action.payload);
            
            return { ...state, ...action.payload };
        }
    }
})

let serviceSlice = createSlice({
    name: 'service',
    initialState: {
        value: null
    },
    reducers: {
        setServiceJob: (prevState, action) => {

            prevState.value = action.payload
        }
    }
})


export let { setUser, updateUser } = userSlice.actions
export let { setServiceJob } = serviceSlice.actions

export let store = configureStore({
    reducer: {
        user: userSlice.reducer,
        service: serviceSlice.reducer
    }
})
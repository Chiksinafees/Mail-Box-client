import { createSlice } from "@reduxjs/toolkit"


const initialState={
    email:localStorage.getItem('email'),
    token:localStorage.getItem('token'),
    isloggedIn:!!localStorage.getItem('email')
}

const initialSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        login(currState,action){
         currState.email=action.payload.email
         currState.token=action.payload.token

         localStorage.setItem('email',currState.email)
         localStorage.setItem('token',currState.token)

         currState.isloggedIn=true
        },
        logout(currState){
            currState.email=null
            currState.token=null
   
            localStorage.removeItem('email')
            localStorage.removeItem('token')
   
            currState.isloggedIn=false

        }
    }
})

export const mailActions=initialSlice.actions
export default initialSlice.reducer

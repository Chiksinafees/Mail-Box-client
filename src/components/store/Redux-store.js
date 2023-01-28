import { configureStore } from "@reduxjs/toolkit";
import MailReducer from "./MailStore";

const store=configureStore({
    reducer:{
        auth:MailReducer
    }
})

export default store
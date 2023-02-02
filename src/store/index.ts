import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import formRegistrationSliceReducer from "./slices/formRegistrationSlice"


const rootReducer = combineReducers({
    formReducer,
    formRegistrationSliceReducer
})


export const setupStore = () =>{ 
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
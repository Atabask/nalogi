import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataForm } from "../../interfaces/interfaces";

interface IDataFormState {
    dataState: IDataForm[];
    isLoading: boolean;
    error: string;
    
}

const initialState: IDataFormState = {
   dataState: [],
   isLoading: false,
   error: ''
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addForm(state, action: PayloadAction<IDataForm>){
            state.dataState.push(action.payload)
        }
    }

})

export default formSlice.reducer
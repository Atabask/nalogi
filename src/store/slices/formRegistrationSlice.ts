import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataFormRegistration } from '@interfaces';


interface IDataFormRegistrationState {
    dataRegistrationState: IDataFormRegistration[];
    isLoading: boolean;
    error: string;
}

const initialState: IDataFormRegistrationState = {
    dataRegistrationState: [],
    isLoading: false,
    error: '',
}

export const formRegistrationSlice = createSlice({
    name: 'form-registration',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<IDataFormRegistration>) {
            state.dataRegistrationState.push(action.payload)
        }
    }
})


export default formRegistrationSlice.reducer
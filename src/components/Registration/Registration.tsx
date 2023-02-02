import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IDataFormRegistration } from '../../interfaces/interfaces';
import { formRegistrationSlice } from '../../store/slices/formRegistrationSlice';
import supabase from '../../supabaseClient';
import './registrationStyle.css'


interface IFormRegistration {
    username: string;
    email: string;
    password: string;
    adress: string;
    phone: number;
}

export const Registration: FC = () => {

    const { register, handleSubmit } = useForm<IFormRegistration>()
    const { dataRegistrationState } = useAppSelector(state => state.formRegistrationSliceReducer)
    const { addUser } = formRegistrationSlice.actions
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<IDataFormRegistration> = dataFormRegistration => {
        dispatch(addUser(dataFormRegistration))

        const registration = async () => {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: dataFormRegistration.email,
                    password: dataFormRegistration.password,
                    options: {
                        data: {
                            user_name: dataFormRegistration.username,
                            phone: dataFormRegistration.phone,
                            adress: dataFormRegistration.adress
                        }
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        registration()
    }

    return (
        <div className='wrapper_registration'>
            <h1 className='registration_header'>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='registration_form'>
                <input {...register("username")} className="registration_input" placeholder='Введите имя и фамилию' type="text" />
                <input {...register("email")} className="registration_input" placeholder='Введите Email' type="email" />
                <input {...register("password")} className="registration_input" placeholder='Введите пароль' type="password" />
                <input {...register("adress")} className="registration_input" placeholder='Введите адерс' type="text" />
                <input {...register("phone")} className="registration_input" placeholder='Введите номер телефона' type="tel" />
                <button type='submit' className="registration_button">Регистрация</button>
            </form>
        </div>
    )
}
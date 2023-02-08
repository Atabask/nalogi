import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IDataFormRegistration } from '../../interfaces/interfaces';
import { formRegistrationSlice } from '../../store/slices/formRegistrationSlice';
import supabase from '../../supabaseClient';


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
        <div className='container flex flex-col items-center'>
            <h1 className='text-6xl m-12'>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-8 w-1/2'>
                <input {...register("username")} className="p-5 text-2xl rounded-lg border-2 w-2/3" placeholder='Введите имя и фамилию' type="text" />
                <input {...register("email")} className="p-5 text-2xl rounded-lg border-2 w-2/3" placeholder='Введите Email' type="email" />
                <input {...register("password")} className="p-5 text-2xl rounded-lg border-2 w-2/3" placeholder='Введите пароль' type="password" />
                <input {...register("adress")} className="p-5 text-2xl rounded-lg border-2 w-2/3" placeholder='Введите адерс' type="text" />
                <input {...register("phone")} className="p-5 text-2xl rounded-lg border-2 w-2/3" placeholder='Введите номер телефона' type="tel" />
                <button type='submit' className="text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200">Регистрация</button>
            </form>
        </div>
    )
}
import { useUser } from '@supabase/auth-helpers-react';
import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { IDataFormRegistration, IFormRegistration } from '@interfaces';
import { formRegistrationSlice } from '@store/slices/formRegistrationSlice';
import supabase from '@supabaseClient';


export const Registration: FC = () => {

    const { register, handleSubmit } = useForm<IFormRegistration>()
    const { dataRegistrationState } = useAppSelector(state => state.formRegistrationSliceReducer)
    const { addUser } = formRegistrationSlice.actions
    const dispatch = useAppDispatch()
    const user = useUser()
    const navigate = useNavigate()

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
                throw error
            }
        }
        registration()
    }

    useEffect(() => {
        if (user) {
            navigate('/user')
        }
    })

    return (
        <div className='container flex flex-col items-center'>
            <h1 className='text-6xl m-12'>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-primary items-center w-1/2'>
                <input {...register("username")} className="input-primary w-2/3" placeholder='Введите имя и фамилию' type="text" />
                <input {...register("email")} className="input-primary w-2/3" placeholder='Введите Email' type="email" />
                <input {...register("password")} className="input-primary w-2/3" placeholder='Введите пароль' type="password" />
                <input {...register("adress")} className="input-primary w-2/3" placeholder='Введите адрeс' type="text" />
                <input {...register("phone")} className="input-primary w-2/3" placeholder='Введите номер телефона' type="tel" />
                <button type='submit' className="btn-primary">Регистрация</button>
            </form>
        </div>
    )
}
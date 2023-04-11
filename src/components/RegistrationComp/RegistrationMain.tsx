import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/redux';
import { IDataFormRegistration, IFormRegistration } from '@interfaces';
import { formRegistrationSlice } from '@store/slices/formRegistrationSlice';
import supabase from '@supabaseClient';
const { useUser } = require('@supabase/auth-helpers-react')


export const Registration: FC = () => {

    const { register, handleSubmit } = useForm<IFormRegistration>()

    const { addUser } = formRegistrationSlice.actions
    const dispatch = useAppDispatch()
    const user = useUser()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IDataFormRegistration> = dataFormRegistration => {
        dispatch(addUser(dataFormRegistration))
        const registration = async () => {
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
                if(data) {
                    return null
                } else {
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
        <div className='flex flex-col items-center'>
            <h1 className='text-5xl m-10'>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='@media340:w-2/3 form-primary items-center w-1/2'>
                <input {...register("username")} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" placeholder='Введите имя и фамилию' type="text" />
                <input {...register("email")} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" placeholder='Введите Email' type="email" />
                <input {...register("password")} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" placeholder='Введите пароль' type="password" />
                <input {...register("adress")} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" placeholder='Введите адрeс' type="text" />
                <input {...register("phone")} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" placeholder='Введите номер телефона' type="tel" />
                <button type='submit' className="btn-primary w-60">Регистрация</button>
            </form>
        </div>
    )
}
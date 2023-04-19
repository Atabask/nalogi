import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/redux';
import { IDataFormRegistration, IFormRegistration } from '@interfaces';
import { formRegistrationSlice } from '@store/slices/formRegistrationSlice';
import supabase from '@supabaseClient';
import { Button } from '@shared/button/Button';
import { Input } from '@shared/input/Input';
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
        <div className='w-2/5 m-auto flex flex-col items-center'>
            <h1 className='text-5xl m-10'>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='@media340:w-2/3 form-primary items-center w-1/2'>
                <Input {...register("username")} placeholder='Введите имя и фамилию' type="text" />
                <Input {...register("email")} placeholder='Введите Email' type="email" />
                <Input {...register("password")} placeholder='Введите пароль' type="password" />
                <Input {...register("adress")} placeholder='Введите адрeс' type="text" />
                <Input {...register("phone")} placeholder='Введите номер телефона' type="tel" />
                <Button>Регистрация</Button>
            </form>
        </div>
    )
}
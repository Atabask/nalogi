import { useUser } from '@supabase/auth-helpers-react';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export const Login: FC = () => {

    const user = useUser()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const onSubmit: SubmitHandler<FieldValues> = dataLogin => {  
        const login = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: dataLogin.email,
                password: dataLogin.password,
            })
        }
        login()
    }

    useEffect(() => {
        if (user) {
            navigate('/user')
        }
    })

    return (
        <div className="container flex flex-col items-center m-auto">
            <h1>test1111@mail.ru <br /> 12345678</h1>
            <h1 className="text-6xl m-14" >Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-10 w-1/2'>
                <input {...register('email')} className="p-5 text-2xl rounded-lg border-2 w-2/3" type="email" placeholder='Email' />
                <input {...register('password')} className="p-5 text-2xl rounded-lg border-2 w-2/3" type="password" placeholder='Пароль' />
                <button className="text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200">Войти</button>
            </form>
            <button onClick={() => navigate('/registration')} className="text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200 mt-9">Нет аккаунта?</button>
        </div>
    )
}

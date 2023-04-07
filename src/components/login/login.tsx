import { useUser } from '@supabase/auth-helpers-react';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@supabaseClient';
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
            if(error) throw error
        }
        login()
    }

    useEffect(() => {
        if (user) {
            navigate('/user')
        }
    })

    return (
        <div className="flex flex-col items-center m-auto">
            <h1>test1111@mail.ru <br /> 12345678</h1>
            <h1 className="text-5xl m-10">Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='@media340:w-2/3 form-primary items-center w-1/2'>
                <input {...register('email')} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" type="email" placeholder='Email' />
                <input {...register('password')} className="@media340:input-primary-340 @media340:w-11/12 input-primary w-5/12" type="password" placeholder='Пароль' />
                <button className="btn-primary w-60">Войти</button>
            </form>
            <button onClick={() => navigate('/registration')} className="btn-primary w-60 mt-8">Нет аккаунта?</button>
        </div>
    )
}

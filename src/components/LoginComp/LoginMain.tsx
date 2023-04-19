import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@supabaseClient';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@shared/button/Button';
import { Input } from '@shared/input/Input';
const { useUser } = require('@supabase/auth-helpers-react')

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
            if(data) {
                return null
            } else {
                throw error
            }
        }
        login()
    }

    useEffect(() => {
        if (user) {
            navigate('/user')
        }
    })

    return (
        <div className="w-2/5 flex flex-col items-center m-auto">
            <h1>test1111@mail.ru <br /> 12345678</h1>
            <h1 className="text-5xl m-10">Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='@media340:w-2/3 form-primary items-center w-1/2'>
                <Input {...register('email')}  type="email" placeholder='Email' />
                <Input {...register('password')} type="password" placeholder='Пароль' />
                <Button>Войти</Button>
            </form>
            <Button onClick={() => navigate('/registration')}>Нет аккаунта?</Button>
        </div>
    )
}

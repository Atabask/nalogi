import { useUser } from '@supabase/auth-helpers-react';
import React, { FC } from 'react';
import './loginStyle.css';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { SubmitHandler, useForm } from 'react-hook-form';


interface ILogin {
    email: string;
    password: string;
}

export const Login: FC = () => {

    const user = useUser()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const onSubmit: SubmitHandler<any> = dataLogin => {               //НАПИСАТЬ НОРМАЛЬНЫЙ ТИП

        const login = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: dataLogin.email,
                password: dataLogin.password,
            })

            // try {
            //     console.log('success')
            // } catch (error) {
            //     console.log(error)
            // }
        }
        login()
    }


    if (user) {
        navigate('/user')
    }

    return (
        <div className="wrapper">
            <h1>test1111@mail.ru <br /> 12345678</h1>
            <h1 className="header_login" >Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='wrapper_form'>
                <div className="wrapper_login">
                    <input {...register('email')} className="login_input" type="email" placeholder='Email' />
                    <input {...register('password')} className="login_input" type="password" placeholder='Пароль' />
                </div>
                <button className="login_button">Войти</button>
            </form>
            <button onClick={() => navigate('/registration')} className="button_registration">Нет аккаунта?</button>
        </div>
    )
}

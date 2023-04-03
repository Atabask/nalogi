import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react';
import supabaseClient from '@supabaseClient';
import { logoutImg } from '@icons'


export const Navigation: FC = () => {

    const user = useUser()
    const navigate = useNavigate()

    const signOut = () => {
        supabaseClient.auth.signOut()
        navigate('/')
    }

    return (
        <>
            <nav className=' @media340:nav-conteiner-340'>
                <Link to="/" className='@media340:link-primary-340 link-primary text-5xl'>НалогиЖКУ</Link>
                <div className='@media340:flex-col  flex gap-10'>
                    {
                        user
                            ?
                            <>
                                <Link to="/history" className='@media340:link-primary-340 link-primary text-2xl'>История</Link>
                                <Link to="/data" className='@media340:link-primary-340 link-primary text-2xl'>Показания</Link>
                            </>
                            :
                            null
                    }
                    <Link to="/calculate" className='@media340:link-primary-340 link-primary text-2xl '>Расчет</Link>
                    {!user ?
                        <Link to="/login" className='@media340:link-primary-340 link-primary text-2xl '>Вход в аккаунт</Link>
                        :
                        <>
                            <Link to="/user" className='@media340:link-primary-340 link-primary text-2xl'>{user?.email}</Link>
                            <button className='@media340:link-primary-340link-primary' onClick={signOut}>
                                <img className='w-8 h-8' src={logoutImg} alt='#' />
                            </button>
                        </>
                    }
                </div>
            </nav>
        </>
    )
}
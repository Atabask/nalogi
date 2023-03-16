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
            <nav className='m-full h-32 bg-sky-200 flex justify-between items-center px-14 '>
                <Link to="/" className='text-6xl hover:scale-125 duration-300'>НалогиЖКУ</Link>
                <div className='flex gap-12'>
                    {
                        user
                            ?
                            <>
                                <Link to="/history" className='link-primary'>История</Link>
                                <Link to="/data" className='link-primary'>Показания</Link>
                            </>
                            :
                            null
                    }
                    <Link to="/calculate" className='link-primary'>Расчет</Link>
                    {!user ?
                        <Link to="/login" className='link-primary'>Вход в аккаунт</Link>
                        :
                        <>
                            <Link to="/user" className='link-primary'>{user?.email}</Link>
                            <button className='hover:scale-125 duration-300' onClick={signOut}>
                                <img className='w-10 h-10' src={logoutImg} alt='#' />
                            </button>
                        </>
                    }
                </div>
            </nav>
        </>
    )
}
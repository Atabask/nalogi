import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react';
import supabaseClient from '../../supabaseClient';
import logoutImg from '../../assets/icons/png/logout.png'




export const Navigation: FC = () => {

    const user = useUser()

    return (
        <>
            <nav className='m-full h-32 bg-sky-200 flex justify-between items-center px-14 '>
                <Link to="/" className='text-6xl hover:text-gray-500 duration-200'>НалогиЖКУ</Link>
                <div className='flex gap-10 '>
                    {
                        user
                            ?
                            <>
                                <Link to="/history" className='text-3xl hover:text-gray-400 duration-200'>История</Link>
                                <Link to="/data" className='text-3xl hover:text-gray-400 duration-200'>Показания</Link>
                            </>
                            :
                            null
                    }
                    <Link to="/calculate" className='text-3xl hover:text-gray-400 duration-200'>Расчет</Link>
                    {!user ?
                        <Link to="/login" className='text-3xl hover:text-gray-400 duration-200'>Вход в аккаунт</Link>
                        :
                        <>
                            <Link to="/user" className='text-3xl hover:text-gray-400 duration-200'>{user?.email}</Link>
                            <button className='hover:text-gray-400 duration-200' onClick={() => supabaseClient.auth.signOut()}>
                                <img className='w-10 h-10 hover:text-gray-400 duration-200' src={logoutImg} alt='#' />
                            </button>
                        </>
                    }
                </div>
            </nav>
        </>
    )
}
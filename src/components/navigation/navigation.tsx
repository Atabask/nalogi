import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react';




export const Navigation: FC = () => {

    const user = useUser()

    return (
        <>
            <nav className='m-full h-32 bg-sky-200 flex justify-between items-center px-14 '>
                <Link to="/" className='text-6xl hover:text-gray-500 duration-200'>НологиПлоти</Link>

                <div className='flex gap-10 '>
                    <Link to="/history" className='text-3xl hover:text-gray-400 duration-200'>История показаний</Link>
                    <Link to="/data" className='text-3xl hover:text-gray-400 duration-200'>Внести показания ЖКХ</Link>
                    {!user ?
                        <Link to="/login" className='text-3xl hover:text-gray-400 duration-200'>Вход в аккаунт</Link>
                        :
                        <Link to="/user" className='text-3xl hover:text-gray-400 duration-200'>{user?.email}</Link>
                    }
                </div>
            </nav>
        </>
    )
}
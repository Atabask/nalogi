import React, { FC } from 'react';
import { Link, Route, RouteMatch, Router } from 'react-router-dom'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import './navigationStyle.css'



export const Navigation: FC = () => {

    const supabaseClient = useSupabaseClient()
    const user = useUser()

    return (
        <>
            <nav className='nav_container'>
                <h3 className='nav_header'>НологиПлоти</h3>

                <div className='nav_menu'>
                    <Link to="/" className='nav_link'>Домашняя</Link>
                    <Link to="/history" className='nav_link'>История показаний</Link>
                    <Link to="/data" className='nav_link'>Внести показания ЖКХ</Link>
                    {/* <Link to="/registration" className='nav_link'>Регистрация</Link> */}
                    {!user ?
                        <Link to="/login" className='nav_link'>Вход в аккаунт</Link>
                        : 
                        <Link to="/user" className='nav_link'>{user?.email}</Link>
                    }
                </div>
            </nav>
        </>
    )
}
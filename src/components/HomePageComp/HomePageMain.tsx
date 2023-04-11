import React, { FC } from 'react';


export const HomePageComp: FC = () => {

    return (
        <div className='@media340 w-11/12 flex flex-col mx-auto px-5 py-7 bg-neutral-300 mt-16' >
            <h1 className='header @media340:header-340 font-bold text-center '>Сайт для хранения информации своих ЖКУ</h1>
            <p className='@media340:p-primary-340 p-primary'>
                Расчет - калькулятор  расчета своих показаний 
            </p>
            <p className='@media340:p-primary-340 p-primary'>
                Ваш Email/Вход в аккаунт - Информация при регистрации/Страница со входом или регистрацией
            </p>
            <p className='@media340:text-2xl p-2 text-center text-4xl leading-loose'>
                <b>Для авторизованных пользователей:</b>  
            </p>
            <p className='@media340:p-primary-340 p-primary'>
                История - история показаний которые вы вносили
            </p>
            <p className='@media340:p-primary-340 p-primary'>
                Показания - форма для внесения показаний
            </p>
            <p className='@media340:p-primary-340 p-primary'>
                Кнопка выхода из аккаунта
            </p>
        </div>
    )
}
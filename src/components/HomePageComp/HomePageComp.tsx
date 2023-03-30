import React, { FC } from 'react';


export const HomePageComp: FC = () => {

    return (
        <div className='w-10/12 flex flex-col mx-auto px-5 py-7 justify-items-center h-auto bg-neutral-300 justify-between mt-24' >
            <h1 className='p-4 mb-14 text-5xl font-bold text-center'>Сайт для хранения информации своих ЖКУ</h1>
            <p className=' p-primary'>
                Расчет - калькулятор  расчета своих показаний 
            </p>
            <p className=' p-primary'>
                Ваш Email/Вход в аккаунт - Информация при регистрации/Страница со входом или регистрацией
            </p>
            <p className=' p-2 text-center text-4xl leading-loose'>
                <b>Для авторизованных пользователей:</b>  
            </p>
            <p className='p-primary'>
                История - история показаний которые вы вносили
            </p>
            <p className='p-primary'>
                Показания - форма для внесения показаний
            </p>
            <p className='p-primary'>
                Кнопка выхода из аккаунта
            </p>
        </div>
    )
}
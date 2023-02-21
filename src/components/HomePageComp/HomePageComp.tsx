import React, { FC } from 'react';


export const HomePageComp: FC = () => {

    return (
        <div className='container flex flex-col mx-auto px-7 py-9 justify-items-center h-auto bg-neutral-300 justify-between mt-28' >
            <h1 className='p-4 mb-14 text-6xl font-bold text-center'>Сайт для хранения информации своих ЖКУ</h1>
            <p className='p-2 text-center text-3xl leading-loose'>
                Расчет - калькулятор  расчета своих показаний 
            </p>
            <p className='p-2 text-center text-3xl leading-loose'>
                История - история показаний которые вы вносили
            </p>
            <p className='p-2 text-center text-3xl leading-loose'>
                Показания - форма для внесения показаний
            </p>
            <p className='p-2 text-center text-3xl leading-loose'>
                Ваш Email - Информация при регистрации
            </p>
        </div>
    )
}
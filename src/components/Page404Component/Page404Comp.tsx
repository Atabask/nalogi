import React, { FC } from 'react';
import img404 from './assets/error404.png';


export const Page404Component: FC = () => {


    return(
        <div className='container flex flex-col '>
            <h1 className='m-auto text-6xl p-8'>Ошибка, такой страницы нет</h1>
            <img  className='m-auto py-4' width={500} height={500} src={img404} alt='img404'></img>
            <a className='m-auto hover:bg-gray-200 text-2xl duration-200 rounded-md p-4' href="https://www.flaticon.com/free-icons/404" title="404 icons">404 icons created by Freepik - Flaticon</a>
        </div>
    )
}
import React, { FC } from 'react';
import { img404 } from '@icons';


export const Page404Component: FC = () => {


    return(
        <div className='flex flex-col '>
            <h1 className='m-auto header'>Ошибка, такой страницы нет</h1>
            <img  className='m-auto py-4' width={500} height={500} src={img404} alt='img404'></img>
            <a className='m-auto hover:bg-gray-200 text-2xl duration-200 rounded-md p-4' href="https://www.flaticon.com/free-icons/404" title="404 icons">404 icons created by Freepik - Flaticon</a>
        </div>
    )
}
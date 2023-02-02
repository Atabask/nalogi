import React, { FC } from 'react';
import { IDataForm } from '../../../interfaces/interfaces';
import './OutputOfReadingsStyle.css'


type IProps = {
    dataState: IDataForm[];
}


export const OutputOfReadingsComp: React.FC<IProps> = ({ dataState }) => {

    const data = dataState


    return (
        <div className='container'>
            {data && data.map(item => 
                <ul className='conteiner_meter_readings'>
                    <li className='meter_readings'>Год: <span className='item_data'>{item.year}</span>. Месяц: <span className='item_data'>{item.month}</span></li>
                    <li className='meter_readings'>Показания электро: <span className='item_data'>{item.electro}</span> кВт</li>
                    <li className='meter_readings'>Показания горячая вода: <span className='item_data'>{item.hotWater}</span> кубов</li>
                    <li className='meter_readings'>Показания горячая вода: <span className='item_data'>{item.coldWater}</span> кубов</li>
                </ul>
                )}
        </div>
    )

}

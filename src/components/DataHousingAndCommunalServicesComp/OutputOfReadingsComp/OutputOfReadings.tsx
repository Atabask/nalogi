import React, { FC, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import supabase from '../../../supabaseClient';

ChartJS.register(ArcElement, Tooltip, Legend);

export const OutputOfReadingsComp: React.FC = () => {

    const [ currentData, setCurrentData ] = useState<any>([])

    const getDataSupabases = async () => {
        debugger
        const { data: communal_service, error } = await supabase
            .from('communal_service')
            .select('electro, cold_water, hot_water')
            
            const lastData = communal_service?.at(-1)
            const numberDataElectro = Number(lastData?.electro)
            const numberDataColdWater = Number(lastData?.cold_water)
            const numberDataHotWater = Number(lastData?.hot_water)
            currentData.push(numberDataElectro, numberDataColdWater, numberDataHotWater)
    }

    // currentData.length < 2 ? getDataSupabases() : console.log('Oh')
    if(currentData.length === 0) {
        getDataSupabases()
    } else {
        console.log('oh')
    }
    console.log(currentData)

    const  dataPieRender = {
        labels: ['Электричество', 'Холодная вода', 'Горячая вода'],
        datasets: [
            {
                label: '',
                data: currentData.map((item: { electro: number; }) => item),
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
                borderRadius: 4

            },
        ],
    };

    return (
        <div className='container'>
            <Pie className='mt-5' height={600} width={600} data={dataPieRender} />
        </div>
    )

}
// {data && data.map(item =>
//     <ul className='conteiner_meter_readings'>
//         <li className='meter_readings'>Год: <span className='item_data'>{item.year}</span>. Месяц: <span className='item_data'>{item.month}</span></li>
//         <li className='meter_readings'>Показания электро: <span className='item_data'>{item.electro}</span> кВт</li>
//         <li className='meter_readings'>Показания горячая вода: <span className='item_data'>{item.hotWater}</span> кубов</li>
//         <li className='meter_readings'>Показания горячая вода: <span className='item_data'>{item.coldWater}</span> кубов</li>
//     </ul>
//     )}

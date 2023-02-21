import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
    currentData: number[];
}

export const PieComponent: FC<IProps> = ({currentData}) => {
    
    const dataPieRender = {
        labels: ['Электричество', 'Холодная вода', 'Горячая вода'],
        datasets: [
            {
                label: '',
                data: currentData.map((item: number) => item),
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
                borderRadius: 4,
            },
        ],
    };

    return (
        <>
            <h1 className="text-4xl text-center mb-8">Последние сохраненные показания показания</h1>
            <Pie className='mt-5' height={600} width={600} data={dataPieRender} />
        </>
    )
}
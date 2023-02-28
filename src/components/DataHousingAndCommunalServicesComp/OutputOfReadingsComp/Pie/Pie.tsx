import React, { FC, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import supabase from "../../../../supabaseClient";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
    currentData: number[];
}

export const PieComponent: FC<IProps> = ({currentData}) => {
    
    const [month, setMonth] = useState<string>('')

    useEffect(() => {
        const getMonthSupabases = async () => {
            const { data: communal_service, error } = await supabase
                .from('communal_service')
                .select('month')
            const lastMonth = (communal_service?.at(-1))
            const stringMonth = lastMonth?.month
            setMonth(stringMonth)
        }
        if(month.length === 0) {
            getMonthSupabases()
        }
    })

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
            <h1 className="text-4xl text-center mb-8">Показания за {month}</h1>
            <Pie className='mt-5' height={600} width={600} data={dataPieRender} />
        </>
    )
}
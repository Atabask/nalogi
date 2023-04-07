import React, { FC, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import supabase from "@supabaseClient";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
    currentData: number[];
    currentMonth: string;
}

export const PieComponent: FC<IProps> = ({ currentData, currentMonth }) => {

    const [month, setMonth] = useState<string>('')

    useEffect(() => {
        const getMonthSupabases = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const { data: communal_service, error } = await supabase
                .from('communal_service')
                .select('month')
                .eq('user_id', user?.id)
            const lastMonth = (communal_service?.at(-1))
            const stringMonth = lastMonth?.month
            setMonth(stringMonth)
            if(error) throw error
        }
        if (currentMonth) {
            setMonth(currentMonth)
        } else {
            getMonthSupabases()
        }
    }, [currentMonth])

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
                radius: 140
            },
        ],
    };


    return (
        <>
            {
                month
                    ?
                    <>
                        <h1 className="text-3xl text-center mb-2">Показания за {month}</h1>
                        <Pie className='mt-2' width={500} height={500} data={dataPieRender} />
                    </>
                    :
                    <h1 className="header @media340:header-340">Введите показания для отображения</h1>

            }
        </>
    )
}
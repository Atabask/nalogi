import React, { FC, useState, useEffect } from 'react';
import supabase from '@supabaseClient';
import { PieComponent } from './Pie/Pie';


export const OutputOfReadingsComp: React.FC = () => {

    const [currentData, setCurrentData] = useState<number[]>([])

    useEffect(() => {
        const getDataSupabases = async () => {
            const { data: communal_service, error } = await supabase
                .from('communal_service')
                .select('electro, cold_water, hot_water')
            const lastData = communal_service?.at(-1)
            const numberDataElectro = Number(lastData?.electro)
            const numberDataColdWater = Number(lastData?.cold_water)
            const numberDataHotWater = Number(lastData?.hot_water)
            setCurrentData([...currentData, numberDataElectro, numberDataColdWater , numberDataHotWater]) 
        }
        if (currentData.length === 0) {
            getDataSupabases()
        }
    }, [])

    return (
        <>
            {
                currentData.length === 0
                    ?
                    <div>Данных нет</div>
                    :
                    <PieComponent currentData={currentData} />
            }
        </>
    )

}
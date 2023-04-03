import React, { FC, useState, useEffect } from 'react';
import supabase from '@supabaseClient';
import { PieComponent } from './Pie/Pie';
import { useAppSelector } from '@app/src/hooks/redux';


export const OutputOfReadingsComp: FC = () => {

    const [currentData, setCurrentData] = useState<number[]>([])
    const formDataNumber = useAppSelector((state) => state.formReducer.dataState[0])
    const [currentMonth, setCurrentMonth] = useState<string>('')
    
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

        if(formDataNumber) {
            currentData.length = 0
            const { electro, coldWater, hotWater, month } = formDataNumber
            const numberDataElectro = Number(electro)
            const numberDataColdWater = Number(coldWater)
            const numberDataHotWater = Number(hotWater)
            setCurrentData([...currentData, numberDataElectro, numberDataColdWater , numberDataHotWater])
            setCurrentMonth(month) 
        } else {
            getDataSupabases()
        }
    }, [formDataNumber])

    return (
        <>
            {
                currentData.length === 0
                    ?
                    <div className='header'>Данных нет</div>
                    :
                    <PieComponent currentData={currentData} currentMonth={currentMonth} />
            }
        </>
    )

}
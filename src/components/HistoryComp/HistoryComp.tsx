import React, { FC, useEffect, useState } from 'react';
import supabase from '@supabaseClient';
import { HistoryCard } from './HistoryDataCard/HistoryCard';
import type { CommunalService } from '@interfaces';
import { useDebounce } from '@app/src/hooks/debounce';
const { useUser } = require('@supabase/auth-helpers-react')


export const HistoryComp: FC = () => {
    const user = useUser()
    const [dataCommunalService, setDataCommunalService] = useState<CommunalService[]>()
    const [month, setMonth] = useState<string>('')
    const debounced = useDebounce(month)

    const handleChangeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(event.target.value)
    }

    useEffect(() => {
        const getHistoryDataCommunalService = async () => {
            const { data, error } = await supabase
                .from('communal_service')
                .select('*')
                .eq('user_id', user?.id)

            if (data) {
                setDataCommunalService(data)
            } else throw error
        }
        const getSearchMonth = async () => {
            const { data, error } = await supabase
                .from('communal_service')
                .select('*')
                .eq('user_id', user?.id)
                .eq('month', debounced)

            if (data) {
                setDataCommunalService(data)
            } else throw error
        }
        if (debounced.length >= 3) {
            getSearchMonth()
        } else {
            getHistoryDataCommunalService()
        }
    }, [dataCommunalService, debounced])

    return (
        <div className='flex flex-col justify-items-start m-auto w-9/12'>
            {dataCommunalService?.length === 0
                ?
                <h1 className='@media340:text-3xl @media340:m-4 text-4xl m-6 text-center'>Показаний нет</h1>
                :
                <>
                    <h1 className='@media340:text-3xl @media340:m-4 text-4xl m-6 text-center'>История показаний</h1>
                    <input className='@media340:input-primary-340 m-10 input-primary' onChange={handleChangeMonth} type='text' placeholder='Введите месяц...' />
                </>
            }
            {dataCommunalService && (
                    <div className='flex flex-wrap gap-10 justify-around'>
                        {dataCommunalService.map(data => (
                            <HistoryCard key={data.id} dataFromSupabase={data} />
                        ))}
                    </div>
            )}
        </div>
    )

}
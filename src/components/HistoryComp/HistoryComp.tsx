import React, { FC, useEffect, useState } from 'react';
import supabase from '@supabaseClient';
import { HistoryCard } from './HistoryDataCard/HistoryCard';
import type { CommunalService } from '@interfaces';


export const HistoryComp: FC = () => {

    const [dataCommunalService, setDataCommunalService] = useState<CommunalService[]>()
    
    useEffect(() => {
        const getHistoryDataCommunalService = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            const { data, error } = await supabase
            .from('communal_service')
            .select('*')
            .eq('user_id', user?.id)
            
            if(data) {
                setDataCommunalService(data)            
            }
        }
        getHistoryDataCommunalService()
    }, [dataCommunalService])
    

    return (
        <div className='flex flex-col justify-items-start m-auto w-9/12'>
            <h1 className='@media340:text-3xl @media340:m-4 text-4xl m-14 text-center'>История показаний</h1>
            { dataCommunalService && (
                <div className='flex flex-wrap gap-10 justify-around'>
                    {dataCommunalService.map(data => (
                        <HistoryCard key={data.id} dataFromSupabase={data}/>
                    ))}
                </div>
            ) }
        </div>
    )

}
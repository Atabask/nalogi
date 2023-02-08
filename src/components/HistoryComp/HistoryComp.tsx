import React, { FC, useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import { HistoryCard } from './HistoryDataCard/HistoryCard';
import type { CommunalService } from '../../interfaces/interfaces';





export const HistoryComp: FC = () => {

    const [dataCommunalService, setDataCommunalService] = useState<CommunalService[]>()
    
    useEffect(() => {
        
        const getHistoryDataCommunalService = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            const { data, error } = await supabase
            .from('communal_service')
            .select('*')
            .eq('user_id', user?.id)

            if(error) throw error
            if(data) {
                setDataCommunalService(data)            
            }
        }
        getHistoryDataCommunalService()
    }, [])
    

    return (
        <div className='flex flex-col justify-items-start m-auto w-9/12'>
            <h1 className='text-5xl m-14 text-center'>История показаний</h1>
            { dataCommunalService && (
                <div className='flex flex-wrap'>
                    {dataCommunalService.map(data => (
                        <HistoryCard key={data.id} data={data}/>
                    ))}
                </div>
            ) }
        </div>
    )

}
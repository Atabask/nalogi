import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { FC, useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import './HistoryCompStyle.css'
import { HistoryCard } from './HistoryDataCard/HistoryCard';





export const HistoryComp: FC = () => {

    const [dataCommunalService, setDataCommunalService] = useState(null)
    
    useEffect(() => {
        const getHistoryDataCommunalService = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            const { data, error } = await supabase
            .from('communal_service')
            .select('*')
            .eq('user_id', user?.id)

            if(error) throw error
            if(data) {
                setDataCommunalService(data)            //ПРОПИСАТЬ ТИПЫ
            }
        }
        getHistoryDataCommunalService()
    }, [])
    

    return (
        <div className='conteiner_history'>
            <h1>История показаний</h1>
            { dataCommunalService && (
                <div className='conteiner_card'>
                    {dataCommunalService.map(data => (
                        <HistoryCard  data={data}/>
                    ))}
                </div>
            ) }
        </div>
    )

}
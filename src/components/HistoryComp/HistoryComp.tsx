import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { FC, useEffect, useState } from 'react';
import './HistoryCompStyle.css'





export const HistoryComp: FC = () => {

    const supabaseClient = useSupabaseClient()
    const [dataCommunalService, setDataCommunalService] = useState<string[]>([])

    const getDataCommunalService = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('communal_service')
                .select(`*`)
                .limit(10)
            if (data != null) {
                setDataCommunalService(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataCommunalService()
    }, [])

    return (
        <div className='conteiner_history'>
            <h1>Вывод через .map показаний за месяца</h1>
            {dataCommunalService && (
                    <div>
                        {dataCommunalService.map(data => (
                            <div >
                                <p>{data}</p>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )

}
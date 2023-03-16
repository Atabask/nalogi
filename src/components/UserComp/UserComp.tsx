import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import type { Profile } from '@interfaces';
import supabase from '@supabaseClient';
import { UserData } from './UserData/UserData';


export const UserComp: FC = () => {

    const supabaseClient = useSupabaseClient()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<Profile[]>()
    const user = useUser()
    
    useEffect(() => {
        const getProfileData = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', user?.id)

                if(data) {
                    setProfileData(data) 
                }
        }
        getProfileData()
    }, [])


    function signOut() {
        supabaseClient.auth.signOut()
        navigate("/login")
    }

    return (
        <div className='container flex flex-col items-center'>
            <h1 className='text-5xl m-14'>Данные аккаунта {user?.email}</h1>
            
            {profileData && (
                <div>
                    {profileData.map(profile =>(
                        <UserData profile={profile} key={profile.id}/>
                    ))}
                </div>
            )}
            {
                user
                    ?
                    <button 
                    className='btn-primary w-60 m-11' 
                    onClick={() => signOut()}>Выйти</button>
                    :
                    null
            }

        </div>
    )
}
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
        <div className='flex flex-col items-center w-11/12 m-auto'>
            <h1 className='text-4xl m-10'>Данные аккаунта {user?.email}</h1>
            
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
                    className='btn-primary w-60 m-10' 
                    onClick={() => signOut()}>Выйти</button>
                    :
                    null
            }

        </div>
    )
}
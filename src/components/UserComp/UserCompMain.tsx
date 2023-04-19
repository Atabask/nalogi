import React, { FC, useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import type { Profile } from '@interfaces';
import supabase from '@supabaseClient';
import { UserData } from './UserData/UserData';
import { Button } from '@app/src/shared/button/Button';
const { useSupabaseClient, useUser } = require('@supabase/auth-helpers-react')


export const UserComp: FC = () => {

    const supabaseClient = useSupabaseClient()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<Profile[]>()
    const user = useUser()

    useEffect(() => {
        const getProfileData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', user?.id)

            if (data) {
                setProfileData(data)
            } else {
                throw error
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
            <h1 className='@media340:p-primary-340 text-4xl m-10'><b>Данные аккаунта {user?.email}</b></h1>

            {profileData && (
                <div>
                    {profileData.map(profile => (
                        <UserData profile={profile} key={profile.id} />
                    ))}
                </div>
            )}
            {
                user
                    ? <div className='w-2/3 flex justify-center mt-4'>
                        <Button onClick={() => signOut()}>Выйти</Button>
                    </div>
                    : null
            }

        </div>
    )
}
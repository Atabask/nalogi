import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import supabase from '../../supabaseClient';
import './UserCompStyles.css'



export const UserComp: FC = () => {

    const supabaseClient = useSupabaseClient()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState(null)
    const user = useUser()
    

    useEffect(() => {
        const getProfileData = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', user?.id)

                if(error) throw error
                if(data) {
                    setProfileData(data)            //ПРОПИСАТЬ ТИПЫ
                }
        }
        getProfileData()
        
    }, [])


    function signOut() {
        supabaseClient.auth.signOut()
        navigate("/login")
    }

    return (
        <div className='container_user'>
            {/* <h1 className='user_email'>{user?.email}</h1> */}
            
            {profileData && (
                <div>
                    {profileData.map(profile =>(
                        <>
                        <p>{profile.user_name}</p>
                        <p>{profile.phone}</p>
                        <p>{profile.adress}</p>
                        </>
                    ))}
                </div>
            )}

            {
                user
                    ?
                    <button className='button_sign_out' onClick={() => signOut()}>Выйти</button>
                    :
                    null
            }

        </div>
    )
}
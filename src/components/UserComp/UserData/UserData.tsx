import React, { FC } from "react";
import { useUser } from '@supabase/auth-helpers-react';
import { UserImage } from "./UserImage";


interface IUserData {
    user_name: string;
    adress: string;
    phone: string;
}
interface IProps {
    profile: IUserData
}


export const UserData: FC<IProps> = ({ profile }: IProps) => {

    const user = useUser()

    return (
        <>
            <div className='container flex gap-6'>
                <UserImage />
                <div className="flex flex-col gap-6 justify-around">
                    <h2 className='text-3xl'>Имя: {profile.user_name}</h2>
                    <h2 className='text-3xl'>Телефон: {profile.phone}</h2>
                    <h2 className='text-3xl'>Адрес: {profile.adress}</h2>
                </div>
            </div>
        </>
    )
}



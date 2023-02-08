import React, { FC } from "react";


interface IUserData {
    user_name: string;
    adress: string;
    phone: string;
}
interface IProps {
    profile: IUserData
}


export const UserData: FC<IProps> = ({profile}: IProps) => {


    return (
        <div className="container flex flex-col gap-6">
            <h2 className="text-3xl">Имя: {profile.user_name}</h2>
            <h2 className="text-3xl">Телефон: {profile.phone}</h2>
            <h2 className="text-3xl">Адрес: {profile.adress}</h2>
        </div>
    )
}
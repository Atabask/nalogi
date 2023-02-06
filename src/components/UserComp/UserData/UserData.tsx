import React, { FC } from "react";
import './UserDataStyle.css'

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
        <div className="conteiner_user_data">
            <h2 className="title_user_data">Имя: {profile.user_name}</h2>
            <h2 className="title_user_data">Телефон: {profile.phone}</h2>
            <h2 className="title_user_data">Адрес: {profile.adress}</h2>
        </div>
    )
}
import React, { FC } from "react";
import './HistoryCardStyle.css'

interface IDataProps {
    cold_water: string,
    hot_water: string,
    electro: string,
    month: string,
    year: string,
    id: number,
    user_id: string
}

interface IProps {
    data: IDataProps
}



export const HistoryCard: FC<IProps> = ({ data }: IProps) => {

    return (
        <div className="conteiner">
            <h2 className="card_title">Год: {data.year}</h2>
            <h2 className="card_title">Месяц: {data.month}</h2>
            <h2 className="card_title">Электроэнергия: {data.electro} КВт</h2>
            <h2 className="card_title">Горячая воды: {data.hot_water} Кубов</h2>
            <h2 className="card_title">Холодная вода: {data.cold_water} Кубов</h2>
        </div>
    )
}  